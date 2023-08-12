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
import { LogService } from "../../LogService";
import { aiDocumentCodeInstruction } from "../../openai/instructions/aiDocumentCodeInstruction";
import { changelogInstruction } from "../../openai/instructions/changelogInstruction";
import { diffReader } from "../../functions/diffReader";
import { reduce } from "../../functions/reduce";
import { LogLevel } from "../../types/LogLevel";

const DEFAULT_LANGUAGE         = 'TypeScript';

const DEFAULT_DESC_MODEL       = OpenAiModel.DAVINCI;
const DEFAULT_DESC_MAX_TOKENS  = 3600;
const DEFAULT_DESC_TEMPERATURE = 0.1;
const DEFAULT_DESC_TOP_P       = 0.9;

const DEFAULT_CHANGELOG_MODEL       = OpenAiModel.DAVINCI;
const DEFAULT_CHANGELOG_MAX_TOKENS  = 2000;
const DEFAULT_CHANGELOG_TEMPERATURE = 0.1;
const DEFAULT_CHANGELOG_TOP_P       = 0.9;

const DEFAULT_TEST_FRAMEWORK   = 'Jest';
const DEFAULT_TEST_CLASS_NAME  = 'ExampleClassName';
const DEFAULT_TEST_METHOD_NAME = 'exampleMethodName';
const DEFAULT_TEST_TEST_NAME   = 'should ...';
const DEFAULT_TEST_MODEL       = OpenAiModel.DAVINCI_EDIT_CODE;
const DEFAULT_TEST_N           = 1;
const DEFAULT_TEST_TEMPERATURE = 0;

const DEFAULT_DOC_FRAMEWORK    = 'JSDoc';
const DEFAULT_DOC_MODEL        = OpenAiModel.DAVINCI_EDIT_CODE;
const DEFAULT_DOC_N            = 1;
const DEFAULT_DOC_TEMPERATURE  = 0.1;
const DEFAULT_DOC_TOP_P        = 0.9;
const DEFAULT_DOC_ITERATIONS   = 4;

const LOG = LogService.createLogger('HgAiCommandServiceImpl');

export class HgAiCommandServiceImpl implements HgAiCommandService {

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

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

    public getIterations () : number | undefined {
        return this._iterations;
    }

    public setLanguage (value: string|undefined): void {
        this._language = value;
    }

    public getLanguage (): string|undefined {
        return this._language;
    }

    public setSuffix (value: string|undefined): void {
        this._suffix = value;
    }

    public getSuffix (): string|undefined {
        return this._suffix;
    }

    /**
     * Sets the model to use for the next call to OpenAI API
     * @param value
     */
    public setModel (value: string|undefined): void {
        this._model = value;
    }

    /**
     * Gets the model to use for the next call to OpenAI API
     */
    public getModel (): string|undefined {
        return this._model;
    }

    /**
     * Sets the stop option for the next call to OpenAI API
     * @param value
     */
    public setStop (value: string|undefined): void {
        this._stop = value;
    }

    /**
     * Gets the stop option for the next call to OpenAI API
     */
    public getStop (): string|undefined {
        return this._stop;
    }

    /**
     * Sets the user option for the next call to OpenAI API
     * @param value
     */
    public setUser (value: string|undefined): void {
        this._user = value;
    }

    /**
     * Gets the user option for the next call to OpenAI API
     */
    public getUser (): string|undefined {
        return this._user;
    }

    /**
     * Sets the logProbs option for the next call to OpenAI API
     * @param value
     */
    public setLogProbs (value: number | undefined): void {
        this._logProbs = value;
    }

    /**
     * Gets the logProbs option for the next call to OpenAI API
     */
    public getLogProbs (): number | undefined {
        return this._logProbs;
    }

    /**
     * Sets the best of option for the next call to OpenAI API
     * @param value
     */
    public setBestOf (value: number | undefined): void {
        this._bestOf = value;
    }

    /**
     * Gets the best of option for the next call to OpenAI API
     */
    public getBestOf (): number | undefined {
        return this._bestOf;
    }

    /**
     * Sets the presence penalty option for the next call to OpenAI API
     * @param value
     */
    public setPresencePenalty (value: number | undefined): void {
        this._presencePenalty = value;
    }

    /**
     * Gets the presence penalty option for the next call to OpenAI API
     */
    public getPresencePenalty (): number | undefined {
        return this._presencePenalty;
    }

    /**
     * Sets the frequency penalty property for the next call to OpenAI API
     * @param value
     */
    public setFrequencyPenalty (value: number | undefined): void {
        this._frequencyPenalty = value;
    }

    /**
     * Gets the frequency penalty property for the next call to OpenAI API
     */
    public getFrequencyPenalty (): number | undefined {
        return this._frequencyPenalty;
    }

    /**
     * Sets the echo property for the next call to OpenAI API
     * @param value
     */
    public setEcho (value: boolean): void {
        this._echo = value;
    }

