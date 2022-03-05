// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { Logger } from "./Logger";
import { LogLevel } from "./LogLevel";

export class ContextLogger implements Logger {

    private readonly _logger : Logger;

    public readonly name     : string;

    private _level : LogLevel | undefined;

    public constructor (
        name       : string,
        logService : Logger
    ) {
        this.name = name;
        this._logger = logService;
        this._level = undefined;
    }

    public getLogLevel () : LogLevel | undefined {
        return this._level ?? this._logger.getLogLevel();
    }

    public setLogLevel (level : LogLevel | undefined) : this {
        this._level = level;
        return this;
    }

    public debug (...args: Array<any>) {
        if (this._level === undefined || this._level <= LogLevel.DEBUG) {
            this._logger.debug(`[${this.name}]`, ...args);
        }
    }

    public info (...args: Array<any>) {
        if (this._level === undefined || this._level <= LogLevel.INFO) {
            this._logger.info(`[${this.name}]`, ...args);
        }
    }

    public warn (...args: Array<any>) {
        if (this._level === undefined || this._level <= LogLevel.WARN) {
            this._logger.warn(`[${this.name}]`, ...args);
        }
    }

    public error (...args: Array<any>) {
        if (this._level === undefined || this._level <= LogLevel.ERROR) {
            this._logger.error(`[${this.name}]`, ...args);
        }
    }

}
