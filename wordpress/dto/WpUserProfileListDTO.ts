// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainWpUserProfileDTO, isWpUserProfileDTO, WpUserProfileDTO } from "./WpUserProfileDTO";
import { explainArrayOf, isArrayOf } from "../../types/Array";

/**
 * The DTO for /wp-json/wp/v3/userprofiles
 */
export type WpUserProfileListDTO = readonly WpUserProfileDTO[];

/**
 * Checks that the value is DTO for /wp-json/wp/v3/userprofiles
 * @param value
 */
export function isWpUserProfileListDTO (value: unknown): value is WpUserProfileListDTO {
    return isArrayOf<WpUserProfileDTO>(value, isWpUserProfileDTO);
}

export function explainWpUserProfileListDTO (value: any) : string {
    return explainArrayOf<WpUserProfileDTO>("WpUserProfileDTO", explainWpUserProfileDTO, value, isWpUserProfileDTO);
}

export function stringifyWpUserProfileListDTO (value: WpUserProfileListDTO): string {
    return `WpUserProfileListDTO(${value})`;
}

export function parseWpUserProfileListDTO (value: any): WpUserProfileListDTO | undefined {
    if ( isWpUserProfileListDTO(value)) return value;
    return undefined;
}