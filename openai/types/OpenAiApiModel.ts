// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../types/Enum";

/**
 * Enum for the available models in the OpenAI API.
 *
 * It is possible that there are other models available in the OpenAI API that
 * are not listed in the `OpenAiApiModel` enum. To get an up-to-date list of
 * available models, you can consult the OpenAI API documentation or make a
 * request to the API's /models endpoint.
 *
 * @enum {string}
 */
export enum OpenAiApiModel {

    /**
     * Davinci model. A large, general-purpose language model. Suitable for most tasks.
     *
     * The Davinci model is a large, general-purpose language model that is trained on a wide range of texts.
     * It is capable of understanding and generating human-like text across a wide range of topics and styles.
     * This model is suitable for most tasks that involve language processing, including question answering,
     * language translation, and text summarization.
     */
    DAVINCI = 'davinci',

    /**
     * Davinci model, version 2. A large, general-purpose language model. Suitable for most tasks.
     * Modern model. A medium-sized language model that is more powerful than the Curie model.
     * Suitable for tasks that require more context or require a larger vocabulary.
     */
    DAVINCI_002 = 'text-davinci-002',

    /**
     * Curie model. A small, fast language model. Suitable for tasks that require quick responses.
     *
     * The Curie model is a small language model that is optimized for speed and efficiency. It is suitable
     * for tasks that require quick responses, such as chatbots or other interactive applications. Because
     * it is a smaller model, it may have a more limited vocabulary and may not be as accurate as larger
     * models like Davinci or Babbage. However, it is still a powerful tool for many language processing
     * tasks.
     */
    CURIE = 'curie',

    /**
     * Curie model, version 1. A small, fast language model. Suitable for tasks that require quick responses.
     *
     * Curie is a medium-sized language model that is more powerful than the Curie model.
     * It is suitable for tasks that require more context or require a larger vocabulary.
     */
    CURIE_001 = 'text-curie-001',

    /**
     * Babbage model. A language model optimized for coding and programming tasks.
     *
     * Babbage is a language model designed to assist developers with coding tasks.
     * It is trained on a large dataset of code and documentation, and is able to
     * generate code completion suggestions, detect errors and bugs, and provide
     * documentation for functions and libraries.
     */
    BABBAGE = 'babbage',

    /**
     * Babbage model, version 1. A language model optimized for coding and programming tasks.
     * Heavy model. A large language model that is more powerful than the Davinci model.
     * Suitable for tasks that require the most context or a very large vocabulary.
     */
    BABBAGE_001 = 'text-babbage-001',

    /**
     * A language model optimized for scientific and technical content.
     *
     * The Ada model is a small, fast language model. It is suitable for tasks that require quick responses,
     * and is particularly well-suited for tasks that involve scientific and technical content.
     * It is trained on a diverse dataset and is able to generate human-like text.
     */
    ADA      = 'ada',

    /**
     * Ada model, version 1. A language model optimized for scientific and technical content.
     * Ada is a medium-sized language model that is more powerful than the Curie model, and is suitable for tasks that require more context or a larger vocabulary.
     */
    ADA_001  = 'text-ada-001',

    /**
     * Eliza model. A language model optimized for customer service and support tasks.
     * Eliza is a small language model that is suitable for tasks that require quick responses and a small vocabulary.
     */
    ELIZA    = 'eliza',

    /**
     * Eliza model, version 1. A language model optimized for customer service and support tasks.
     * Eliza is a small, fast language model that is specifically designed to answer questions and provide
     * support in customer service and support scenarios. It is suitable for tasks that require a fast response
     * time and a large vocabulary of common words and phrases.
     */
    ELIZA_001 = 'text-eliza-001',

    /**
     * Einstein model. A language model optimized for translation tasks.
     */
    EINSTEIN = 'einstein',

    /**
     * Einstein model, version 1. A language model optimized for translation tasks.
     * Modern model. A medium-sized language model that is more powerful than the Curie model.
     * Suitable for tasks that require more context or require a larger vocabulary.
     */
    EINSTEIN_001 = 'text-einstein-001',

}

