// Copyright (c) 2022. <info@heusalagroup.fi>. All rights reserved.
//

import {
    hasNoOtherKeys,
    isBoolean,
    isRegularObject
} from "../modules/lodash";

export interface HealthCheckDTO {
    readonly ready  ?: boolean;
}

export function createHealthCheckDTO (
    ready  : boolean
) : HealthCheckDTO {
    return {ready};
}

export function isHealthCheckDTO (value: any): value is HealthCheckDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'ready'
        ])
        && isBoolean(value?.ready)
    );
}

export function stringifyHealthCheckDTO (value: HealthCheckDTO): string {
    return `HealthCheckDTO(${value?.ready})`;
}

export function parseHealthCheckDTO (value: any) : HealthCheckDTO | undefined {
    if ( isHealthCheckDTO(value) ) return value;
    if ( isBoolean(value) ) return createHealthCheckDTO(value);
    return undefined;
}
