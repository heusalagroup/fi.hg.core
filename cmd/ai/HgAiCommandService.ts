// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CommandExitStatus } from "../types/CommandExitStatus";

/**
 * @TODO Improve code
 * @TODO Rewrite code with correct style
 * @TODO Rewrite code with using idiomatic constructs
 * @TODO Simplify code
 * @TODO Explore alternatives
 * @TODO Write documentation
 */
export interface HgAiCommandService {

    setIterations(value: number | undefined) : void;
    setLanguage(value: string | undefined) : void;
    setSuffix(value: string | undefined) : void;
    setModel(value: string | undefined) : void;
    setStop(value: string | undefined) : void;
    setUser(value: string | undefined) : void;
    setLogProbs(value: number | undefined) : void;
    setBestOf(value: number | undefined) : void;
    setPresencePenalty(value: number | undefined) : void;
    setFrequencyPenalty(value: number | undefined) : void;
    setEcho(value: boolean | undefined) : void;
    setN(value: number | undefined) : void;
    setTopP(value: number | undefined) : void;
    setTemperature(value: number | undefined) : void;
    setMaxTokens(value: number | undefined) : void;

    getIterations(): number | undefined;
    getLanguage(): string | undefined;
    getSuffix(): string | undefined;
    getModel(): string | undefined;
    getStop(): string | undefined;
    getUser(): string | undefined;
    getLogProbs(): number | undefined;
    getBestOf(): number | undefined;
    getPresencePenalty(): number | undefined;
    getFrequencyPenalty(): number | undefined;
    getEcho(): boolean | undefined;
    getN(): number | undefined;
    getTopP(): number | undefined;
    getTemperature(): number | undefined;
    getMaxTokens(): number | undefined;

    /**
     * The main command line handler
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
    main (args: readonly string[]) : Promise<CommandExitStatus>;

    /**
     * OpenAI completion
     *
     * Example 1: `completion(['Say this is a test'])` will print out `"\n\nThis is indeed a test"`
     *
     * @param args
     */
    completion (args: readonly string[]) : Promise<CommandExitStatus>;

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
    edit (args: readonly string[]) : Promise<CommandExitStatus>;

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
    test (args: readonly string[]) : Promise<CommandExitStatus>;

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
    describe (args: readonly string[]) : Promise<CommandExitStatus>;


    /**
     * Write changelog based on git diff output
     *
     * @param args
     */
    changelog (args: readonly string[]) : Promise<CommandExitStatus>;

}
