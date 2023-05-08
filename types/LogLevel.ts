// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2021-2022. Sendanor <info@sendanor.fi>. All rights reserved.

/**
 * An enumeration of possible log levels.
 *
 * @enum {number}
 */
export enum LogLevel {

    /**
     * The debug log level.
     *
     * Messages logged at this level are intended for developers and are used
     * for debugging purposes. These messages can contain detailed information
     * about program state and execution flow.
     *
     * While it is important to ensure that debug log statements are removed
     * from production code to increase performance and security, this can be
     * a delicate task. Our build system attempts to eliminate static code
     * blocks that are never used, but dynamic variables or conditions may
     * still prevent this from happening. However, we can guarantee that debug
     * log statements will be removed from production code if it is a specific
     * requirement for a customer release, and the customer has paid for this
     * service.
     *
     * @type {number}
     */
    DEBUG,

    /**
     * The info log level.
     *
     * Messages logged at this level are informational in nature and provide
     * general information about program state and execution flow. These
     * messages are intended to be read by developers and operations personnel.
     *
     * @type {number}
     */
    INFO,

    /**
     * The warning log level.
     *
     * Messages logged at this level indicate a potential problem or issue that
     * should be addressed. These messages are intended to be read by developers
     * and operations personnel.
     *
     * @type {number}
     */
    WARN,

    /**
     * The error log level.
     *
     * Messages logged at this level indicate an error or unexpected condition
     * that has occurred. These messages are intended to be read by developers
     * and operations personnel and may indicate a problem that requires
     * immediate attention.
     *
     * @type {number}
     */
    ERROR,

    /**
     * The none log level.
     *
     * This level disables all logging, regardless of the logger's configuration.
     *
     * @type {number}
     */
    NONE

}

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