    /**
     * Gets the echo property for the next call to OpenAI API
     */
    public getEcho (): boolean | undefined {
        return this._echo;
    }

    /**
     * Sets the n property for the next call to OpenAI API
     * @param value
     */
    public setN (value: number | undefined): void {
        this._n = value;
    }

    /**
     * Gets the n property for the next call to OpenAI API
     */
    public getN (): number | undefined {
        return this._n;
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
     * Gets the topP property for the next call to OpenAI API
     */
    public getTopP (): number | undefined {
        return this._topP;
    }

    /**
     * Sets the temperature property for next call to OpenAI API
     * @param value
     */
    public setTemperature (value: number | undefined): void {
        this._temperature = value;
    }

    /**
     * Gets the temperature property for next call to OpenAI API
     */
    public getTemperature (): number | undefined {
        return this._temperature;
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
     * Get's the max tokens property for next call to OpenAI API
     */
    public getMaxTokens (): number | undefined {
        return this._maxTokens;
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

                case 'cl':
                case 'changelog':
                    return await this.changelog(freeArgs);

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

        if (this._model       === undefined) this.setModel(DEFAULT_TEST_MODEL);
        if (this._n           === undefined) this.setN(DEFAULT_TEST_N);
        if (this._temperature === undefined) this.setTemperature(DEFAULT_TEST_TEMPERATURE);

        // TODO: Add automatic detection for class names, etc.

        const language = this._language ?? DEFAULT_LANGUAGE;
        LOG.debug(`test: language: `, language);

        const examples = exampleTypeScriptTest(
            DEFAULT_TEST_CLASS_NAME,
            DEFAULT_TEST_METHOD_NAME,
            DEFAULT_TEST_TEST_NAME
        );
        const instruction = writeTestsInstruction(language, DEFAULT_TEST_FRAMEWORK, examples);
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
        LOG.debug(`document: args: `, args);

        const language = this._language ?? DEFAULT_LANGUAGE;
        LOG.debug(`document: language: `, language);

        const framework = DEFAULT_DOC_FRAMEWORK;
        LOG.debug(`document: framework: `, framework);

        if (this._model       === undefined) this.setModel(DEFAULT_DOC_MODEL);
        if (this._n           === undefined) this.setN(DEFAULT_DOC_N);
        if (this._temperature === undefined) this.setTemperature(DEFAULT_DOC_TEMPERATURE);
        if (this._topP        === undefined) this.setTopP(DEFAULT_DOC_TOP_P);
        if (this._iterations  === undefined) this.setIterations(DEFAULT_DOC_ITERATIONS);

        const describePrompt = aiDocumentCodeInstruction(
            language,
            framework,
            false,
            (await this._populateFiles(args)).join('\n\n')
        );
        LOG.debug(`document: aiDocumentPrompt: `, describePrompt);

        const result: OpenAiCompletionResponseDTO = await this._client.getCompletion(
            describePrompt,
            DEFAULT_DESC_MODEL,
            DEFAULT_DESC_MAX_TOKENS,
            DEFAULT_DESC_TEMPERATURE,
            DEFAULT_DESC_TOP_P,
            this._frequencyPenalty,
            this._presencePenalty
        );
        LOG.debug(`result = `, result);

        const {
            textChoice,
            hasText
        } = this._parseCompletionResponse(result);

        const instruction = documentCodeInstruction(language, framework);

        if (args.length === 0) {
            throw new TypeError('No args detected anymore');
        }

        if (hasText) {
            return this.edit(
                [
                    instruction + (textChoice?.text ? '\n\n' + textChoice?.text : ''),
                    ...args
                ]
            );
        }

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

        LOG.debug(`describe: args: `, args);

        if (this._model       === undefined) this.setModel(DEFAULT_DESC_MODEL);
        if (this._maxTokens   === undefined) this.setMaxTokens(DEFAULT_DESC_MAX_TOKENS);
        if (this._temperature === undefined) this.setTemperature(DEFAULT_DESC_TEMPERATURE);
        if (this._topP        === undefined) this.setTopP(DEFAULT_DESC_TOP_P);

        const language = this._language ?? DEFAULT_LANGUAGE;
        LOG.debug(`describe: language: `, language);

        let verbose = false;
        if (args[0] === 'verbose') {
            const [, ...restArgs] = args;
            args = restArgs;
            verbose = true;
            if (args.length === 0) {
                return CommandExitStatus.USAGE;
            }
            LOG.debug(`describe: params: `, args, verbose);
        }

        const instruction = describeCodeInstruction(language, verbose);
        LOG.debug(`describe: instruction: `, instruction);

        return this.completion([ instruction, ...args ]);

    }

    /**
     * Write changelog based on git diff output
     *
     * @param args
     */
    public async changelog (args: readonly string[]) : Promise<CommandExitStatus> {

        if (args.length === 0) {
            return CommandExitStatus.USAGE;
        }

        LOG.debug(`changelog: args: `, args);

        if (this._model       === undefined) this.setModel(DEFAULT_CHANGELOG_MODEL);
        if (this._maxTokens   === undefined) this.setMaxTokens(DEFAULT_CHANGELOG_MAX_TOKENS);
        if (this._temperature === undefined) this.setTemperature(DEFAULT_CHANGELOG_TEMPERATURE);
        if (this._topP        === undefined) this.setTopP(DEFAULT_CHANGELOG_TOP_P);

        const instruction = changelogInstruction();
        LOG.debug(`changelog: instruction: "${instruction}"`);

        // FIXME: Write a buffering function to do this
        const aiChunkSize = 6000; // 4097 max tokens (prompt + completion)
        LOG.debug(`changelog: aiChunkSize size of "${aiChunkSize}"`);

        let nextAiChunk = '';
        const diffString = (await this._populateFiles(args)).join('\n');
        LOG.debug(`changelog: diff size of "${diffString.length}"`);
        if (diffString.length === 0) return CommandExitStatus.OK;

        // FIXME: Add this as it's own function and unit test
        const diffChunks = reduce(
            diffReader( diffString ),
            (chunks: string[], chunk: string) => {
                if (chunk.length > aiChunkSize) {
                    return [
                        ...chunks,
                        ...splitString(chunk, aiChunkSize)
                    ];
                }
                return [...chunks, chunk];
            },
            []
        );
        LOG.debug(`changelog: chunks size of "${diffChunks.length}"`);

        if (diffChunks.length === 0) return CommandExitStatus.OK;

        do {
            const chunk : string | undefined = diffChunks.shift();
            if (chunk !== undefined) {
                LOG.debug(`changelog: processing chunk size of "${chunk.length}"`);
                if ( (nextAiChunk.length !== 0) && (nextAiChunk.length + chunk.length > aiChunkSize) ) {
                    LOG.debug(`changelog: Sending "${nextAiChunk.length}" characters to completion`);
                    await this.completion([ instruction, nextAiChunk ]);
                    nextAiChunk = '';
                }
                nextAiChunk += chunk;
            }
            if (nextAiChunk.length >= aiChunkSize) {
                LOG.debug(`changelog: Sending ${nextAiChunk.length} characters to completion`);
                await this.completion([ instruction, nextAiChunk ]);
                nextAiChunk = '';
            }
        } while (diffChunks.length);

        return CommandExitStatus.OK;

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
        LOG.debug(`args = `, args);

        const prompt: string = (await this._populateFiles(args)).join('\n\n');
        LOG.debug(`prompt = "${prompt}"`);

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
            LOG.debug(`result = `, result);

            const {
                errorChoices,
                alternativeTexts,
                textChoice,
                hasText,
                hasErrors,
                hasAlternativeTexts
            } = this._parseCompletionResponse(result);

            if ( hasText ) {
                if (textChoice?.finish_reason === 'stop') {
                    console.log(textChoice?.text ?? '');
                } else {
                    console.warn(`Warning! Partial response: "${textChoice?.text ?? ''}"`);
                    console.error(`Error: Please increase "maxTokens" property to get complete response.`);
                    return CommandExitStatus.GENERAL_ERRORS;
                }
            }

            if ( hasAlternativeTexts ) {
                console.warn(`Alternative choices: ${JSON.stringify(alternativeTexts, null, 2)}`);
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

    /**
     *
     * @param result
     * @private
     */
    private _parseCompletionResponse (
        result: OpenAiCompletionResponseDTO
    ) : {
        errorChoices        : OpenAiError[],
        alternativeTexts    : OpenAiCompletionResponseChoice[],
        textChoice          : OpenAiCompletionResponseChoice | undefined,
        hasText             : boolean,
        hasErrors           : boolean,
        hasAlternativeTexts : boolean
    } {
        const errorChoices : OpenAiError[] = filter(
            result.choices,
            (result: OpenAiCompletionResponseChoice | OpenAiError): boolean => {
                return !isOpenAiCompletionResponseChoice(result);
            }
        ) as OpenAiError[];

        const alternativeTexts: OpenAiCompletionResponseChoice[] = filter(
            result.choices,
            (item: OpenAiCompletionResponseChoice | OpenAiError): boolean => {
                return isOpenAiCompletionResponseChoice(item);
            }
        ) as OpenAiCompletionResponseChoice[];

        const textChoice : OpenAiCompletionResponseChoice | undefined = alternativeTexts.shift();
        const hasText = textChoice !== undefined;
        const hasErrors = !!errorChoices.length;
        const hasAlternativeTexts = !!alternativeTexts.length;

        return {
            errorChoices,
            alternativeTexts,
            textChoice,
            hasText,
            hasErrors,
            hasAlternativeTexts
        }

    }

}

// FIXME: Add it's own function and unit test
function splitString(str: string, chunkLength: number): string[] {
    let result = [];
    for (let i = 0; i < str.length; i += chunkLength) {
        result.push(str.slice(i, i + chunkLength));
    }
    return result;
}
