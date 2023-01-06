// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpenAiModelUtils } from "./OpenAiModelUtils";
import { OpenAiApiModel } from "./types/OpenAiApiModel";

describe("OpenAiModelUtils", () => {

    describe("#getDefaultMaxTokensForModel", () => {
        it("should return the correct default max tokens value for the given model", () => {
            expect(OpenAiModelUtils.getDefaultMaxTokensForModel(OpenAiApiModel.DAVINCI)).toBe(4000);
            expect(OpenAiModelUtils.getDefaultMaxTokensForModel(OpenAiApiModel.CURIE)).toBe(2048);
            expect(OpenAiModelUtils.getDefaultMaxTokensForModel(OpenAiApiModel.BABBAGE)).toBe(2048);
            expect(OpenAiModelUtils.getDefaultMaxTokensForModel(OpenAiApiModel.ADA)).toBe(2048);
            expect(OpenAiModelUtils.getDefaultMaxTokensForModel(OpenAiApiModel.CONTENT_FILTER)).toBe(1);
            expect(OpenAiModelUtils.getDefaultMaxTokensForModel(OpenAiApiModel.CODEX)).toBe(8000);
            // @ts-ignore
            expect(OpenAiModelUtils.getDefaultMaxTokensForModel("invalid-model")).toBe(2048);
        });
    });

    describe("#getDefaultTemperatureForModel", () => {
        it("should return the correct default temperature for each model in the OpenAiApiModel enum", () => {
            expect(OpenAiModelUtils.getDefaultTemperatureForModel(OpenAiApiModel.DAVINCI)).toBe(0.5);
            expect(OpenAiModelUtils.getDefaultTemperatureForModel(OpenAiApiModel.CURIE)).toBe(0.5);
            expect(OpenAiModelUtils.getDefaultTemperatureForModel(OpenAiApiModel.BABBAGE)).toBe(0.5);
            expect(OpenAiModelUtils.getDefaultTemperatureForModel(OpenAiApiModel.ADA)).toBe(0.5);
            expect(OpenAiModelUtils.getDefaultTemperatureForModel(OpenAiApiModel.CONTENT_FILTER)).toBe(0.0);
            expect(OpenAiModelUtils.getDefaultTemperatureForModel(OpenAiApiModel.CODEX)).toBe(0.5);
        });
    });

    describe("getDefaultTopPForModel", () => {
        it("returns the correct default top_p value for each model", () => {
            expect(OpenAiModelUtils.getDefaultTopPForModel(OpenAiApiModel.DAVINCI)).toBe(1);
            expect(OpenAiModelUtils.getDefaultTopPForModel(OpenAiApiModel.CURIE)).toBe(1);
            expect(OpenAiModelUtils.getDefaultTopPForModel(OpenAiApiModel.BABBAGE)).toBe(1);
            expect(OpenAiModelUtils.getDefaultTopPForModel(OpenAiApiModel.ADA)).toBe(1);
            expect(OpenAiModelUtils.getDefaultTopPForModel(OpenAiApiModel.CONTENT_FILTER)).toBe(0);
            expect(OpenAiModelUtils.getDefaultTopPForModel(OpenAiApiModel.CODEX)).toBe(1);
            // @ts-ignore
            expect(OpenAiModelUtils.getDefaultTopPForModel("unknown")).toBe(1);
        });
    });

    describe("getDefaultFrequencyPenaltyForModel", () => {
        it("returns the correct default frequency penalty for each OpenAI API model", () => {
            // Check that each model returns the expected frequency penalty
            expect(OpenAiModelUtils.getDefaultFrequencyPenaltyForModel(OpenAiApiModel.DAVINCI)).toBe(0);
            expect(OpenAiModelUtils.getDefaultFrequencyPenaltyForModel(OpenAiApiModel.CURIE)).toBe(0);
            expect(OpenAiModelUtils.getDefaultFrequencyPenaltyForModel(OpenAiApiModel.BABBAGE)).toBe(0);
            expect(OpenAiModelUtils.getDefaultFrequencyPenaltyForModel(OpenAiApiModel.ADA)).toBe(0);
            expect(OpenAiModelUtils.getDefaultFrequencyPenaltyForModel(OpenAiApiModel.CONTENT_FILTER)).toBe(0);
            expect(OpenAiModelUtils.getDefaultFrequencyPenaltyForModel(OpenAiApiModel.CODEX)).toBe(0);
            // @ts-ignore
            expect(OpenAiModelUtils.getDefaultFrequencyPenaltyForModel("some-other-model")).toBe(0);
        });
    });

    describe("getDefaultPresencePenaltyForModel", () => {
        it("returns the expected default presence penalty for each model", () => {
            expect(OpenAiModelUtils.getDefaultPresencePenaltyForModel(OpenAiApiModel.DAVINCI)).toEqual(0);
            expect(OpenAiModelUtils.getDefaultPresencePenaltyForModel(OpenAiApiModel.CURIE)).toEqual(0);
            expect(OpenAiModelUtils.getDefaultPresencePenaltyForModel(OpenAiApiModel.BABBAGE)).toEqual(0);
            expect(OpenAiModelUtils.getDefaultPresencePenaltyForModel(OpenAiApiModel.ADA)).toEqual(0);
            expect(OpenAiModelUtils.getDefaultPresencePenaltyForModel(OpenAiApiModel.CONTENT_FILTER)).toEqual(0);
            expect(OpenAiModelUtils.getDefaultPresencePenaltyForModel(OpenAiApiModel.CODEX)).toEqual(0);
            // @ts-ignore
            expect(OpenAiModelUtils.getDefaultPresencePenaltyForModel("unknown")).toEqual(0);
        });
    });

});
