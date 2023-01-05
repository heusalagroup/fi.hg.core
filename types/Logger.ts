// Copyright (c) 2022. Heusala Group <info@hg.fi>. All rights reserved.
// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { LogLevel } from "./LogLevel";

/**
 * The Logger interface defines the methods that a logger should have.
 */
export interface Logger {
    /**
     * Gets the log level of the logger.
     *
     * @returns The log level of the logger.
     */
    getLogLevel () : LogLevel | undefined;

    /**
     * Sets the log level of the logger.
     *
     * @param level - The log level to set.
     * @returns The Logger instance.
     */
    setLogLevel (level : LogLevel | undefined) : Logger;

    /**
     * Logs a debug message.
     *
     * @param args - The message(s) to log.
     */
    debug (...args: any[]) : void;

    /**
     * Logs an info message.
     *
     * @param args - The message(s) to log.
     */
    info (...args: any[]) : void;

    /**
     * Logs a warning message.
     *
     * @param args - The message(s) to log.
     */
    warn (...args: any[]) : void;

    /**
     * Logs an error message.
     *
     * @param args - The message(s) to log.
     */
    error (...args: any[]) : void;

}
