// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    createOpenAiChatCompletionResponseChoice,
    explainOpenAiChatCompletionResponseChoice,
    isOpenAiChatCompletionResponseChoice,
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
        }};

    let inValidItem = {
        "finish_reason": 100,
        "index": 1,
        "message": {
            "content": ["Can I add array here ?"],
            "name": "tester",
            "role": "owner"
        }};
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

        it("returns false for inValid OpenAiChatCompletionResponseChoice objects", () => {
            expect(isOpenAiChatCompletionResponseChoice(inValidItem)).toBeFalsy();
        });

    });

    describe("explainOpenAiChatCompletionResponseChoice", () => {

        it("returns true if value is OpenAiChatCompletionResponseChoice", () => {

            expect(explainOpenAiChatCompletionResponseChoice(validItem)).toBeTruthy();
            expect(explainOpenAiChatCompletionResponseChoice(validItem)).toStrictEqual(
                "OK"
            );

        });

        it("returns a human-readable string explaining why the value is not a regular object", () => {

            expect(explainOpenAiChatCompletionResponseChoice(inValidItem)).toContain(
                "property \"message\" property \"role\" incorrect enum value \"undefined\" for OpenAiUserType: Accepted values "
            );
        });

    });

});
