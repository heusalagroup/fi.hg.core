// Copyright (c) 2022- Heusala Group. All rights reserved.
// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { LogLevel, stringifyLogLevel } from "./types/LogLevel";
import { ContextLogger } from "./types/ContextLogger";
import { Logger } from "./types/Logger";

/**
 * The LogService class provides a way to set the log level and logger instance
 * for a logging system. It also provides methods for logging messages at different
 * levels (debug, info, warn, error).
 */
export class LogService {
    /**
     * An object containing the available log levels.
     */
    public static Level = LogLevel;

    /**
     * The current log level.
     * @private
     */
    private static _level  : LogLevel = LogLevel.DEBUG;

    /**
     * The current logger instance.
     * @private
     */
    private static _logger : Logger | any   = console;

    /**
     * Sets the log level.
     *
     * @param value - The log level to set.
     * @returns The LogService instance.
     */
    public static setLogLevel (value : LogLevel | undefined) : Logger {
        if (value) {
            this._level = value;
        }
        return this;
    }

    /**
     * Gets the current log level.
     *
     * @returns The current log level.
     */
    public static getLogLevel () : LogLevel | undefined {
        return this._level;
    }

    /**
     * Gets the string representation of the current log level.
     *
     * @returns The string representation of the current log level.
     */
    public static getLogLevelString () : string {
        return stringifyLogLevel(this._level);
    }

    /**
     * Sets the logger instance.
     *
     * @param value - The logger instance to set.
     * @throws {TypeError} If the logger instance is not defined.
     */
    public static setLogger (value : Logger) {
        if (!value) throw new TypeError(`The logger was not defined`);
        this._logger = value;
    }

    /**
     * Logs a debug message.
     *
     * @param args - The message(s) to log.
     */
    public static debug (...args : Array<any>) {
        if (this._level <= LogLevel.DEBUG) {
            this._logger.debug(...args);
        }
    }

    /**
     * Logs an info message.
     *
     * @param args - The message(s) to log.
     */
    public static info (...args : Array<any>) {
        if (this._level <= LogLevel.INFO) {
            this._logger.info(...args);
        }
    }

    /**
     * Logs a warning message.
     *
     * @param args - The message(s) to log.
     */
    public static warn (...args : Array<any>) {
        if (this._level <= LogLevel.WARN) {
            this._logger.warn(...args);
        }
    }

    /**
     * Logs an error message.
     *
     * @param args - The message(s) to log.
     */
    public static error (...args : Array<any>) {
        if (this._level <= LogLevel.ERROR) {
            this._logger.error(...args);
        }
    }

    /**
     * Creates a new context logger with the given name.
     *
     * @param name - The name of the logger.
     * @returns The new context logger.
     */
    public static createLogger (name : string) : ContextLogger {
        return new ContextLogger(name, LogService);
    }

}
