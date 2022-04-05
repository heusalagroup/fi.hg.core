import {
    parseBoolean as _parseBoolean,
    parseNonEmptyString as _parseNonEmptyString
} from "../modules/lodash";

function parseNonEmptyString (value : any) : string | undefined {
    if (value.startsWith('%'+'{') && value.endsWith('}')) return undefined;
    return _parseNonEmptyString(value);
}

/**
 * @__PURE__
 */
export const BUILD_NODE_ENV : string  = /* @__PURE__ */parseNonEmptyString('%{BUILD_NODE_ENV}')       ?? 'development';

export const IS_PRODUCTION  : boolean = BUILD_NODE_ENV === 'production';

export const IS_TEST        : boolean = BUILD_NODE_ENV === 'test';

export const IS_DEVELOPMENT : boolean = !IS_PRODUCTION && !IS_TEST;