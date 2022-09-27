// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogLevel } from "../types/LogLevel";
import { LogService } from "../LogService";
import { HttpService } from "../HttpService";
import { isWordpressPagesDTO, WordpressPageListDTO } from "./dto/WordpressPageListDTO";
import { isWordpressReferencesDTO, WordpressReferenceListDTO } from "./dto/WordpressReferenceListDTO";
import { isWordpressUserProfilesDTO, WordpressUserProfileListDTO } from "./dto/WordpressUserProfileListDTO";

const LOG = LogService.createLogger('WordpressClient');

export interface WordpressContentInterface {
    readonly pages?: Promise<WordpressPageListDTO>;
    readonly references?: Promise<WordpressReferenceListDTO>;
    readonly profiles?: Promise<WordpressUserProfileListDTO>;
}

/**
 * @see https://github.com/mailhog/MailHog/blob/master/docs/APIv1.md
 */
export class WordpressClient {

    public static setLogLevel(level: LogLevel) {
        LOG.setLogLevel(level);
        HttpService.setLogLevel(level);
    }

    private static _defaultUrl: string = '/';
    private static _endpoint: string = '/';

    private readonly _url: string;
    private readonly _endpoint: string;
    private readonly _sessionId: string | undefined;

    public static setDefaultUrl(url: string, endpoint: string) {
        this._defaultUrl = url + endpoint;
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
        endpoint: string = WordpressClient._endpoint
    ) {
        this._url = url;
        this._endpoint = endpoint;
        this._sessionId = undefined;
    }

    public getUrl(): string {
        return this._url;
    }

    // Used for possible initialization
    public async getWordpressContent(): Promise<WordpressPageListDTO>  {
        if (this._url.length < 1) return;
        const result = await HttpService.getJson(`${this._url}${this._endpoint}`);
        if(isWordpressPagesDTO(result)) {
            LOG.info(`getIndex: Pages = `, result);
            const pages = result;
            return pages;
        } else if (isWordpressUserProfilesDTO(result)) {
            LOG.info(`getIndex: Profiles = `, result);
            const profiles = result;
            return profiles;
        } else if (isWordpressReferencesDTO(result)) {
            LOG.info(`getIndex: Reference = `, result);
            const references = result;
            return references;
        } else {
            LOG.debug(`getIndex: result = `, result);
            throw new TypeError(`Result was not any of the DTO's: ` + result);
        }
    }


    public async getPages(): Promise<WordpressPageListDTO> {
        if (this._url.length < 1) return;
        const result = await HttpService.getJson(`${this._url}${this._endpoint}`);
        if (!isWordpressPagesDTO(result)) {
            LOG.debug(`getIndex: result = `, result);
            throw new TypeError(`Result was not WordpressPageDTO: ` + result);
        }
        return result;
    }


    public async getReferences(): Promise<WordpressReferenceListDTO> {
        if (this._url.length < 1) return;
        const result = await HttpService.getJson(`${this._url}${this._endpoint}`);
        if (!isWordpressReferencesDTO(result)) {
            LOG.debug(`getIndex: result = `, result);
            throw new TypeError(`Result was not WordpressReferencesDTO: ` + result);
        }
        return result;
    }

    public async getUserProfiles(): Promise<WordpressUserProfileListDTO> {
        if (this._url.length < 1) return;
        const result = await HttpService.getJson(`${this._url}${this._endpoint}`);
        if (!isWordpressUserProfilesDTO(result)) {
            LOG.debug(`getIndex: result = `, result);
            throw new TypeError(`Result was not WordpressUserProfilesDTO: ` + result);
        }
        return result;
    }

}
