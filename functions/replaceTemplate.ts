// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { keys } from "./keys";
import { replaceAll } from "./replaceAll";

/**
 * An object containing key-value pairs of strings to be replaced in a template
 * string.
 *
 * @interface ReplacementMap
 * @property {string} name - The name of the replacement.
 * @property {string} value - The value to be used as the replacement.
 */
export interface ReplacementMap {
    readonly [name: string]: string;
}

/**
 * Replaces all occurrences of keys in the `replacements` object with their
 * corresponding values in the `template` string and returns the resulting
 * string.
 *
 * @param {string} template - The input template string.
 * @param {ReplacementMap} replacements - An object containing key-value pairs
 *                           of strings to be replaced in the template string.
 * @returns {string} The input template string with all occurrences of the keys
 *                   in `replacements` replaced with their corresponding values.
 *
 * @throws {TypeError} If `template` is not a string.
 */
export function replaceTemplate (
    template : string,
    replacements: ReplacementMap
) : string {
    keys(replacements).forEach((key: string) => {
        const value = replacements[key];
        template = replaceAll(template, key, value);
    });
    return template;
}
