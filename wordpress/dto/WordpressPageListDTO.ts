// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isArrayOf } from "../../modules/lodash";
import { isWordpressPageDTO, WordpressPageDTO } from "./WordpressPageDTO";

export type WordpressPageListDTO = WordpressPageDTO[];

export function isWordpressPagesDTO (value: any): value is WordpressPageListDTO {
    return isArrayOf(value, isWordpressPageDTO);
}

export function stringifyWordpressPageDTO (value: WordpressPageListDTO): string {
    return `WordpressPageDTO(${value})`;
}

export function parseWordpressPagesDTO (value: any): WordpressPageListDTO | undefined {
    if ( isWordpressPagesDTO(value)) return value;
    return undefined;
}
