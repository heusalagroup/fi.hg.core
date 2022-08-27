// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createWhoisServerOptions, WhoisServerOptions } from "../../whois/types/WhoisServerOptions";

export const JOKER_WHOIS_HOSTNAME = "whois.joker.com";
export const JOKER_WHOIS_PORT = 4343;
export const JOKER_WHOIS_QUERY = "domain:$addr\r\n";

/**
 * @see https://joker.com/faq/content/85/437/en/check-domain-availability.html
 * @see example at https://github.com/heusalagroup/whois.hg.fi/blob/main/src/controllers/FiHgWhoisBackendController.ts#L62
 */
export class JokerComWhoisService {

    public static getJokerServer () : WhoisServerOptions {
        return createWhoisServerOptions(
            JOKER_WHOIS_HOSTNAME,
            JOKER_WHOIS_PORT,
            JOKER_WHOIS_QUERY
        );
    }

}
