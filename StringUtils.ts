import JsonAny, {
    isJsonArray,
    isJsonObject,
    JsonObject
} from "./Json";
import {
    get,
    isFunction,
    isString,
    endsWith,
    startsWith,
    trim,
    map,
    keys,
    reduce,
    isNull, every
} from "./modules/lodash";
import LogService from "./LogService";

const LOG = LogService.createLogger('StringUtils');

const ACCEPTED_KEYWORD_CHARACTERS = 'qwertyuiopasdfghjklzxcvbnm. \n\t1234567890_'

export interface VariableResolverCallback {
    (key: string) : JsonAny | undefined;
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
        input                 : JsonAny | undefined,
        resolveVariable       : VariableResolverCallback | JsonObject,
        variablePrefix        : string,
        variableSuffix        : string,
        defaultValue          : JsonAny | undefined = undefined
    ) : JsonAny | undefined {

        if (isJsonArray(input)) {
            return map(
                input,
                (item : JsonAny) => StringUtils.processVariables(
                    item,
                    resolveVariable,
                    variablePrefix,
                    variableSuffix,
                    defaultValue
                )
            );
        }

        if (isJsonObject(input)) {
            return reduce(
                keys(input),
                (obj: JsonObject, itemKey : string) => {

                    const itemValue : JsonAny | undefined = input[itemKey];

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
                    );

                    return obj;

                },
                {}
            );
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
    ) : JsonAny | undefined {

        if (input.length === 0) return '';

        let resolver : VariableResolverCallback | undefined;
        if (!isFunction(resolveVariable)) {
            resolver = (key: string) => get(resolveVariable, key, defaultValue);
        } else {
            resolver = resolveVariable;
        }

        // Special case which will support typed variables, when the full string is.
        if ( startsWith(input, variablePrefix)
            && endsWith(input, variableSuffix)
        ) {

            let variableKey = input.substr(variablePrefix.length, input.length - variablePrefix.length - variableSuffix.length);

            // Make sure we don't have multiple variables in the string
            if ( variableKey.indexOf(variablePrefix) < 0 ) {

                variableKey = trim(variableKey);

                if (every(variableKey, (item : string) => ACCEPTED_KEYWORD_CHARACTERS.includes(item))) {
                    const resolvedValue = resolver(variableKey);
                    LOG.debug(`Variable "${variableKey}" resolved as `, resolvedValue);
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

                if (!every(variableKey, (item : string) => ACCEPTED_KEYWORD_CHARACTERS.includes(item))) {

                    output += `${input.substr(currentParsingStartIndex, keyTokenEndIndex - currentParsingStartIndex)}`;

                    index = keyTokenEndIndex;

                } else {

                    const resolvedValue : JsonAny | undefined = resolver(variableKey);
                    LOG.debug(`Variable "${variableKey}" at ${keyTokenStartIndex}-${keyTokenEndIndex} resolved as "${resolvedValue}": `, resolvedValue);

                    output += `${input.substr(currentParsingStartIndex, keyTokenStartIndex - currentParsingStartIndex)}${resolvedValue}`;

                    index = keyTokenEndIndex;

                }

            }

        }

        return output;

    }

}

export default StringUtils;
