// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../types/Enum";

/**
 * Enum for the available models in the OpenAI API.
 *
 * It is possible that there are other models available in the OpenAI API that
 * are not listed in the `OpenAiModel` enum. To get an up-to-date list of
 * available models, you can consult the OpenAI API documentation or make a
 * request to the API's /models endpoint.
 */
export enum OpenAiModel {

    /**
     * The most capable GPT-3 model. Can do any task the other models can do,
     * often with higher quality, longer output and better instruction-following.
     * Also supports [inserting completions](https://beta.openai.com/docs/guides/completion/inserting-text) within text.
     *
     * String presentation recognized by the OpenAI REST API: `text-davinci-003`
     *
     * Recommended default values:
     * - max_tokens: 4,000
     * - temperature: 0.5
     * - top_p: 1
     * - frequency_penalty: 0
     * - presence_penalty: 0
     *
     * Link for extra information: https://beta.openai.com/docs/models/gpt-3
     *
     * Remarks:
     * - This model is generally the most capable in the GPT-3 series.
     * - The max_tokens parameter specifies the maximum number of tokens that
     *   the model is allowed to generate in its response.
     *
     * Alias names: `davinci` (older version)
     */
    DAVINCI = 'text-davinci-003',


    DAVINCI_EDIT_TEXT = 'text-davinci-edit-001',
    DAVINCI_EDIT_CODE = 'code-davinci-edit-001',

    /**
     * Very capable GPT-3 model, but faster and lower cost than Davinci.
     *
     * String presentation recognized by the OpenAI REST API: `text-curie-001`
     *
     * Recommended default values:
     * - max_tokens: 2,048
     * - temperature: 0.5
     * - top_p: 1
     * - frequency_penalty: 0
     * - presence_penalty: 0
     *
     * Link for extra information: https://beta.openai.com/docs/models/gpt-3
     *
     * Remarks:
     * - This model can perform many of the same tasks as Davinci, but faster
     *   and for 1/10th the cost.
     * - The max_tokens parameter specifies the maximum number of tokens that
     *   the model is allowed to generate in its response.
     *
     * Alias names: `curie` (older version)
     */
    CURIE = 'text-curie-001',

    /**
     * Capable of straightforward tasks, very fast, and lower cost.
     *
     * String presentation recognized by the OpenAI REST API: `text-babbage-001`
     *
     * Recommended default values:
     * - max_tokens: 2,048
     * - temperature: 0.5
     * - top_p: 1
     * - frequency_penalty: 0
     * - presence_penalty: 0
     *
     * Link for extra information: https://beta.openai.com/docs/models/gpt-3
     *
     * Remarks:
     * - The max_tokens parameter specifies the maximum number of tokens that
     *   the model is allowed to generate in its response.
     *
     * Alias names: `babbage` (older version)
     */
    BABBAGE = 'text-babbage-001',

    /**
     * Capable of very simple tasks, usually the fastest model in the GPT-3
     * series, and lowest cost.
     *
     * String presentation recognized by the OpenAI REST API: `text-ada-001`
     *
     * Recommended default values:
     * - max_tokens: 2,048
     * - temperature: 0.5
     * - top_p: 1
     * - frequency_penalty: 0
     * - presence_penalty: 0
     *
     * Link for extra information: https://beta.openai.com/docs/models/gpt-3
     *
     * Remarks:
     * - The max_tokens parameter specifies the maximum number of tokens that
     *   the model is allowed to generate in its response.
     *
     * Alias names: `ada` (older version)
     */
    ADA = 'text-ada-001',

    /**
     * A fine-tuned model that can detect whether text may be sensitive or unsafe.
     *
     * String presentation recognized by the OpenAI REST API: `content-filter`
     *
     * Recommended default values:
     * - max_tokens: 1
     * - temperature: 0.0
     * - top_p: 0
     * - frequency_penalty: 0
     * - presence_penalty: 0
     * - logprobs: 0
     *
     * Wrap your prompt in the following way:
     * ```
     * "<|endoftext|>[prompt]\n--\nLabel:"
     * ```
     *
     * Link for extra information: https://beta.openai.com/docs/models/content-filter
     */
    CONTENT_FILTER = 'content-filter-alpha',

    /**
     * A set of models that can understand and generate code, including
     * translating natural language to code (Limited Beta).
     *
     * String presentation recognized by the OpenAI REST API: `codex`
     *
     * Link for extra information: https://beta.openai.com/docs/models/codex
     *
     * Recommended default values:
     * - max_tokens: 8000
     * - temperature: 0.5
     * - top_p: 1
     * - frequency_penalty: 0
     * - presence_penalty: 0
     *
     * Remarks:
     * - This model is currently in limited beta.
     */
    CODEX = 'code-davinci-002',

    /**
     * More capable than any GPT-3.5 model, able to do more complex tasks, and optimized for chat.
     * Will be updated with our latest model iteration 2 weeks after it is released.
     */
    GPT_4 = "gpt-4",

    /**
     * Same capabilities as the base gpt-4 mode but with 4x the context length.
     * Will be updated with our latest model iteration.
     */
    GPT_4_32K = "gpt-4-32k",

    /**
     * Most capable GPT-3.5 model and optimized for chat at 1/10th the cost of text-davinci-003.
     * Will be updated with our latest model iteration 2 weeks after it is released.
     */
    GPT_3_5_TURBO = "gpt-3.5-turbo",

