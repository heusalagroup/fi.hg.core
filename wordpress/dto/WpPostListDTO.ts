// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainWpPostDTO, isWpPostDTO, WpPostDTO } from "./WpPostDTO";
import { explainArrayOf, isArrayOf } from "../../types/Array";

/**
 * Wordpress v2 JSON API object for /wp-json/wp/v2/posts
 */
export type WpPostListDTO = readonly WpPostDTO[];

/**
 * Tests that the value is DTO for /wp-json/wp/v2/posts
 * @param value
 */
export function isWpPostListDTO (value: any): value is WpPostListDTO {
    return isArrayOf<WpPostDTO>(value, isWpPostDTO);
}

export function explainWpPostListDTO (value: any): string {
    return explainArrayOf<WpPostDTO>("WpPostDTO", explainWpPostDTO, value, isWpPostDTO);
}

export function stringifyWpPostListDTO (value: WpPostListDTO): string {
    return `WordpressPostDTO(${value})`;
}

export function parseWpPostListDTO (value: any): WpPostListDTO | undefined {
    if ( isWpPostListDTO(value)) return value;
    return undefined;
}
