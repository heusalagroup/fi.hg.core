// Copyright (c) 2022-2023. Heusala Group Oy. All rights reserved.
// Copyright (c) 2020-2022. Sendanor. All rights reserved.

import { LogLevel, stringifyLogLevel } from "./types/LogLevel";
import { Logger } from "./types/Logger";
import { ContextLogger } from "./logger/context/ContextLogger";
import { ConsoleLogger } from "./logger/console/ConsoleLogger";

export class LogService {

    public static Level = LogLevel;

    private static _level  : LogLevel = LogLevel.DEBUG;
    private static _logger : Logger = new ConsoleLogger();

    public static setLogLevel (value : LogLevel | undefined) : Logger {
        this._level = value ?? LogLevel.DEBUG;
        return this;
    }

    public static getLogLevel () : LogLevel {
        return this._level;
    }

    public static getLogLevelString () : string {
        return stringifyLogLevel(this._level);
    }

    public static setLogger (value : Logger) {
        if (!value) throw new TypeError(`The logger was not defined`);
        this._logger = value;
    }

    public static getLogger () : Logger {
        return this._logger;
    }

    /**
     * Logs a debug message.
     *
     * @param args - The arguments to log.
     * @see {@link LogLevel.DEBUG}
     */
    public static debug (...args : readonly any[]) {
        if (this._level <= LogLevel.DEBUG) {
            this._logger.debug(...args);
        }
    }

    /**
     * Logs an info message.
     *
     * @param args - The arguments to log.
     * @see {@link LogLevel.INFO}
     */
    public static info (...args : readonly any[]) {
        if (this._level <= LogLevel.INFO) {
            this._logger.info(...args);
        }
    }

    /**
     * Logs a warning message.
     *
     * @param args - The arguments to log.
     * @see @{@link LogLevel.WARN}
     */
    public static warn (...args : readonly any[]) {
        if (this._level <= LogLevel.WARN) {
            this._logger.warn(...args);
        }
    }

    /**
     * Logs an error message.
     *
     * @param args - The arguments to log.
     * @see {@link LogLevel.ERROR}
     */
    public static error (...args : readonly any[]) {
        if (this._level <= LogLevel.ERROR) {
            this._logger.error(...args);
        }
    }

    public static createLogger (name : string) : ContextLogger {
        return new ContextLogger(name, LogService);
    }

}
