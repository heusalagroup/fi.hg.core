// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { RequestMappingObject, isRequestMappingObject} from "./RequestMappingObject";
import { RequestInterfaceUtils } from "../utils/RequestInterfaceUtils";
import { forEach } from "../../functions/forEach";
import { has } from "../../functions/has";
import { reduce } from "../../functions/reduce";
import {
    explainRequestControllerMethodObject,
    isRequestControllerMethodObject,
    RequestControllerMethodObject
} from "./RequestControllerMethodObject";
import { OpenAPIV3 } from "../../types/openapi";
import { LogService } from "../../LogService";
import { getOpenApiMethodFromRequestMethod, RequestMethod } from "./RequestMethod";
import { isArray } from "../../types/Array";
import { isObject } from "../../types/Object";
import { every } from "../../functions/every";
import { LogLevel } from "../../types/LogLevel";

export interface InternalRequestControllerMappingObject {

    mappings              : readonly RequestMappingObject[];
    controllerProperties  : { readonly [key: string]: RequestControllerMethodObject };

    /**
     * OpenAPI v3 document annotations
     */
    openApiPartials      ?: readonly Partial<OpenAPIV3.Document>[];

    /**
     * OpenAPI v3 operation annotations for undefined properties
     */
    operations           ?: readonly Partial<OpenAPIV3.OperationObject>[];

}

export interface RequestControllerMappingObject {

    mappings              : readonly RequestMappingObject[];
    controllerProperties  : { readonly [key: string]: RequestControllerMethodObject };
    controller           ?: any;

    /**
     * OpenAPI v3 document annotations
     */
    openApiPartials      ?: readonly Partial<OpenAPIV3.Document>[];

    /**
     * OpenAPI v3 operation annotations for undefined properties
     */
    operations           ?: readonly Partial<OpenAPIV3.OperationObject>[];

}

export function isRequestControllerMappingObject (value: any) : value is RequestControllerMappingObject {
    return (
        RequestInterfaceUtils.isObject(value)
        && RequestInterfaceUtils.hasPropertyMappings(value) && isArray(value.mappings) && every(value.mappings, isRequestMappingObject)
        && RequestInterfaceUtils.hasPropertyControllerProperties(value) && isObject(value.controllerProperties) && RequestInterfaceUtils.everyPropertyIs<RequestControllerMethodObject>(value.controllerProperties, isRequestControllerMethodObject)
    );
}

export function explainRequestControllerMappingObject (value: any) : string {

    if (!RequestInterfaceUtils.isObject(value)) return "not object";

    if (!RequestInterfaceUtils.hasPropertyMappings(value)) {
        return `Property "mappings" was not valid: Did not exist`;
    }

    if (!isArray(value.mappings)) {
        return `Property "mappings" was not valid: Was not array`;
    }

    if (!every(value.mappings, isRequestMappingObject)) {
        return `Property "mappings" was not valid: Some items were not valid`;
    }


    if (!RequestInterfaceUtils.hasPropertyControllerProperties(value)) {
        return `Property "controllerProperties" was not valid: Property did not exist`;
    }

    if (!isObject(value.controllerProperties)) {
        return `Property "controllerProperties" was not valid: Property was not object`;
    }

    if (!RequestInterfaceUtils.everyPropertyIs<RequestControllerMethodObject>(value.controllerProperties, isRequestControllerMethodObject)) {
        return `Property "controllerProperties" was not valid: Some properties were not valid: ${ RequestInterfaceUtils.explainEveryPropertyIs(value.controllerProperties, isRequestControllerMethodObject, explainRequestControllerMethodObject) }`;
    }

    return "ok";

}

const LOG = LogService.createLogger('getOpenApiDocumentFromRequestControllerMappingObject');

export function getOpenApiDocumentFromRequestControllerMappingObject (
    data: RequestControllerMappingObject
) : OpenAPIV3.Document {
    LOG.debug(`data.mappings= `, data.mappings);
    LOG.debug(`data.controllerProperties= `, data.controllerProperties);
    const info : OpenAPIV3.InfoObject = {
        title: "API Reference",
        version: "0.0.0"
    };
    const paths : OpenAPIV3.PathsObject = reduce(
        data.controllerProperties,
        (obj: OpenAPIV3.PathsObject, item: RequestControllerMethodObject): OpenAPIV3.PathsObject => {

            LOG.debug('item.requestBodyRequired = ', item.requestBodyRequired);
            LOG.debug('item.modelAttributes = ', item.modelAttributes);
            LOG.debug('item.mappings = ', item.mappings);
            LOG.debug('item.params = ', item.params);
            LOG.debug('item.operations = ', item.operations);

            // Go through every method + path mapping
            forEach(
                item.mappings,
                (mapping: RequestMappingObject) => {
                    forEach(
                        mapping.methods,
                        (method: RequestMethod) => {
                            const openApiMethod = getOpenApiMethodFromRequestMethod(method);
                            forEach(
                                mapping.paths,
                                (path: string) => {
                                    if (item?.operations?.length) {
                                        // Set path operations
                                        forEach(
                                            item.operations,
                                            (op: Partial<OpenAPIV3.OperationObject>) => {
                                                obj = setOpenApiDocumentPathOperationsObject(
                                                    obj,
                                                    openApiMethod,
                                                    path,
                                                    op
                                                );
                                            }
                                        );
                                    } else {
                                        // Initialize empty object if no operations defined by annotations
                                        obj = setOpenApiDocumentPathOperationsObject(
                                            obj,
                                            openApiMethod,
                                            path,
                                            {}
                                        );
                                    }
                                }
                            );
                        }
                    );
                }
            );

            return obj;
        },
        {}
    );
    return reduce(
        data?.openApiPartials ?? [],
        (info : OpenAPIV3.Document, item: Partial<OpenAPIV3.Document>) : OpenAPIV3.Document => {
            return {
                ...info,
                ...item
            };
        },
        {
            info: info,
            openapi: "3.0.0",
            components: {},
            security: [],
            tags: [],
            paths
        }
    );
}

getOpenApiDocumentFromRequestControllerMappingObject.setLogLevel = (level: LogLevel) : void => {
    LOG.setLogLevel(level);
};

function setOpenApiDocumentPathOperationsObject (
    obj           : OpenAPIV3.PathsObject,
    method        : OpenAPIV3.HttpMethods,
    path          : string,
    newOperations : Partial<OpenAPIV3.OperationObject>
) : OpenAPIV3.PathsObject {

    // Create initial path object if missing
    if (!has(obj, path)) {
        obj = {
            ...obj,
            [path]: {}
        };
    }

    // Create initial path operations object if missing
    if (!has(obj[path], method)) {
        obj = {
            ...obj,
            [path]: {
                ...obj[path],
                [method]: {}
            }
        };
    }

    // Append our changes
    const origObjPath : OpenAPIV3.PathItemObject | undefined = obj[path];
    if (!origObjPath) throw new TypeError('Path was undefined; this should not happen');
    obj = {
        ...obj,
        [path]: {
            ...origObjPath,
            [method]: {
                ...origObjPath[method],
                ...newOperations
            }
        }
    };

    return obj;

}
