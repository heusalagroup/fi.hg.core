// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CommandExitStatus } from "../types/CommandExitStatus";
import { HgAiCommandService } from "./HgAiCommandService";
import { OpenAiClient } from "../../openai/OpenAiClient";
import { isOpenAiErrorDTO } from "../../openai/dto/OpenAiErrorDTO";
import { OpenAiErrorDTO } from "../../openai/dto/OpenAiErrorDTO";
import { map } from "../../functions/map";
import { OpenAiEditResponseDTO } from "../../openai/dto/OpenAiEditResponseDTO";
import { isOpenAiEditResponseChoice, OpenAiEditResponseChoice } from "../../openai/dto/OpenAiEditResponseChoice";
import { OpenAiCompletionResponseDTO } from "../../openai/dto/OpenAiCompletionResponseDTO";
import { isOpenAiCompletionResponseChoice, OpenAiCompletionResponseChoice } from "../../openai/dto/OpenAiCompletionResponseChoice";
import { readFileSync, existsSync } from "fs";
import { OpenAiModel } from "../../openai/types/OpenAiModel";
import { filter } from "../../functions/filter";
import { OpenAiError } from "../../openai/dto/OpenAiError";
import { writeTestsInstruction } from "../../openai/instructions/writeTestsInstruction";
import { exampleTypeScriptTest } from "../../openai/instructions/exampleTypeScriptTest";
import { documentCodeInstruction } from "../../openai/instructions/documentCodeInstruction";
import { describeCodeInstruction } from "../../openai/instructions/describeCodeInstruction";

export class HgAiCommandServiceImpl implements HgAiCommandService {

    private _iterations : number | undefined;
    private _client: OpenAiClient;
    private _suffix: string | undefined;
    private _language: string | undefined;
    private _model: OpenAiModel | string | undefined;
    private _echo: boolean | undefined;
    private _user: string | undefined;
    private _stop: string | undefined; // String or Array of strings
    private _logProbs: number | undefined; // Integer
    private _bestOf: number | undefined; // Integer
    private _maxTokens: number | undefined; // Integer
    private _n: number | undefined; // Integer
    private _frequencyPenalty: number | undefined; // Float
    private _presencePenalty: number | undefined; // Float
    private _topP: number | undefined; // Float
    private _temperature: number | undefined; // Float

    /**
     * Construct a command line service for `hg ai` command
     *
     * @param client
     */
    public constructor (
        client: OpenAiClient
    ) {
        this._client = client;
    }

    public setIterations (value : number | undefined) : void {
        this._iterations = value;
    }

    public setLanguage (value: string|undefined): void {
        this._language = value;
    }

    public setSuffix (value: string|undefined): void {
        this._suffix = value;
    }

    /**
     * Sets the model to use for the next call to OpenAI API
     * @param value
     */
    public setModel (value: string|undefined): void {
        this._model = value;
    }

    /**
     * Sets the stop option for the next call to OpenAI API
     * @param value
     */
    public setStop (value: string|undefined): void {
        this._stop = value;
    }

    /**
     * Sets the user option for the next call to OpenAI API
     * @param value
     */
    public setUser (value: string|undefined): void {
        this._user = value;
    }

    /**
     * Sets the logProbs option for the next call to OpenAI API
     * @param value
     */
    public setLogProbs (value: number | undefined): void {
        this._logProbs = value;
    }

    /**
     * Sets the best of option for the next call to OpenAI API
     * @param value
     */
    public setBestOf (value: number | undefined): void {
        this._bestOf = value;
    }

    /**
     * Sets the presence penalty option for the next call to OpenAI API
     * @param value
     */
    public setPresencePenalty (value: number | undefined): void {
        this._presencePenalty = value;
    }

    /**
     * Sets the frequency penalty property for the next call to OpenAI API
     * @param value
     */
    public setFrequencyPenalty (value: number | undefined): void {
        this._frequencyPenalty = value;
    }

    /**
     * Sets the echo property for the next call to OpenAI API
     * @param value
     */
    public setEcho (value: boolean): void {
        this._echo = value;
    }

