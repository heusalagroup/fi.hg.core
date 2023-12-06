// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { jest } from "@jest/globals";
import { HgAiCommandServiceImpl } from "./HgAiCommandServiceImpl";
import { MockOpenAiClient } from "../../mocks/MockOpenAiClient";
import { createOpenAiCompletionResponseDTO } from "../../openai/dto/OpenAiCompletionResponseDTO";
import { createOpenAiEditResponseDTO, OpenAiEditResponseDTO } from "../../openai/dto/OpenAiEditResponseDTO";
import { createOpenAiCompletionResponseChoice } from "../../openai/dto/OpenAiCompletionResponseChoice";
import { createOpenAiCompletionResponseUsage } from "../../openai/dto/OpenAiCompletionResponseUsage";
import { CommandExitStatus } from "../types/CommandExitStatus";
import { createOpenAiEditResponseChoice } from "../../openai/dto/OpenAiEditResponseChoice";
import { createOpenAiEditResponseUsage } from "../../openai/dto/OpenAiEditResponseUsage";
import { OpenAiErrorDTO } from "../../openai/dto/OpenAiErrorDTO";
import { writeTestsInstruction } from "../../openai/instructions/writeTestsInstruction";
import { exampleTypeScriptTest } from "../../openai/instructions/exampleTypeScriptTest";
import { LogLevel } from "../../types/LogLevel";

