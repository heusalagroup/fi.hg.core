// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isReadonlyJsonObject, ReadonlyJsonObject } from "../../../Json";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { isString } from "../../../types/String";
import { NewSimpleDTO } from "./NewSimpleDTO";
import { isStringArray } from "../../../types/StringArray";
import { isNumber } from "../../../types/Number";
import { isBoolean } from "../../../types/Boolean";

/**
 * The client object used in the REST API communication
 */
export interface SimpleDTO extends NewSimpleDTO {
    readonly id       : string;
    readonly updated  : string;
    readonly created  : string;
    readonly data     : ReadonlyJsonObject;
    readonly members : readonly string[];
    readonly invited : readonly string[];
    readonly version : number;
    readonly deleted : boolean;
}

export function createSimpleDTO (
    id            : string,
    updated       : string,
    created       : string,
    data          : ReadonlyJsonObject,
    members       : readonly string[],
    invited       : readonly string[],
    version : number,
    deleted : boolean
) : SimpleDTO {
    return {
        id,
        updated,
        created,
        data,
        members,
        invited,
        version,
        deleted
    };
}

export function isSimpleDTO (value: any): value is SimpleDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            "id",
            "updated",
            "created",
            "data",
            "members",
            "invited",
            'version',
            'deleted',
        ])
        && isString(value?.id)
        && isString(value?.updated)
        && isString(value?.created)
        && isReadonlyJsonObject(value?.data)
        && isStringArray(value?.members)
        && isStringArray(value?.invited)
        && isNumber(value?.version)
        && isBoolean(value?.deleted)
    );
}

export function stringifySimpleDTO (value: SimpleDTO): string {
    if ( !isSimpleDTO(value) ) throw new TypeError(`Not SimpleDTO: ${value}`);
    return `SimpleDTO(${value})`;
}

export function parseSimpleDTO (value: any): SimpleDTO | undefined {
    if ( isSimpleDTO(value) ) return value;
    return undefined;
}
