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
     * @param params
     */
    public static stringifyQueryParams (
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
        let str = a.toString();
        return str === '' ? '' : `?${str}`;
    }

}
