// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    createOpenAiChatCompletionMessage,
    explainOpenAiChatCompletionMessage,
    isOpenAiChatCompletionMessage,
} from "./OpenAiChatCompletionMessage";
import {OpenAiUserType} from "../../types/OpenAiUserType";

describe("OpenAiChatCompletionMessage", () => {

    describe("createOpenAiChatCompletionMessage", () => {

        it("creates valid OpenAiChatCompletionMessage objects", () => {
            const message = createOpenAiChatCompletionMessage(
                OpenAiUserType.USER,
                "what is a banana?"
            );

            expect(message).toStrictEqual({"content": "what is a banana?", "role": "user"})
        });

    });

    describe("isOpenAiChatCompletionMessage", () => {

        it("returns true for valid OpenAiChatCompletionMessage objects", () => {
            const message = {"content": "what is a banana?", "role": "user"};

            expect(isOpenAiChatCompletionMessage(message)).toBeTruthy();
        });

    });

    describe("explainOpenAiChatCompletionMessage", () => {

        it("returns true if value is OpenAiChatCompletionMessage", () => {
            const validMessage = {"role": "user", "content": "what is a banana?"};

            expect(explainOpenAiChatCompletionMessage(validMessage)).toBeTruthy();

        });

        it("returns a human-readable string explaining why the value is not a OpenAiChatCompletionMessage", () => {
            const inValidMessage = {"content": "what is a banana?", "role": "tester"};

            expect(explainOpenAiChatCompletionMessage(inValidMessage)).toContain(
                "property \"role\" incorrect enum value \"undefined\" for OpenAiUserType: Accepted values "
            );
        });

    });

});
