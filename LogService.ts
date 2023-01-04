// Copyright (c) 2022- Heusala Group. All rights reserved.
// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { LogLevel, stringifyLogLevel } from "./types/LogLevel";
import { ContextLogger } from "./types/ContextLogger";
import { Logger } from "./types/Logger";

     /**
     * A logging service.
     */
export class LogService {

     /**
     * The available log levels.
     * @static
     * @type {LogLevel}
     */
    public static Level = LogLevel;

     /**
     * The current log level.
     * @private
     * @static
     * @type {LogLevel}
     */
    private static _level  : LogLevel = LogLevel.DEBUG;
    
     /**
     * The logger object.
     * @private
     * @static
     * @type {Logger | any}
     */
    private static _logger : Logger | any   = console;

     /**
     * Set the log level.
     * @param {LogLevel | undefined} value - The log level to set.
     * @returns {Logger} - The logging service.
     */
    public static setLogLevel (value : LogLevel | undefined) : Logger {
        if (value) {
            this._level = value;
        }
        return this;
    }

     /**
     * Get the current log level.
     * @returns {LogLevel | undefined} - The current log level.
     */
    public static getLogLevel () : LogLevel | undefined {
        return this._level;
    }

     /**
     * Get the current log level as a string.
     * @returns {string} - The current log level as a string.
     */
    public static getLogLevelString () : string {
        return stringifyLogLevel(this._level);
    }

     /**
     * Set the logger object.
     * @param {Logger} value - The logger object to set.
     * @throws {TypeError} - If the logger is not defined.
     */
    public static setLogger (value : Logger) {
        if (!value) throw new TypeError(`The logger was not defined`);
        this._logger = value;
    }

     /**
     * Log a debug message.
     * @param {...any} args - The message arguments.
     */
    public static debug (...args : Array<any>) {
        if (this._level <= LogLevel.DEBUG) {
            this._logger.debug(...args);
        }
    }

     /**
     * Log an info message.
     * @param {...any} args - The message arguments.
     */
    public static info (...args : Array<any>) {
        if (this._level <= LogLevel.INFO) {
            this._logger.info(...args);
        }
    }

     /**
     * Log a warning message.
     * @param {...any} args - The message arguments.
     */
    public static warn (...args : Array<any>) {
        if (this._level <= LogLevel.WARN) {
            this._logger.warn(...args);
        }
    }

     /**
     * Log an error message.
     * @param {...any} args - The message arguments.
     */
    public static error (...args : Array<any>) {
        if (this._level <= LogLevel.ERROR) {
            this._logger.error(...args);
        }
    }

     /**
     * Create a new context logger.
     * @param {string} name - The name of the context logger.
     * @returns {ContextLogger} - A new context logger with the specified name.
     */
    public static createLogger (name : string) : ContextLogger {
        return new ContextLogger(name, LogService);
    }

}
