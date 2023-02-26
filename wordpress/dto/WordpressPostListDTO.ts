// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { WpPostDTO } from "./WpPostDTO";

export type WordpressPostListDTO = WpPostDTO[];

export function isWordpressPostsDTO (value: any): value is WordpressPostListDTO {
    return true
}

export function stringifyWordpressPostDTO (value: WordpressPostListDTO): string {
    return `WordpressPostDTO(${value})`;
}

export function parseWordpressPagesDTO (value: any): WordpressPostListDTO | undefined {
    if ( isWordpressPostsDTO(value)) return value;
    return undefined;
}
