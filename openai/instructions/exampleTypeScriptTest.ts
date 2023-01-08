// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { replaceTemplate } from "../../functions/replaceTemplate";

/**
 * A template for examples of how to write tests for a given programming
 * language and testing framework.
 *
 * This template requires the following placeholder parameters to be replaced:
 *   * `{{CLASS_NAME}}` - The class name, e.g. `ExampleClass`.
 *   * `{{METHOD_NAME}}` - The method name, e.g. `someMethod`.
 *   * `{{TEST_NAME}}` - The test name, e.g. `can ...`.
 * @type {string}
 */
export const EXAMPLE_TESTS_FOR_TYPESCRIPT_JEST = `describe("{{CLASS_NAME}}", () => {
    describe("{{METHOD_NAME}}", () => {
        it("{{TEST_NAME}}", () => {
        });
    });
});
`;

/**
 * Generates an example of a TypeScript test for a given class, method, and test name.
 *
 * @param {string} [className] - The class name, e.g. `ExampleClass`. If not provided, defaults to `ExampleClass`.
 * @param {string} [methodName] - The method name, e.g. `exampleMethod`. If not provided, defaults to `exampleMethod`.
 * @param {string} [testName] - The test name, e.g. `should ...`. If not provided, defaults to `should ...`.
 * @returns {string} An example of a TypeScript test for the given class, method, and test name.
 */
export function exampleTypeScriptTest (
    className  ?: string,
    methodName ?: string,
    testName   ?: string
) : string {
    return replaceTemplate(
        EXAMPLE_TESTS_FOR_TYPESCRIPT_JEST,
        {
            '{{CLASS_NAME}}'  : className  ?? 'ExampleClass',
            '{{METHOD_NAME}}' : methodName ?? 'exampleMethod',
            '{{TEST_NAME}}'   : testName   ?? 'should ...'
        }
    );
}