describe("HgAiCommandServiceImpl", () => {
    let service: HgAiCommandServiceImpl;
    let client: MockOpenAiClient;
    let consoleSpy : jest.SpiedFunction<any>;
    let warnConsoleSpy : jest.SpiedFunction<any>;
    let errorConsoleSpy : jest.SpiedFunction<any>;

    beforeEach(() => {
        HgAiCommandServiceImpl.setLogLevel(LogLevel.NONE);
        client = new MockOpenAiClient();
        service = new HgAiCommandServiceImpl(client);
        consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
        warnConsoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
        errorConsoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        consoleSpy.mockRestore();
        warnConsoleSpy.mockRestore();
        errorConsoleSpy.mockRestore();
    });

    describe("setModel", () => {
        it("should set the model property correctly", () => {
            const model = "text-davinci-002";
            service.setModel(model);
            expect(service["_model"]).toEqual(model);
        });
    });

    describe("setStop", () => {
        it("should set the stop property correctly", () => {
            const stop = ".";
            service.setStop(stop);
            expect(service["_stop"]).toEqual(stop);
        });
    });

    describe("setUser", () => {
        it("should set the user property correctly", () => {
            const user = "user1";
            service.setUser(user);
            expect(service["_user"]).toEqual(user);
        });
    });

    describe("setLogProbs", () => {
        it("should set the logProbs property correctly", () => {
            const logProbs = 10;
            service.setLogProbs(logProbs);
            expect(service["_logProbs"]).toEqual(logProbs);
        });
    });

    describe("setBestOf", () => {
        it("should set the bestOf property correctly", () => {
            const bestOf = 2;
            service.setBestOf(bestOf);
            expect(service["_bestOf"]).toEqual(bestOf);
        });
    });

    describe("setPresencePenalty", () => {
        it("should set the presencePenalty property correctly", () => {
            const presencePenalty = 0.5;
            service.setPresencePenalty(presencePenalty);
            expect(service["_presencePenalty"]).toEqual(presencePenalty);
        });
    });

    describe("setFrequencyPenalty", () => {
        it("should set the 'frequencyPenalty' property correctly", () => {
            const frequencyPenalty = 0.2;
            service.setFrequencyPenalty(frequencyPenalty);
            expect(service["_frequencyPenalty"]).toEqual(frequencyPenalty);
        });
    });

    describe("setEcho", () => {
        it("should set the 'echo' property correctly", () => {
            const value = true;
            service.setEcho(value);
            expect(service["_echo"]).toEqual(value);
        });
    });

    describe("setN", () => {
        it("should set the 'n' property correctly", () => {
            const value = 1;
            service.setN(value);
            expect(service["_n"]).toEqual(value);
        });
    });

    describe("setTopP", () => {
        it("should set the 'topP' property correctly", () => {
            const value = 0.2;
            service.setTopP(value);
            expect(service["_topP"]).toEqual(value);
        });
    });

    describe("setTemperature", () => {
        it("should set the 'temperature' property correctly", () => {
            const value = 0.2;
            service.setTemperature(value);
            expect(service["_temperature"]).toEqual(value);
        });
    });

    describe("setMaxTokens", () => {
        it("should set the 'maxTokens' property correctly", () => {
            const value = 2000;
            service.setMaxTokens(value);
            expect(service["_maxTokens"]).toEqual(value);
        });
    });

    describe("completion", () => {

        it("should call the getCompletion method on the OpenAiClient with the correct parameters", async () => {
            const spy = jest.spyOn(client, "getCompletion");
            const prompt = "The quick brown fox jumps over the lazy dog.";
            const model = "text-davinci-002";
            const maxTokens = 100;
            const temperature = 0.5;
            const topP = 0.8;
            const frequencyPenalty = 0.2;
            const presencePenalty = 0.9;
            service.setModel(model);
            service.setMaxTokens(maxTokens);
            service.setTemperature(temperature);
            service.setTopP(topP);
            service.setFrequencyPenalty(frequencyPenalty);
            service.setPresencePenalty(presencePenalty);
            await service.completion([prompt]);
            expect(spy).toHaveBeenCalledWith(
                prompt,
                model,
                maxTokens,
                temperature,
                topP,
                frequencyPenalty,
                presencePenalty
            );
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it("should return the correct value from the getCompletion method", async () => {

            const response = createOpenAiCompletionResponseDTO(
                "abc123",
                'test-object',
                12345678,
                'text-davinci-002',
                [
                    createOpenAiCompletionResponseChoice(
                        'The quick brown fox jumps over the lazy dog and goes back to his den.',
                        0,
                        null,
                        'stop',
                    )
                ],
                createOpenAiCompletionResponseUsage(
                    100,
                    100,
                    100
                )
            );

            jest.spyOn(client, "getCompletion").mockResolvedValue(response);

            const resultCode = await service.completion(["The quick brown fox jumps over the lazy dog."]);

            expect(resultCode).toEqual(CommandExitStatus.OK);

            expect(consoleSpy).toHaveBeenCalledWith("The quick brown fox jumps over the lazy dog and goes back to his den.");
            expect(consoleSpy).toHaveBeenCalledTimes(1);

        });

    });

    describe("edit", () => {

        it("should call the getEdit method on the OpenAiClient", async () => {
            const spy = jest.spyOn(client, "getEdit");
            const input = "The quick brown fox jumps over the lazy dog.";
            const instruction = "Change 'quick' to 'fast' and 'lazy' to 'sleepy'";
            await service.edit([instruction, input]);
            expect(spy).toHaveBeenCalledWith(instruction, input);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it("should call the getEdit method on the OpenAiClient with the correct parameters", async () => {
            const spy = jest.spyOn(client, "getEdit");
            const input = "The quick brown fox jumps over the lazy dog.";
            const instruction = "Change 'quick' to 'fast' and 'lazy' to 'sleepy'";
            const model = "text-davinci-002";
            const n = 100;
            const temperature = 0.5;
            const topP = 0.8;
            const frequencyPenalty = 0.2;
            const presencePenalty = 0.9;

            service.setModel(model);
            service.setN(n);
            service.setTemperature(temperature);
            service.setTopP(topP);
            service.setFrequencyPenalty(frequencyPenalty);
            service.setPresencePenalty(presencePenalty);

            await service.edit([instruction, input]);
            expect(spy).toHaveBeenCalledWith(
                instruction,
                input,
                model,
                n,
                temperature,
                topP
            );
            expect(spy).toHaveBeenCalledTimes(1);

        });

        it("should return the correct value from the getEdit method", async () => {
            const response: OpenAiEditResponseDTO = createOpenAiEditResponseDTO(
                'test-object',
                1234567,
                [
                    createOpenAiEditResponseChoice(
                        'The fast brown fox jumps over the sleepy dog.',
                        0,
                        null,
                        'stop'
                    ),
                    createOpenAiEditResponseChoice(
                        'The quick brown fox jumps over the sleepy dog.',
                        1,
                        null,
                        'stop'
                    )
                ],
                createOpenAiEditResponseUsage(
                    100,
                    100,
                    100
                )
            );
            jest.spyOn(client, "getEdit").mockResolvedValue(response);
            const resultCode = await service.edit(
                [
                    "The quick brown fox jumps over the lazy dog.",
                    "Change 'quick' to 'fast' and 'lazy' to 'sleepy'"
                ]
            );

            expect(resultCode).toEqual(CommandExitStatus.OK);

            expect(consoleSpy).toHaveBeenCalledWith("The fast brown fox jumps over the sleepy dog.");
            expect(consoleSpy).toHaveBeenCalledTimes(1);

        });

    });

    describe("test", () => {

        it("should call the getEdit method on the OpenAiClient with the correct parameters", async () => {
            const spyGetEdit = jest.spyOn(client, "getEdit");

            const input = `export class FooService {
    
    private _foo : readonly Foo[];
    
    public constructor () {
        this._foo = [];
    }
    
    public addFoo (name : string) : Foo {
        const obj = createFoo(name);
        this._foo.push(foo);
        EventService.triggerEvent("added:foo", name);
        return createFoo(obj.name);
    }
    
}
`;

            const examples = exampleTypeScriptTest('ExampleClassName', 'exampleMethodName', 'should ...');
            const instruction = writeTestsInstruction('TypeScript', 'Jest', examples);

            await service.test([input]);

            expect(spyGetEdit).toHaveBeenCalledWith(
                instruction,
                input,
                "code-davinci-edit-001",
                1,
                0
            );
            expect(spyGetEdit).toHaveBeenCalledTimes(1);

        });

        it("should return CommandExitStatus.OK if the getEdit method returns a valid response", async () => {
            const spy = jest.spyOn(client, "getEdit").mockResolvedValue(createOpenAiEditResponseDTO(
                'test-object',
                1234567,
                [
                    createOpenAiEditResponseChoice(
                        'The quick brown fox jumps over the lazy dog.',
                        0,
                        null,
                        'stop'
                    ),
                    createOpenAiEditResponseChoice(
                        'The quick brown fox jumps over the lazy cat.',
                        1,
                        null,
                        'stop'
                    )
                ],
                createOpenAiEditResponseUsage(
                    100,
                    100,
                    100
                )
            ));

            // Act
            const result = await service.test(["The quick brown fox jumps over the lazy dog."]);

            // Assert
            expect(result).toEqual(CommandExitStatus.OK);
            expect(spy).toHaveBeenCalledTimes(1);

        });

        it("should not return CommandExitStatus.OK if the getEdit method returns an error response", async () => {
            const error: OpenAiErrorDTO = {
                error: {
                    message: 'An error occurred',
                    type: 'unknown_error'
                }
            };
            jest.spyOn(client, "getEdit").mockRejectedValue(error);
            const resultCode = await service.test(
                [
                    'instruction',
                ]
            );
            expect(resultCode).not.toEqual(CommandExitStatus.OK);
        });

    });

    describe.skip("main", () => {
        // TODO:
    });

});
