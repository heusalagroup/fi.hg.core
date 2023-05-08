// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2021-2022. Sendanor <info@sendanor.fi>. All rights reserved.

import { Logger } from "../../types/Logger";
import { LogLevel } from "../../types/LogLevel";

/**
 * A logger implementation that writes log messages to a parent logger with
 * its own control for LogLevel and a name of the context.
 */
export class ContextLogger implements Logger {

    /**
     * The parent logger to which log messages will be written.
     *
     * @private
     * @readonly
     */
    private readonly _parentLogger : Logger;

    /**
     * The name of the context to be used in log messages.
     *
     * @readonly
     */
    public readonly name     : string;

    /**
     * The log level for this logger. If undefined, the parent logger's log
     * level will be used.
     *
     * @private
     */
    private _level : LogLevel | undefined;

    /**
     * Constructs a new ContextLogger instance.
     *
     * @param name The name of the context to be used in log messages.
     * @param logService The parent logger to which log messages will be written.
     * @param level The initial log level. Undefined means to use value from parent.
     */
    public constructor (
        name       : string,
        logService : Logger,
        level     ?: LogLevel | undefined
    ) {
        this.name = name;
        this._parentLogger = logService;
        this._level = level ?? undefined;
    }

    /**
     * @inheritDoc
     */
    public getLogLevel () : LogLevel {
        return this._level ?? this._parentLogger.getLogLevel() ?? LogLevel.DEBUG;
    }

    /**
     * @inheritDoc
     */
    public setLogLevel (level : LogLevel | undefined) : this {
        this._level = level;
        return this;
    }

    /**
     * @inheritDoc
     */
    public debug (...args: readonly any[]) {
        if (this.getLogLevel() <= LogLevel.DEBUG) {
            this._parentLogger.debug(`[${this.name}]`, ...args);
        }
    }

    /**
     * @inheritDoc
     */
    public info (...args: readonly any[]) {
        if (this.getLogLevel()  <= LogLevel.INFO) {
            this._parentLogger.info(`[${this.name}]`, ...args);
        }
    }

    /**
     * @inheritDoc
     */
    public warn (...args: readonly any[]) {
        if (this.getLogLevel()  <= LogLevel.WARN) {
            this._parentLogger.warn(`[${this.name}]`, ...args);
        }
    }

    /**
     * @inheritDoc
     */
    public error (...args: readonly any[]) {
        if (this.getLogLevel()  <= LogLevel.ERROR) {
            this._parentLogger.error(`[${this.name}]`, ...args);
        }
    }

}