    /**
     * Sets the n property for the next call to OpenAI API
     * @param value
     */
    public setN (value: number | undefined): void {
        this._n = value;
    }

    /**
     * Sets the topP property for the next call to OpenAI API
     *
     * @param value
     */
    public setTopP (value: number | undefined): void {
        this._topP = value;
    }

    /**
     * Sets the temperature property for next call to OpenAI API
     * @param value
     */
    public setTemperature (value: number | undefined): void {
        this._temperature = value;
    }

    /**
     * Set's the max tokens property for next call to OpenAI API
     *
     * @param value
     */
    public setMaxTokens (value: number | undefined): void {
        this._maxTokens = value;
    }

    /**
     * The main command line handler.
     *
     * It is intended to be called when user calls `hg ai ...` with the remaining
     * arguments as `args` option.
     *
     * Example 1: `main(['completion', ...])` will call `completion([...])`
     * Example 2: `main(['comp', ...])` will call `completion([...])`
     * Example 3: `main(['c', ...])` will call `completion([...])`
     * Example 4: `main(['edit', ...])` will call `edit([...])`
     * Example 5: `main(['e', ...])` will call `edit([...])`
     * Example 6: `main(['test', ...])` will call `test([...])`
     * Example 7: `main(['t', ...])` will call `test([...])`
     *
     * @param args
     */
    public async main (args: readonly string[]): Promise<CommandExitStatus> {
        if ( args.length === 0 ) {
            return CommandExitStatus.USAGE;
        }
        try {
            const [ arg, ...freeArgs ] = args;
            switch (arg) {

                case 'c':
                case 'comp':
                case 'completion':
                    return await this.completion(freeArgs);

                case 'e':
                case 'edit':
                    return await this.edit(freeArgs);

                case 't':
                case 'test':
                    return await this.test(freeArgs);

                case 'd':
                case 'doc':
                case 'document':
                    return await this.document(freeArgs);

                case 'dd':
                case 'desc':
                case 'describe':
                    return await this.describe(freeArgs);

            }
            console.error(`Unknown command: ${arg}`);
            return CommandExitStatus.COMMAND_NOT_FOUND;
        } catch (err) {
            const body: unknown | OpenAiErrorDTO = (err as any)?.body;
            if ( isOpenAiErrorDTO(body) ) {
                console.error(`ERROR: [${body.error.type}] ${body.error.message}`);
                return CommandExitStatus.GENERAL_ERRORS;
            } else {
                throw err;
            }
        }
    }

