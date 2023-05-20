// Copyright (c) 2022-2023. Heusala Group Oy <info@hg.fi>. All rights reserved.
// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { Headers } from "../../request/types/Headers";
import { JsonAny } from "../../Json";

export interface ParseRequestBodyCallback {
    (headers: Headers): JsonAny | undefined | Promise<JsonAny | undefined>;
}
