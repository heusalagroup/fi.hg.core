// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpenAiChatCompletionRequestDTO, createOpenAiChatCompletionRequestDTO, isOpenAiChatCompletionRequestDTO, explainOpenAiChatCompletionRequestDTO } from "./OpenAiChatCompletionRequestDTO";

describe("OpenAiChatCompletionRequestDTO", () => {

    describe("createOpenAiChatCompletionRequestDTO", () => {

        it("creates valid OpenAiChatCompletionRequestDTO objects", () => {

        });

        it("throws an error if prompt is not a string", () => {

        });

        it("does not throw an error if model is not a valid OpenAiApiModel", () => {

        });


        it("throws an error if max_tokens is not a number", () => {

        });

        it("throws an error if temperature is not a number", () => {

        });

        it("throws an error if top_p is not a number", () => {

        });

        it("createOpenAiChatCompletionRequestDTO throws an error if frequency_penalty is not a number", () => {

        });

        it("createOpenAiChatCompletionRequestDTO throws an error if presence_penalty is not a number", () => {

        });

    });

    describe("isOpenAiChatCompletionRequestDTO", () => {

        it("returns true for valid OpenAiChatCompletionRequestDTO objects", () => {

        });

        it("returns false for non-object values", () => {

        });

        it("returns false for invalid OpenAiChatCompletionRequestDTO objects", () => {

        });

        it("returns false for objects with extra keys", () => {

        });

        it("returns false for objects with non-string prompt value", () => {

        });

        it("returns false for objects with non-OpenAiApiModel model value", () => {

        });

        it("returns false for objects with non-number max_tokens value", () => {

        });

        it("returns false for objects with non-number temperature value", () => {

        });

        it("returns false for objects with non-number top_p value", () => {

        });

        it("returns false for objects with non-number frequency_penalty value", () => {

        });

        it("returns false for objects with non-number presence_penalty value", () => {

        });

    });

    describe("explainOpenAiChatCompletionRequestDTO", () => {

        it("returns a human-readable string explaining why the value is not a regular object", () => {

        });

        it("returns a human-readable string explaining why the value has extra keys", () => {

        });

        it("returns a human-readable string explaining why the value has a non-string prompt property", () => {

        });

        it("returns a human-readable string explaining why the value has a non-OpenAiApiModel model property", () => {

        });

        it('returns a human-readable string explaining why the value has a non-number max_tokens property', () => {

        });

        it("returns a human-readable string explaining why the value has a non-number temperature property", () => {

        });

        it("returns a human-readable string explaining why the value has a non-number top_p property", () => {

        });

        it("returns a human-readable string explaining why the value has a non-number frequency_penalty property", () => {

        });

        it('returns a human-readable string explaining why the value has a non-number presence_penalty property', () => {

        });

    });

});
