// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { WhoisServerOptions } from "./WhoisServerOptions";

export interface WhoisServerList {
    readonly [key: string]: string | WhoisServerOptions | null | undefined;
}
