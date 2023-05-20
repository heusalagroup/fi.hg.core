// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { RequestInterfaceUtils } from "../utils/RequestInterfaceUtils";
import { isArray } from "../../types/Array";
import { isString } from "../../types/String";
import { isObject } from "../../types/Object";
import { every } from "../../functions/every";

export type DefaultHeaderMapValuesType = { [key: string]: string | string[] };

export function isDefaultHeaderMapValuesType(value: unknown): value is DefaultHeaderMapValuesType {

    return (
        !!value
        && isObject(value)
        && RequestInterfaceUtils.everyPropertyIs<string>(
            value,
            (item: any): boolean => {
                return (
                    isString(item)
                    || (isArray(item) && every(item, isString))
                );
            }
        )
    );

}


