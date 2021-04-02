import {BaseRoutes, GetRouteResultType, RouteParamValuesObject} from "./BaseRoutes";
import {RequestRouterMappingObject} from "./RequestRouterMappingObject";
import {every, find, isString, keys, map, some, trim} from "../../modules/lodash";
import {RequestRouterMappingPropertyObject} from "./RequestRouterMappingPropertyObject";

interface CompiledRequestPathCallback {
    (path: string) : GetRouteResultType;
}

export class ParamRoutes implements BaseRoutes {

    private readonly _routes: CompiledRequestPathCallback[];

    public constructor (routes: RequestRouterMappingObject) {

        const routePaths : string[] = keys(routes);

        const routeFunctions : CompiledRequestPathCallback[] = map(routePaths, (itemKey : string) : CompiledRequestPathCallback => {

            const itemValue : RequestRouterMappingPropertyObject[] = routes[itemKey];

            return ParamRoutes.createCallbackFunction(itemKey, itemValue);

        });

        this._routes = routeFunctions;

    }

    public hasRoute (pathName: string): boolean {

        return some(this._routes, (f : CompiledRequestPathCallback) => {
            const [r] = f(pathName);
            return r !== undefined && r?.length >= 1;
        });

    }

    public getRoute (pathName: string): GetRouteResultType {

        let lastResult : RequestRouterMappingPropertyObject[] | undefined = undefined;
        let lastParams : RouteParamValuesObject | undefined = undefined;

        find(
            this._routes,
            (f : CompiledRequestPathCallback) => {

                let [result, params] = f(pathName);

                if (result !== undefined) {
                    lastResult = result;
                    lastParams = params;
                    return true;
                }

                return false;

            }
        );

        if (lastResult !== undefined) {
            return [lastResult, lastParams];
        } else {
            return [undefined, undefined]
        }

    }

    public static createCallbackFunction (
        itemKey   : string,
        itemValue : RequestRouterMappingPropertyObject[]
    ) : CompiledRequestPathCallback {

        if (itemKey === '') {
            itemKey = '/';
        }

        const formatParts     = itemKey.split('/');
        const formatPartsLen  = formatParts.length;

        if (formatPartsLen === 0) throw new Error('Path format had no items. This should not happen.');

        const paramKeys : (string|null)[] = map(formatParts, (pathValue : string, pathIndex : number) => {
            if ( pathValue.length >= 3 && pathValue[0] === '{' && pathValue[pathValue.length -1 ] === '}' ) {
                return trim(pathValue.substr(1, pathValue.length - 2));
            } else {
                formatParts[pathIndex] = pathValue.toLowerCase();
                return null;
            }
        });

        const hasParamKeys : boolean = some(paramKeys, isString);

        if (!hasParamKeys) {
            const staticPath = itemKey.toLowerCase();
            return (requestPath: string) : GetRouteResultType => {
                if ( requestPath.toLowerCase() !== staticPath ) {
                    return [undefined, undefined];
                } else {
                    return [itemValue, undefined];
                }
            };
        }

        return (requestPath: string) : GetRouteResultType => {

            const requestParts    = requestPath.split('/');

            const requestPartsLen = requestParts.length;

            // There should be at least one item always, since there should be at least one "/"
            if ( requestPartsLen === 0 ) {
                return [undefined, undefined];
            }

            if ( formatPartsLen !== requestPartsLen ) {
                return [undefined, undefined];
            }

            let paramValues : RouteParamValuesObject = {};

            const isMatch : boolean = every(paramKeys, (paramKey : string | null, paramIndex : number) => {

                if (isString(paramKey)) {

                    paramValues[paramKey] = requestParts[paramIndex];

                    return true;

                } else {

                    return formatParts[paramIndex] === requestParts[paramIndex].toLowerCase();

                }

            });

            if (!isMatch) {
                return [undefined, undefined];
            }

            return [itemValue, paramValues];

        };

    }

}

export default ParamRoutes;
