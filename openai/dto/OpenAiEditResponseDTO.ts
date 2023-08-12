// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainOpenAiEditResponseChoice,
    isOpenAiEditResponseChoice,
    OpenAiEditResponseChoice
} from "./OpenAiEditResponseChoice";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainString, isString } from "../../types/String";
import { explain, explainProperty } from "../../types/explain";
import { explainArrayOf, isArrayOf } from "../../types/Array";
import { startsWith } from "../../functions/startsWith";
import { parseJson } from "../../Json";
import { explainOpenAiEditResponseUsage, isOpenAiEditResponseUsage, OpenAiEditResponseUsage } from "./OpenAiEditResponseUsage";
import { explainNumber, isNumber } from "../../types/Number";
import { OpenAiError } from "./OpenAiError";

/**
 * @typedef {Object} OpenAiEditResponseDTO
 *
 * The response to an OpenAI completion request.
 */
export interface OpenAiEditResponseDTO {

    /**
     *
     */
    readonly object: string;

    /**
     *
     */
    readonly created: number;

    /**
     */
    readonly choices: readonly (OpenAiEditResponseChoice | OpenAiError)[];

    /**
     *
     */
    readonly usage : OpenAiEditResponseUsage;

}

/**
 * Create a new `OpenAiEditResponseDTO` object.
 *
 * @param {string} id - The ID of the response.
 * @param {string} object -
 * @param {number} created -
 * @param {OpenAiModel} model - The name of the model used to generate the response.
 * @param {readonly OpenAiEditResponseChoice[]} choices -
 * @param {OpenAiEditResponseUsage} usage -
 * @returns {OpenAiEditResponseDTO} The new `OpenAiEditResponseDTO` object.
 */
export function createOpenAiEditResponseDTO (
    object: string,
    created: number,
    choices: readonly OpenAiEditResponseChoice[],
    usage: OpenAiEditResponseUsage
) : OpenAiEditResponseDTO {
    return {
        object,
        created,
        choices,
        usage
    };
}

/**
 * Check if the given value is an `OpenAiEditResponseDTO` object.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a valid `OpenAiEditResponseDTO` object, `false` otherwise.
 */
export function isOpenAiEditResponseDTO (value: unknown) : value is OpenAiEditResponseDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'object',
            'created',
            'choices',
            'usage'
        ])
        && isString(value?.object)
        && isNumber(value?.created)
        && isArrayOf<OpenAiEditResponseChoice>(value?.choices, isOpenAiEditResponseChoice)
        && isOpenAiEditResponseUsage(value?.usage)
    );
}

/**
 * Explain why a value is not a valid OpenAiEditResponseDTO object.
 *
 * @param {any} value - The value to check.
 * @returns {string} A human-readable string explaining why the value is not a valid OpenAiEditResponseDTO object.
 */
export function explainOpenAiEditResponseDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'object',
                'created',
                'choices',
                'usage'
            ])
            , explainProperty("object", explainString(value?.object))
            , explainProperty("created", explainNumber(value?.created))
            , explainProperty("choices", explainArrayOf<OpenAiEditResponseChoice>(
                "OpenAiEditResponseChoice",
                explainOpenAiEditResponseChoice,
                value?.choices,
                isOpenAiEditResponseChoice
            ))
            , explainProperty("usage", explainOpenAiEditResponseUsage(value?.usage))
        ]
    );
}

/**
 * Convert the given `OpenAiEditResponseDTO` object to a string.
 *
 * @param {OpenAiEditResponseDTO} value - The value to convert.
 * @returns {string} A string representation of the `OpenAiEditResponseDTO` object.
 */
export function stringifyOpenAiEditResponseDTO (value : OpenAiEditResponseDTO) : string {
    return `OpenAiEditResponseDTO(${JSON.stringify(value)})`;
}

/**
 * Attempt to parse the given value as an `OpenAiEditResponseDTO` object.
 *
 * @param {unknown} value - The value to parse.
 * @returns {OpenAiEditResponseDTO|undefined} The parsed `OpenAiEditResponseDTO` object, or `undefined` if the value is not a valid `OpenAiEditResponseDTO` object.
 */
export function parseOpenAiEditResponseDTO (value: unknown) : OpenAiEditResponseDTO | undefined {
    if (isString(value)) {
        if (startsWith(value, "OpenAiEditResponseDTO(")) {
            value = value.substring("OpenAiEditResponseDTO(".length, value.length -1 );
        }
        value = parseJson(value);
    }
    if (isOpenAiEditResponseDTO(value)) return value;
    return undefined;
}
