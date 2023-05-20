// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { RequestInterfaceUtils } from "../utils/RequestInterfaceUtils";
import {
    RequestControllerMappingObject,
    explainRequestControllerMappingObject,
    isRequestControllerMappingObject,
    getOpenApiDocumentFromRequestControllerMappingObject,
    InternalRequestControllerMappingObject
} from "./RequestControllerMappingObject";
import { has } from "../../functions/has";
import { LogService } from "../../LogService";
import { OpenAPIV3 } from "../../types/openapi";

const LOG = LogService.createLogger('RequestController');

export const INTERNAL_KEYWORD = '__requestMappings';

export interface RequestController {
    [INTERNAL_KEYWORD] ?: RequestControllerMappingObject | undefined;
}

export function isRequestController (value: any) : value is RequestController {
    if (!value) return false;
    const hasInternalValue = RequestInterfaceUtils.hasProperty__requestMappings(value);
    if (!hasInternalValue) return true;
    const internalValue = value[INTERNAL_KEYWORD];
    if (isRequestControllerMappingObject(internalValue)) {
        return true;
    }
    LOG.warn('The internal mapping object was not correct: ' + JSON.stringify(internalValue, null, 2) + ': ' + explainRequestControllerMappingObject(internalValue) );
    return false;
}

export function getRequestControllerMappingObject (
    controller: any
) : RequestControllerMappingObject | undefined {
    // @ts-ignore
    if ( hasInternalRequestMappingObject(controller?.constructor) ) {
        // @ts-ignore
        return getInternalRequestMappingObject(controller?.constructor, controller);
    }
    // @ts-ignore
    return getInternalRequestMappingObject(controller, controller);
}

export function getInternalRequestMappingObject (
    value              : RequestController,
    controllerInstance : any
) : RequestControllerMappingObject | undefined {
    if (!RequestInterfaceUtils.hasProperty__requestMappings(value)) {
        return undefined;
    }
    return {
        ...value[INTERNAL_KEYWORD],
        controller: controllerInstance
    };
}

export function hasInternalRequestMappingObject (
    value : RequestController
) : boolean {
    return RequestInterfaceUtils.hasProperty__requestMappings(value);
}

export function setInternalRequestMappingObject (
    value   : RequestController,
    mapping : RequestControllerMappingObject
) : InternalRequestControllerMappingObject {
    const strippedMapping : RequestControllerMappingObject = {
        ...mapping
    };
    if (has(strippedMapping, 'controller')) {
        delete strippedMapping.controller;
    }
    // LOG.debug(`setInternalRequestMappingObject: Setting "${INTERNAL_KEYWORD}" of: `, value, ' as: ', strippedMapping);
    value[INTERNAL_KEYWORD] = strippedMapping;
    return strippedMapping;
}

export function getOpenApiDocumentFromRequestController (
    controller: any
) : OpenAPIV3.Document {
    const data : RequestControllerMappingObject | undefined = getRequestControllerMappingObject(controller);
    if (data === undefined) {
        throw new TypeError('getOpenApiDocumentFromRequestController: Could not detect request mapping in the controller');
    }
    return getOpenApiDocumentFromRequestControllerMappingObject(data);
}
