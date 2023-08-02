// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { AuthorizationUtils } from "../AuthorizationUtils";
import { JsonAny, parseJson } from "../Json";
import { LogService } from "../LogService";
import { QueryParams, QueryParamUtils } from "../QueryParamUtils";
import { RequestClient } from "../RequestClient";
import { RequestClientImpl } from "../RequestClientImpl";
import { LogLevel } from "../types/LogLevel";
import { isString } from "../types/String";
import { createTwilioCreateMessageDTO } from "./dto/TwilioCreateMessageDTO";
import { explainTwilioMessageDTO, isTwilioMessageDTO, TwilioMessageDTO } from "./dto/TwilioMessageDTO";
import { TwilioCreateMessageContent } from "./dto/types/TwilioCreateMessageContent";
import { TwilioCreateMessageRecipient } from "./dto/types/TwilioCreateMessageRecipient";
import { TwilioCreateMessageSender } from "./dto/types/TwilioCreateMessageSender";
import { TWILIO_CREATE_MESSAGE_PATH } from "./twilio-constants";
import { TwilioMessageClient } from "./TwilioMessageClient";

const LOG = LogService.createLogger( 'TwilioMessageClientImpl' );

/**
 * Minimal Twilio SMS message API client
 */
export class TwilioMessageClientImpl implements TwilioMessageClient {

    private readonly _client      : RequestClient;
    private readonly _accountSid  : string;
    private readonly _sender     ?: string | TwilioCreateMessageSender | undefined;

    /**
     * @fixme Not ideal to save secrets like this, however not sure what would
     *        be better way to do it right now. Maybe hide the full HTTP request
     *        behind another API that has the secret referenced from outside.
     * @todo We could use Twilio API and maybe a microservice to
     *       create new token for each session. Then, deleting a session API
     *       key would make it possible to log out of the session securely.
     * @private
     */
    private readonly _token: string;

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    private constructor (
        client      : RequestClient,
        accountSid  : string,
        token       : string,
        sender     ?: string | TwilioCreateMessageSender | undefined,
    ) {
        this._client = client;
        this._accountSid = accountSid;
        this._token = token;
        this._sender = sender;
    }

    /**
     * @param client
     * @param accountSid
     * @param authToken
     * @param sender
     */
    public static create (
        accountSid  : string,
        authToken   : string,
        sender     ?: string | TwilioCreateMessageSender | undefined,
        client     ?: RequestClient,
    ) : TwilioMessageClientImpl {
        return new TwilioMessageClientImpl(
            client ?? RequestClientImpl,
            accountSid,
            AuthorizationUtils.createBasicHeaderTokenWithUserAndPassword(accountSid, authToken),
            sender,
        );
    }

    /**
     * @inheritDoc
     */
    public async sendSms (
        content    : string | TwilioCreateMessageContent,
        recipient  : string | TwilioCreateMessageRecipient,
        sender    ?: string | TwilioCreateMessageSender | undefined,
    ): Promise<TwilioMessageDTO> {
        const verifiedSender = sender ?? this._sender;
        if (!verifiedSender) throw new TypeError('There was no sender configured.');
        const body = createTwilioCreateMessageDTO(
            isString(recipient) ? { To: recipient } : recipient,
            isString(verifiedSender) ? {From: verifiedSender} : verifiedSender,
            isString(content) ? { Body: content } : content,
        );
        const bodyString : string = QueryParamUtils.stringifyQueryParamsOnly(body as unknown as QueryParams);
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': AuthorizationUtils.createBasicHeader(this._token),
        };
        const resultString : string | undefined = await this._client.postText(
            TWILIO_CREATE_MESSAGE_PATH(this._accountSid),
            bodyString,
            headers
        );
        const dto : JsonAny | undefined = parseJson(resultString!);
        if (!isTwilioMessageDTO(dto)) {
            LOG.debug(`sendSms: Response = `, dto);
            throw new TypeError(`sendSms: Response was not TwilioMessageDTO: ${explainTwilioMessageDTO(dto)}`);
        }
        return dto;
    }

}
