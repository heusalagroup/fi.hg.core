// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

    /**
    * An enumeration of log levels.
    * @enum {number}
    */

export enum LogLevel {

    /** Debug log level. */
    DEBUG,
    
    /** Info log level. */
    INFO,
    
    /** Warn log level. */
    WARN,
    
    /** Error log level. */
    ERROR,
    
    /** No logging (turns logging off). */
    NONE

}

    /**
    * Check if the given value is a valid log level.
    * @param {any} value - The value to check.
    * @returns {value is LogLevel} - True if the value is a valid log level, false otherwise.
    */
export function isLogLevel (value: any): value is LogLevel {
    switch (value) {

        case LogLevel.DEBUG:
        case LogLevel.INFO:
        case LogLevel.WARN:
        case LogLevel.ERROR:
        case LogLevel.NONE:
            return true;

        default:
            return false;

    }
}

    /**
    * Convert a log level to a string.
    * @param {LogLevel} value - The log level to convert.
    * @returns {string} - The string representation of the log level.
    */
export function stringifyLogLevel (value : LogLevel) : string {
    switch (value) {
        case LogLevel.DEBUG : return 'DEBUG';
        case LogLevel.INFO  : return 'INFO';
        case LogLevel.WARN  : return 'WARN';
        case LogLevel.ERROR : return 'ERROR';
        case LogLevel.NONE  : return 'NONE';
        default             : return `Unknown:${value}`;
    }
}

    /**
    * Convert a value to a log level.
    * @param {any} value - The value to convert.
    * @returns {LogLevel | undefined} - The log level, or undefined if the value is invalid.
    */
export function parseLogLevel (value: any): LogLevel | undefined {

    if ( !value ) return undefined;
    if ( isLogLevel(value) ) return value;

    value = `${value}`.toUpperCase();

    switch (value) {

        case 'ALL':
        case 'DEBUG':
            return LogLevel.DEBUG;

        case 'INFO':
            return LogLevel.INFO;

        case 'WARN'    :
        case 'WARNING' :
            return LogLevel.WARN;

        case 'ERR'    :
        case 'ERROR'  :
            return LogLevel.ERROR;

        case 'FALSE'  :
        case 'OFF'    :
        case 'QUIET'  :
        case 'SILENT' :
        case 'NONE'   :
            return LogLevel.NONE;

        default:
            return undefined;
    }

}
