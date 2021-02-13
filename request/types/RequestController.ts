import RequestInterfaceUtils from "../RequestInterfaceUtils";
import RequestControllerMappingObject, {
    explainRequestControllerMappingObject,
    isRequestControllerMappingObject
} from "./RequestControllerMappingObject";
import {has} from "../../modules/lodash";
import LogService from "../../LogService";

const LOG = LogService.createLogger('RequestController');

export const INTERNAL_KEYWORD = '__requestMappings';

export interface RequestController {

    [INTERNAL_KEYWORD] ?: RequestControllerMappingObject;

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
) {

    const strippedMapping : RequestControllerMappingObject = {
        ...mapping
    };

    if (has(strippedMapping, 'controller')) {
        delete strippedMapping.controller;
    }

    // LOG.debug(`setInternalRequestMappingObject: Setting "${INTERNAL_KEYWORD}" of: `, value, ' as: ', strippedMapping);

    value[INTERNAL_KEYWORD] = strippedMapping;

}

export default RequestController;
