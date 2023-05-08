// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Logger } from "../../types/Logger";
import { LogLevel, stringifyLogLevel } from "../../types/LogLevel";
import { HttpService } from "../../HttpService";
import { map } from "../../functions/map";
import { createDefaultHttpRetryPolicy, HttpRetryPolicy } from "../../request/types/HttpRetryPolicy";
import { isString } from "../../types/String";
import { isNumber } from "../../types/Number";

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
     * The log level for this logger. If undefined, the parent logger's log
     * level will be used.
     */
    private _level : LogLevel;

    /**
     *
     * @private
     */
    private readonly _retryPolicy : HttpRetryPolicy;

    private readonly _maxMessageLength : number;

    /**
     * Constructs a new DiscordLogger instance.
     */
    public constructor (
        name              : string,
        url               : string,
        level            ?: LogLevel | undefined,
        retryPolicy      ?: HttpRetryPolicy | undefined,
        maxMessageLength ?: number | undefined
    ) {
        this._name = name;
        this._url = url;
        this._level = level ?? LogLevel.DEBUG;
        this._retryPolicy = retryPolicy ?? createDefaultHttpRetryPolicy();
        this._maxMessageLength = maxMessageLength !== undefined && isNumber(maxMessageLength) && maxMessageLength < MAX_DISCORD_MESSAGE_LENGTH ? maxMessageLength : MAX_DISCORD_MESSAGE_LENGTH;
    }

    /**
     * @inheritDoc
     */
    public getLogLevel () : LogLevel {
        return this._level ?? LogLevel.DEBUG;
    }

    /**
     * @inheritDoc
     */
    public setLogLevel (level : LogLevel | undefined) : this {
        this._level = level ?? LogLevel.DEBUG;
        return this;
    }

    /**
     * @inheritDoc
     */
    public debug (...args: readonly any[]) {
        if (this.getLogLevel() <= LogLevel.DEBUG) {
            this._sendMessageSync(LogLevel.DEBUG, args);
        }
    }

    /**
     * @inheritDoc
     */
    public info (...args: readonly any[]) {
        if (this.getLogLevel() <= LogLevel.INFO) {
            this._sendMessageSync(LogLevel.INFO, args);
        }
    }

    /**
     * @inheritDoc
     */
    public warn (...args: readonly any[]) {
        if (this.getLogLevel() <= LogLevel.WARN) {
            this._sendMessageSync(LogLevel.WARN, args);
        }
    }

    /**
     * @inheritDoc
     */
    public error (...args: readonly any[]) {
        if (this.getLogLevel() <= LogLevel.ERROR) {
            this._sendMessageSync(LogLevel.ERROR, args);
        }
    }

    private _sendMessageSync (
        level : LogLevel,
        args  : readonly any[]
    ) : void {
        this._sendMessage(level, args).catch(
            (err: any) => {
                console.warn(`Warning! Error "${err}" while sending the log message: [${level}] `, ...args);
                console.warn(`Error object: `, err);
            }
        );
    }

    private async _sendMessage (
        level : LogLevel,
        args  : readonly any[]
    ) : Promise<void> {
        let content = `[${this._name}] [${stringifyLogLevel(level)}] ${map(args, (value: any) : string => stringifyLogValue(value)).join(' ')}`;
        if ( content?.length >= this._maxMessageLength ) {
            if (this._maxMessageLength >= 4) {
                content = content.substring(0, this._maxMessageLength - 3) + '...';
            } else {
                content = content.substring(0, this._maxMessageLength);
            }
        }
        const body = {
            content,
            "options": {}
        };
        await HttpService.postJson(
            this._url,
            body,
            undefined,
            this._retryPolicy
        );
    }

}

function stringifyLogValue (value : any) : string {
    try {
        if (isString(value)) return value;
        if (value === undefined) return 'undefined';
        return JSON.stringify(value);
    } catch (err) {
        return `${value}`;
    }
}
