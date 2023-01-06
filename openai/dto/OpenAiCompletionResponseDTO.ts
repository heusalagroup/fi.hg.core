// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainOpenAiCompletionResponseItemDTO, isOpenAiCompletionResponseItemDTO, OpenAiCompletionResponseItemDTO } from "./OpenAiCompletionResponseItemDTO";
import { explainOpenApiModel, isOpenApiModel, OpenAiApiModel } from "../types/OpenAiApiModel";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../types/OtherKeys";
import { explainString, isString } from "../../types/String";
import { explain, explainProperty } from "../../types/explain";
import { explainArrayOf, isArray, isArrayOf } from "../../types/Array";
import { explainStringArray, isStringArray } from "../../types/StringArray";
import { explainNumberArray, isNumberArray } from "../../types/NumberArray";
import { startsWith } from "../../functions/startsWith";
import { parseJson } from "../../Json";

/**
 * @typedef {Object} OpenAiCompletionResponseDTO
 *
 * The response to an OpenAI completion request.
 */
export interface OpenAiCompletionResponseDTO {

    /**
     * The ID of the response.
     */
    readonly id: string;

    /**
     * The name of the model used to generate the response.
     */
    readonly model: OpenAiApiModel;

    /**
     * The prompt used to generate the response.
     */
    readonly prompt: string;

    /**
     * The completed text.
     */
    readonly completions: readonly string[];

    /**
     * The tokens in the completed text.
     */
    readonly tokens: readonly string[];

    /**
     * The scores of the completed text.
     */
    readonly scores: readonly number[];

    /**
     * The response items for each token in the completed text.
     */
    readonly responses: readonly OpenAiCompletionResponseItemDTO[];

}

/**
 * Create a new `OpenAiCompletionResponseDTO` object.
 *
 * @param {string} id - The ID of the response.
 * @param {OpenAiApiModel} model - The name of the model used to generate the response.
 * @param {string} prompt - The prompt used to generate the response.
 * @param {readonly string[]} completions - The completed text.
 * @param {readonly string[]} tokens - The tokens in the completed text.
 * @param {readonly number[]} scores - The scores of the completed text.
 * @param {readonly OpenAiCompletionResponseItemDTO[]} responses - The response items for each token in the completed text.
 * @returns {OpenAiCompletionResponseDTO} The new `OpenAiCompletionResponseDTO` object.
 */
export function createOpenAiCompletionResponseDTO (
    id: string,
    model: OpenAiApiModel,
    prompt: string,
    completions: readonly string[],
    tokens: readonly string[],
    scores: readonly number[],
    responses: readonly OpenAiCompletionResponseItemDTO[]
) : OpenAiCompletionResponseDTO {
    return {
        id,
        model,
        prompt,
        completions,
        tokens,
        scores,
        responses
    };
}

/**
 * Check if the given value is an `OpenAiCompletionResponseDTO` object.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a valid `OpenAiCompletionResponseDTO` object, `false` otherwise.
 */
export function isOpenAiCompletionResponseDTO (value: unknown) : value is OpenAiCompletionResponseDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'id',
            'model',
            'prompt',
            'completions',
            'tokens',
            'scores',
            'responses',
        ])
        && isString(value?.id)
        && isOpenApiModel(value?.model)
        && isString(value?.prompt)
        && isStringArray(value?.completions)
        && isStringArray(value?.tokens)
        && isNumberArray(value?.scores)
        && isArrayOf<OpenAiCompletionResponseItemDTO>(value?.responses, isOpenAiCompletionResponseItemDTO)
    );
}

/**
 * Explain why a value is not a valid OpenAiCompletionResponseDTO object.
 *
 * @param {any} value - The value to check.
 * @returns {string} A human-readable string explaining why the value is not a valid OpenAiCompletionResponseDTO object.
 */
export function explainOpenAiCompletionResponseDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'id',
                'model',
                'prompt',
                'completions',
                'tokens',
                'scores',
                'responses'
            ])
            , explainProperty("id", explainString(value?.id))
            , explainProperty("model", explainOpenApiModel(value?.model))
            , explainProperty("prompt", explainString(value?.prompt))
            , explainProperty("completions", explainStringArray(value?.completions))
            , explainProperty("tokens", explainStringArray(value?.tokens))
            , explainProperty("scores", explainNumberArray(value?.scores))
            , explainProperty("responses", explainArrayOf<OpenAiCompletionResponseItemDTO>(
                "OpenAiCompletionResponseItemDTO",
                explainOpenAiCompletionResponseItemDTO,
                value?.responses,
                isOpenAiCompletionResponseItemDTO
        ))
        ]
    );
}

/**
 * Convert the given `OpenAiCompletionResponseDTO` object to a string.
 *
 * @param {OpenAiCompletionResponseDTO} value - The value to convert.
 * @returns {string} A string representation of the `OpenAiCompletionResponseDTO` object.
 */
export function stringifyOpenAiCompletionResponseDTO (value : OpenAiCompletionResponseDTO) : string {
    return `OpenAiCompletionResponseDTO(${JSON.stringify(value)})`;
}

/**
 * Attempt to parse the given value as an `OpenAiCompletionResponseDTO` object.
 *
 * @param {unknown} value - The value to parse.
 * @returns {OpenAiCompletionResponseDTO|undefined} The parsed `OpenAiCompletionResponseDTO` object, or `undefined` if the value is not a valid `OpenAiCompletionResponseDTO` object.
 */
export function parseOpenAiCompletionResponseDTO (value: unknown) : OpenAiCompletionResponseDTO | undefined {
    if (isString(value)) {
        if (startsWith(value, "OpenAiCompletionResponseDTO(")) {
            value = value.substring("OpenAiCompletionResponseDTO(".length, value.length -1 );
        }
        value = parseJson(value);
    }
    if (isOpenAiCompletionResponseDTO(value)) return value;
    return undefined;
}
