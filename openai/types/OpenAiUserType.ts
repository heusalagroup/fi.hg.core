import {explainEnum} from "../../types/Enum";
import {isOpenAiType, OpenAiType} from "../../../../heusalagroup/core/types/OpenAiType";

export enum OpenAiUserType {
    USER = "user",
    SYSTEM = "system",
    ASSISTANT = "assistant"
}

export function isOpenAiUserType (value : any) : value is OpenAiUserType {
    switch(value) {
        case OpenAiUserType.USER:
        case OpenAiUserType.SYSTEM:
        case OpenAiUserType.ASSISTANT:
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
        default                         : return `OpenAiUserType#${value}`
    }
}

/**
 * Explain the given value with respect to the `OpenAiUserType` enum.
 *
 * @param {unknown} value - The value to explain.
 * @returns {string} A string explaining the value with respect to the `OpenAiModel` enum.
 */
export function explainOpenAiUserType (value : unknown) : string {
    return explainEnum("OpenAiUserType", OpenAiType, isOpenAiType, value);
}

export function parseOpenAiUserType (value: any): OpenAiUserType | undefined {
    switch (`${value}`.toLowerCase()) {
        case 'user'         : return OpenAiUserType.USER;
        case 'system'       : return OpenAiUserType.SYSTEM;
        case 'assistant'    : return OpenAiUserType.ASSISTANT;
        default             : return undefined;
    }
}