import RequestMethod from "./request/types/RequestMethod";
import LogService from "./LogService";
import {isRequestController} from "./request/types/RequestController";
import RequestControllerUtils from "./request/RequestControllerUtils";
import RequestMappingArray from "./request/types/RequestMappingArray";
import RequestParamType, {stringifyRequestParamType} from "./request/types/RequestParamType";
import {isFunction, isNumber, isObject, isString} from "./modules/lodash";
import RequestStatus from "./request/types/RequestStatus";
import RequestType from "./request/types/RequestType";

const LOG = LogService.createLogger('Request');

interface RequestMappingDecorator {

    (
        target       : any | Function,
        propertyKey ?: string,
        descriptor  ?: PropertyDescriptor
    ) : void;

}

export class Request {

    public static Method    = RequestMethod;
    public static Status    = RequestStatus;
    public static ParamType = RequestParamType;
    public static Type      = RequestType;

    public static mapping (
        ...config : RequestMappingArray
    ) : RequestMappingDecorator {

        LOG.debug('mapping: init: ', config);

        return (
            target       : any | Function,
            propertyKey ?: string,
            descriptor  ?: PropertyDescriptor
        ) => {

            LOG.debug('mapping: target: ', isFunction(target), isRequestController(target), target);

            if ( isFunction(target) && isRequestController(target) ) {

                if (propertyKey === undefined) {

                    LOG.debug('.mapping for RequestController: config=', config, 'target=', target);

                    RequestControllerUtils.attachControllerMapping(target, config);

                } else {

                    LOG.debug(".mapping for RequestController's method: config=", config, 'target=', target, 'propertyKey=', propertyKey, 'descriptor=', descriptor);

                    RequestControllerUtils.attachControllerMethodMapping(target, config, propertyKey);

                }

            } else if (isRequestController(target?.constructor)) {

                if (propertyKey === undefined) {

                    LOG.debug('.mapping for RequestController through constructor: config=', config, 'target=', target);

                    RequestControllerUtils.attachControllerMapping(target.constructor, config);

                } else {

                    LOG.debug(".mapping for RequestController's method through constructor: config=", config, 'target=', target, 'propertyKey=', propertyKey, 'descriptor=', descriptor);

                    RequestControllerUtils.attachControllerMethodMapping(target.constructor, config, propertyKey);

                }

            } else {

                LOG.debug(".mapping for other: config=", config, 'target=', target, 'propertyKey=', propertyKey, 'descriptor=',descriptor);

            }

        };

    }

    public static param (
        queryParam : string,
        paramType  : RequestParamType = Request.ParamType.STRING
    ) {

        LOG.debug('.param: init: ', queryParam, paramType);

        return (
            target       : any | Function,
            propertyKey ?: string,
            paramIndex  ?: number
        ) => {

            LOG.debug('typeof(target):                          ', typeof target );
            LOG.debug('typeof(target.constructor):              ', typeof target?.constructor );
            LOG.debug('isObject(target):                        ', isObject(target));
            LOG.debug('isFunction(target):                      ', isFunction(target));
            LOG.debug('isRequestController(target):             ', isRequestController(target));
            LOG.debug('isFunction(target.constructor):          ', isFunction(target?.constructor));
            LOG.debug('isRequestController(target.constructor): ', isRequestController(target?.constructor));
            LOG.debug('isString(propertyKey):                   ', isString(propertyKey));
            LOG.debug('isNumber(paramIndex):                    ', isNumber(paramIndex));

            if ( isFunction(target) && isRequestController(target) && isString(propertyKey) && isNumber(paramIndex) ) {

                LOG.debug('.param: configure 1: queryParam=', queryParam,
                    "; paramType=", stringifyRequestParamType(paramType),
                    "; target=", target,
                    "; propertyKey=", propertyKey,
                    "; paramIndex=", paramIndex);

                RequestControllerUtils.setControllerMethodParam(target, propertyKey, paramIndex, queryParam, paramType);

                return;

            }

            if ( isObject(target) && isFunction(target?.constructor) && isRequestController(target.constructor) && isString(propertyKey) && isNumber(paramIndex) ) {

                LOG.debug('.param: configure 2: queryParam=', queryParam,
                    "; paramType=", stringifyRequestParamType(paramType),
                    "; target=", target,
                    "; propertyKey=", propertyKey,
                    "; paramIndex=", paramIndex);

                RequestControllerUtils.setControllerMethodParam(target.constructor, propertyKey, paramIndex, queryParam, paramType);

                return;
            }

            LOG.debug('.param: configure 3: queryParam=', queryParam,
                "; paramType=", stringifyRequestParamType(paramType),
                "; target=", target,
                "; propertyKey=", propertyKey,
                "; paramIndex=", paramIndex);

        }

    }

}

export default Request;
