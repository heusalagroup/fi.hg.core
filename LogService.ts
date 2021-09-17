// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import LogLevel, { stringifyLogLevel } from "./types/LogLevel";
import ContextLogger from "./types/ContextLogger";
import Logger from "./types/Logger";

export class LogService {

    public static Level = LogLevel;

    private static _level  : LogLevel = LogLevel.DEBUG;
    private static _logger : Logger | any   = console;

    public static setLogLevel (value : LogLevel | undefined) : Logger {
        if (value) {
            this._level = value;
        }
        return this;
    }

    public static getLogLevel () : LogLevel | undefined {
        return this._level;
    }

    public static getLogLevelString () : string {
        return stringifyLogLevel(this._level);
    }

    public static setLogger (value : Logger) {
        if (!value) throw new TypeError(`The logger was not defined`);
        this._logger = value;
    }

    public static debug (...args : Array<any>) {
        if (this._level <= LogLevel.DEBUG) {
            this._logger.debug(...args);
        }
    }

    public static info (...args : Array<any>) {
        if (this._level <= LogLevel.INFO) {
            this._logger.info(...args);
        }
    }

    public static warn (...args : Array<any>) {
        if (this._level <= LogLevel.WARN) {
            this._logger.warn(...args);
        }
    }

    public static error (...args : Array<any>) {
        if (this._level <= LogLevel.ERROR) {
            this._logger.error(...args);
        }
    }

    public static createLogger (name : string) : ContextLogger {
        return new ContextLogger(name, LogService);
    }

}

export default LogService;
