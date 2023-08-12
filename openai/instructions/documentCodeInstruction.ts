// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { replaceTemplate } from "../../functions/replaceTemplate";

/**
 * A template for instruction to document the provided source code.
 *
 * This template requires the following placeholder parameters to be replaced:
 *   * `{{LANG}}` - The programming language, e.g. `TypeScript`.
 *   * `{{FRAMEWORK}}` - The testing framework, e.g. `JSDoc`.
 * @type {string}
 */
export const DOCUMENT_CODE_INSTRUCTION = `Let's go step by step.
Improve the {{FRAMEWORK}} documentations from the following {{LANG}} code:`;

/**
 * Generates instruction on to document code for the provided source code.
 *
 * @param {string} [language] - The programming language, e.g. `TypeScript`. If
 *                              not provided, defaults to `TypeScript`.
 * @param {string} [framework] - The testing framework, e.g. `JSDoc`. If not
 *                               provided, defaults to `JSDoc`.
 * @returns {string} Instruction to document code for the provided source
 *                   code.
 */
export function documentCodeInstruction (
    language    ?: string,
    framework   ?: string
) : string {
    return replaceTemplate(
        DOCUMENT_CODE_INSTRUCTION,
        {
            '{{LANG}}'      : language  ?? 'TypeScript',
            '{{FRAMEWORK}}' : framework ?? 'JSDoc'
        }
    );
}
