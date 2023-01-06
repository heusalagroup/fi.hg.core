// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { DomainSearchState, explainDomainSearchState, isDomainSearchState } from "./DomainSearchState";
import { DomainSearchResult, explainDomainSearchResult, isDomainSearchResult } from "./DomainSearchResult";
import { explain, explainProperty } from "../../../types/explain";
import { explainString, isString } from "../../../types/String";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../../types/OtherKeys";
import { explainArrayOf, isArrayOf } from "../../../types/Array";

export interface DomainSearchDTO {

    /**
     * The search string for domains
     */
    readonly search  : string;

    /**
     * This is the status of the main result only if there is complete match for `name`.
     *
     * When there's at least one result still on-going it will be defined as SEARCHING.
     *
     * If there is no results at all, it will be UNAVAILABLE.
     */
    readonly state   : DomainSearchState;

    /**
     * Available results
     */
    readonly results : readonly DomainSearchResult[];

}

export function createDomainSearchDTO (
    search  : string,
    state   : DomainSearchState,
    results : readonly DomainSearchResult[]
) : DomainSearchDTO {
    return {
        search,
        state,
        results
    };
}

export function isDomainSearchDTO (value: any) : value is DomainSearchDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'search',
            'state',
            'results'
        ])
        && isString(value?.search)
        && isDomainSearchState(value?.state)
        && isArrayOf<DomainSearchResult>(value?.results, isDomainSearchResult)
    );
}

export function explainDomainSearchDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'search',
                'state',
                'results'
            ])
            , explainProperty("search", explainString(value?.search))
            , explainProperty("state", explainDomainSearchState(value?.state))
            , explainProperty("results", explainArrayOf<DomainSearchResult>(
                "DomainSearchResult",
                explainDomainSearchResult,
                value?.state,
                isDomainSearchResult
            ))
        ]
    );
}

export function stringifyDomainProductSearchDTO (value : DomainSearchDTO) : string {
    return `DomainProductSearchDTO(${value})`;
}

export function parseDomainProductSearchDTO (value: any) : DomainSearchDTO | undefined {
    if (isDomainSearchDTO(value)) return value;
    return undefined;
}