/**
 * Check if the given value is a valid `OpenAiApiModel`.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is OpenAiApiModel} `true` if the value is a valid `OpenAiApiModel`, `false` otherwise.
 */
export function isOpenApiModel (value: unknown) : value is OpenAiApiModel {
    switch (value) {
        case OpenAiApiModel.DAVINCI:
        case OpenAiApiModel.DAVINCI_002:
        case OpenAiApiModel.CURIE:
        case OpenAiApiModel.CURIE_001:
        case OpenAiApiModel.BABBAGE:
        case OpenAiApiModel.BABBAGE_001:
        case OpenAiApiModel.ADA:
        case OpenAiApiModel.ADA_001:
        case OpenAiApiModel.ELIZA:
        case OpenAiApiModel.ELIZA_001:
        case OpenAiApiModel.EINSTEIN:
        case OpenAiApiModel.EINSTEIN_001:
            return true;
        default:
            return false;
    }
}

/**
 * Explain the given value with respect to the `OpenAiApiModel` enum.
 *
 * @param {unknown} value - The value to explain.
 * @returns {string} A string explaining the value with respect to the `OpenAiApiModel` enum.
 */
export function explainOpenApiModel (value : unknown) : string {
    return explainEnum("OpenApiModel", OpenAiApiModel, isOpenApiModel, value);
}

/**
 * Convert the given `OpenAiApiModel` value to a string.
 *
 * @param {OpenAiApiModel} value - The value to convert.
 * @returns {string} The string representation of the `OpenAiApiModel` value.
 * @throws {TypeError} If the value is not a valid `OpenAiApiModel`.
 */
export function stringifyOpenApiModel (value : OpenAiApiModel) : string {
    switch (value) {
        case OpenAiApiModel.DAVINCI     : return 'davinci';
        case OpenAiApiModel.DAVINCI_002 : return 'text-davinci-002';
        case OpenAiApiModel.CURIE     : return 'curie';
        case OpenAiApiModel.CURIE_001     : return 'text-curie-001';
        case OpenAiApiModel.BABBAGE   : return 'babbage';
        case OpenAiApiModel.BABBAGE_001   : return 'text-babbage-001';
        case OpenAiApiModel.ADA       : return 'ada';
        case OpenAiApiModel.ADA_001       : return 'text-ada-001';
        case OpenAiApiModel.ELIZA     : return 'eliza';
        case OpenAiApiModel.ELIZA_001  : return 'text-eliza-001';
        case OpenAiApiModel.EINSTEIN  : return 'einstein';
        case OpenAiApiModel.EINSTEIN_001  : return 'text-einstein-001';
    }
    throw new TypeError(`Unsupported OpenApiModel value: ${value}`)
}

/**
 * Convert the given value to an `OpenAiApiModel` value, if possible.
 *
 * @param {unknown} value - The value to convert.
 * @returns {(OpenAiApiModel | undefined)} The `OpenAiApiModel` representation of the value, or `undefined` if the value cannot be converted.
 */
export function parseOpenApiModel (value: any) : OpenAiApiModel | undefined {
    if (value === undefined) return undefined;
    switch(`${value}`.toUpperCase()) {
        case 'DAVINCI'  : return OpenAiApiModel.DAVINCI;
        case 'DAVINCI_002'  : return OpenAiApiModel.DAVINCI_002;
        case 'CURIE'    : return OpenAiApiModel.CURIE;
        case 'CURIE_001'    : return OpenAiApiModel.CURIE_001;
        case 'BABBAGE'  : return OpenAiApiModel.BABBAGE;
        case 'BABBAGE_001'  : return OpenAiApiModel.BABBAGE_001;
        case 'ADA'      : return OpenAiApiModel.ADA;
        case 'ADA_001'      : return OpenAiApiModel.ADA_001;
        case 'ELIZA'    : return OpenAiApiModel.ELIZA;
        case 'ELIZA_001'    : return OpenAiApiModel.ELIZA_001;
        case 'EINSTEIN' : return OpenAiApiModel.EINSTEIN;
        case 'EINSTEIN_001' : return OpenAiApiModel.EINSTEIN_001;
        default         : return undefined;
    }
}
