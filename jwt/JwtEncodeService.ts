// Copyright (c) 2021-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { JwtEngine } from "./JwtEngine";

export interface JwtEncodeService {

    getDefaultAlgorithm (): string;

    setDefaultAlgorithm (value: string): void;

    /**
     * Creates a jwt engine which hides secret
     *
     * @param secret
     * @param defaultAlgorithm
     */
    createJwtEngine (
        secret: string,
        defaultAlgorithm ?: string
    ): JwtEngine;

}
