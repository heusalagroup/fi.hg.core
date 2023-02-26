// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainWpPageDTO, isWpPageDTO, WpPageDTO } from "./WpPageDTO";
import { explainArrayOf, isArrayOf } from "../../types/Array";

/**
 * Wordpress API page object for /wp-json/wp/v2/pages
 */
export type WpPageListDTO = readonly WpPageDTO[];

/**
 * Tests that the value is DTO for /wp-json/wp/v2/pages
 */
export function isWpPageListDTO (value: unknown): value is WpPageListDTO {
    return isArrayOf<WpPageDTO>(value, isWpPageDTO);
}

export function explainWpPageListDTO (value: any): string {
    return explainArrayOf<WpPageDTO>("WpPageDTO", explainWpPageDTO, value, isWpPageDTO);
}

export function stringifyWpPageDTO (value: WpPageListDTO): string {
    return `WpPageListDTO(${value})`;
}

export function parseWpPagesDTO (value: any): WpPageListDTO | undefined {
    if ( isWpPageListDTO(value)) return value;
    return undefined;
}