    /**
     * Same capabilities as the standard gpt-3.5-turbo model but with 4 times the context.
     */
    GPT_3_5_TURBO_16K = "gpt-3.5-turbo-16k",

}

/**
 * Check if the given value is a valid `OpenAiModel`.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is OpenAiModel} `true` if the value is a valid `OpenAiModel`, `false` otherwise.
 */
export function isOpenAiModel (value: unknown) : value is OpenAiModel {
    switch (value) {
        case OpenAiModel.DAVINCI:
        case OpenAiModel.DAVINCI_EDIT_TEXT:
        case OpenAiModel.DAVINCI_EDIT_CODE:
        case OpenAiModel.CURIE:
        case OpenAiModel.BABBAGE:
        case OpenAiModel.ADA:
        case OpenAiModel.CONTENT_FILTER:
        case OpenAiModel.CODEX:
        case OpenAiModel.GPT_4:
        case OpenAiModel.GPT_4_32K:
        case OpenAiModel.GPT_3_5_TURBO:
        case OpenAiModel.GPT_3_5_TURBO_16K:
            return true;
        default:
            return false;
    }
}

/**
 * Explain the given value with respect to the `OpenAiModel` enum.
 *
 * @param {unknown} value - The value to explain.
 * @returns {string} A string explaining the value with respect to the `OpenAiModel` enum.
 */
export function explainOpenAiModel (value : unknown) : string {
    return explainEnum("OpenApiModel", OpenAiModel, isOpenAiModel, value);
}

/**
 * Convert the given `OpenAiModel` value to a string.
 *
 * @param {OpenAiModel} value - The value to convert.
 * @returns {string} The string representation of the `OpenAiModel` value.
 * @throws {TypeError} If the value is not a valid `OpenAiModel`.
 */
export function stringifyOpenAiModel (value : OpenAiModel) : string {
    switch (value) {
        case OpenAiModel.DAVINCI                : return 'text-davinci-003';
        case OpenAiModel.DAVINCI_EDIT_TEXT      : return 'text-davinci-edit-001';
        case OpenAiModel.DAVINCI_EDIT_CODE      : return 'code-davinci-edit-001';
        case OpenAiModel.CURIE                  : return 'text-curie-001';
        case OpenAiModel.BABBAGE                : return 'text-babbage-001';
        case OpenAiModel.ADA                    : return 'text-ada-001';
        case OpenAiModel.CONTENT_FILTER         : return 'content-filter-alpha';
        case OpenAiModel.CODEX                  : return 'code-davinci-002';
        case OpenAiModel.GPT_4                  : return 'gpt-4';
        case OpenAiModel.GPT_4_32K              : return 'gpt-4-32k';
        case OpenAiModel.GPT_3_5_TURBO          : return 'gpt-3.5-turbo';
        case OpenAiModel.GPT_3_5_TURBO_16K      : return 'gpt-3.5-turbo-16k';
    }
    throw new TypeError(`Unsupported OpenApiModel value: ${value}`)
}

/**
 * Convert the given value to an `OpenAiModel` value, if possible.
 *
 * @param {unknown} value - The value to convert.
 * @returns {(OpenAiModel | undefined)} The `OpenAiModel` representation of the value, or `undefined` if the value cannot be converted.
 */
export function parseOpenAiModel (value: any) : OpenAiModel | undefined {
    if (value === undefined) return undefined;
    switch(`${value}`.toLowerCase()) {

        case 'edit' :
        case 'text-edit' :
        case 'text_edit' :
        case 'text_davinci_edit' :
        case 'text-davinci-edit-001' : return OpenAiModel.DAVINCI_EDIT_TEXT;

        case 'code_edit' :
        case 'code-edit' :
        case 'code_davinci_edit_001' :
        case 'code-davinci-edit-001' : return OpenAiModel.DAVINCI_EDIT_CODE;

        case 'text' :
        case 'text_davinci' :
        case 'text-davinci' :
        case 'text_davinci_003' :
        case 'text-davinci-003' :
        case 'davinci'          : return OpenAiModel.DAVINCI;

        case 'text_curie_001'   :
        case 'text-curie-001'   :
        case 'curie'            : return OpenAiModel.CURIE;

        case 'text_babbage_001' :
        case 'text-babbage-001' :
        case 'babbage'          : return OpenAiModel.BABBAGE;

        case 'text_ada_001'     :
        case 'text-ada-001'     :
        case 'ada'              : return OpenAiModel.ADA;

        case 'content-filter'   :
        case 'content_filter'   :
        case 'content_filter_alpha'   :
        case 'content-filter-alpha'   : return OpenAiModel.CONTENT_FILTER;

        case 'codex'                        :
        case 'code_davinci_002'             :
        case 'code-davinci-002'             : return OpenAiModel.CODEX;

        case 'gpt4'                         :
        case 'gpt-4'                        :
        case 'gpt_4'                        : return OpenAiModel.GPT_4;

        case 'gtp4-32k'                     :
        case 'gpt-4-32k'                    :
        case 'gpt_4_32k'                    : return OpenAiModel.GPT_4_32K;

        case 'gpt3.5'                       :
        case 'gpt3.5-turbo'                 :
        case 'gpt-3.5-turbo'                : return OpenAiModel.GPT_3_5_TURBO;

        case 'gpt3.5-16k'                   :
        case 'gpt3.5-turbo-16k'             :
        case 'gpt-3.5-turbo-16k'            : return OpenAiModel.GPT_3_5_TURBO_16K;

        default                             : return undefined;
    }
}