    /**
     * OpenAI edit action
     *
     * Example 1: `edit(['Fix the spelling mistakes', 'What day of the wek is it?'])`
     * will print out `"What day of the week is it?"`.
     *
     * Example 2: `edit(['Write a function in python that calculates fibonacci'])`
     * will print out Python implementation of fibonacci function.
     *
     * Example 3: `edit(['Rename the function to fib', 'def fibonacci(num):
     *     if num <= 1:
     *         return num
     *     else:
     *         return fib(num-1) + fib(num-2)
     * print(fibonacci(10))'])` will print out:
     * ```python
     * def fib(num):
     *     if num <= 1:
     *           return num
     *       else:
     *         return fib(num-1) + fib(num-2)
     * print(fib(10))
     * ```
     *
     * @param args
     */
    public async edit (args: readonly string[]): Promise<CommandExitStatus> {
        if ( args.length === 0 ) {
            return CommandExitStatus.USAGE;
        }

        const [ instruction, ...freeArgs ] = await this._populateFiles(args);
        const input: string = freeArgs.join('\n\n');

        const model: string | undefined = this._model;
        const temperature: number | undefined = this._temperature;
        const topP: number | undefined = this._topP;
        const n: number | undefined = this._n;

        const hasModel: boolean = model !== undefined;
        const hasN: boolean = n !== undefined;
        const hasTemperature: boolean = temperature !== undefined;
        const hasTopP: boolean = topP !== undefined;

        try {

            const result: OpenAiEditResponseDTO = await (hasTopP
                    ? this._client.getEdit(instruction, input, model, n, temperature, topP)
                    : (hasTemperature
                            ? this._client.getEdit(instruction, input, model, n, temperature)
                            : (hasN
                                    ? this._client.getEdit(instruction, input, model, n)
                                    : (
                                        hasModel
                                            ? this._client.getEdit(instruction, input, model)
                                            : this._client.getEdit(instruction, input)
                                    )
                            )
                    )
            );

            const errorChoices = filter(
                result.choices,
                (result: OpenAiEditResponseChoice | OpenAiError): boolean => {
                    return !isOpenAiEditResponseChoice(result);
                }
            );

            const textChoices: OpenAiEditResponseChoice[] = filter(
                result.choices,
                (item: OpenAiEditResponseChoice | OpenAiError): boolean => {
                    return isOpenAiEditResponseChoice(item);
                }
            ) as OpenAiEditResponseChoice[];

            const firstText = textChoices.shift();
            const hasText = firstText !== undefined;
            const hasErrors = !!errorChoices.length;
            const hasAlternativeTexts = !!textChoices.length;

            if ( hasText ) {
                console.log(firstText?.text ?? '');
            }

            if ( hasAlternativeTexts ) {
                console.warn(`Alternative choices: ${JSON.stringify(textChoices, null, 2)}`);
            }

            if ( hasErrors ) {
                console.error(`Other items detected: ${JSON.stringify(errorChoices, null, 2)}`);
            }

            return (!hasErrors && hasText) ? CommandExitStatus.OK : CommandExitStatus.GENERAL_ERRORS;

        } catch (err) {
            if (isOpenAiErrorDTO(err)) {
                console.error(`Error: [${err.error.type}]: ${err.error.message}`);
                return CommandExitStatus.GENERAL_ERRORS;
            } else {
                throw err;
            }
        }

    }

    /**
     * OpenAI completion
     *
     * Example 1: `completion(['Say this is a test'])` will print out `"\n\nThis is indeed a test"`
     *
     * @param args
     */
    public async completion (args: readonly string[]): Promise<CommandExitStatus> {
        if ( args.length === 0 ) {
            return CommandExitStatus.USAGE;
        }
        const prompt: string = (await this._populateFiles(args)).join('\n\n');

        try {

            const result: OpenAiCompletionResponseDTO = await this._client.getCompletion(
                prompt,
                this._model,
                this._maxTokens,
                this._temperature,
                this._topP,
                this._frequencyPenalty,
                this._presencePenalty
            );

            const errorChoices = filter(
                result.choices,
                (result: OpenAiCompletionResponseChoice | OpenAiError): boolean => {
                    return !isOpenAiCompletionResponseChoice(result);
                }
            );

            const textChoices: OpenAiCompletionResponseChoice[] = filter(
                result.choices,
                (item: OpenAiCompletionResponseChoice | OpenAiError): boolean => {
                    return isOpenAiCompletionResponseChoice(item);
                }
            ) as OpenAiCompletionResponseChoice[];

            const firstText = textChoices.shift();
            const hasText = firstText !== undefined;
            const hasErrors = !!errorChoices.length;
            const hasAlternativeTexts = !!textChoices.length;

            if ( hasText ) {
                console.log(firstText?.text ?? '');
            }

            if ( hasAlternativeTexts ) {
                console.warn(`Alternative choices: ${JSON.stringify(textChoices, null, 2)}`);
            }

            if ( hasErrors ) {
                console.error(`Other items detected: ${JSON.stringify(errorChoices, null, 2)}`);
            }

            return (!hasErrors && hasText) ? CommandExitStatus.OK : CommandExitStatus.GENERAL_ERRORS;

        } catch (err) {
            if (isOpenAiErrorDTO(err)) {
                console.error(`Error: [${err.error.type}]: ${err.error.message}`);
                return CommandExitStatus.GENERAL_ERRORS;
            } else {
                throw err;
            }
        }
    }

