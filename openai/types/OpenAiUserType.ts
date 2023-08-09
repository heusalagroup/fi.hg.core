import {explainEnum} from "../../types/Enum";

export enum OpenAiUserType {
    USER        = "user",
    SYSTEM      = "system",
    ASSISTANT   = "assistant",
    FUNCTION    = "function"
}

export function isOpenAiUserType (value : any) : value is OpenAiUserType {
    switch(value) {
        case OpenAiUserType.USER:
        case OpenAiUserType.SYSTEM:
        case OpenAiUserType.ASSISTANT:
        case OpenAiUserType.FUNCTION:
            return true;

        default:
            return false;
    }
}

export function stringifyOpenAiUserType (value: OpenAiUserType): string {
    switch (value) {
        case OpenAiUserType.USER            : return 'user';
        case OpenAiUserType.SYSTEM          : return 'system';
        case OpenAiUserType.ASSISTANT       : return 'assistant';
        case OpenAiUserType.FUNCTION        : return 'function';
        default                             : return `OpenAiUserType#${value}`
    }
}

/**
 * Explain the given value with respect to the `OpenAiUserType` enum.
 *
 * @param {unknown} value - The value to explain.
 * @returns {string} A string explaining the value with respect to the `OpenAiModel` enum.
 */
export function explainOpenAiUserType (value : unknown) : string {
    return explainEnum("OpenAiUserType", OpenAiUserType, isOpenAiUserType, value);
}

export function parseOpenAiUserType (value: any): OpenAiUserType | undefined {
    switch (`${value}`.toLowerCase()) {
        case 'user'         : return OpenAiUserType.USER;
        case 'system'       : return OpenAiUserType.SYSTEM;
        case 'assistant'    : return OpenAiUserType.ASSISTANT;
        case 'function'     : return OpenAiUserType.FUNCTION;
        default             : return undefined;
    }
}