// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { RequestRouterMappingPropertyObject } from "./RequestRouterMappingPropertyObject";

export type RouteParamValuesObject = {[key : string]: string};

/**
 * This result includes:
 *  - Routes mapping objects
 *  - Optional path parameters
 */
export type GetRouteResultType = [RequestRouterMappingPropertyObject[] | undefined, RouteParamValuesObject | undefined];

export interface BaseRoutes {

    hasRoute (pathName: string): boolean;

    getRoute (pathName: string): GetRouteResultType;

}
