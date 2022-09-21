// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { WordpressReferenceDTO } from "./WordpressReferenceDTO";
import { LogService } from "../../LogService";

const LOG = LogService.createLogger('Wordpress-References');


export type WordpressReferenceListDTO = WordpressReferenceDTO[];

export function isWordpressReferencesDTO (value: any): value is WordpressReferenceListDTO {
    LOG.debug('reached')
    return true
}

export function stringifyWordpressReferenceDTO (value: WordpressReferenceListDTO): string {
    return `WordpressReferenceDTO(${value})`;
}

export function parseWordpressReferencesDTO (value: any): WordpressReferenceListDTO | undefined {
    if ( isWordpressReferencesDTO(value)) return value;
    return undefined;
}