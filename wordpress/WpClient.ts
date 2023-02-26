// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogLevel } from "../types/LogLevel";
import { LogService } from "../LogService";
import { HttpService } from "../HttpService";
import { explainWpPageListDTO, isWpPageListDTO, WpPageListDTO } from "./dto/WpPageListDTO";
import { explainWpPostListDTO, isWpPostListDTO, WpPostListDTO } from "./dto/WpPostListDTO";
import { explainWpReferenceListDTO, isWpReferenceListDTO, WpReferenceListDTO } from "./dto/WpReferenceListDTO";
import { explainWpUserProfileListDTO, isWpUserProfileListDTO, WpUserProfileListDTO } from "./dto/WpUserProfileListDTO";
import {
    WORD_PRESS_API_V2_PAGES,
    WORD_PRESS_API_V2_POSTS,
    WORD_PRESS_API_V3_REFERENCES,
    WORD_PRESS_API_V3_USERPROFILES
} from "./wordpress-api";

const LOG = LogService.createLogger('WpClient');

export class WpClient {

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
        url: string = WpClient._defaultUrl
    ): WpClient {
        return new WpClient(url);
    }

    public constructor(
        url: string = WpClient._defaultUrl,
    ) {
        this._url = url;
    }

    /**
     * Fetches 100 pages from /wp-json/wp/v2/pages?per_page=100
     */
    public async getPages (): Promise<WpPageListDTO> {
        if (this._url.length < 1) return [];
        const result = await HttpService.getJson(`${this._url}${WORD_PRESS_API_V2_PAGES}`);
        if (!isWpPageListDTO(result)) {
            LOG.debug(`getPages: result = `, result);
            throw new TypeError(`Result was not WpPageListDTO: ${explainWpPageListDTO(result)}`);
        }
        return result;
    }

    /**
     * Fetches 100 posts from /wp-json/wp/v2/posts?per_page=100
     */
    public async getPosts (): Promise<WpPostListDTO> {
        if (this._url.length < 1) return [];
        const result = await HttpService.getJson(`${this._url}${WORD_PRESS_API_V2_POSTS}`);
        if (!isWpPostListDTO(result)) {
            LOG.debug(`getPosts: result = `, result);
            throw new TypeError(`Result was not WpPostListDTO: ${explainWpPostListDTO(result)}`);
        }
        return result;
    }

    /**
     * Fetches references from /wp-json/wp/v3/references
     */
    public async getReferences (): Promise<WpReferenceListDTO> {
        if (this._url.length < 1) return [];
        const result = await HttpService.getJson(`${this._url}${WORD_PRESS_API_V3_REFERENCES}`);
        if (!isWpReferenceListDTO(result)) {
            LOG.debug(`getReferences: result = `, result);
            throw new TypeError(`Result was not WpReferenceListDTO: ${explainWpReferenceListDTO(result)}`);
        }
        return result;
    }

    /**
     * Fetches user profiles from /wp-json/wp/v3/userprofiles
     */
    public async getUserProfiles (): Promise<WpUserProfileListDTO> {
        if (this._url.length < 1) return [];
        const result = await HttpService.getJson(`${this._url}${WORD_PRESS_API_V3_USERPROFILES}`);
        if (!isWpUserProfileListDTO(result)) {
            LOG.debug(`getUserProfiles: result = `, result);
            throw new TypeError(`Result was not WpUserProfileListDTO: ${explainWpUserProfileListDTO(result)}`);
        }
        return result;
    }

}
