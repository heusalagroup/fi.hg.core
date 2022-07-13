// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isArrayOf } from "../../modules/lodash";
import { isMailHogMessageDTO, MailHogMessageDTO } from "./MailHogMessageDTO";

export type MailHogMessageListDTO = MailHogMessageDTO[];

export function isMailHogMessagesDTO (value: any): value is MailHogMessageListDTO {
    return isArrayOf(value, isMailHogMessageDTO);
}

export function stringifyMailHogMessagesDTO (value: MailHogMessageListDTO): string {
    return `MailHogMessagesDTO(${value})`;
}

export function parseMailHogMessagesDTO (value: any): MailHogMessageListDTO | undefined {
    if ( isMailHogMessagesDTO(value) ) return value;
    return undefined;
}
