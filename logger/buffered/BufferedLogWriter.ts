// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogWriter } from "../../types/LogWriter";
import { LogUtils } from "../../LogUtils";

export class BufferedLogWriter implements LogWriter {

    private readonly _writer : (value: string) => void;
    private readonly _chunkSize : number;
    private readonly _timeout : number;
    private readonly _prefix : string;
    private readonly _suffix : string;
    private readonly _lineBreak : string;
    private _data : string;
    private _timer : any | undefined;

    /**
     *
     * @param writer Function to use for writing
     * @param bufferSize The maximum length for single chunk (including line
     *                   break characters)
     * @param bufferTime The maximum time to wait for new data before flushing
     * @param prefix The prefix to use when rows are split (e.g. `...`)
     * @param suffix The suffix to use when rows are split (e.g. `...\n`)
     * @param lineBreak The line break character
     */
    public constructor (
        writer : (value: string) => void,
        bufferSize : number,
        bufferTime : number,
        prefix : string,
        suffix : string,
        lineBreak : string,
    ) {
        this._writer = writer;
        this._chunkSize = bufferSize;
        this._timeout = bufferTime;
        this._data = '';
        this._prefix = prefix;
        this._suffix = suffix;
        this._lineBreak = lineBreak;
        this._timer = undefined;
        const minimumChunkSize = prefix.length + lineBreak.length + suffix.length + 1;
        if ( bufferSize < minimumChunkSize ) throw new TypeError(`Chunk size must be greater than ${minimumChunkSize}`);
    }

    public write (input: string): void {
        this._data += input;

        if ( this._data.length >= this._chunkSize ) {
            this._drainLoop(false);
            return;
        }

        if (this._data) {
            if (this._timer !== undefined) {
                clearTimeout(this._timer);
            }
            this._timer = setTimeout(
                () => {
                    this._drainLoop(true);
                },
                this._timeout
            );
        }

    }

    public drain () : void {
        this._drainLoop(true);
    }

    private _drainLoop (
        forceFlush: boolean
    ) : void {
        while ( this._drain(forceFlush) ) {}
    }

    private _drain (
        forceFlush: boolean
    ) : boolean {

        let drainableString : string;
        if (forceFlush) {
            drainableString = this._data;
            this._data = '';
        } else {
            let lastBreak = this._data.lastIndexOf(this._lineBreak);
            drainableString = this._data.substring(0, lastBreak + 1);
            let restOfString = this._data.substring(lastBreak + 1);
            if ( !drainableString ) {
                if ( restOfString.length < this._chunkSize ) {
                    return false;
                } else {
                    drainableString = restOfString;
                    restOfString = '';
                }
            } else {
                if ( restOfString.length >= this._chunkSize ) {
                    drainableString += restOfString;
                    restOfString = '';
                }
            }
            this._data = restOfString;
        }

        let origRows : string[] = drainableString.split('\n');

        let rows : string[] = LogUtils.splitStringArray(
            origRows,
            this._chunkSize,
            this._prefix,
            this._suffix,
            this._lineBreak,
        );

        let chunks : string[] = LogUtils.mergeStringArray(
            rows,
            this._chunkSize,
            this._lineBreak
        );

        if (chunks.length) {
            chunks.forEach(
                (chunk: string, index: number) => {
                    if (index === chunks.length -1) {
                        this._writer( chunk );
                    } else {
                        this._writer( chunk + this._lineBreak );
                    }
                }
            );
            return true;
        } else {
            return false;
        }

    }

}
