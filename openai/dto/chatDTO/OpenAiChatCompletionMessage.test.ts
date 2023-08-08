// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    createOpenAiChatCompletionMessage,
    explainOpenAiChatCompletionMessage,
    isOpenAiChatCompletionMessage,
    OpenAiChatCompletionMessage
} from "./OpenAiChatCompletionMessage";
import {OpenAiUserType} from "../../types/OpenAiUserType";

describe("OpenAiChatCompletionMessageDTO", () => {

    describe("createOpenAiChatCompletionMessageDTO", () => {

        it("creates valid OpenAiChatCompletionMessageDTO objects", () => {
            const message = createOpenAiChatCompletionMessage(
                OpenAiUserType.USER,
                "what is a banana?"
            );

            expect(message).toStrictEqual({"content": "what is a banana?", "role": "user"})
        });

    });

    describe("isOpenAiChatCompletionMessageDTO", () => {

        it("returns true for valid OpenAiChatCompletionMessageDTO objects", () => {
            const message = {"content": "what is a banana?", "role": "user"};

            expect(isOpenAiChatCompletionMessage(message)).toBeTruthy();
        });

    });

    describe("explainOpenAiChatCompletionMessageDTO", () => {

        it("returns true if value is OpenAiChatCompletionMessageDTO", () => {
            const validMessage = {"role": "user", "content": "what is a banana?"};

            expect(explainOpenAiChatCompletionMessage(validMessage)).toBeTruthy();

        });

        it("returns a human-readable string explaining why the value is not a OpenAiChatCompletionMessageDTO", () => {
            const inValidMessage = {"content": "what is a banana?", "role": "tester"};

            expect(explainOpenAiChatCompletionMessage(inValidMessage)).toBe(
                "property \"role\" incorrect enum value \"undefined\" for OpenAiUserType: Accepted values user, system, assistant"
            );
        });

    });

});
