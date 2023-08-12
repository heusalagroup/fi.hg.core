// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    createOpenAiChatCompletionFunctionCall,
    explainOpenAiChatCompletionFunctionCall,
    isOpenAiChatCompletionFunctionCall
} from "./OpenAiChatCompletionFunctionCall";

describe("OpenAiChatCompletionFunctionCall", () => {
    const validItem = createOpenAiChatCompletionFunctionCall(
        "testFunc",
        "0,7 true"
    );

    const inValidItem = {"name": "testFunc", "role": "tester"};

    describe("createOpenAiChatCompletionFunctionCall", () => {

        it("creates valid OpenAiChatCompletionFunctionCall objects", () => {

            expect(validItem).toBeTruthy();
            expect(validItem).toStrictEqual(
                {"args": "0,7 true", "name": "testFunc"}
            );
        });

    });

    describe("isOpenAiChatCompletionFunctionCall", () => {

        it("returns true for valid OpenAiChatCompletionFunctionCall objects", () => {
            expect(isOpenAiChatCompletionFunctionCall(validItem)).toBeTruthy();
        });

    });

    describe("explainOpenAiChatCompletionFunctionCall", () => {

        it("returns true if value is OpenAiChatCompletionFunctionCall", () => {
            expect(explainOpenAiChatCompletionFunctionCall(validItem)).toBeTruthy();
        });

        it("returns a human-readable string explaining why the value is not a OpenAiChatCompletionFunctionCall", () => {
            expect(explainOpenAiChatCompletionFunctionCall(inValidItem)).toBe(
                "Value had extra properties: role, property \"args\" not string"
            )
        });

    });

});
