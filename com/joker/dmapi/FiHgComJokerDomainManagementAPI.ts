// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { JokerComApiLoginDTO } from "./types/JokerComApiLoginDTO";
import { JokerComApiDomainListDTO } from "./types/JokerComApiDomainListDTO";
import { JokerComApiWhoisDTO } from "./types/JokerComApiWhoisDTO";
import { JokerComApiWhoisContactDTO } from "./types/JokerComApiWhoisContactDTO";
import { JokerComApiPriceListDTO } from "./types/JokerComApiPriceListDTO";
import { JokerPrivacyType } from "./types/JokerPrivacyType";
import { JokerComApiDomainPriceType } from "./types/JokerComApiDomainPriceType";
import { JokerComApiPeriodType } from "./types/JokerComApiPeriodType";
import { JokerComApiDomainCheckDTO } from "./types/JokerComApiDomainCheckDTO";
import { JokerComApiRegisterDTO } from "./types/JokerComApiRegisterDTO";
import { JokerComApiProfileDTO } from "./types/JokerComApiProfileDTO";

/**
 * Joker.com DMAPI client interface
 *
 * @see https://github.com/heusalagroup/fi.hg.node for NodeJS implementation
 */
export interface FiHgComJokerDomainManagementAPI {

    /**
     *
     */
    hasSession() : boolean;

    /**
     *
     */
    isReady() : Promise<boolean>;

    /** Login using api key
     * @see https://joker.com/faq/content/26/14/en/login.html
     */
    loginWithApiKey (apiKey : string) : Promise<JokerComApiLoginDTO>;

    /** Login using username and password
     * @see https://joker.com/faq/content/26/14/en/login.html
     */
    loginWithUsername (
        username : string,
        password : string
    ) : Promise<JokerComApiLoginDTO>;

    /** Logout
     * @see https://joker.com/faq/content/26/15/en/logout.html
     */
    logout () : Promise<void>;

    /** query-domain-list
     * @params pattern Pattern to match (glob-like)
     * @params from Pattern to match (glob-like)
     * @params to End by this
     * @params showStatus
     * @params showGrants
     * @params showJokerNS
     * @see https://joker.com/faq/content/27/20/en/query_domain_list.html
     */
    queryDomainList (
        pattern     ?: string | undefined,
        from        ?: string | undefined,
        to          ?: string | undefined,
        showStatus  ?: boolean | undefined,
        showGrants  ?: boolean | undefined,
        showJokerNS ?: boolean | undefined
    ) : Promise<JokerComApiDomainListDTO>;

    /** query-whois for domains
     * At least one of the arguments must be specified
     * @see https://joker.com/faq/content/79/455/en/query_whois.html
     * @param domain
     */
    queryWhoisByDomain (
        domain : string
    ) : Promise<JokerComApiWhoisDTO>;

    /** query-whois for contacts
     * At least one of the arguments must be specified
     * @see https://joker.com/faq/content/79/455/en/query_whois.html
     * @param contact Contact handle
     */
    queryWhoisByContact (
        contact : string
    ) : Promise<JokerComApiWhoisContactDTO>;

    /** query-whois for nameservers
     * At least one of the arguments must be specified
     * @see https://joker.com/faq/content/79/455/en/query_whois.html
     * @param host
     */
    queryWhoisByHost (
        host : string
    ) : Promise<JokerComApiWhoisDTO>;

    /** query-profile */
    queryProfile () : Promise<JokerComApiProfileDTO>;

    /** query-price-list
     * @see https://joker.com/faq/content/79/509/en/query_price_list.html
     */
    queryPriceList () : Promise<JokerComApiPriceListDTO>;

    /** domain-renew
     * @see https://joker.com/faq/content/27/22/en/domain_renew.html
     */
    domainRenew (
        domain: string,
        period: number | undefined,
        expyear: string | undefined,
        privacy: JokerPrivacyType | undefined,
        maxPrice: number
    ) : Promise<void>;

    /** domain-check
     * @param domain
     * @param checkPrice
     * @param periodType
     * @param periods
     * @param language
     * @see https://joker.com/faq/content/27/497/en/domain_check.html
     */
    domainCheck (
        domain      : string,
        checkPrice ?: JokerComApiDomainPriceType | undefined,
        periods    ?: number | undefined,
        periodType ?: JokerComApiPeriodType,
        language   ?: string | undefined
    ) : Promise<JokerComApiDomainCheckDTO>;

    /** domain-register
     * @see https://joker.com/faq/content/27/21/en/domain_register.html
     * @param domain
     * @param period Registration period in months, not years!
     * @param status
     * @param ownerContact
     * @param billingContact
     * @param adminContact
     * @param techContact
     * @param nsList
     * @param autoRenew Optional
     * @param language Optional
     * @param registrarTag Only needed for .xxx domains
     * @param privacy Optional
     * @param maxPrice Optional
     */
    domainRegister (
        domain         : string,
        period         : number,
        ownerContact   : string,
        billingContact : string,
        adminContact   : string,
        techContact    : string,
        nsList         : readonly string[],
        autoRenew     ?: boolean  | undefined,
        language      ?: string | undefined,
        registrarTag  ?: string | undefined,
        privacy       ?: JokerPrivacyType | undefined,
        maxPrice      ?: number | undefined
    ) : Promise<JokerComApiRegisterDTO>;

    /** grants-list
     * @see https://joker.com/faq/content/76/448/en/grants_list.html
     */
    grantsList (
        domain: string,
        showKey: string
    ) : Promise<string>;

    /** grants-invite
     * @see https://joker.com/faq/content/76/449/en/grants_invite.html
     */
    grantsInvite (
        domain: string,
        email: string,
        clientUid: string,
        role: string,
        nickname: string
    ) : Promise<boolean>;

    /** domain-modify
     * @see https://joker.com/faq/content/27/24/en/domain_modify.html
     */
    domainModify (
        domain          : string,
        billingContact ?: string | undefined,
        adminContact   ?: string | undefined,
        techContact    ?: string | undefined,
        nsList         ?: readonly string[] | undefined,
        registerTag    ?: string | undefined,
        dnssec         ?: boolean | undefined,
        ds             ?: readonly string[] | undefined,
    ) : Promise<void>;

}
