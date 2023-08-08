// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    createOpenAiChatCompletionRequestDTO,
    explainOpenAiChatCompletionRequestDTO,
    isOpenAiChatCompletionRequestDTO,
    OpenAiChatCompletionRequestDTO
} from "./OpenAiChatCompletionRequestDTO";
import {createOpenAiChatCompletionMessageDTO} from "./OpenAiChatCompletionMessageDTO";
import {OpenAiUserType} from "../../types/OpenAiUserType";
import {OpenAiModel} from "../../types/OpenAiModel";
import {createOpenAiChatCompletionFunctions} from "./OpenAiChatCompletionFunctions";

xdescribe("OpenAiChatCompletionRequestDTO", () => {

    describe("createOpenAiChatCompletionRequestDTO", () => {

        it("creates valid OpenAiChatCompletionRequestDTO objects", () => {
            const item = createOpenAiChatCompletionRequestDTO(
                [createOpenAiChatCompletionMessageDTO(
                    OpenAiUserType.USER,
                    "Who manufactures volvo?",
                )],
                OpenAiModel.GPT_3_5_TURBO_16K,
                [createOpenAiChatCompletionFunctions(
                    "testFunc",
                    {"type": "json", "props": "true"},
                    "Function for testing"
                )],
                0.5,
                1,
                0.5,
                2,
                2,
                "none",
                10,
                false,
                undefined,
                undefined,
                undefined
            );

            expect(item).toBeTruthy();
            expect(item).toHaveProperty("frequency_penalty");
            expect(item).toHaveProperty("max_tokens");
            expect(item).toHaveProperty("messages");
            expect(item).toHaveProperty("model");
            expect(item).toHaveProperty("presence_penalty");
            expect(item).toHaveProperty("temperature");
            expect(item).toHaveProperty("top_p");

            expect(item).toStrictEqual(
                {
                    "frequency_penalty": 0.5,
                    "max_tokens": 300,
                    "messages": [
                        {
                            "content": "Who manufactures volvo?",
                            "role": "user"
                        }
                    ],
                    "model": "gpt-3.5-turbo-16k",
                    "presence_penalty": 2,
                    "temperature": 0.5,
                    "top_p": 1
                }
            );

        });

    });

    describe("isOpenAiChatCompletionRequestDTO", () => {

        it("returns true for valid OpenAiChatCompletionRequestDTO objects", () => {
            const item = {
                "frequency_penalty": 1,
                "max_tokens": 300,
                "messages": [
                    {
                        "content": "Who manufactures volvo?",
                        "role": "user"
                    }
                ],
                "model": "gpt-3.5-turbo-16k",
                "presence_penalty": 2,
                "temperature": 1,
                "top_p": 1
            };

            expect(isOpenAiChatCompletionRequestDTO(item)).toBeTruthy();
        });

    });

    describe("explainOpenAiChatCompletionRequestDTO", () => {

        it("returns a human-readable string explaining why the value is not a regular object", () => {
            const item = {
                "frequency_penalty": 1,
                "max_tokens": 300,
                "messages": [
                    {
                        "content": "Who manufactures volvo?",
                        "role": "user"
                    }
                ],
                "model": "gpt-3.5-turbo-16k",
                "presence_penalty": 2,
                "temperature": 1,
                "top_p": 1
            };

            expect(explainOpenAiChatCompletionRequestDTO(item)).toBe('')
        });

    });

});
