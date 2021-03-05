import {RequestRouterMappingPropertyObject} from "./RequestRouterMappingPropertyObject";

/**
 * This object maps route paths to methods
 */
export interface RequestRouterMappingObject {

    /**
     * The key is the route path
     */
    [key: string]: Array<RequestRouterMappingPropertyObject>;

}

export default RequestRouterMappingObject;
