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

    setModel(value: string) : void;
    setStop(value: string) : void;
    setUser(value: string) : void;
    setLogProbs(value: number) : void;
    setBestOf(value: number) : void;
    setPresencePenalty(value: number) : void;
    setFrequencyPenalty(value: number) : void;
    setEcho(value: boolean) : void;
    setN(value: number) : void;
    setTopP(value: number) : void;
    setTemperature(value: number) : void;
    setMaxTokens(value: number) : void;

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

}
