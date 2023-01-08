// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { replaceTemplate } from "../../functions/replaceTemplate";

/**
 * A template for instruction to describe the provided source code.
 *
 * This template requires the following placeholder parameters to be replaced:
 *   * `{{LANG}}` - The programming language, e.g. `TypeScript`.
 * @type {string}
 */
export const DESCRIBE_IN_DETAIL_CODE_INSTRUCTION = `Let's go step by step.
Describe in detail what this {{LANG}} does?`;

/**
 * A template for instruction to describe the provided source code.
 *
 * This template requires the following placeholder parameters to be replaced:
 *   * `{{LANG}}` - The programming language, e.g. `TypeScript`.
 * @type {string}
 */
export const DESCRIBE_CODE_INSTRUCTION = `Let's go step by step.
Describe what this {{LANG}} does?`;

/**
 * Generates instruction on to describe code for the provided source code.
 *
 * @param {string} [language] - The programming language, e.g. `TypeScript`. If
 *                              not provided, defaults to `TypeScript`.
 * @param {boolean} [inDetail] - Detailed or short mode. If
 *                              not provided, defaults to `false`.
 * @returns {string} Instruction to describe code for the provided source
 *                   code.
 */
export function describeCodeInstruction (
    language    ?: string,
    inDetail    ?: boolean
) : string {
    return replaceTemplate(
        inDetail ? DESCRIBE_IN_DETAIL_CODE_INSTRUCTION : DESCRIBE_CODE_INSTRUCTION,
        {
            '{{LANG}}' : language  ?? 'TypeScript'
        }
    );
}
