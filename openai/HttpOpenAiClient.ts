// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

/**
 * @module
 * @overview
 *
 * A zero dep TypeScript client library for interacting with the OpenAI API.
 *
 * This client provides methods for calling the OpenAI API's endpoints for text completion,
 * language generation, and other tasks.
 *
 * To create an `OpenAiClient`, use the `create` method.
 *
 * The `OpenAiClient`'s methods return Promises that resolve to the JSON response
 * returned by the OpenAI API. If the OpenAI API returns an error, the Promise will be rejected
 * with an instance of an `HttpError` that includes the error message and HTTP status code.
 *
 * ```typescript
 * const openai = OpenAiClient.create();
 *
 * openai.getCompletion(...)
 *   .then((response) => {
 *     console.log(response);
 *   })
 *   .catch((error) => {
 *     console.error(error);
 *   });
 * ```
 *
 * @see https://beta.openai.com/docs/quickstart
 */

import { LogLevel } from "../types/LogLevel";
import { LogService } from "../LogService";
import { HttpService } from "../HttpService";
import { createOpenAiCompletionRequestDTO } from "./dto/OpenAiCompletionRequestDTO";
import { explainOpenAiCompletionResponseDTO, isOpenAiCompletionResponseDTO, OpenAiCompletionResponseDTO } from "./dto/OpenAiCompletionResponseDTO";
import { AuthorizationUtils } from "../AuthorizationUtils";
import { ReadonlyJsonAny } from "../Json";
import { OpenAiApiModel } from "./types/OpenAiApiModel";
import { OpenAiModelUtils } from "./OpenAiModelUtils";
import { OpenAiClient } from "./OpenAiClient";

const LOG = LogService.createLogger('HttpOpenAiClient');

/**
 * The base URL of the OpenAI API (`https://api.openai.com`).
 * @constant
 * @type {string}
 * @default
 */
export const OPENAPI_API_URL = 'https://api.openai.com';

/**
 * @constant {string}
 * @default '/v1/completions'
 *
 * The path for the OpenAI API's `GET /v1/completions` endpoint.
 */
export const OPENAI_API_POST_COMPLETIONS_PATH = '/v1/completions';

/**
 * A client for interacting with the OpenAI API.
 *
 * @see https://beta.openai.com/docs/quickstart
 *
 * @remarks
 * This client provides methods for calling the OpenAI API's endpoints for text completion,
 * language generation, and other tasks.
 *
 * To create an `OpenAiClient`, use the `create` method.
 *
 * The `OpenAiClient`'s methods return Promises that resolve to the JSON response
 * returned by the OpenAI API. If the OpenAI API returns an error, the Promise will be rejected
 * with an instance of an `HttpError` that includes the error message and HTTP status code.
 *
 * ```typescript
 * const openai = OpenAiClient.create();
 *
 * openai.getCompletion(...)
 *   .then((response) => {
 *     console.log(response);
 *   })
 *   .catch((error) => {
 *     console.error(error);
 *   });
 * ```
 *
 * @TODO Add support for organizations https://beta.openai.com/docs/api-reference/requesting-organization
 */
export class HttpOpenAiClient implements OpenAiClient {

