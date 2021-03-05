import RequestMethod from "../../request/types/RequestMethod";
import {RequestParamObject} from "../../request/types/RequestControllerMappingObject";

export interface RequestRouterMappingPropertyObject {

    methods        : Array<RequestMethod>;
    controller     : any;
    propertyName   : string;
    propertyParams : Array<RequestParamObject | null>;

}

export default RequestRouterMappingPropertyObject;
