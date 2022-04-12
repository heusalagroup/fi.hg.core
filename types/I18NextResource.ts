// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../Json";

export interface I18NextResourceProperty {
    readonly translation: ReadonlyJsonObject;
    readonly [key: string]: ReadonlyJsonObject;
}

/**
 * The keyword is Language
 */
export interface I18NextResource {
    readonly [key: string]: I18NextResourceProperty;
}
