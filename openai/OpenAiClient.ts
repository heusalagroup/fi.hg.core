// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpenAiModel } from "./types/OpenAiModel";
import { OpenAiCompletionResponseDTO } from "./dto/OpenAiCompletionResponseDTO";
import { OpenAiEditResponseDTO } from "./dto/OpenAiEditResponseDTO";
import {OpenAiChatCompletionRequestDTO} from "./dto/chatDTO/OpenAiChatCompletionRequestDTO";
import {OpenAiChatCompletionMessage} from "./dto/chatDTO/OpenAiChatCompletionMessage";

/**
 * A client for interacting with the OpenAI API.
 *
 * @see https://beta.openai.com/docs/quickstart
 *
 * @remarks
 * This client provides methods for calling the OpenAI API's endpoints for text completion,
 * language generation, and other tasks.
 *
 * To create an `OpenAiClient`, use the `HttpOpenAiClient.create` method.
 *
 * The `OpenAiClient`'s methods return Promises that resolve to the JSON response
 * returned by the OpenAI API. If the OpenAI API returns an error, the Promise will be rejected
 * with an instance of an `HttpError` that includes the error message and HTTP status code.
 *
 * ```typescript
 * openai.getCompletion(...)
 *   .then((response) => {
 *     console.log(response);
 *   })
 *   .catch((error) => {
 *     console.error(error);
 *   });
 * ```
 */
export interface OpenAiClient {

    /**
     * Returns the URL of the OpenAI API that the client is configured to use.
     *
     * @returns {string} The URL.
     */
    getUrl () : string;

    /**
     * Calls the OpenAI APIs text completion endpoint to generate text based on
     * the given prompt.
     *
     * Default values for the optional parameters are selected based on the model.
     *
     * @param {string} prompt - The prompt to use for text completion.
     * @param {OpenAiModel} [model=OpenAiApiModel.DAVINCI] - The OpenAI API
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
    getCompletion (
        prompt             : string,
        model             ?: OpenAiModel | string | undefined,
        max_tokens        ?: number | undefined,
        temperature       ?: number | undefined,
        top_p             ?: number | undefined,
        frequency_penalty ?: number | undefined,
        presence_penalty  ?: number | undefined
    ) : Promise<OpenAiCompletionResponseDTO>;

    /**
     * Calls the OpenAI APIs text completion endpoint to generate text based on
     * the given prompt.
     *
     * Default values for the optional parameters are selected based on the model.
     *
     * @param {OpenAiCompletionRequestMessageDTO} messages - The object to use for chat text completion.
     * @param {OpenAiModel} [model=OpenAiApiModel.DAVINCI] - The OpenAI API
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
    getChatCompletion? (
        messages           : OpenAiChatCompletionMessage,
        model             ?: OpenAiModel | string | undefined,
        max_tokens        ?: number | undefined,
        temperature       ?: number | undefined,
        top_p             ?: number | undefined,
        frequency_penalty ?: number | undefined,
        presence_penalty  ?: number | undefined
    ) : Promise<OpenAiChatCompletionRequestDTO>;

    /**
     * Calls the OpenAI APIs text edit endpoint to generate text based on
     * the given input and instruction.
     *
     * Default values for the optional parameters are selected based on the model.
     *
     * @param {string} input - The input to use for text editing.
     * @param {string} instruction - The instruction to use for text editing.
     * @param {OpenAiModel} [model=OpenAiApiModel.DAVINCI] - The OpenAI API
     *                                         model to use for text completion.
     * @param {number} [n] -
     * @param {number} [temperature] - Controls the "creativity" of the
     *                                 completion. A higher value means the model
     *                                 will take more risks.
     * @param {number} [top_p] - Controls the "confidence" of the completion.
     *                           A lower value means the model will be more
     *                           confident in its words.
     * @returns {Promise<OpenAiCompletionResponseDTO>} - A promise that resolves
     *                                      to the response from the OpenAI API.
     * @throws {HttpError} - If the OpenAI API returns an error.
     * @throws {TypeError} - If the OpenAI API returns a response in an
     *                       unexpected format.
     */
    getEdit (
        instruction        : string,
        input             ?: string | undefined,
        model             ?: OpenAiModel | string | undefined,
        n                 ?: number | undefined,
        temperature       ?: number | undefined,
        top_p             ?: number | undefined
    ) : Promise<OpenAiEditResponseDTO>;

}

