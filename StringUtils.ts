// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    JsonAny,
    isReadonlyJsonArray,
    isReadonlyJsonObject,
    JsonObject,
    ReadonlyJsonAny
} from "./Json";

import { get } from "./functions/get";
import { endsWith } from "./functions/endsWith";
import { startsWith } from "./functions/startsWith";
import { trim } from "./functions/trim";
import { map } from "./functions/map";
import { reduce } from "./functions/reduce";
import { isNull } from "./types/Null";
import { isString } from "./types/String";
import { isFunction } from "./types/Function";
import { keys } from "./functions/keys";
import { every } from "./functions/every";

const ACCEPTED_KEYWORD_CHARACTERS = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm._1234567890';
const ACCEPTED_START_KEYWORD_CHARACTERS = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm._';

export interface VariableResolverCallback {
    (key: string) : ReadonlyJsonAny | undefined;
}

export class StringUtils {

    /**
     * Converts arguments as a string.
     *
     * This is a helper function to make sure every value's string presentation is actually used.
     *
     * JavaScript uses .valueOf() in many instances instead of .toString().
     *
     * See also https://stackoverflow.com/a/2485794/901430
     *
     * @param values
     */
    public static toString (...values : any[]) : string {
        return map(values, item => {
            if (isNull(item)) return 'null';
            return `${item}`;
        }).join("");
    }

    /**
     * Convert any found variables in the input to corresponding values.
     *
     * The variable keyword may be a path to a variable inner in the `variables` structure.
     * Eg. when variables is `{"foo":{"bar":123}}`, the inner value `123` can be referenced using
     * `{variablePrefix}foo.bar{variableSuffix}` in the input.
     *
     * The input may be any JSON structure. Only string items will be processed. That means
     * keywords and scalar string values inside the structure.
     *
     * Returned structure is a partial (copy on write) version of the input structure.
     *
     */
    public static processVariables (
        input                 : ReadonlyJsonAny | undefined,
        resolveVariable       : VariableResolverCallback | JsonObject,
        variablePrefix        : string,
        variableSuffix        : string,
        defaultValue          : JsonAny | undefined = undefined
    ) : ReadonlyJsonAny | undefined {

        if (isReadonlyJsonArray(input)) {
            return map(
                input,
                (item : ReadonlyJsonAny) => StringUtils.processVariables(
                    item,
                    resolveVariable,
                    variablePrefix,
                    variableSuffix,
                    defaultValue
                ) as ReadonlyJsonAny
            );
        }

        if (isReadonlyJsonObject(input)) {
            return reduce(
                keys(input),
                (obj: JsonObject, itemKey : string) => {

                    const itemValue : ReadonlyJsonAny | undefined = input[itemKey];

                    const parsedItemKey : string = `${StringUtils.processVariables(
                        itemKey,
                        resolveVariable,
                        variablePrefix,
                        variableSuffix,
                        defaultValue
                    )}`;

                    obj[parsedItemKey] = StringUtils.processVariables(
                        itemValue,
                        resolveVariable,
                        variablePrefix,
                        variableSuffix,
                        defaultValue
                    ) as JsonAny;

                    return obj;

                },
                {}
            ) as ReadonlyJsonAny;
        }

        if (isString(input)) {
            return StringUtils.processVariablesInString(
                input,
                resolveVariable,
                variablePrefix,
                variableSuffix,
                defaultValue
            );
        }

        return input;

    }

    /**
     *
     * @fixme This probably should be inside Pipeline code, not here, and configurable in processVariablesInString().
     * @param variableKey
     */
    public static isValidKeyword (variableKey : string) : boolean {

        if ( variableKey.length <= 0 ) return false;

        if ( ACCEPTED_START_KEYWORD_CHARACTERS.includes(variableKey[0]) ) {
            return true;
        }

        return every(variableKey, (item: string) => ACCEPTED_KEYWORD_CHARACTERS.includes(item));

    }

