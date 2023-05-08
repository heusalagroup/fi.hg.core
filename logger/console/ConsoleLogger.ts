// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Logger } from "../../types/Logger";
import { LogLevel } from "../../types/LogLevel";

/**
 * A logger implementation that writes log messages to standard console with
 * its own control for LogLevel and a name of the context.
 */
export class ConsoleLogger implements Logger {

    /**
     * The log level for this logger. If undefined, the parent logger's log
     * level will be used.
     *
     * @private
     */
    private _level : LogLevel;

    /**
     * Constructs a new ConsoleLogger instance.
     */
    public constructor (
        level?: LogLevel
    ) {
        this._level = level ?? LogLevel.DEBUG;
    }

    /**
     * @inheritDoc
     */
    public getLogLevel () : LogLevel {
        return this._level ?? LogLevel.DEBUG;
    }

    /**
     * @inheritDoc
     */
    public setLogLevel (level : LogLevel | undefined) : this {
        this._level = level ?? LogLevel.DEBUG;
        return this;
    }

    /**
     * @inheritDoc
     */
    public debug (...args: readonly any[]) {
        if (this.getLogLevel() <= LogLevel.DEBUG) {
            console.debug(...args);
        }
    }

    /**
     * @inheritDoc
     */
    public info (...args: readonly any[]) {
        if (this.getLogLevel()  <= LogLevel.INFO) {
            console.info(...args);
        }
    }

    /**
     * @inheritDoc
     */
    public warn (...args: readonly any[]) {
        if (this.getLogLevel()  <= LogLevel.WARN) {
            console.warn(...args);
        }
    }

    /**
     * @inheritDoc
     */
    public error (...args: readonly any[]) {
        if (this.getLogLevel()  <= LogLevel.ERROR) {
            console.error(...args);
        }
    }

}
