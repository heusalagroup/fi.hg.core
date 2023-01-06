// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogLevel } from "../types/LogLevel";
import { LogService } from "../LogService";
import { HttpService } from "../HttpService";
import { OpenAiCompletionRequestDTO } from "./dto/OpenAiCompletionRequestDTO";
import { isReadonlyJsonAny, ReadonlyJsonAny } from "../Json";
import { explainOpenAiCompletionResponseDTO, isOpenAiCompletionResponseDTO, OpenAiCompletionResponseDTO } from "./dto/OpenAiCompletionResponseDTO";

const LOG = LogService.createLogger('OpenAIClient');

const OPENAPI_API_URL = 'https://api.openai.com';

/**
 * @constant {string}
 * @default '/v1/completions'
 *
 * The path for the OpenAI API's `GET /v1/completions` endpoint.
 */
const OPENAI_API_POST_COMPLETIONS_PATH = '/v1/completions';

/**
 * @see https://beta.openai.com/
 */
export class OpenAIClient {

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
        HttpService.setLogLevel(level);
    }

    private static _defaultUrl : string = OPENAPI_API_URL;

    private readonly _url       : string;
    private readonly _apiKey : string | undefined;

    public static setDefaultUrl (url : string) {
        this._defaultUrl = url;
    }

    public static getDefaultUrl () : string {
        return this._defaultUrl;
    }

    public static create (
        url : string = OpenAIClient._defaultUrl
    ) : OpenAIClient {
        return new OpenAIClient(url);
    }

    public constructor (
        apiKey : string,
        url    : string = OpenAIClient._defaultUrl
    ) {
        this._url = url;
        this._apiKey = apiKey;
    }

    public getUrl () : string {
        return this._url;
    }

    public async getCompletion (
        body: OpenAiCompletionRequestDTO
    ) : Promise<OpenAiCompletionResponseDTO> {
        const result = await HttpService.getJson(`${this._url}${OPENAI_API_POST_COMPLETIONS_PATH}`);
        if (!isOpenAiCompletionResponseDTO(result)) {
            LOG.debug(`getIndex: result = `, result);
            throw new TypeError(`Result was not OpenAiCompletionResponseDTO: ` + explainOpenAiCompletionResponseDTO(result));
        }
        return result;
    }

}
