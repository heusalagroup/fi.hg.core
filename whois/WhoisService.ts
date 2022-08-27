// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { WhoisLookupResult } from "./types/WhoisLookupResult";
import { WhoisLookupOptions } from "./types/WhoisLookupOptions";

/**
 * @see NodeWhoisService at https://github.com/heusalagroup/fi.hg.node
 * @see example use at https://github.com/heusalagroup/whois.hg.fi/blob/main/src/controllers/FiHgWhoisBackendController.ts#L51
 */
export interface WhoisService {

    whoisLookup (
        address: string,
        options?: WhoisLookupOptions
    ) : Promise<readonly WhoisLookupResult[]>;

}
