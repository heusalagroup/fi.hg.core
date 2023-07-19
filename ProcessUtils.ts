// Copyright (c) 2020 Sendanor. All rights reserved.

import FS     from 'fs';
import PATH   from 'path';
import { trim } from "./functions/trim";
import { LogService } from './LogService';
import { LogLevel } from "./types/LogLevel";
import { indexOf } from "./functions/indexOf";
import { trimStart } from "./functions/trimStart";

const LOG = LogService.createLogger('ProcessUtils');

export class ProcessUtils {

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    public static getArguments () : string[] {
        return process.argv.slice(2);
    }

    public static parseEnvFileLine (obj : Record<string, string>, input : string) : Record<string, string> {

        if ( !input || !trimStart(input) ) return obj;

        let key : string;
        const equalIndex : number = indexOf(input, '=');

        if (equalIndex < 0) {
            key = trim(input);
            if (key.length) {
                return {
                    ...obj,
                    [key]: ''
                };
            } else {
                return obj;
            }
        } else {
            key = input.substring(0, equalIndex);
            key = trim(key);
        }

        if (equalIndex === input.length - 1) {
            return {
                ...obj,
                [input]: ''
            };
        }

        let block : string;
        if (input[equalIndex + 1] === '"') {
            const equalIndexEnd : number = indexOf(input, '"', equalIndex + 2);
            if (equalIndexEnd >= 0) {
                block = input.substring(equalIndex + 2, equalIndexEnd);
                return this.parseEnvFileLine(
                    {
                        ...obj,
                        [key]: block
                    },
                    input.substring(equalIndexEnd+1)
                );
            } else {
                throw new TypeError('ProcessUtils.parseEnvFileLine: No ending for double quote detected');
            }
        }

        const lineEnd : number = indexOf(input, '\n', equalIndex);
        if (lineEnd < 0) {
            block = input.substring(equalIndex + 1).trim();
            block = block.replace(/\\n/g, '\n');
            return {
                ...obj,
                [key]: block
            };
        } else {
            block = input.substring(equalIndex + 1, lineEnd).trim();
            block = block.replace(/\\n/g, '\n');
            return this.parseEnvFileLine(
                {
                    ...obj,
                    [key]: block
                },
                input.substring(lineEnd+1)
            );
        }
    }

    public static parseEnvString (input : string) {
        return ProcessUtils.parseEnvFileLine({}, input);
    }

    public static parseEnvFile (file: string) : Record<string, string> {
        const input : string = FS.readFileSync(file, {encoding:"utf-8"});
        return this.parseEnvString(input);
    }

    public static initEnvFromRecord (params: Record<string, string>) : void {
        process.env = {
            ...params,
            ...process.env
        };
    }

    public static initEnvFromFile (file: string) : void {
        const params = ProcessUtils.parseEnvFile(file);
        this.initEnvFromRecord(params);
    }

    public static initEnvFromDefaultFiles () : void {
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
    public static setupDestroyHandler (
        callback     : () => void,
        errorHandler : (err : any) => void
    ) : void {

        let destroyed = false;

        const closeProcessInternal = () => {
            try {
                if (destroyed) return;
                destroyed = true;
                callback();
            } catch (err) {
                errorHandler(err);
            }
        };

        const closeProcess = (reason: string) => {
            return (err ?: any) => {
                ProcessUtils._printErrors(reason, err);
                closeProcessInternal();
            };
        };

        process.on('exit', closeProcess('exit'));
        process.on('SIGTERM', closeProcess('SIGTERM'));
        process.on('SIGINT', closeProcess('SIGINT'));
        process.on('SIGUSR1', closeProcess('SIGUSR1'));
        process.on('SIGUSR2', closeProcess('SIGUSR2'));
        process.on('uncaughtException', closeProcess('uncaughtException'));

    }

    private static _printErrors (reason: string, err ?: any) : void {
        try {
            if (reason === "exit") {
                if (err) {
                    LOG.debug(`DEBUG: Closing process because "${reason}" event: `, err);
                } else {
                    LOG.debug(`DEBUG: Closing process because "${reason}" event`);
                }
            } else if (err) {
                LOG.error(`ERROR: Closing process because "${reason}" event: `, err);
            } else {
                LOG.info(`INFO: Closing process because "${reason}" event`);
            }
        } catch (err2) {
            console.error('Error while printing errors: ', err2);
        }
    }

}