    /**
     * Convert any found variables in the input to corresponding values.
     *
     * The variable keyword may be a path to a variable inner in the `variables` structure.
     * Eg. when variables is `{"foo":{"bar":123}}`, the inner value `123` can be referenced using
     * `{variablePrefix}foo.bar{variableSuffix}` in the input.
     *
     * Returns the string with any found variables converted.
     *
     */
    public static processVariablesInString (
        input                 : string,
        resolveVariable       : VariableResolverCallback | JsonObject,
        variablePrefix        : string,
        variableSuffix        : string,
        defaultValue          : JsonAny | undefined = undefined
    ) : ReadonlyJsonAny | undefined {

        if (input.length === 0) return '';

        let resolver : VariableResolverCallback | undefined;
        if (!isFunction(resolveVariable)) {
            resolver = (key: string) : ReadonlyJsonAny => get(resolveVariable, key, defaultValue) as ReadonlyJsonAny;
        } else {
            resolver = resolveVariable;
        }

        // Special case which will support typed variables, when the full string is.
        if ( startsWith(input, variablePrefix) && endsWith(input, variableSuffix) ) {

            let variableKey = input.substr(variablePrefix.length, input.length - variablePrefix.length - variableSuffix.length);

            // Make sure we don't have multiple variables in the string
            if ( variableKey.indexOf(variablePrefix) < 0 ) {

                variableKey = trim(variableKey);

                if (StringUtils.isValidKeyword(variableKey)) {
                    const resolvedValue = resolver(variableKey);
                    // LOG.debug(`Variable "${variableKey}" resolved as `, resolvedValue);
                    return resolvedValue;
                }

            }

        }

        let output = '';
        let index = 0;
        while ( (index >= 0) && (index < input.length) ) {

            const currentParsingStartIndex = index;

            index = input.indexOf(variablePrefix, currentParsingStartIndex);

            if ( index < 0 ) {

                output += input.substr(currentParsingStartIndex);

                index = input.length;

            } else {

                const keyTokenStartIndex = index;

                const keyNameStartIndex  = index + variablePrefix.length;

                const keyNameEndIndex = input.indexOf(variableSuffix, keyNameStartIndex);
                if (keyNameEndIndex < 0) {
                    throw new TypeError(`Parse error near "${input.substr(keyTokenStartIndex).substr(0, 20)}". End of variable not detected.`);
                }

                const keyTokenEndIndex = keyNameEndIndex + variableSuffix.length;

                const variableKey = trim( input.substr(keyNameStartIndex, keyNameEndIndex - keyNameStartIndex) );

                if (!StringUtils.isValidKeyword(variableKey)) {

                    output += `${input.substr(currentParsingStartIndex, keyTokenEndIndex - currentParsingStartIndex)}`;

                    index = keyTokenEndIndex;

                } else {

                    const resolvedValue : ReadonlyJsonAny | undefined = resolver(variableKey);
                    // LOG.debug(`Variable "${variableKey}" at ${keyTokenStartIndex}-${keyTokenEndIndex} resolved as "${resolvedValue}": `, resolvedValue);

                    output += `${input.substr(currentParsingStartIndex, keyTokenStartIndex - currentParsingStartIndex)}${resolvedValue}`;

                    index = keyTokenEndIndex;

                }

            }

        }

        return output;

    }

    /**
     * Stringify a number
     *
     * @param x
     * @param thousandSeparator
     * @param digitSeparator
     */
    public static formatNumber (
        x                 : number,
        thousandSeparator : string = ' ',
        digitSeparator    : string = '.'
    ) : string {
        return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator).replace(/\./, digitSeparator);
    }

    /**
     *
     * @param value The value to test
     * @param acceptedChars The first character must match one of these
     */
    public static endsWithCharacters (
        value : string,
        acceptedChars: string
    ) : boolean {
        const len = value.length;
        return len >= 1 ? acceptedChars.includes(value[len-1]) : true;
    }

    /**
     *
     * @param value The value to test
     * @param acceptedChars The first character must match one of these
     */
    public static startsWithCharacters (
        value : string,
        acceptedChars: string
    ) : boolean {
        return value.length >= 1 ? acceptedChars.includes(value[0]) : true;
    }

    /**
     *
     * @param value The value to test
     * @param acceptedChars Every character must match one of these
     */
    public static hasOnlyCharacters (
        value : string,
        acceptedChars: string
    ) : boolean {
        return value.length === 0 ? true : every(value, (char: string) :boolean => acceptedChars.includes(char));
    }

    /**
     *
     * @param value The value to test
     * @param acceptedStartChars If defined, the first character must match one of these.
     * @param acceptedMiddleChars If defined, every character must match this. Defaults to `acceptedStartChars`.
     * @param acceptedEndChars If defined, every character must match this. Defaults to `acceptedMiddleChars`.
     * @param minLength The minimum length of the string. Defaults to 0.
     * @param maxLength The maximum length of the string. Defaults to no limit.
     */
    public static validateStringCharacters (
        value : string,
        acceptedStartChars: string | undefined = undefined,
        acceptedMiddleChars: string | undefined = acceptedStartChars,
        acceptedEndChars: string | undefined = acceptedMiddleChars,
        minLength: number = 0,
        maxLength: number | undefined = undefined
    ) : boolean {
        const len = value?.length ?? 0;
        return (
            ( acceptedStartChars !== undefined ? StringUtils.startsWithCharacters(value, acceptedStartChars) : true)
            && ( acceptedMiddleChars !== undefined ? StringUtils.hasOnlyCharacters(value.substring(1, len-1), acceptedMiddleChars) : true)
            && ( acceptedEndChars !== undefined ? StringUtils.endsWithCharacters(value, acceptedEndChars) : true)
            && ( len >= minLength )
            && ( maxLength === undefined ? true : len <= maxLength )
        );
    }

    public static truncateLongString (
        value     : string,
        maxLength : number,
        suffix    : string = '...'
    ) : string {
        if (maxLength < suffix.length) throw new TypeError('StringUtils.truncateLongString: maxLength must be greater than length of the suffix');
        return value.length <= maxLength ? value : value.substring(0, maxLength-3) + suffix;
    }

}
