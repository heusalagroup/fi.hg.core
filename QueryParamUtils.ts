// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { forEach } from "./functions/forEach";
import { keys } from "./functions/keys";

export interface QueryParams {
    readonly [key:string] : string
}

export class QueryParamUtils {

    /**
     * Stringify query params from an object presentation.
     *
     * Appends the question mark.
     *
     * @param params
     */
    public static stringifyQueryParams (
        params : QueryParams
    ) : string {
        let str = QueryParamUtils.stringifyQueryParamsOnly(params);
        return str === '' ? '' : `?${str}`;
    }

    /**
     * Stringify query params from an object presentation.
     *
     * Does not append the question mark.
     *
     * @param params
     */
    public static stringifyQueryParamsOnly (
        params : QueryParams
    ) : string {
        const a = new URLSearchParams();
        forEach(
            keys(params),
            (key: string) : void => {
                const value : string = params[key];
                a.append(key, value);
            }
        );
        return a.toString();
    }

}
