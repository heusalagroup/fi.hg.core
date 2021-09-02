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
    reduce
} from "./modules/lodash";
import LogService from "./LogService";

const LOG = LogService.createLogger('StringUtils');

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

        return values.join("");

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

        if (!isFunction(resolveVariable)) {
            resolveVariable = (key: string) => get(resolveVariable, key, defaultValue);
        }

        // Special case which will support typed variables, when the full string is.
        if ( startsWith(input, variablePrefix)
            && endsWith(input, variableSuffix)
        ) {

            let variableKey = input.substr(variablePrefix.length, input.length - variablePrefix.length - variableSuffix.length);

            // Make sure we don't have multiple variables in the string
            if ( variableKey.indexOf(variablePrefix) < 0 ) {
                variableKey = trim(variableKey);
                const resolvedValue = resolveVariable(variableKey);
                LOG.debug(`Variable "${variableKey}" resolved as `, resolvedValue);
                return resolvedValue;

            }

        }

        let output = '';
        let prevIndex = 0;
        let index = 0;
        do {

            prevIndex = index;
            index = input.indexOf(variablePrefix);
            if (index < 0) {
                output += input.substr(prevIndex);
            } else {

                const endIndex = input.indexOf(variableSuffix);
                if (endIndex < 0) {
                    throw new TypeError(`Parse error near "${input.substr(prevIndex).substr(0, 20)}". End of variable not detected.`);
                } else {

                    const variableKey = trim(input.substr(index + variablePrefix.length, endIndex));

                    const resolvedValue : JsonAny = resolveVariable(variableKey);
                    LOG.debug(`Variable "${variableKey}" at ${index}-${endIndex} resolved as "${resolvedValue}": `, resolvedValue);

                    output += `${input.substr(prevIndex, index)}${resolvedValue}`;

                    index = endIndex + variableSuffix.length;

                }

            }

        } while ( index >= 0 && index < input.length );

        return output;

    }

}

export default StringUtils;
