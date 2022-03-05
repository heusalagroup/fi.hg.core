// Copyright (c) 2020-2021 Sendanor. All rights reserved.

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
