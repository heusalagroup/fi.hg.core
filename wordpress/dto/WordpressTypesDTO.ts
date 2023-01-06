// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString } from "../../types/String";

export enum WordpressEnum {
    publish = "publish",
    future = "future",
    draft = "draft",
    pending = "pending",
    private = "private"
}

export function isWordpressTypesDTO (value: WordpressEnum): boolean {
    return (
        isString(value)
    )
}
