// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { replaceTemplate } from "../../functions/replaceTemplate";

/**
 * A template for instruction to describe the provided source code.
 *
 * This template requires the following placeholder parameters to be replaced:
 *   * `{{LANG}}` - The programming language, e.g. `TypeScript`.
 *   * `{{FRAMEWORK}}` - The testing framework, e.g. `JSDoc`.
 * @type {string}
 */
export const AI_DOCUMENT_IN_DETAIL_CODE_INSTRUCTION = `Let's go step by step.
Document the public interface from the following {{LANGUAGE}} code in detail using {{FRAMEWORK}}.
Include the source code unmodified.

{{EXAMPLES}}
`;

/**
 * A template for instruction to describe the provided source code.
 *
 * This template requires the following placeholder parameters to be replaced:
 *   * `{{LANGUAGE}}` - The programming language, e.g. `TypeScript`.
 *   * `{{FRAMEWORK}}` - The testing framework, e.g. `JSDoc`.
 * @type {string}
 */
export const AI_DOCUMENT_CODE_INSTRUCTION = `Let's go step by step.
Document the public interface from the following {{LANGUAGE}} code using {{FRAMEWORK}}.
Include the source code unmodified.

{{EXAMPLES}}
`;

/**
 * Generates instruction for AI to document in JSDoc the provided source code.
 *
 * @param {string} [language] - The programming language, e.g. `TypeScript`. If
 *                              not provided, defaults to `TypeScript`.
 * @param {string} [framework] - The testing framework, e.g. `JSDoc`. If
 *                              not provided, defaults to `JSDoc`.
 * @param {boolean} [inDetail] - Detailed or short mode. If
 *                              not provided, defaults to `false`.
 * @param {string} [examples] - The examples. If
 *                               not provided, defaults to `""`.
 * @returns {string} Instruction to describe code for the provided source
 *                   code.
 */
export function aiDocumentCodeInstruction (
    language    ?: string,
    framework   ?: string,
    inDetail    ?: boolean,
    examples    ?: string,
) : string {
    return replaceTemplate(
        inDetail ? AI_DOCUMENT_IN_DETAIL_CODE_INSTRUCTION : AI_DOCUMENT_CODE_INSTRUCTION,
        {
            '{{LANGUAGE}}'  : language  ?? 'TypeScript',
            '{{FRAMEWORK}}' : framework ?? 'JSDoc',
            '{{EXAMPLES}}'  : examples  ?? ''
        }
    );
}
