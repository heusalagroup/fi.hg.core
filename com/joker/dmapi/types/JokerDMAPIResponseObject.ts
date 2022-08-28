// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { JokerStringObject } from "./JokerStringObject";

export interface JokerDMAPIResponseObject {
    readonly headers: JokerStringObject;
    readonly body: string;
}
