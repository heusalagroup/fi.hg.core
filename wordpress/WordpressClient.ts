// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogLevel } from "../types/LogLevel";
import { LogService } from "../LogService";
import { HttpService } from "../HttpService";
import { isWpPageListDTO, WpPageListDTO } from "./dto/WpPageListDTO";
import { isWpPostListDTO, WpPostListDTO } from "./dto/WpPostListDTO";
import { isWpReferenceListDTO, WpReferenceListDTO } from "./dto/WpReferenceListDTO";
import { isWpUserProfileListDTO, WpUserProfileListDTO } from "./dto/WpUserProfileListDTO";
import {
    WORD_PRESS_API_V2_PAGES,
    WORD_PRESS_API_V2_POSTS,
    WORD_PRESS_API_V3_REFERENCES,
    WORD_PRESS_API_V3_USERPROFILES
} from "./wordpress-api";


const LOG = LogService.createLogger('WordpressClient');


export class WordpressClient {

    public static setLogLevel(level: LogLevel) {
        LOG.setLogLevel(level);
        HttpService.setLogLevel(level);
    }


    private static _defaultUrl: string = '/';

    private readonly _url: string;


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
    }

    public async getPages(): Promise<WpPageListDTO> {
        if (this._url.length < 1) return [];
        const result = await HttpService.getJson(`${this._url}${WORD_PRESS_API_V2_PAGES}`);
        if (!isWpPageListDTO(result)) {
            LOG.debug(`getPages: result = `, result);
            throw new TypeError(`Result was not WordpressPageListDTO: ` + result);
        }
        return result;
    }

    public async getPosts(): Promise<WpPostListDTO> {
        if (this._url.length < 1) return [];
        const result = await HttpService.getJson(`${this._url}${WORD_PRESS_API_V2_POSTS}`);
        if (!isWpPostListDTO(result)) {
            LOG.debug(`getPosts: result = `, result);
            throw new TypeError(`Result was not WordpressPostListDTO: ` + result);
        }
        return result;
    }

    public async getReferences(): Promise<WpReferenceListDTO> {
        if (this._url.length < 1) return [];
        const result = await HttpService.getJson(`${this._url}${WORD_PRESS_API_V3_REFERENCES}`);
        if (!isWpReferenceListDTO(result)) {
            LOG.debug(`getIndex: result = `, result);
            throw new TypeError(`Result was not WordpressReferencesDTO: ` + result);
        }
        return result;
    }

    public async getUserProfiles(): Promise<WpUserProfileListDTO> {
        if (this._url.length < 1) return [];
        const result = await HttpService.getJson(`${this._url}${WORD_PRESS_API_V3_USERPROFILES}`);
        if (!isWpUserProfileListDTO(result)) {
            LOG.debug(`getIndex: result = `, result);
            throw new TypeError(`Result was not WordpressUserProfilesDTO: ` + result);
        }
        return result;
    }

}
