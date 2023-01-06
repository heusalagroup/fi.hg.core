// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainOpenApiModel, isOpenApiModel, OpenAiApiModel, parseOpenApiModel, stringifyOpenApiModel } from "./OpenAiApiModel";

describe("OpenAiApiModel", () => {

    describe("isOpenApiModel", () => {

        it("should return true for valid models", () => {
            expect(isOpenApiModel(OpenAiApiModel.DAVINCI)).toBe(true);
            expect(isOpenApiModel(OpenAiApiModel.CURIE)).toBe(true);
            expect(isOpenApiModel(OpenAiApiModel.BABBAGE)).toBe(true);
            expect(isOpenApiModel(OpenAiApiModel.ADA)).toBe(true);
            // expect(isOpenApiModel(OpenAiApiModel.NEWTON)).toBe(true);
            // expect(isOpenApiModel(OpenAiApiModel.LOVE)).toBe(true);
            expect(isOpenApiModel(OpenAiApiModel.CODEX)).toBe(true);
            // expect(isOpenApiModel(OpenAiApiModel.POPPY)).toBe(true);
            expect(isOpenApiModel(OpenAiApiModel.CONTENT_FILTER)).toBe(true);
        });

        it("should return false for invalid models", () => {
            expect(isOpenApiModel(null)).toBe(false);
            expect(isOpenApiModel(undefined)).toBe(false);
            expect(isOpenApiModel("")).toBe(false);
            expect(isOpenApiModel("invalid")).toBe(false);
            expect(isOpenApiModel(123)).toBe(false);
            expect(isOpenApiModel({})).toBe(false);
            expect(isOpenApiModel([])).toBe(false);
        });

    });

    describe("explainOpenApiModel", () => {
        it("should return 'incorrect enum value' message for invalid values", () => {
            expect(explainOpenApiModel("invalid")).toMatch(/incorrect enum value "invalid" for OpenApiModel/);
            expect(explainOpenApiModel(123)).toMatch(/incorrect enum value "123" for OpenApiModel/);
            expect(explainOpenApiModel(null)).toMatch(/incorrect enum value "null" for OpenApiModel/);
            expect(explainOpenApiModel(undefined)).toMatch(/incorrect enum value "undefined" for OpenApiModel/);
        });

        it("should return OK message for valid values", () => {
            expect(explainOpenApiModel(OpenAiApiModel.DAVINCI)).toBe("OK");
            expect(explainOpenApiModel(OpenAiApiModel.CURIE)).toBe("OK");
            expect(explainOpenApiModel(OpenAiApiModel.BABBAGE)).toBe("OK");
            expect(explainOpenApiModel(OpenAiApiModel.ADA)).toBe("OK");
            // expect(explainOpenApiModel(OpenAiApiModel.LOVELACE)).toBe("OK");
        });
    });

    describe('stringifyOpenApiModel', () => {
        it('should return the string representation of the OpenAiApiModel', () => {
            expect(stringifyOpenApiModel(OpenAiApiModel.DAVINCI)).toEqual('text-davinci-003');
            expect(stringifyOpenApiModel(OpenAiApiModel.CURIE)).toEqual('text-curie-001');
            expect(stringifyOpenApiModel(OpenAiApiModel.BABBAGE)).toEqual('text-babbage-001');
            expect(stringifyOpenApiModel(OpenAiApiModel.ADA)).toEqual('text-ada-001');
        });
    });

    describe("parseOpenApiModel", () => {

        it("parses a string representation of a model into the corresponding enum value", () => {
            expect(parseOpenApiModel("text-davinci-003")).toEqual(OpenAiApiModel.DAVINCI);
            expect(parseOpenApiModel("text-curie-001")).toEqual(OpenAiApiModel.CURIE);
            expect(parseOpenApiModel("text-babbage-001")).toEqual(OpenAiApiModel.BABBAGE);
            expect(parseOpenApiModel("text-ada-001")).toEqual(OpenAiApiModel.ADA);
            // expect(parseOpenApiModel("text-lovelace-002")).toEqual(OpenAiApiModel.LOVELACE);
        });

        it("returns undefined if the given string is not a valid model", () => {
            expect(parseOpenApiModel("")).toBeUndefined();
            expect(parseOpenApiModel("invalid-model")).toBeUndefined();
            expect(parseOpenApiModel("text-davinci-004")).toBeUndefined();
        });

    });

});
