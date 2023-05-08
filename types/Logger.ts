// Copyright (c) 2022. Heusala Group <info@hg.fi>. All rights reserved.
// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { LogLevel } from "./LogLevel";

/**
 * A logger interface that defines methods for logging messages at different
 * levels of severity.
 */
export interface Logger {

    /**
     * Gets the log level of the logger.
     *
     * @returns {LogLevel} - The log level of the logger. Implementations should
     *                       default to DEBUG.
     */
    getLogLevel () : LogLevel;

    /**
     * Sets the log level of the logger.
     *
     * @param {LogLevel | undefined} level - The new log level.
     * @returns {this} - The logger instance.
     */
    setLogLevel (level : LogLevel | undefined) : this;

    /**
     * Logs a debug message.
     *
     * @param args - The arguments to log.
     * @see {@link LogLevel.DEBUG}
     */
    debug (...args: readonly any[]) : void;

    /**
     * Logs an info message.
     *
     * @param args - The arguments to log.
     * @see {@link LogLevel.INFO}
     */
    info (...args: readonly any[]) : void;

    /**
     * Logs a warning message.
     *
     * @param args - The arguments to log.
     * @see @{@link LogLevel.WARN}
     */
    warn (...args: readonly any[]) : void;

    /**
     * Logs an error message.
     *
     * @param args - The arguments to log.
     * @see {@link LogLevel.ERROR}
     */
    error (...args: readonly any[]) : void;

}
