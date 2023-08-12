// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Logger } from "../../types/Logger";
import { LogLevel, stringifyLogLevel } from "../../types/LogLevel";
import { LogUtils } from "../../LogUtils";
import { BufferedLogWriter } from "./BufferedLogWriter";
import { LogWriter } from "../../types/LogWriter";

/**
 * Buffered logger will stringify and write log messages using a writer function
 * with a configured chunk size. It will split long rows to shorter ones.
 */
export class BufferedLogger implements Logger {

    private readonly _writer : (value: string) => void;
    // private readonly _bufferSize : number;
    // private readonly _bufferTime : number;
    private readonly _bufferedWriter : LogWriter;
    private _logLevel : LogLevel;
    // private _bufferData : string;

    /**
     * Constructs `BufferedLogger` instance which writes chunks of
     * max length of `bufferSize` using the `writer` function.
     *
     * @param writer Function to use for writing
     * @param bufferSize The maximum length for single chunk (including line
     *                   break characters)
     * @param bufferTime The maximum time to wait for new data before flushing
     * @param prefix The prefix to use when rows are split (e.g. `...`)
     * @param suffix The suffix to use when rows are split (e.g. `...\n`)
     * @param lineBreak The line break character
     * @param logLevel Initial log level
     */
    public constructor (
        writer: (value: string) => void,
        bufferSize: number,
        bufferTime: number,
        prefix : string,
        suffix : string,
        lineBreak : string,
        logLevel ?: LogLevel
    ) {
        this._writer = writer;
        // this._bufferSize = bufferSize;
        // this._bufferTime = bufferTime;
        // this._bufferData = '';
        this._logLevel = logLevel ?? LogLevel.DEBUG;
        this._bufferedWriter = new BufferedLogWriter(
            this._writer,
            bufferSize,
            bufferTime,
            prefix,
            suffix,
            lineBreak
        );
    }

    /**
     * @inheritDoc
     */
    public getLogLevel (): LogLevel {
        return this._logLevel;
    }

    /**
     * @inheritDoc
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
            this._write(LogLevel.DEBUG, args);
        }
    }

    /**
     * @inheritDoc
     */
    public info (...args: readonly any[]): void {
        if (this._logLevel <= LogLevel.INFO) {
            this._write(LogLevel.INFO, args);
        }
    }

    /**
     * @inheritDoc
     */
    public warn (...args: readonly any[]): void {
        if (this._logLevel <= LogLevel.WARN) {
            this._write(LogLevel.WARN, args);
        }
    }

    /**
     * @inheritDoc
     */
    public error (...args: readonly any[]): void {
        if (this._logLevel <= LogLevel.ERROR) {
            this._write(LogLevel.ERROR, args);
        }
    }

    private _write (
        logLevel: LogLevel,
        args: readonly any[]
    ) : void {
        const incomingData : string = `[${stringifyLogLevel(logLevel)}] ${LogUtils.stringifyArray(args)}\n`;
        this._bufferedWriter.write(incomingData);
    }

}
