// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainWpReferenceDTO, isWpReferenceDTO, WpReferenceDTO } from "./WpReferenceDTO";
import { explainArrayOf, isArrayOf } from "../../types/Array";

export type WpReferenceListDTO = readonly WpReferenceDTO[];

export function isWpReferenceListDTO (value: unknown): value is WpReferenceListDTO {
    return isArrayOf<WpReferenceDTO>(value, isWpReferenceDTO);
}

export function explainWpReferenceListDTO (value: any) : string {
    return explainArrayOf<WpReferenceDTO>("WpReferenceDTO", explainWpReferenceDTO, value, isWpReferenceDTO);
}

export function stringifyWpReferenceListDTO (value: WpReferenceListDTO): string {
    return `WpReferenceListDTO(${value})`;
}

export function parseWpReferenceListDTO (value: any): WpReferenceListDTO | undefined {
    if ( isWpReferenceListDTO(value)) return value;
    return undefined;
}