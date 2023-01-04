// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

    /**
    * A logger that adds a context (name) to log messages.
    * @implements {Logger}
    */

import { Logger } from "./Logger";
import { LogLevel } from "./LogLevel";

export class ContextLogger implements Logger {

     /**
     * The underlying logger.
     * @private
     * @type {Logger}
     */
    private readonly _logger : Logger;

     /**
     * The context (name) of this logger.
     * @readonly
     * @type {string}
     */
    public readonly name     : string;

    
     /**
     * The log level of this logger.
     * @private
     * @type {LogLevel | undefined}
     */
    private _level : LogLevel | undefined;

     /**
     * Create a new context logger.
     * @param {string} name - The context (name) of this logger.
     * @param {Logger} logService - The underlying logger.
     */
    public constructor (
        name       : string,
        logService : Logger
    ) {
        this.name = name;
        this._logger = logService;
        this._level = undefined;
    }

     /**
     * Get the current log level.
     * @returns {LogLevel | undefined} - The current log level, or undefined if the log level is not set.
     */
    public getLogLevel () : LogLevel | undefined {
        return this._level ?? this._logger.getLogLevel();
    }

     /**
     * Set the log level.
     * @param {LogLevel | undefined} level - The log level to set.
     * @returns {this} - The logger instance.
     */
    public setLogLevel (level : LogLevel | undefined) : this {
        this._level = level;
        return this;
    }

    
     /**
     * Log a debug message.
     * @param {...any} args - The message arguments.
     */
    public debug (...args: Array<any>) {
        if (this._level === undefined || this._level <= LogLevel.DEBUG) {
            this._logger.debug(`[${this.name}]`, ...args);
        }
    }

     /**
     * Log an info message.
     * @param {...any} args - The message arguments.
     */
    public info (...args: Array<any>) {
        if (this._level === undefined || this._level <= LogLevel.INFO) {
            this._logger.info(`[${this.name}]`, ...args);
        }
    }

     /**
     * Log a warning message.
     * @param {...any} args - The message arguments.
     */
    public warn (...args: Array<any>) {
        if (this._level === undefined || this._level <= LogLevel.WARN) {
            this._logger.warn(`[${this.name}]`, ...args);
        }
    }

     /**
     * Log an error message.
     * @param {...any} args - The message arguments.
     */
    public error (...args: Array<any>) {
        if (this._level === undefined || this._level <= LogLevel.ERROR) {
            this._logger.error(`[${this.name}]`, ...args);
        }
    }

}
