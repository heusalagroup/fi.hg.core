// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogService } from "../../../LogService";
import { first } from "../../../functions/first";
import { WhoisService } from "../../../whois/WhoisService";
import { WhoisLookupResult } from "../../../whois/types/WhoisLookupResult";
import { createWhoisServerOptions, WhoisServerOptions } from "../../../whois/types/WhoisServerOptions";
import { JokerComWhoisDTO, parseJokerComWhoisDTOFromString } from "./types/JokerComWhoisDTO";

const LOG = LogService.createLogger('JokerComWhoisService');

export const JOKER_WHOIS_HOSTNAME = "whois.joker.com";
export const JOKER_WHOIS_PORT = 4343;
export const JOKER_WHOIS_QUERY = "domain:$addr\r\n";

/**
 * @see https://joker.com/faq/content/85/437/en/check-domain-availability.html
 * @see example at https://github.com/heusalagroup/whois.hg.fi/blob/main/src/controllers/FiHgWhoisBackendController.ts#L62
 */
export class JokerComWhoisService {

    private readonly _whois : WhoisService;
    private readonly _jokerServer : WhoisServerOptions;

    /**
     * Returns default joker.com whois server settings
     */
    public static getJokerServer () : WhoisServerOptions {
        return createWhoisServerOptions(
            JOKER_WHOIS_HOSTNAME,
            JOKER_WHOIS_PORT,
            JOKER_WHOIS_QUERY
        );
    }

    /**
     * Create a service for accessing whois.joker.com
     *
     * @param service
     * @param server
     */
    constructor (
        service: WhoisService,
        server : WhoisServerOptions = JokerComWhoisService.getJokerServer()
    ) {
        this._whois = service;
        this._jokerServer = server;
    }

    /**
     * Lookup for a domain name using whois.joker.com
     *
     * @param address
     */
    public async jokerLookup (
        address: string
    ) : Promise<JokerComWhoisDTO> {
        const server = this._jokerServer;
        LOG.debug(`lookupJoker: "${address}": server: `, server);
        const payload : readonly WhoisLookupResult[] = await this._whois.whoisLookup(
            address,
            {
                server,
                follow: 0
            }
        );
        LOG.debug(`lookupJoker: "${address}": payload: `, payload);
        const response = first(payload);
        const dto = response?.data ? parseJokerComWhoisDTOFromString(response?.data) : undefined;
        if (!dto) {
            LOG.error(`jokerLookup: Could not parse for "${address}": payload: `, payload);
            throw new Error(`lookupJoker: Could not parse whois server response for "${address}": ${payload}`);
        }
        return dto;
    }

}
