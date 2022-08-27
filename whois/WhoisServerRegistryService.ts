// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { WhoisServerOptions } from "./types/WhoisServerOptions";

export interface WhoisServerRegistryService {

    resolveServerFromAddress ( addr: string ): string | WhoisServerOptions | undefined;

}
