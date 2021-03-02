import RequestController, {getInternalRequestMappingObject, setInternalRequestMappingObject} from "./types/RequestController";
import RequestMappingObject from "./types/RequestMappingObject";
import RequestMappingArray from "./types/RequestMappingArray";
import {isRequestMethod} from "./types/RequestMethod";
import {isString, filter, concat, has} from "../modules/lodash";
import RequestControllerMappingObject, {RequestParamObject} from "./types/RequestControllerMappingObject";
import RequestParamType from "./types/RequestParamType";
import LogService from "../LogService";

const LOG = LogService.createLogger('RequestControllerUtils');

export class RequestControllerUtils {

    static parseRequestMappings (value : RequestMappingArray) : RequestMappingObject {

        return {
            methods : filter(value, isRequestMethod),
            paths   : filter(value, isString)
        };

    }

    static attachControllerMapping (
        controller : RequestController,
        config     : RequestMappingArray
    ) {

        const parsedObject = RequestControllerUtils.parseRequestMappings(config);

        LOG.debug('attachControllerMapping: controller = ', controller);
        LOG.debug('attachControllerMapping: parsedObject = ', parsedObject);

        const origMapping : RequestControllerMappingObject | undefined = getInternalRequestMappingObject(controller, controller);

        LOG.debug('attachControllerMapping: origMapping = ', origMapping);

        if (origMapping === undefined) {

            setInternalRequestMappingObject(controller, {
                mappings: [parsedObject],
                controllerProperties: {}
            });

        } else {

            setInternalRequestMappingObject(controller, {
                ...origMapping,
                mappings: concat([], origMapping.mappings, [parsedObject])
            });

        }

    }

    static attachControllerMethodMapping (
        controller  : RequestController,
        config      : RequestMappingArray,
        propertyKey : string
    ) {

        const origMapping : RequestControllerMappingObject | undefined = getInternalRequestMappingObject(controller, controller);

        const parsedObject = RequestControllerUtils.parseRequestMappings(config);

        if (origMapping === undefined) {

            setInternalRequestMappingObject(controller, {
                mappings: [],
                controllerProperties: {
                    [propertyKey] : {
                        mappings : [parsedObject],
                        params   : []
                    }
                }
            });

        } else if (!has(origMapping.controllerProperties, propertyKey)) {

            setInternalRequestMappingObject(controller, {
                ...origMapping,
                controllerProperties: {
                    ...origMapping.controllerProperties,
                    [propertyKey] : {
                        mappings : [parsedObject],
                        params   : []
                    }
                }
            });

        } else {

            setInternalRequestMappingObject(controller, {
                ...origMapping,
                controllerProperties: {
                    ...origMapping.controllerProperties,
                    [propertyKey] : {
                        ...origMapping.controllerProperties[propertyKey],
                        mappings: concat([parsedObject], origMapping.controllerProperties[propertyKey].mappings)
                    }
                }
            });

        }

    }

    static setControllerMethodParam (
        controller  : RequestController,
        propertyKey : string,
        paramIndex  : number,
        queryParam  : string,
        paramType   : RequestParamType
    ) {

        LOG.debug('setControllerMethodParam: queryParam =', queryParam, paramType);

        const origMapping : RequestControllerMappingObject | undefined = getInternalRequestMappingObject(controller, controller);

        LOG.debug('setControllerMethodParam: origMapping =', origMapping);

        if (origMapping === undefined) {

            let params : Array<RequestParamObject|null> = [];
            while (paramIndex >= params.length) {
                params.push(null);
            }

            params[paramIndex] = {
                queryParam: queryParam,
                type: paramType
            };

            LOG.debug('setControllerMethodParam: params: ', params);

            setInternalRequestMappingObject(controller, {
                mappings: [],
                controllerProperties: {
                    [propertyKey] : {
                        mappings : [],
                        params   : params
                    }
                }
            });

        } else if (!has(origMapping.controllerProperties, propertyKey)) {

            let params : Array<RequestParamObject|null> = [];
            while (paramIndex >= params.length) {
                params.push(null);
            }

            params[paramIndex] = {
                queryParam: queryParam,
                type: paramType
            };

            LOG.debug('setControllerMethodParam: params: ', params);

            setInternalRequestMappingObject(controller, {
                ...origMapping,
                controllerProperties: {
                    ...origMapping.controllerProperties,
                    [propertyKey] : {
                        mappings : [],
                        params   : params
                    }
                }
            });

        } else {

            let params : Array<RequestParamObject|null> = concat([], origMapping.controllerProperties[propertyKey].params);
            while (paramIndex >= params.length) {
                params.push(null);
            }

            LOG.debug('setControllerMethodParam: params: ', params);

            params[paramIndex] = {
                queryParam: queryParam,
                type: paramType
            };

            setInternalRequestMappingObject(controller, {
                ...origMapping,
                controllerProperties: {
                    ...origMapping.controllerProperties,
                    [propertyKey] : {
                        ...origMapping.controllerProperties[propertyKey],
                        params: params
                    }
                }
            });

        }

    }

}

export default RequestControllerUtils;