    /**
     * Sets the log level for the OpenAI client and the underlying HTTP service.
     *
     * @param {LogLevel} level - The log level to set.
     */
    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
        HttpService.setLogLevel(level);
    }

    /**
     * The default URL to use for the OpenAI API if none is provided when creating a new `OpenAiClient` instance.
     */
    public static _defaultUrl : string = OPENAPI_API_URL;

    /**
     * The URL of the OpenAI API that the client is configured to use.
     */
    private readonly _url       : string;

    /**
     * The API key to use when making requests to the OpenAI API.
     */
    private readonly _apiKey : string;

    /**
     * Sets the default URL to use for the OpenAI API when creating new `OpenAiClient` instances.
     *
     * @param {string} url - The URL to set as the default.
     */
    public static setDefaultUrl (url : string) {
        this._defaultUrl = url;
    }

    /**
     * Gets the default URL to use for the OpenAI API when creating new `OpenAiClient` instances.
     *
     * @returns {string} The default URL.
     */
    public static getDefaultUrl () : string {
        return this._defaultUrl;
    }

    /**
     * Factory method for creating an instance of OpenAiClient.
     *
     * @param {string} apiKey - The API key to use when making requests to the OpenAI API.
     * @param {string} [url=OpenAiClient._defaultUrl] - The base URL for the OpenAI API.
     * @returns {HttpOpenAiClient} - A new instance of OpenAiClient.
     */
    public static create (
        apiKey : string,
        url    : string = HttpOpenAiClient._defaultUrl
    ) : HttpOpenAiClient {
        return new HttpOpenAiClient(apiKey, url);
    }

    /**
     * Creates a new instance of OpenAiClient.
     *
     * @param {string} apiKey - The API key to use when making requests to the OpenAI API.
     * @param {string} [url=OpenAiClient._defaultUrl] - The base URL for the OpenAI API.
     */
    public constructor (
        apiKey : string,
        url    : string = HttpOpenAiClient._defaultUrl
    ) {
        this._url = url;
        this._apiKey = apiKey;
    }

    /**
     * Returns the URL of the OpenAI API that the client is configured to use.
     *
     * @returns {string} The URL.
     */
    public getUrl () : string {
        return this._url;
    }

    /**
     * Calls the OpenAI APIs text completion endpoint to generate text based on
     * the given prompt.
     *
     * Default values for the optional parameters are selected based on the model.
     *
     * @param {string} prompt - The prompt to use for text completion.
     * @param {OpenAiApiModel} [model=OpenAiApiModel.DAVINCI] - The OpenAI API
     *                                         model to use for text completion.
     * @param {number} [max_tokens] - The maximum number of tokens (words and
     *                                punctuation) to generate in the completion.
     * @param {number} [temperature] - Controls the "creativity" of the
     *                                 completion. A higher value means the model
     *                                 will take more risks.
     * @param {number} [top_p] - Controls the "confidence" of the completion.
     *                           A lower value means the model will be more
     *                           confident in its words.
     * @param {number} [frequency_penalty] - Controls the "diversity" of the
     *                                       completion. A higher value means
     *                                       the model will avoid repetition of
     *                                       words.
     * @param {number} [presence_penalty] - Controls the "relevance" of the
     *                                      completion. A higher value means the
     *                                      model will try to match the prompt
     *                                      more closely.
     * @returns {Promise<OpenAiCompletionResponseDTO>} - A promise that resolves
     *                                      to the response from the OpenAI API.
     * @throws {HttpError} - If the OpenAI API returns an error.
     * @throws {TypeError} - If the OpenAI API returns a response in an
     *                       unexpected format.
     */
    public async getCompletion (
        prompt             : string,
        model              : OpenAiApiModel = OpenAiApiModel.DAVINCI,
        max_tokens        ?: number,
        temperature       ?: number,
        top_p             ?: number,
        frequency_penalty ?: number,
        presence_penalty  ?: number
    ) : Promise<OpenAiCompletionResponseDTO> {
        const parsedMaxTokens        = max_tokens        ?? OpenAiModelUtils.getDefaultMaxTokensForModel(model);
        const parsedTemperature      = temperature       ?? OpenAiModelUtils.getDefaultTemperatureForModel(model);
        const parsedTopP             = top_p             ?? OpenAiModelUtils.getDefaultTopPForModel(model);
        const parsedFrequencyPenalty = frequency_penalty ?? OpenAiModelUtils.getDefaultFrequencyPenaltyForModel(model);
        const parsedPresencePenalty  = presence_penalty  ?? OpenAiModelUtils.getDefaultPresencePenaltyForModel(model);
        const body = createOpenAiCompletionRequestDTO(
            prompt,
            model,
            parsedMaxTokens,
            parsedTemperature,
            parsedTopP,
            parsedFrequencyPenalty,
            parsedPresencePenalty,
        );
        const headers = {
            ["Authorization"]: AuthorizationUtils.createBearerHeader(this._apiKey)
        };
        const result = await HttpService.postJson(
            `${this._url}${OPENAI_API_POST_COMPLETIONS_PATH}`,
            body as unknown as ReadonlyJsonAny,
            headers
        );
        if (!isOpenAiCompletionResponseDTO(result)) {
            LOG.debug(`getCompletion: result = `, result);
            throw new TypeError(`Result was not OpenAiCompletionResponseDTO: ` + explainOpenAiCompletionResponseDTO(result));
        }
        return result;
    }

}
