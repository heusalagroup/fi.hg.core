// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpenAiModel } from "./types/OpenAiModel";

/**
 * A utility class for working with OpenAI models.
 */
export class OpenAiModelUtils {

    /**
     * Returns the default maximum number of tokens to generate for the given
     * model.
     *
     * @param {OpenAiModel} model - The OpenAI API model.
     * @returns {number} The default maximum number of tokens to generate.
     */
    public static getDefaultMaxTokensForModel (model: OpenAiModel) : number {
        switch(model) {
            case OpenAiModel.DAVINCI: return 4000;
            case OpenAiModel.CURIE: return 2048;
            case OpenAiModel.BABBAGE: return 2048;
            case OpenAiModel.ADA: return 2048;
            case OpenAiModel.CONTENT_FILTER: return 1;
            case OpenAiModel.CODEX: return 8000;
            default : return 2048;
        }
    }

    /**
     * Returns the default temperature to use for the given model.
     *
     * @param {OpenAiModel} model - The OpenAI API model.
     * @returns {number} The default temperature to use.
     */
    public static getDefaultTemperatureForModel (model: OpenAiModel) : number {
        switch(model) {
            case OpenAiModel.DAVINCI: return 0.5;
            case OpenAiModel.CURIE: return 0.5;
            case OpenAiModel.BABBAGE: return 0.5;
            case OpenAiModel.ADA: return 0.5;
            case OpenAiModel.CONTENT_FILTER: return 0.0;
            case OpenAiModel.CODEX: return 0.5;
            default : return 0.5;
        }
    }

    /**
     * Returns the default top p to use for the given model.
     *
     * @param {OpenAiModel} model - The OpenAI API model.
     * @returns {number} The default top p to use.
     */
    public static getDefaultTopPForModel (model: OpenAiModel) : number {
        switch(model) {
            case OpenAiModel.DAVINCI: return 1;
            case OpenAiModel.CURIE: return 1;
            case OpenAiModel.BABBAGE: return 1;
            case OpenAiModel.ADA: return 1;
            case OpenAiModel.CONTENT_FILTER: return 0;
            case OpenAiModel.CODEX: return 1;
            default : return 1;
        }
    }

    /**
     * Returns the default frequency_penalty value to use for the given model.
     *
     * @param {OpenAiModel} model - The OpenAI API model.
     * @returns {number} The default frequency_penalty value.
     */
    public static getDefaultFrequencyPenaltyForModel (model: OpenAiModel) : number {
        switch(model) {
            case OpenAiModel.DAVINCI: return 0;
            case OpenAiModel.CURIE: return 0;
            case OpenAiModel.BABBAGE: return 0;
            case OpenAiModel.ADA: return 0;
            case OpenAiModel.CONTENT_FILTER: return 0;
            case OpenAiModel.CODEX: return 0;
            default : return 0;
        }
    }

    /**
     * Returns the default presence_penalty value to use for the given model.
     *
     * @param {OpenAiModel} model - The OpenAI API model.
     * @returns {number} The default presence_penalty value.
     */
    public static getDefaultPresencePenaltyForModel (model: OpenAiModel) : number {
        switch(model) {
            case OpenAiModel.DAVINCI: return 0;
            case OpenAiModel.CURIE: return 0;
            case OpenAiModel.BABBAGE: return 0;
            case OpenAiModel.ADA: return 0;
            case OpenAiModel.CONTENT_FILTER: return 0;
            case OpenAiModel.CODEX: return 0;
            default : return 0;
        }
    }

}
