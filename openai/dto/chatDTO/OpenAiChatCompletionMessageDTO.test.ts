// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    createOpenAiChatCompletionMessageDTO,
    explainOpenAiChatCompletionMessageDTO,
    isOpenAiChatCompletionMessageDTO,
    OpenAiChatCompletionMessageDTO
} from "./OpenAiChatCompletionMessageDTO";
import {OpenAiUserType} from "../../types/OpenAiUserType";

xdescribe("OpenAiChatCompletionMessageDTO", () => {

    describe("createOpenAiChatCompletionMessageDTO", () => {

        it("creates valid OpenAiChatCompletionMessageDTO objects", () => {
            const message = createOpenAiChatCompletionMessageDTO(
                OpenAiUserType.USER,
                "what is a banana?"
            );

            expect(message).toStrictEqual({"content": "what is a banana?", "role": "user"})
        });

    });

    describe("isOpenAiChatCompletionMessageDTO", () => {

        it("returns true for valid OpenAiChatCompletionMessageDTO objects", () => {
            const message = {"content": "what is a banana?", "role": "user"};

            expect(isOpenAiChatCompletionMessageDTO(message)).toBeTruthy();
        });

    });

    describe("explainOpenAiChatCompletionMessageDTO", () => {

        it("returns true if value is OpenAiChatCompletionMessageDTO", () => {
            const validMessage = {"role": "user", "content": "what is a banana?"};

            expect(explainOpenAiChatCompletionMessageDTO(validMessage)).toBeTruthy();

        });

        it("returns a human-readable string explaining why the value is not a regular object", () => {
            const inValidMessage = {"content": "what is a banana?", "role": "tester"};

            expect(explainOpenAiChatCompletionMessageDTO(inValidMessage)).toBe(
                "property \"role\" incorrect enum value \"undefined\" for OpenAiUserType: Accepted values user, system, assistant, property \"function_call\" not regular object, Value had extra properties: , " +
                "property \"name\" not string, property \"args\" not string"
            );
        });

    });

});
