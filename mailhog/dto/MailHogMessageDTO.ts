// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isMailHogContentDTO, MailHogContentDTO } from "./MailHogContentDTO";
import { isMailHogAddressDTO, MailHogAddressDTO } from "./MailHogAddressDTO";
import { isMailHogMimeDTO, MailHogMimeDTO } from "./MailHogMimeDTO";
import { isString } from "../../types/String";
import { isRegularObject } from "../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { isArrayOf } from "../../types/Array";

export interface MailHogMessageDTO {
    readonly ID      : string;
    readonly Created : string;
    readonly From    : MailHogAddressDTO;
    readonly To      : MailHogAddressDTO[];
    readonly Content : MailHogContentDTO;
    readonly MIME    : MailHogMimeDTO;
}

export function isMailHogMessageDTO (value: any): value is MailHogMessageDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'ID',
            'Created',
            'From',
            'MIME',
            'Raw',
            'To',
            'Content'
        ])
        && isString(value?.ID)
        && isString(value?.Created)
        && isMailHogAddressDTO(value?.From)
        && isMailHogMimeDTO(value?.MIME)
        && isMailHogContentDTO(value?.Content)
        && isArrayOf(value?.To, isMailHogAddressDTO)
    );
}

export function stringifyMailHogMessageDTO (value: MailHogMessageDTO): string {
    return `MailHogMessageDTO(${value})`;
}

export function parseMailHogMessageDTO (value: any): MailHogMessageDTO | undefined {
    if ( isMailHogMessageDTO(value) ) return value;
    return undefined;
}
