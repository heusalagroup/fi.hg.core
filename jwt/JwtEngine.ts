// Copyright (c) 2021-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../Json";
import { JwtPayload } from "./types/JwtPayload";

export interface JwtEngine {
    getDefaultAlgorithm () : string;
    setDefaultAlgorithm (value: string) : void;
    sign(payload: ReadonlyJsonObject | JwtPayload, alg?: string) : string;
    verify(token: string, alg?: string) : boolean;
}
