// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
/**
 * @module
 * @overview
 *
 * Mocked version of `OpenAiClient` for testing purposes.
 *
 * Usage example:
 *
 * ```typescript
 * import { HgAiCommandServiceImpl } from "./HgAiCommandServiceImpl";
 * import { MockOpenAiClient } from "./MockOpenAiClient";
 *
 * describe("HgAiCommandServiceImpl", () => {
 *   let service: HgAiCommandServiceImpl;
 *   let client: MockOpenAiClient;
 *
 *   beforeEach(() => {
 *     client = new MockOpenAiClient();
 *     service = new HgAiCommandServiceImpl(client);
 *   });
 *
 *   // Your tests go here
 * });
 * ```
 *
 */

import { OpenAiModel } from "../openai/types/OpenAiModel";
import { OpenAiCompletionResponseDTO } from "../openai/dto/OpenAiCompletionResponseDTO";
import { OpenAiEditResponseDTO } from "../openai/dto/OpenAiEditResponseDTO";
import { OpenAiClient } from "../openai/OpenAiClient";

/**
 * Mocked version of `OpenAiClient` for testing purposes.
 *
 * Usage example:
 *
 * ```typescript
 * import { HgAiCommandServiceImpl } from "./HgAiCommandServiceImpl";
 * import { MockOpenAiClient } from "./MockOpenAiClient";
 *
 * describe("HgAiCommandServiceImpl", () => {
 *   let service: HgAiCommandServiceImpl;
 *   let client: MockOpenAiClient;
 *
 *   beforeEach(() => {
 *     client = new MockOpenAiClient();
 *     service = new HgAiCommandServiceImpl(client);
 *   });
 *
 *   // Your tests go here
 * });
 * ```
 */
export class MockOpenAiClient implements OpenAiClient {

    getUrl(): string {
        return "";
    }

    async getCompletion(
        prompt             : string,
        model             ?: OpenAiModel | string | undefined,
        max_tokens        ?: number | undefined,
        temperature       ?: number | undefined,
        top_p             ?: number | undefined,
        frequency_penalty ?: number | undefined,
        presence_penalty  ?: number | undefined
    ): Promise<OpenAiCompletionResponseDTO> {
        return {} as OpenAiCompletionResponseDTO;
    }

    async getEdit(
        instruction        : string,
        input             ?: string | undefined,
        model             ?: OpenAiModel | string | undefined,
        n                 ?: number | undefined,
        temperature       ?: number | undefined,
        top_p             ?: number | undefined
    ): Promise<OpenAiEditResponseDTO> {
        return {} as OpenAiEditResponseDTO;
    }

}
