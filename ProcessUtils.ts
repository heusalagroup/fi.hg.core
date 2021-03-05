// Copyright (c) 2020 Sendanor. All rights reserved.

import {trim} from "./modules/lodash";
import FS     from 'fs';
import PATH   from 'path';

export class ProcessUtils {

    static getArguments () : Array<string> {
        return process.argv.slice(2);
    }

    static parseEnvFileLine (obj : Record<string, string>, line : string) : Record<string, string> {

        if (line.indexOf('=') < 0) {
            if (line.length) {
                obj[line] = '';
            }
            return obj;
        }

        const parts = line.split('=');
        let key = parts.shift();
        key = trim(key);
        if (key.length) {
            obj[key] = parts.join('=').trim();
        }
        return obj;

    }

    static parseEnvFile (file: string) : Record<string, string> {

        const input : string = FS.readFileSync(file, {encoding:"utf-8"});

        const rows : Array<string> = input.split('\n');

        return rows.reduce(ProcessUtils.parseEnvFileLine, {});

    }

    static initEnvFromFile (file: string) {

        const params = ProcessUtils.parseEnvFile(file);

        process.env = {
            ...params,
            ...process.env
        };

    }

    static initEnvFromDefaultFiles () {

        const file = PATH.join(process.cwd(), '.env');

        if (FS.existsSync(file)) {
            ProcessUtils.initEnvFromFile(file);
        }

    }

    /**
     *
     * @param callback
     * @param errorHandler
     */
    static setupDestroyHandler (
        callback     : () => void,
        errorHandler : (err : any) => void
    ) {

        let destroyed = false;

        const closeProcess = () => {

            try {

                if (destroyed) return;

                destroyed = true;

                callback();

            } catch (err) {
                errorHandler(err);
            }

        };

        process.on('exit', closeProcess);
        process.on('SIGTERM', closeProcess);
        process.on('SIGINT', closeProcess);
        process.on('SIGUSR1', closeProcess);
        process.on('SIGUSR2', closeProcess);
        process.on('uncaughtException', closeProcess);

    }

}

export default ProcessUtils;
