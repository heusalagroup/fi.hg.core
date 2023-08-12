// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    createOpenAiChatCompletionRequestDTO,
    explainOpenAiChatCompletionRequestDTO,
    isOpenAiChatCompletionRequestDTO,
} from "./OpenAiChatCompletionRequestDTO";
import {createOpenAiChatCompletionMessage} from "./OpenAiChatCompletionMessage";
import {OpenAiUserType} from "../../types/OpenAiUserType";
import {OpenAiModel} from "../../types/OpenAiModel";
import {createOpenAiChatCompletionFunctions} from "./OpenAiChatCompletionFunctions";

describe("OpenAiChatCompletionRequestDTO", () => {

    const validItem = {
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

    const inValidItem = {
        "frequency_penalty": "1",
        "max_tokens": 300,
        "messages": [
            {
                "content": ["Who manufactures volvo arr?"],
                "role": "user"
            }
        ],
        "model": "gpt-3.5-turbo-16k",
        "presence_penalty": 2,
        "temperature": 1,
        "top_p": 1
    };


    describe("createOpenAiChatCompletionRequestDTO", () => {

        it("creates valid OpenAiChatCompletionRequestDTO objects", () => {
            const item = createOpenAiChatCompletionRequestDTO(
                [createOpenAiChatCompletionMessage(
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
                    "frequency_penalty": 2,
                    "function_call": "none",
                    "functions": [
                        {
                            "description": "Function for testing",
                            "name": "testFunc",
                            "parameters": {
                                "props": "true",
                                "type": "json"
                            }
                        }
                    ],
                    "logit_bias": undefined,
                    "max_tokens": 0.5,
                    "messages": [
                        {
                            "content": "Who manufactures volvo?",
                            "role": "user"
                        }
                    ],
                    "model": "gpt-3.5-turbo-16k",
                    "n": 10,
                    "presence_penalty": 2,
                    "stop": undefined,
                    "stream": undefined,
                    "temperature": 1,
                    "top_p": 0.5,
                    "user": undefined
                }
            );

        });

    });

    describe("isOpenAiChatCompletionRequestDTO", () => {

        it("returns true for valid OpenAiChatCompletionRequestDTO objects", () => {

            expect(isOpenAiChatCompletionRequestDTO(validItem)).toBeTruthy();

        });

        it("returns false for inValid OpenAiChatCompletionRequestDTO objects", () => {

            expect(isOpenAiChatCompletionRequestDTO(inValidItem)).toBeFalsy();

        });

    });

    describe("explainOpenAiChatCompletionRequestDTO", () => {

        it("returns true if value is OpenAiChatCompletionRequestDTO", () => {
            expect(explainOpenAiChatCompletionRequestDTO(validItem)).toBeTruthy();
            expect(explainOpenAiChatCompletionRequestDTO(validItem)).toBe('OK');
        });

        it("returns a human-readable string explaining why the value is not a regular object", () => {

            expect(explainOpenAiChatCompletionRequestDTO(inValidItem)).toBe(
                "property \"messages\" not OpenAiChatCompletionMessageDTO: property \"content\" not string, property \"frequency_penalty\" not number or undefined"
            );

        });

    });

});
