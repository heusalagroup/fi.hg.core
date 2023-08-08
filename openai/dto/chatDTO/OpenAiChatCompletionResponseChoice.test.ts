// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    createOpenAiChatCompletionResponseChoice,
    explainOpenAiChatCompletionResponseChoice,
    isOpenAiChatCompletionResponseChoice,
    OpenAiChatCompletionResponseChoice
} from "./OpenAiChatCompletionResponseChoice";
import {createOpenAiChatCompletionMessage} from "./OpenAiChatCompletionMessage";
import {OpenAiUserType} from "../../types/OpenAiUserType";

describe("OpenAiChatCompletionResponseChoice", () => {
    let validItem = {
        "finish_reason": "stop",
        "index": 1,
        "message": {
            "content": "tell me a lie",
            "name": "tester",
            "role": "user"
        }} as OpenAiChatCompletionResponseChoice;
    describe("createOpenAiChatCompletionResponseChoice", () => {

        it("creates valid OpenAiChatCompletionResponseChoice objects", () => {
            const item = createOpenAiChatCompletionResponseChoice(
                1,
                createOpenAiChatCompletionMessage(
                    OpenAiUserType.USER,
                    "tell me a lie",
                    "tester",
                    undefined
                ),
                "stop"
            );

            expect(item).toBeTruthy();
            expect(item).toStrictEqual(
                {
                    "finish_reason": "stop",
                    "index": 1,
                    "message": {
                        "content": "tell me a lie",
                        "name": "tester",
                        "role": "user"
                    }
                }
            );
        });

    });

    describe("isOpenAiChatCompletionResponseChoice", () => {

        it("returns true for valid OpenAiChatCompletionResponseChoice objects", () => {
            expect(isOpenAiChatCompletionResponseChoice(validItem)).toBeTruthy();
        });

    });

    describe("explainOpenAiChatCompletionResponseChoice", () => {

        it("returns a human-readable string explaining why the value is not a regular object", () => {
            expect(explainOpenAiChatCompletionResponseChoice(validItem)).toBeTruthy();
            expect(explainOpenAiChatCompletionResponseChoice(validItem)).toStrictEqual(
                "property \"message\" property \"function_call\" Value had extra properties: "
            );

        });

    });

});
