// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Logger } from "../../types/Logger";
import { LogLevel } from "../../types/LogLevel";
import { HttpService } from "../../HttpService";
import { createDefaultHttpRetryPolicy, HttpRetryPolicy } from "../../request/types/HttpRetryPolicy";
import { isNumber } from "../../types/Number";
import { BufferedLogger } from "../buffered/BufferedLogger";

/**
 * Maximum message size to send to Discord.
 *
 * @See Discord Webhook guide at https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html
 */
const MAX_DISCORD_MESSAGE_LENGTH = 2000;

/**
 * A logger implementation that writes log messages to Discord using webhooks.
 *
 * @see https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html
 * @see {@link CompositeLogger}
 */
export class DiscordLogger implements Logger {

    /**
     * Name which will be appended to the log message.
     *
     * It can be for example the service from where these messages are coming.
     *
     * @private
     */
    private readonly _name : string;

    /**
     * The webhook URL where to post values.
     */
    private readonly _url : string;

    /**
     *
     * @private
     */
    private readonly _retryPolicy : HttpRetryPolicy;

    private readonly _bufferedLogger : Logger;

    /**
     * Constructs a new DiscordLogger instance.
     */
    public constructor (
        name                : string,
        url                 : string,
        level              ?: LogLevel | undefined,
        retryPolicy        ?: HttpRetryPolicy | undefined,
        maxMessageLength   ?: number | undefined,
        bufferDrainTimeout ?: number | undefined,
        prefix             ?: string,
        suffix             ?: string,
        lineBreak          ?: string
    ) {
        this._name = name;
        this._url = url;
        this._retryPolicy = retryPolicy ?? createDefaultHttpRetryPolicy();
        maxMessageLength = maxMessageLength !== undefined && isNumber(maxMessageLength) && maxMessageLength < MAX_DISCORD_MESSAGE_LENGTH ? maxMessageLength : MAX_DISCORD_MESSAGE_LENGTH;

        this._bufferedLogger = new BufferedLogger(
            (value: string) => {
                this._sendMessageAsStringSync(value);
            },
            maxMessageLength ?? 2000,
            bufferDrainTimeout ?? 1000,
            prefix ?? '...',
            suffix ?? '...\n',
            lineBreak ?? '\n',
            level ?? LogLevel.DEBUG
        );

    }

    /**
     * @inheritDoc
     */
    public getLogLevel () : LogLevel {
        return this._bufferedLogger.getLogLevel();
    }

    /**
     * @inheritDoc
     */
    public setLogLevel (level : LogLevel | undefined) : this {
        this._bufferedLogger.setLogLevel(level);
        return this;
    }

    /**
     * @inheritDoc
     */
    public debug (...args: readonly any[]) {
        this._bufferedLogger.debug(...args);
    }

    /**
     * @inheritDoc
     */
    public info (...args: readonly any[]) {
        this._bufferedLogger.info(...args);
    }

    /**
     * @inheritDoc
     */
    public warn (...args: readonly any[]) {
        this._bufferedLogger.warn(...args);
    }

    /**
     * @inheritDoc
     */
    public error (...args: readonly any[]) {
        this._bufferedLogger.error(...args);
    }

    private _sendMessageAsStringSync (
        content : string
    ) : void {
        this._sendMessageAsString(`[${this._name}] ${content}`).catch(
            (err: any) => {
                console.warn(`Warning! Error "${err}" while sending the log message: "${content}"`);
                console.warn(`Error object: `, err);
            }
        );
    }

    private async _sendMessageAsString (
        content : string
    ) : Promise<void> {
        const body = {
            content,
            options: {}
        };
        await HttpService.postJson(
            this._url,
            body,
            undefined,
            this._retryPolicy
        );
    }

}
