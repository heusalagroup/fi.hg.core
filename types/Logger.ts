// Copyright (c) 2022. Heusala Group <info@hg.fi>. All rights reserved.
// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { LogLevel } from "./LogLevel";

    /**
     * A logger interface.
     * @interface
     */
export interface Logger {

    getLogLevel () : LogLevel | undefined;
    
     /**
     * Set the log level.
     * @param {LogLevel | undefined} level - The log level to set.
     * @returns {Logger} - The logger instance.
     */
    setLogLevel (level : LogLevel | undefined) : Logger;

     /**
     * Log a debug message.
     * @param {...any} args - The message arguments.
     */
    debug (...args: any[]) : void;

     /**
     * Log an info message.
     * @param {...any} args - The message arguments.
     */
    info (...args: any[]) : void;

     /**
     * Log a warning message.
     * @param {...any} args - The message arguments.
     */
    warn (...args: any[]) : void;

     /**
     * Log an error message.
     * @param {...any} args - The message arguments.
     */
    error (...args: any[]) : void;

}
