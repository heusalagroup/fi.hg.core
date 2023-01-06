// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { BaseRoutes, GetRouteResultType } from "./BaseRoutes";
import { RequestRouterMappingObject } from "./RequestRouterMappingObject";
import { map } from "../../functions/map";
import { RequestRouterMappingPropertyObject} from "./RequestRouterMappingPropertyObject";
import { LogService } from "../../LogService";
import { LogLevel } from "../../types/LogLevel";
import { keys } from "../../functions/keys";

const LOG = LogService.createLogger('StaticRoutes');

type MappingPropertyKeyValuePair = readonly [string, RequestRouterMappingPropertyObject[]];

export class StaticRoutes implements BaseRoutes {

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    private readonly _routes: Map<string, RequestRouterMappingPropertyObject[]>;

    public constructor (routes: RequestRouterMappingObject) {

        const routePaths : string[] = keys(routes);

        const routePairs : MappingPropertyKeyValuePair[] = map(routePaths, (itemKey : string) : MappingPropertyKeyValuePair => {

            const itemValue : RequestRouterMappingPropertyObject[] = routes[itemKey];

            return [itemKey.toLowerCase(), itemValue];

        });

        this._routes = new Map<string, RequestRouterMappingPropertyObject[]>( routePairs );

    }

    public hasRoute (pathName: string): boolean {
        LOG.debug(`Looking up "${pathName}" from `, this._routes);
        return this._routes.has(pathName.toLowerCase());
    }

    public getRoute (pathName: string): GetRouteResultType {

        const result = this._routes.get(pathName.toLowerCase());

        if (result !== undefined) {
            return [result, undefined];
        }

        return [undefined, undefined];

    }

}
