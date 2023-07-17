// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../../../types/Enum";
import { isUndefined } from "../../../../types/undefined";
import { explainNot, explainOk, explainOr } from "../../../../types/explain";

export enum NetworkType {
    ETH_10M    = "ETH_10M",
    ETH_100M   = "ETH_100M",
    ETH_1G     = "ETH_1G",
    ETH_2G    = "ETH_2G",
    ETH_5G    = "ETH_5G",
    ETH_10G    = "ETH_10G",
}

export function isNetworkType (value: unknown) : value is NetworkType {
    return isEnum(NetworkType, value);
}

export function explainNetworkType (value : unknown) : string {
    return explainEnum("NetworkType", NetworkType, isNetworkType, value);
}

export function stringifyNetworkType (value : NetworkType) : string {
    return stringifyEnum(NetworkType, value);
}

export function parseNetworkType (value: any) : NetworkType | undefined {
    return parseEnum(NetworkType, value) as NetworkType | undefined;
}

export function isNetworkTypeOrUndefined (value: unknown): value is NetworkType | undefined {
    return isUndefined(value) || isNetworkType(value);
}

export function explainNetworkTypeOrUndefined (value: unknown): string {
    return isNetworkTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['NetworkType', 'undefined']));
}
