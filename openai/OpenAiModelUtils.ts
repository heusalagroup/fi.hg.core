// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpenAiApiModel } from "./types/OpenAiApiModel";

/**
 * A utility class for working with OpenAI models.
 */
export class OpenAiModelUtils {

    /**
     * Returns the default maximum number of tokens to generate for the given
     * model.
     *
     * @param {OpenAiApiModel} model - The OpenAI API model.
     * @returns {number} The default maximum number of tokens to generate.
     */
    public static getDefaultMaxTokensForModel (model: OpenAiApiModel) : number {
        switch(model) {
            case OpenAiApiModel.DAVINCI: return 4000;
            case OpenAiApiModel.CURIE: return 2048;
            case OpenAiApiModel.BABBAGE: return 2048;
            case OpenAiApiModel.ADA: return 2048;
            case OpenAiApiModel.CONTENT_FILTER: return 1;
            case OpenAiApiModel.CODEX: return 8000;
            default : return 2048;
        }
    }

    /**
     * Returns the default temperature to use for the given model.
     *
     * @param {OpenAiApiModel} model - The OpenAI API model.
     * @returns {number} The default temperature to use.
     */
    public static getDefaultTemperatureForModel (model: OpenAiApiModel) : number {
        switch(model) {
            case OpenAiApiModel.DAVINCI: return 0.5;
            case OpenAiApiModel.CURIE: return 0.5;
            case OpenAiApiModel.BABBAGE: return 0.5;
            case OpenAiApiModel.ADA: return 0.5;
            case OpenAiApiModel.CONTENT_FILTER: return 0.0;
            case OpenAiApiModel.CODEX: return 0.5;
            default : return 0.5;
        }
    }

    /**
     * Returns the default top p to use for the given model.
     *
     * @param {OpenAiApiModel} model - The OpenAI API model.
     * @returns {number} The default top p to use.
     */
    public static getDefaultTopPForModel (model: OpenAiApiModel) : number {
        switch(model) {
            case OpenAiApiModel.DAVINCI: return 1;
            case OpenAiApiModel.CURIE: return 1;
            case OpenAiApiModel.BABBAGE: return 1;
            case OpenAiApiModel.ADA: return 1;
            case OpenAiApiModel.CONTENT_FILTER: return 0;
            case OpenAiApiModel.CODEX: return 1;
            default : return 1;
        }
    }

    /**
     * Returns the default frequency_penalty value to use for the given model.
     *
     * @param {OpenAiApiModel} model - The OpenAI API model.
     * @returns {number} The default frequency_penalty value.
     */
    public static getDefaultFrequencyPenaltyForModel (model: OpenAiApiModel) : number {
        switch(model) {
            case OpenAiApiModel.DAVINCI: return 0;
            case OpenAiApiModel.CURIE: return 0;
            case OpenAiApiModel.BABBAGE: return 0;
            case OpenAiApiModel.ADA: return 0;
            case OpenAiApiModel.CONTENT_FILTER: return 0;
            case OpenAiApiModel.CODEX: return 0;
            default : return 0;
        }
    }

    /**
     * Returns the default presence_penalty value to use for the given model.
     *
     * @param {OpenAiApiModel} model - The OpenAI API model.
     * @returns {number} The default presence_penalty value.
     */
    public static getDefaultPresencePenaltyForModel (model: OpenAiApiModel) : number {
        switch(model) {
            case OpenAiApiModel.DAVINCI: return 0;
            case OpenAiApiModel.CURIE: return 0;
            case OpenAiApiModel.BABBAGE: return 0;
            case OpenAiApiModel.ADA: return 0;
            case OpenAiApiModel.CONTENT_FILTER: return 0;
            case OpenAiApiModel.CODEX: return 0;
            default : return 0;
        }
    }

}
