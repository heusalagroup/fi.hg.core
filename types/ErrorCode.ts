// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "./Enum";

export enum ErrorCode {

    /**
     * This error occurs when a socket timeout is exceeded during an HTTP
     * request, such as when the server takes too long to respond. This can be
     * caused by a slow network connection or a busy server.
     */
    ETIMEDOUT = "ETIMEDOUT",

    /**
     * This error occurs when an HTTP request is made to an invalid domain name
     * or IP address. This can be caused by a typo in the domain name or by a
     * temporary DNS issue.
     */
    ENOTFOUND = "ENOTFOUND",

    /**
     * This error occurs when an HTTP connection is reset by the server or
     * unexpectedly closed by the client. This can be caused by various factors,
     * such as network congestion or a server overload.
     */
    ECONNRESET = "ECONNRESET",

    /** This error occurs when a connection is aborted by the client
     * or the server. It can be caused by various factors, such as
     * network congestion or a server overload.
     */
    ECONNABORTED = "ECONNABORTED",

    /** This error occurs when the server cannot be reached due to a
     * network issue, such as a firewall blocking the connection.
     */
    EHOSTUNREACH = "EHOSTUNREACH",

    /**
     * This error occurs when a socket operation times out, such as a read or
     * write operation.
     */
    ESOCKETTIMEDOUT = "ESOCKETTIMEDOUT",

    /**
     * This error occurs when a DNS lookup fails due to temporary DNS server
     * issues.
     */
    EAI_AGAIN = "EAI_AGAIN",

    /**
     * This error occurs when a broken pipe is detected during a write operation.
     */
    EPIPE = "EPIPE",

    /**
     * This error occurs when the server actively refuses to establish a connection.
     * This can happen when the server is not running or is not accepting connections
     * on the specified port or address.
     */
    ECONNREFUSED = "ECONNREFUSED",

    /**
     * This error occurs when the specified port is already in use by another process.
     * This can happen when multiple instances of the same server are running on the same
     * machine, or when a server is restarted before the previous instance has fully shut down.
     */
    EADDRINUSE = "EADDRINUSE",

    /**
     * This error occurs when the network is unreachable, either because the network interface
     * is down or because there is no route to the specified host or network.
     */
    ENETUNREACH = "ENETUNREACH",

    /**
     * This error occurs when the connection is reset by the peer unexpectedly, typically
     * due to a network issue or because the server terminated the connection.
     */
    ENETRESET = "ENETRESET",

    /**
     * This error occurs when a protocol error occurs during the connection, such as an
     * invalid SSL certificate or a mismatched protocol version.
     */
    EPROTO = "EPROTO",

    /**
     * This error occurs when the specified host is down or otherwise unreachable.
     * This can happen due to network issues or because the host is temporarily or permanently offline.
     */
    EHOSTDOWN = "EHOSTDOWN",

    /**
     * No such file or directory
     */
    ENOENT = "ENOENT",

}

export function isErrorCode (value: unknown) : value is ErrorCode {
    switch (value) {
        case ErrorCode.ETIMEDOUT:
        case ErrorCode.ENOTFOUND:
        case ErrorCode.ECONNRESET:
        case ErrorCode.ECONNABORTED:
        case ErrorCode.EHOSTUNREACH:
        case ErrorCode.ESOCKETTIMEDOUT:
        case ErrorCode.EAI_AGAIN:
        case ErrorCode.EPIPE:
        case ErrorCode.ECONNREFUSED:
        case ErrorCode.EADDRINUSE:
        case ErrorCode.ENETUNREACH:
        case ErrorCode.ENETRESET:
        case ErrorCode.EPROTO:
        case ErrorCode.EHOSTDOWN:
        case ErrorCode.ENOENT:
            return true;
        default:
            return false;
    }
}

export function explainErrorCode (value : unknown) : string {
    return explainEnum("ErrorCode", ErrorCode, isErrorCode, value);
}

export function stringifyErrorCode (value : ErrorCode) : string {
    switch (value) {
        case ErrorCode.ETIMEDOUT       : return 'ETIMEDOUT';
        case ErrorCode.ENOTFOUND       : return 'ENOTFOUND';
        case ErrorCode.ECONNRESET      : return 'ECONNRESET';
        case ErrorCode.ECONNABORTED    : return 'ECONNABORTED';
        case ErrorCode.EHOSTUNREACH    : return 'EHOSTUNREACH';
        case ErrorCode.ESOCKETTIMEDOUT : return 'ESOCKETTIMEDOUT';
        case ErrorCode.EAI_AGAIN       : return 'EAI_AGAIN';
        case ErrorCode.EPIPE           : return 'EPIPE';
        case ErrorCode.ECONNREFUSED    : return 'ECONNREFUSED';
        case ErrorCode.EADDRINUSE      : return 'EADDRINUSE';
        case ErrorCode.ENETUNREACH     : return 'ENETUNREACH';
        case ErrorCode.ENETRESET       : return 'ENETRESET';
        case ErrorCode.EPROTO          : return 'EPROTO';
        case ErrorCode.EHOSTDOWN       : return 'EHOSTDOWN';
        case ErrorCode.ENOENT          : return 'ENOENT';
    }
    throw new TypeError(`Unsupported ErrorCode value: ${value}`)
}

export function parseErrorCode (value: unknown) : ErrorCode | undefined {
    if (value === undefined) return undefined;
    switch(`${value}`.toUpperCase()) {
        case 'ETIMEDOUT'       : return ErrorCode.ETIMEDOUT;
        case 'ENOTFOUND'       : return ErrorCode.ENOTFOUND;
        case 'ECONNRESET'      : return ErrorCode.ECONNRESET;
        case 'ECONNABORTED'    : return ErrorCode.ECONNABORTED;
        case 'EHOSTUNREACH'    : return ErrorCode.EHOSTUNREACH;
        case 'ESOCKETTIMEDOUT' : return ErrorCode.ESOCKETTIMEDOUT;
        case 'EAI_AGAIN'       : return ErrorCode.EAI_AGAIN;
        case 'EPIPE'           : return ErrorCode.EPIPE;
        case 'ECONNREFUSED'    : return ErrorCode.ECONNREFUSED;
        case 'EADDRINUSE'      : return ErrorCode.EADDRINUSE;
        case 'ENETUNREACH'     : return ErrorCode.ENETUNREACH;
        case 'ENETRESET'       : return ErrorCode.ENETRESET;
        case 'EPROTO'          : return ErrorCode.EPROTO;
        case 'EHOSTDOWN'       : return ErrorCode.EHOSTDOWN;
        case 'ENOENT'          : return ErrorCode.ENOENT;
        default                : return undefined;
    }
}
