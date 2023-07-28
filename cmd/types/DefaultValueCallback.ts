// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export interface DefaultValueCallback<T=any, R=any> {
    (value ?: T | undefined): R | undefined | Promise<R | undefined>;
}
