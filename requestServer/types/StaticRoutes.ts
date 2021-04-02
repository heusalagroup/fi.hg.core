import {BaseRoutes, GetRouteResultType} from "./BaseRoutes";
import {RequestRouterMappingObject} from "./RequestRouterMappingObject";
import {has, keys, map} from "../../modules/lodash";
import {RequestRouterMappingPropertyObject} from "./RequestRouterMappingPropertyObject";

type MappingPropertyKeyValuePair = readonly [string, RequestRouterMappingPropertyObject[]];

export class StaticRoutes implements BaseRoutes {

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

export default StaticRoutes;
