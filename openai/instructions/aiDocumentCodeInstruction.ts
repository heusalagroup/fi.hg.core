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
Write instructions to AI how to document the public interface from this {{LANG}} code in {{FRAMEWORK}}.
`;

/**
 * A template for instruction to describe the provided source code.
 *
 * This template requires the following placeholder parameters to be replaced:
 *   * `{{LANG}}` - The programming language, e.g. `TypeScript`.
 *   * `{{FRAMEWORK}}` - The testing framework, e.g. `JSDoc`.
 * @type {string}
 */
export const AI_DOCUMENT_CODE_INSTRUCTION = `Let's go step by step.
Write instructions to AI how to document the public interface from this {{LANG}} code in {{FRAMEWORK}}.
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
 * @returns {string} Instruction to describe code for the provided source
 *                   code.
 */
export function aiDocumentCodeInstruction (
    language    ?: string,
    framework   ?: string,
    inDetail    ?: boolean
) : string {
    return replaceTemplate(
        inDetail ? AI_DOCUMENT_IN_DETAIL_CODE_INSTRUCTION : AI_DOCUMENT_CODE_INSTRUCTION,
        {
            '{{LANG}}' : language  ?? 'TypeScript',
            '{{FRAMEWORK}}' : framework  ?? 'JSDoc'
        }
    );
}