    /**
     * Write test cases
     *
     * Example `writeTests('./FooService.ts')` will print out unit tests for the
     * `FooService` written in TypeScript and Jest framework.
     *
     * Tests should look like:
     *
     * ```typescript
     * describe("Class", () => {
     *
     *     describe("Method", () => {
     *
     *         it('should ...', () => {
     *             // ... here test implementation ...
     *         });
     *
     *     });
     *
     * });
     * ```
     *
     * @param args
     */
    public async test (args: readonly string[]): Promise<CommandExitStatus> {
        if (this._model       === undefined) this.setModel(OpenAiModel.DAVINCI_EDIT_CODE);
        if (this._n           === undefined) this.setN(1);
        if (this._temperature === undefined) this.setTemperature(0);
        // TODO: Add automatic detection for class names, etc.
        const examples = exampleTypeScriptTest('ExampleClassName', 'exampleMethodName', 'should ...');
        const instruction = writeTestsInstruction('TypeScript', 'Jest', examples);
        return this.edit([ instruction, ...args ]);
    }

    /**
     * Documents TypeScript code using JSDoc
     * @param args
     */
    public async document (args: readonly string[]): Promise<CommandExitStatus> {

        if (args.length === 0) {
            return CommandExitStatus.USAGE;
        }

        if (this._model       === undefined) this.setModel(OpenAiModel.DAVINCI_EDIT_CODE);
        if (this._n           === undefined) this.setN(1);
        if (this._temperature === undefined) this.setTemperature(0.1);
        if (this._topP        === undefined) this.setTopP(0.9);
        if (this._iterations  === undefined) this.setIterations(4);
        const instruction = documentCodeInstruction('TypeScript', 'JSDoc');
        return this.edit([ instruction, ...args ]);
    }

    /**
     * Writes descriptions about code.
     *
     * Example `describe('./keys.ts')` will print out description about the code:
     *
     * ```
     * This TypeScript code is an exported function called "keys" that takes two
     * parameters, "value" and "isKey". The "value" parameter is of type "any"
     * and the "isKey" parameter is of type "TestCallbackNonStandard". The
     * function returns an array of type "T" which is a generic type that extends
     * the type "keyof any".
     *
     * The function starts by checking if the "value" parameter is an array. If
     * it is, it uses the "map" function to create an array of indexes from the
     * "value" array. It then uses the "filter" function to filter out the
     * indexes that pass the "isKey" test. The filtered indexes are then
     * returned as an array of type "T".
     *
     * If the "value" parameter is an object, the function uses the
     * "Reflect.ownKeys" function to get an array of all the keys of the object.
     * It then uses the "filter" function to filter out the keys that pass the
     * "isKey" test. The filtered keys are then returned as an array of type "T".
     *
     * If the "value" parameter is neither an array nor an object, the function
     * returns an empty array of type "T".
     * ```
     *
     * @param args
     */
    public async describe (args: readonly string[]) : Promise<CommandExitStatus> {

        if (args.length === 0) {
            return CommandExitStatus.USAGE;
        }

        if (this._model       === undefined) this.setModel(OpenAiModel.DAVINCI_EDIT_TEXT);
        if (this._maxTokens   === undefined) this.setN(3600);
        if (this._temperature === undefined) this.setTemperature(0.1);
        if (this._topP        === undefined) this.setTopP(0.9);

        if (args[0] === 'verbose') {
            const instruction = describeCodeInstruction('TypeScript', true);
            return this.completion([ instruction, ...args ]);
        } else {
            const [arg1, ...restArgs] = args;
            const instruction = describeCodeInstruction('TypeScript', false);
            return this.completion([ instruction, ...restArgs ]);
        }

    }


    /**
     * Loop through arguments and if the argument exists on the file system,
     * read it and return the content as the argument instead.
     *
     * @param list
     * @private
     * @fixme Change to asynchronous
     */
    private async _populateFiles (list: readonly string[]): Promise<readonly string[]> {
        return map(
            list,
            (item: string): string => {
                if ( existsSync(item) ) {
                    return readFileSync(item, {encoding: 'utf8'}).toString();
                } else {
                    return item;
                }
            }
        );
    }


}
