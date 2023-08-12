// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    MAIL_HOG_API_GET_MESSAGES_PATH,
    MAIL_HOG_API_DELETE_MESSAGES_PATH
} from "./mailhog-api";
import { LogLevel } from "../types/LogLevel";
import { LogService } from "../LogService";
import { HttpService } from "../HttpService";
import { isMailHogMessagesDTO, MailHogMessageListDTO } from "./dto/MailHogMessageListDTO";

const LOG = LogService.createLogger('MailHogClient');

/**
 * @see https://github.com/mailhog/MailHog/blob/master/docs/APIv1.md
 */
export class MailHogClient {

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
        HttpService.setLogLevel(level);
    }

    private static _defaultUrl : string = '/';

    private readonly _url       : string;

    public static setDefaultUrl (url : string) {
        this._defaultUrl = url;
    }

    public static getDefaultUrl () : string {
        return this._defaultUrl;
    }

    public static create (
        url : string = MailHogClient._defaultUrl
    ) : MailHogClient {
        return new MailHogClient(url);
    }

    public constructor (
        url : string = MailHogClient._defaultUrl
    ) {
        this._url = url;
    }

    public getUrl () : string {
        return this._url;
    }

    public async getMessages () : Promise<MailHogMessageListDTO> {
        const result = await HttpService.getJson(`${this._url}${MAIL_HOG_API_GET_MESSAGES_PATH}`);
        if (!isMailHogMessagesDTO(result)) {
            LOG.debug(`getIndex: result = `, result);
            throw new TypeError(`Result was not MailHogMessagesDTO: ` + result);
        }
        return result;
    }

    public async deleteMessages () : Promise<void> {
        await HttpService.deleteText(`${this._url}${MAIL_HOG_API_DELETE_MESSAGES_PATH}`);
    }

}
