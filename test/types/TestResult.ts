// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { TestResultState } from "./TestResultState";

export interface TestResult {
    readonly id           : string;
    readonly state        : TestResultState;
    readonly file         : string;
    readonly className    : string;
    readonly methodName   : string;
    readonly result      ?: any;
    readonly promise     ?: Promise<any>;
}
