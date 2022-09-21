// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { WordpressPageDTO } from "./WordpressPageDTO";
import { LogService } from "../../LogService";

const LOG = LogService.createLogger('Wordpress-Pages');


export type WordpressPageListDTO = WordpressPageDTO[];

export function isWordpressPagesDTO (value: any): value is WordpressPageListDTO {
    LOG.debug('reached')
    return true
}

export function stringifyWordpressPageDTO (value: WordpressPageListDTO): string {
    return `WordpressPageDTO(${value})`;
}

export function parseWordpressPagesDTO (value: any): WordpressPageListDTO | undefined {
    if ( isWordpressPagesDTO(value)) return value;
    return undefined;
}