// Copyright (c) 2022-2023. Heusala Group Oy <info@hg.fi>. All rights reserved.
// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { RequestMethod } from "../../request/types/RequestMethod";
import { RequestQueryParameters, WritableRequestQueryParameters } from "../../request/utils/RequestQueryParameters";
import { RequestRouterMappingPropertyObject } from "./RequestRouterMappingPropertyObject";
import { RouteParamValuesObject } from "./BaseRoutes";
import { values } from "../../functions/values";
import { forEach } from "../../functions/forEach";

export interface RequestContext {

    readonly method?: RequestMethod;
    readonly pathName?: string;
    readonly queryParams?: RequestQueryParameters;
    readonly routes?: readonly RequestRouterMappingPropertyObject[] | undefined;
    readonly bodyRequired?: boolean;
    readonly pathVariables?: RouteParamValuesObject;

}

function decodeQueryParam (p : string) {
    return decodeURIComponent(p).replace(/\+/g, " ");
}

export function parseRequestContextFromPath (urlString : string | undefined) : RequestContext {

    if (urlString === undefined) {
        return {
            pathName: '/'
        };
    }

    const index = urlString.indexOf('?');
    if (index < 0) {
        return {
            pathName: urlString
        };
    }

    const pathName = urlString.substring(0, index);
    const queryData = urlString.substring(index+1);
    if (queryData === '') {
        return { pathName };
    }

    const params = queryData.split('&');

    let queryParams : WritableRequestQueryParameters = {};
    forEach(
        params,
        (item: string) : void => {
            const [ keyString, ...restOf ] = item.split('=');
            const key = decodeQueryParam(keyString);
            const value = decodeQueryParam(restOf.join('='));
            queryParams[key] = value;
        }
    );

    return {
        pathName,
        ...(values(queryParams).length ? { queryParams } : {})
    };
}
