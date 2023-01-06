// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isMailHogContentDTO, MailHogContentDTO } from "./MailHogContentDTO";
import { isRegularObject } from "../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { isArrayOf } from "../../types/Array";

export interface MailHogMimeDTO {
    readonly Parts : MailHogContentDTO[];
}

export function isMailHogMimeDTO (value: any): value is MailHogMimeDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'Parts'
        ])
        && isArrayOf(value?.Parts, isMailHogContentDTO)
    );
}

export function stringifyMailHogMimeDTO (value: MailHogMimeDTO): string {
    return `MailHogMimeDTO(${value})`;
}

export function parseMailHogMimeDTO (value: any): MailHogMimeDTO | undefined {
    if ( isMailHogMimeDTO(value) ) return value;
    return undefined;
}
