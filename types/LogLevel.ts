// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

export enum LogLevel {

    DEBUG,
    INFO,
    WARN,
    ERROR,
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

export default LogLevel;
