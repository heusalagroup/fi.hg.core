import {RequestRouterMappingObject} from "./types/RequestRouterMappingObject";
import {keys, some, trim} from "../modules/lodash";
import {BaseRoutes} from "./types/BaseRoutes";
import {ParamRoutes} from "./types/ParamRoutes";
import {StaticRoutes} from "./types/StaticRoutes";

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

export default RouteUtils;
