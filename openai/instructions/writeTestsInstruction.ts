// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { replaceTemplate } from "../../functions/replaceTemplate";
import { exampleTypeScriptTest } from "./exampleTypeScriptTest";

/**
 * A template for instructions on how to write automated tests for the provided
 * source code.
 *
 * This template requires the following placeholder parameters to be replaced:
 *   * `{{LANG}}` - The programming language, e.g. `TypeScript`.
 *   * `{{FRAMEWORK}}` - The testing framework, e.g. `Jest`.
 *   * `{{EXAMPLES}}` - Examples of how the tests should look.
 *                      See `EXAMPLE_TESTS_FOR_TYPESCRIPT_JEST` below.
 * @type {string}
 */
export const WRITE_TESTS_INSTRUCTION = `// {{LANG}}
// Write test cases.
// Framework: {{FRAMEWORK}}

{{EXAMPLES}}`;

/**
 * Generates instructions on how to write tests for the provided source code.
 *
 * @param {string} [language] - The programming language, e.g. `TypeScript`. If
 *                              not provided, defaults to `TypeScript`.
 * @param {string} [framework] - The testing framework, e.g. `Jest`. If not
 *                               provided, defaults to `Jest`.
 * @param {string} [examples] - Examples of how the tests should look. If not
 *                              provided, defaults to an example of a TypeScript
 *                              test.
 * @returns {string} Instructions on how to write tests for the provided source
 *                   code.
 */
export function writeTestsInstruction (
    language    ?: string,
    framework   ?: string,
    examples    ?: string
) : string {
    return replaceTemplate(
        WRITE_TESTS_INSTRUCTION,
        {
            '{{LANG}}'      : language  ?? 'TypeScript',
            '{{FRAMEWORK}}' : framework ?? 'Jest',
            '{{EXAMPLES}}'  : examples  ?? exampleTypeScriptTest()
        }
    );
}
