// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Logger } from "../../types/Logger";
import { LogLevel } from "../../types/LogLevel";
import { map } from "../../functions/map";

/**
 * A logger implementation that aggregates multiple loggers and delegates log
 * messages to each of them.
 */
export class CompositeLogger implements Logger {

    /**
     * Internal logger implementations
     *
     * @private
     */
    private readonly _loggers : Logger[];

    /**
     * The current log level for this service
     *
     * @private
     */
    private _logLevel : LogLevel;

    /**
     *
     * @param loggers
     * @param logLevel
     */
    public constructor (
        loggers  ?: readonly Logger[],
        logLevel ?: LogLevel
    ) {
        this._loggers = map(loggers ?? [], (logger) => logger);
        this._logLevel = logLevel ?? LogLevel.DEBUG;
    }

    /**
     * Add a new logger implementation
     *
     * @param logger
     */
    public addLogger (logger: Logger) : void {
        this._loggers.push(logger);
    }

    /**
     * Remove a logger implementation
     *
     * @param logger
     */
    public removeLogger (logger: Logger) : void {
        const index = this._loggers.indexOf(logger);
        if (index >= 0) {
            this._loggers.splice(index, 1);
        }
    }

    /**
     * Return the log level of this logger
     *
     * Note, child loggers may have their own levels configured.
     */
    public getLogLevel (): LogLevel {
        return this._logLevel;
    }

    /**
     * Set the log level of this logger
     *
     * Note, child loggers may have their own levels configured.
     *
     * @param level
     */
    public setLogLevel (level: LogLevel | undefined): this {
        this._logLevel = level ?? LogLevel.DEBUG;
        return this;
    }

    /**
     * @inheritDoc
     */
    public debug (...args: readonly any[]): void {
        if (this._logLevel <= LogLevel.DEBUG) {
            for ( const logger of this._loggers ) {
                logger.debug(...args);
            }
        }
    }

    /**
     * @inheritDoc
     */
    public info (...args: readonly any[]): void {
        if (this._logLevel <= LogLevel.INFO) {
            for ( const logger of this._loggers ) {
                logger.info(...args);
            }
        }
    }

    /**
     * @inheritDoc
     */
    public warn (...args: readonly any[]): void {
        if (this._logLevel <= LogLevel.WARN) {
            for ( const logger of this._loggers ) {
                logger.warn(...args);
            }
        }
    }

    /**
     * @inheritDoc
     */
    public error (...args: readonly any[]): void {
        if (this._logLevel <= LogLevel.ERROR) {
            for ( const logger of this._loggers ) {
                logger.error(...args);
            }
        }
    }

}
