// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    WORD_PRESS_API_GET_PAGE_PATH,
    WORD_PRESS_API_GET_POST_PATH, WORD_PRESS_API_GET_REFERENCES_PATH, WORD_PRESS_API_GET_USER_PROFILES_PATH
} from "./wordpress-api";
import { LogLevel } from "../types/LogLevel";
import { LogService } from "../LogService";
import { HttpService } from "../HttpService";
import { isWordpressPagesDTO, WordpressPageListDTO } from "./dto/WordpressPageListDTO";
import { isWordpressReferenceDTO, WordpressReferenceDTO } from "./dto/WordpressReferenceDTO";
import { isWordpressPageDTO, WordpressPageDTO } from "./dto/WordpressPageDTO";
import { isWordpressReferencesDTO, WordpressReferenceListDTO } from "./dto/WordpressReferenceListDTO";
import { isWordpressUserProfilesDTO, WordpressUserProfileListDTO } from "./dto/WordpressUserProfileListDTO";


const LOG = LogService.createLogger('WordpressClient');

/**
 * @see https://github.com/mailhog/MailHog/blob/master/docs/APIv1.md
 */
export class WordpressClient {

    public static setLogLevel(level: LogLevel) {
        LOG.setLogLevel(level);
        HttpService.setLogLevel(level);
    }

    private static _defaultUrl: string = '/';

    private readonly _url: string;
    private readonly _sessionId: string | undefined;

    public static setDefaultUrl(url: string) {
        this._defaultUrl = url;
    }

    public static getDefaultUrl(): string {
        return this._defaultUrl;
    }

    public static create(
        url: string = WordpressClient._defaultUrl
    ): WordpressClient {
        return new WordpressClient(url);
    }

    public constructor(
        url: string = WordpressClient._defaultUrl) {
        this._url = url;
        this._sessionId = undefined;
    }

    public getUrl(): string {
        return this._url;
    }


    public async getPages(): Promise<WordpressPageListDTO> {
        if (this._url.length < 1) return;
        const result = await HttpService.getJson(`${this._url}${WORD_PRESS_API_GET_PAGE_PATH}`);
        if (!isWordpressPagesDTO(result)) {
            LOG.debug(`getIndex: result = `, result);
            throw new TypeError(`Result was not WordpressPageDTO: ` + result);
        }
        return result;
    }

    public async getPage(id:string): Promise<WordpressPageDTO> {
        if (this._url.length < 1) return;
        const result = await HttpService.getJson(`${this._url}${WORD_PRESS_API_GET_PAGE_PATH}/${id}`);
        if (!isWordpressPageDTO(result)) {
            LOG.debug(`getIndex: result = `, result);
            throw new TypeError(`Result was not WordpressPageDTO: ` + result);
        }
        return result;
    }

    public async getReferences(): Promise<WordpressReferenceListDTO> {
        if (this._url.length < 1) return;
        const result = await HttpService.getJson(`${this._url}${WORD_PRESS_API_GET_REFERENCES_PATH}`);
        if (!isWordpressReferencesDTO(result)) {
            LOG.debug(`getIndex: result = `, result);
            throw new TypeError(`Result was not WordpressReferencesDTO: ` + result);
        }
        return result;
    }

    public async getUserProfiles(): Promise<WordpressUserProfileListDTO> {
        if (this._url.length < 1) return;
        const result = await HttpService.getJson(`${this._url}${WORD_PRESS_API_GET_USER_PROFILES_PATH}`);
        if (!isWordpressUserProfilesDTO(result)) {
            LOG.debug(`getIndex: result = `, result);
            throw new TypeError(`Result was not WordpressUserProfilesDTO: ` + result);
        }
        return result;
    }

    public async getReference(id:string): Promise<WordpressReferenceDTO> {
        if (this._url.length < 1) return;
        const result = await HttpService.getJson(`${this._url}${WORD_PRESS_API_GET_REFERENCES_PATH}/${id}`);
        if (!isWordpressReferenceDTO(result)) {
            LOG.debug(`getIndex: result = `, result);
            throw new TypeError(`Result was not WordpressReferencesDTO: ` + result);
        }
        return result;
    }



}
