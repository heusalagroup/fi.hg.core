// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import fs from "fs";
import path from "path";
import { LogService } from "./LogService";
import { ReadonlyJsonAny } from "./Json";
import { replaceTemplate } from "./functions/replaceTemplate";

const LOG = LogService.createLogger('SyncFileUtils');

export class SyncFileUtils {

    static isDirectory (dirPath: string) : boolean {
        return fs.statSync(dirPath).isDirectory();
    }

    static directoryExits (dirPath: string) : boolean {
        return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
    }

    static mkdirp (dirPath: string) {

        LOG.debug(`mkdirp: Creating directory: `, dirPath);

        const paths = [];
        while (!SyncFileUtils.directoryExits(dirPath)) {
            paths.push(dirPath);
            const parentPath = path.dirname(dirPath);
            if (dirPath === parentPath) break;
            dirPath = parentPath;
        }

        while ( paths.length >= 1 ) {
            const dir : string | undefined = paths.pop();
            if (!dir) throw new TypeError('No dir');
            LOG.debug(`mkdirp: Creating missing directory: `, dir);
            fs.mkdirSync(dir);
        }

    }

    static readTextFile (
        sourceFile: string
    ) : string {
        return fs.readFileSync(sourceFile, "utf8");
    }

    static fileExists (targetPath: string) : boolean {
        return fs.existsSync(targetPath)
    }

    static readJsonFile (
        sourceFile: string
    ) : ReadonlyJsonAny {
        return JSON.parse(SyncFileUtils.readTextFile(sourceFile));
    }

    static writeTextFile (
        targetPath: string,
        targetDataString : string
    ) {
        fs.writeFileSync(targetPath, targetDataString, {encoding: 'utf8'});
    }

    static writeJsonFile (
        targetPath: string,
        targetData : ReadonlyJsonAny
    ) {
        const targetDataString = JSON.stringify(targetData, null, 2);
        SyncFileUtils.writeTextFile(targetPath, targetDataString);
    }

    static copyTextFileWithReplacements (
        sourceFile: string,
        toFile: string,
        replacements: {readonly [name: string]: string}
    ) {
        const fileContentString = SyncFileUtils.readTextFile(sourceFile);
        const contentString = replaceTemplate(fileContentString, replacements);
        SyncFileUtils.writeTextFile(toFile, contentString);
    }

    static copyTextFileWithReplacementsIfMissing (
        sourceFile: string,
        toFile: string,
        replacements: {readonly [name: string]: string}
    ) {

        if (!SyncFileUtils.fileExists(toFile)) {
            SyncFileUtils.copyTextFileWithReplacements(sourceFile, toFile, replacements);
        } else {
            LOG.warn(`Warning! File already exists: `, toFile);
        }

    }

}
