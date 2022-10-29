// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogLevel } from "../types/LogLevel";
import { LogService } from "../LogService";
import { HttpService } from "../HttpService";
import { isWordpressPagesDTO, WordpressPageListDTO } from "./dto/WordpressPageListDTO";
import { isWordpressReferencesDTO, WordpressReferenceListDTO } from "./dto/WordpressReferenceListDTO";
import { isWordpressUserProfilesDTO, WordpressUserProfileListDTO } from "./dto/WordpressUserProfileListDTO";
import { WORD_PRESS_API_V2_PAGES, WORD_PRESS_API_V3_REFERENCES, WORD_PRESS_API_V3_USERPROFILES } from "./wordpress-api";

const LOG = LogService.createLogger('WordpressClient');

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
        url: string = WordpressClient._defaultUrl,
    ) {
        this._url = url;
        this._sessionId = undefined;
    }

    public async getPages(): Promise<WordpressPageListDTO> {
        if (this._url.length < 1) return;
        const result = await HttpService.getJson(`${this._url}${WORD_PRESS_API_V2_PAGES}`);
        if (!isWordpressPagesDTO(result)) {
            LOG.debug(`getIndex: result = `, result);
            throw new TypeError(`Result was not WordpressPageDTO: ` + result);
        }
        return result;
    }

    public async getReferences(): Promise<WordpressReferenceListDTO> {
        if (this._url.length < 1) return;
        const result = await HttpService.getJson(`${this._url}${WORD_PRESS_API_V3_REFERENCES}`);
        if (!isWordpressReferencesDTO(result)) {
            LOG.debug(`getIndex: result = `, result);
            throw new TypeError(`Result was not WordpressReferencesDTO: ` + result);
        }
        return result;
    }

    public async getUserProfiles(): Promise<WordpressUserProfileListDTO> {
        if (this._url.length < 1) return;
        const result = await HttpService.getJson(`${this._url}${WORD_PRESS_API_V3_USERPROFILES}`);
        if (!isWordpressUserProfilesDTO(result)) {
            LOG.debug(`getIndex: result = `, result);
            throw new TypeError(`Result was not WordpressUserProfilesDTO: ` + result);
        }
        return result;
    }

}
