// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { existsSync } from 'fs';
import { opendir } from 'node:fs/promises';
import { execSync } from 'child_process';
import { join as pathJoin } from 'path';
import { has } from "../../functions/has";
import { keys } from "../../functions/keys";
import { map } from "../../functions/map";
import { trim } from "../../functions/trim";
import { uniq } from "../../functions/uniq";
import { ReadonlyJsonAny } from "../../Json";
import { CommandExitStatus } from "../types/CommandExitStatus";
import { HgPackageCommandService } from "./HgPackageCommandService";
import { readFile } from 'node:fs/promises';

export class HgPackageCommandServiceImpl implements HgPackageCommandService {

    public static create () : HgPackageCommandServiceImpl {
        return new HgPackageCommandServiceImpl();
    }

    protected constructor (
    ) {
    }

    public async main (args: readonly string[]): Promise<CommandExitStatus> {

        const withNpm : boolean = args.includes('with-npm');

        const workingDir = process.cwd();
        let pkgDirectories : string[] = await this._getPkgDirectories(workingDir);
        if (pkgDirectories.length === 0) {
            console.error(`Could not find any directories with package.json`);
            return CommandExitStatus.CONFLICT;
        }

        let allDependencies : {
            [subDir: string]: {
                [pkgName: string]: string
            }
        } = {};

        for (let i = 0; i<pkgDirectories.length; i+=1) {
            const pkgDir = pkgDirectories[i];
            const pkgFile : string = pathJoin(pkgDir, 'package.json');
            const pkgData = await this._readJson(pkgFile);
            // FIXME: The runtime type should be checked
            const devDependencies = (pkgData as any)?.devDependencies ?? [];
            allDependencies[pkgDir] = devDependencies;
        }

        let pkgStatus : {
            [pkgName: string]: {
                [subDir: string]: {
                    exists: boolean;
                    version: string;
                }
            }
        } = {};


        for (let i = 0; i<pkgDirectories.length; i+=1) {
            const subDir = pkgDirectories[i];
            if (!has(allDependencies, subDir)) {
                continue;
            }

            const packageNames = keys(allDependencies[subDir]);

            for (let j = 0; j<packageNames.length; j+=1) {
                const pkgName : string = packageNames[j];
                if (!has(pkgStatus, pkgName)) {
                    pkgStatus[pkgName] = {};
                }
                pkgStatus[pkgName][subDir] = {
                    exists: true,
                    version: allDependencies[subDir][pkgName]
                };
            }

        }

        const packageNames : string[] = keys(pkgStatus);

        if (withNpm) {
            for (let i = 0; i<packageNames.length; i+=1) {
                const packageName = packageNames[i];
                const latestVersion : string = trim(execSync(
                    `npm info '${packageName.replace(/'/g, "\\'")}' version`,
                    {encoding: 'utf8'}
                ));
                pkgStatus[packageName]['__NPM__'] = {
                    exists: !!latestVersion,
                    version: `^${latestVersion}`
                };
            }
        }

        for (let i = 0; i<packageNames.length; i+=1) {
            const packageName = packageNames[i];
            const subDirs = keys(pkgStatus[packageName]);
            const pkgVersions = uniq(map(subDirs, (dir) => pkgStatus[packageName][dir].version));
            if (pkgVersions.length >= 2) {
                console.log(`Multiple versions available for ${packageName}: ${
                    map(
                        subDirs,
                        (dir: string) : string => {
                            const version = pkgStatus[packageName][dir].version;
                            return `${dir} (${version})`;
                        }
                    ).join(' ')
                }`);
            }

        }

        return CommandExitStatus.OK;
    }

    private async _readJson (file : string): Promise<ReadonlyJsonAny> {
        try {
            const contents = await readFile(file, { encoding: 'utf8' });
            return JSON.parse(contents);
        } catch (err) {
            throw new Error(`Could not read file ${file}: ${err}`);
        }

    }

    private async _getPkgDirectories (workingDir: string) : Promise<string[]> {
        const localPackageJson = pathJoin(workingDir, 'package.json');
        if (existsSync( localPackageJson )) {
            return [ workingDir ];
        }
        return await this._getSubPkgDirectories( workingDir );
    }

    private async _getSubPkgDirectories (workingDir: string) : Promise<string[]> {
        let pkgDirectories : string[] = [];
        const dir = await opendir('./');
        for await (const dirent of dir) {
            if (!dirent.isDirectory()) continue;
            const subDir = pathJoin(workingDir, dirent.name);
            const packageJsonFile = pathJoin(subDir, 'package.json');
            if (existsSync(packageJsonFile)) {
                pkgDirectories.push(subDir);
            }
        }
        return pkgDirectories;
    }

}
