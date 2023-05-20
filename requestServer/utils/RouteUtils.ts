// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { RequestRouterMappingObject } from "../types/RequestRouterMappingObject";
import { BaseRoutes } from "../types/BaseRoutes";
import { ParamRoutes } from "../types/ParamRoutes";
import { StaticRoutes } from "../types/StaticRoutes";
import { keys } from "../../functions/keys";
import { some } from "../../functions/some";

export class RouteUtils {

    public static createRoutes (routes : RequestRouterMappingObject) : BaseRoutes {

        if (RouteUtils.routesHasParameter(routes)) {
            return new ParamRoutes(routes);
        }

        return new StaticRoutes(routes);

    }

    public static pathHasParameter (value : string) : boolean {
        return value.split('/').some((item : string) => {
            return item.length >= 3 && item[0] === '{' && item[item.length - 1 ] === '}';
        });
    }

    public static routesHasParameter (routes : RequestRouterMappingObject) : boolean {
        return some(keys(routes), RouteUtils.pathHasParameter);
    }

}
