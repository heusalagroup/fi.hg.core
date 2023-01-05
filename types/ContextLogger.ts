// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.


import { Logger } from "./Logger";
import { LogLevel } from "./LogLevel";
/**
 * The ContextLogger class provides a way to create a logger with a specific name
 * that can be used to log messages with a context. It also allows setting the
 * log level for the logger. If no log level is set, the log level of the parent
 * logger is used.
 */
export class ContextLogger implements Logger {
    /**
     * The parent logger.
     * @private
     */
    private readonly _logger : Logger;

    /**
     * The name of the logger.
     */
    public readonly name     : string;


    /**
     * The log level of the logger.
     * @private
     */
    private _level : LogLevel | undefined;

    /**
     * Creates a new context logger with the given name and parent logger.
     *
     * @param name - The name of the logger.
     * @param logService - The parent logger.
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
     * Gets the log level of the logger. If no log level is set, the log level of
     * the parent logger is returned.
     *
     * @returns The log level of the logger.
     */
    public getLogLevel () : LogLevel | undefined {
        return this._level ?? this._logger.getLogLevel();
    }

    /**
     * Sets the log level of the logger.
     *
     * @param level - The log level to set.
     * @returns The ContextLogger instance.
     */
    public setLogLevel (level : LogLevel | undefined) : this {
        this._level = level;
        return this;
    }

    /**
     * Logs a debug message.
     *
     * @param args - The message(s) to log.
     */
    public debug (...args: Array<any>) {
        if (this._level === undefined || this._level <= LogLevel.DEBUG) {
            this._logger.debug(`[${this.name}]`, ...args);
        }
    }

    /**
     * Logs an info message.
     *
     * @param args - The message(s) to log.
     */
    public info (...args: Array<any>) {
        if (this._level === undefined || this._level <= LogLevel.INFO) {
            this._logger.info(`[${this.name}]`, ...args);
        }
    }

    /**
     * Logs a warning message.
     *
     * @param args - The message(s) to log.
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
