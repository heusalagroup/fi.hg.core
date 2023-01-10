// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

/**
 * A template for instruction to document the provided source code.
 *
 * This template requires the following placeholder parameters to be replaced:
 *   * `{{LANG}}` - The programming language, e.g. `TypeScript`.
 *   * `{{FRAMEWORK}}` - The testing framework, e.g. `JSDoc`.
 * @type {string}
 */
export const CHANGELOG_INSTRUCTION = `Write a change log for the following commit diff:`;

/**
 * Generates instruction on to write change log code for the provided diff string.
 *
 * @returns {string} Instruction to write changelog for the provided diff of
 *                   source code.
 */
export function changelogInstruction () : string {
    return CHANGELOG_INSTRUCTION;
}
