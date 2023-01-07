// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpenAiModelUtils } from "./OpenAiModelUtils";
import { OpenAiModel } from "./types/OpenAiModel";

describe("OpenAiModelUtils", () => {

    describe("#getDefaultMaxTokensForModel", () => {
        it("should return the correct default max tokens value for the given model", () => {
            expect(OpenAiModelUtils.getDefaultMaxTokensForModel(OpenAiModel.DAVINCI)).toBe(4000);
            expect(OpenAiModelUtils.getDefaultMaxTokensForModel(OpenAiModel.CURIE)).toBe(2048);
            expect(OpenAiModelUtils.getDefaultMaxTokensForModel(OpenAiModel.BABBAGE)).toBe(2048);
            expect(OpenAiModelUtils.getDefaultMaxTokensForModel(OpenAiModel.ADA)).toBe(2048);
            expect(OpenAiModelUtils.getDefaultMaxTokensForModel(OpenAiModel.CONTENT_FILTER)).toBe(1);
            expect(OpenAiModelUtils.getDefaultMaxTokensForModel(OpenAiModel.CODEX)).toBe(8000);
            // @ts-ignore
            expect(OpenAiModelUtils.getDefaultMaxTokensForModel("invalid-model")).toBe(2048);
        });
    });

    describe("#getDefaultTemperatureForModel", () => {
        it("should return the correct default temperature for each model in the OpenAiApiModel enum", () => {
            expect(OpenAiModelUtils.getDefaultTemperatureForModel(OpenAiModel.DAVINCI)).toBe(0.5);
            expect(OpenAiModelUtils.getDefaultTemperatureForModel(OpenAiModel.CURIE)).toBe(0.5);
            expect(OpenAiModelUtils.getDefaultTemperatureForModel(OpenAiModel.BABBAGE)).toBe(0.5);
            expect(OpenAiModelUtils.getDefaultTemperatureForModel(OpenAiModel.ADA)).toBe(0.5);
            expect(OpenAiModelUtils.getDefaultTemperatureForModel(OpenAiModel.CONTENT_FILTER)).toBe(0.0);
            expect(OpenAiModelUtils.getDefaultTemperatureForModel(OpenAiModel.CODEX)).toBe(0.5);
        });
    });

    describe("getDefaultTopPForModel", () => {
        it("returns the correct default top_p value for each model", () => {
            expect(OpenAiModelUtils.getDefaultTopPForModel(OpenAiModel.DAVINCI)).toBe(1);
            expect(OpenAiModelUtils.getDefaultTopPForModel(OpenAiModel.CURIE)).toBe(1);
            expect(OpenAiModelUtils.getDefaultTopPForModel(OpenAiModel.BABBAGE)).toBe(1);
            expect(OpenAiModelUtils.getDefaultTopPForModel(OpenAiModel.ADA)).toBe(1);
            expect(OpenAiModelUtils.getDefaultTopPForModel(OpenAiModel.CONTENT_FILTER)).toBe(0);
            expect(OpenAiModelUtils.getDefaultTopPForModel(OpenAiModel.CODEX)).toBe(1);
            // @ts-ignore
            expect(OpenAiModelUtils.getDefaultTopPForModel("unknown")).toBe(1);
        });
    });

    describe("getDefaultFrequencyPenaltyForModel", () => {
        it("returns the correct default frequency penalty for each OpenAI API model", () => {
            // Check that each model returns the expected frequency penalty
            expect(OpenAiModelUtils.getDefaultFrequencyPenaltyForModel(OpenAiModel.DAVINCI)).toBe(0);
            expect(OpenAiModelUtils.getDefaultFrequencyPenaltyForModel(OpenAiModel.CURIE)).toBe(0);
            expect(OpenAiModelUtils.getDefaultFrequencyPenaltyForModel(OpenAiModel.BABBAGE)).toBe(0);
            expect(OpenAiModelUtils.getDefaultFrequencyPenaltyForModel(OpenAiModel.ADA)).toBe(0);
            expect(OpenAiModelUtils.getDefaultFrequencyPenaltyForModel(OpenAiModel.CONTENT_FILTER)).toBe(0);
            expect(OpenAiModelUtils.getDefaultFrequencyPenaltyForModel(OpenAiModel.CODEX)).toBe(0);
            // @ts-ignore
            expect(OpenAiModelUtils.getDefaultFrequencyPenaltyForModel("some-other-model")).toBe(0);
        });
    });

    describe("getDefaultPresencePenaltyForModel", () => {
        it("returns the expected default presence penalty for each model", () => {
            expect(OpenAiModelUtils.getDefaultPresencePenaltyForModel(OpenAiModel.DAVINCI)).toEqual(0);
            expect(OpenAiModelUtils.getDefaultPresencePenaltyForModel(OpenAiModel.CURIE)).toEqual(0);
            expect(OpenAiModelUtils.getDefaultPresencePenaltyForModel(OpenAiModel.BABBAGE)).toEqual(0);
            expect(OpenAiModelUtils.getDefaultPresencePenaltyForModel(OpenAiModel.ADA)).toEqual(0);
            expect(OpenAiModelUtils.getDefaultPresencePenaltyForModel(OpenAiModel.CONTENT_FILTER)).toEqual(0);
            expect(OpenAiModelUtils.getDefaultPresencePenaltyForModel(OpenAiModel.CODEX)).toEqual(0);
            // @ts-ignore
            expect(OpenAiModelUtils.getDefaultPresencePenaltyForModel("unknown")).toEqual(0);
        });
    });

});
