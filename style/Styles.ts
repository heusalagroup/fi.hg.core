// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isObjectOf, isString } from "../modules/lodash";
import { ComponentStyle, isComponentStyle } from "./compiled/ComponentStyle";
import { ComponentStyleLayoutMapping } from "./StyleLayout";

export interface Styles {
    readonly [key: string]: ComponentStyle;
}

export function createStyles (): Styles {
    return {};
}

export function isStyles (value : any) : value is ComponentStyleLayoutMapping {
    return isObjectOf<string, ComponentStyle>(value, isString, isComponentStyle);
}
