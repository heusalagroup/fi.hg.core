// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { RequestInterfaceUtils } from "../utils/RequestInterfaceUtils";
import { isString } from "../../types/String";
import { isObject } from "../../types/Object";

export type DefaultPathVariableMapValuesType = { [key: string]: string };

export function isDefaultPathVariableMapValuesType(value: any): value is DefaultPathVariableMapValuesType {

    return (
        !!value
        && isObject(value)
        && RequestInterfaceUtils.everyPropertyIs<string>(value, isString)
    );

}


