// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainOpAccountDTO, isOpAccountDTO, OpAccountDTO } from "./OpAccountDTO";
import { map } from "../../functions/map";
import { explainArrayOf, isArrayOf } from "../../types/Array";
import { isUndefined } from "../../types/undefined";
import { explainNot, explainOk, explainOr } from "../../types/explain";

/**
 * OP Bank account list response DTO.
 *
 * @see https://op-developer.fi/products/banking/docs/op-corporate-account-data-api#operation/accounts
 *
 * @example
 *     [
 *       {
 *         "bic": "OKOYFIHH",
 *         "iban": "FI7450009420999999",
 *         "name": "Companys payroll account",
 *         "balance": "-12.3",
 *         "currency": "EUR",
 *         "surrogateId": "rNEl6nJ-VgIqbIfyNDBPo-Un2SBTa6zMDspKshS3J6fOlQ==",
 *         "productNames": {
 *           "property1": "string",
 *           "property2": "string"
 *         }
 *       }
 *     ]
 */
export type OpAccountListDTO = readonly OpAccountDTO[];

export function createOpAccountListDTO (
    list : readonly OpAccountDTO[]
) : OpAccountListDTO {
    return map(
        list,
        (item : OpAccountDTO ) : OpAccountDTO => item
    );
}

export function isOpAccountListDTO (value: unknown) : value is OpAccountListDTO {
    return isArrayOf<OpAccountDTO>(value, isOpAccountDTO);
}

export function explainOpAccountListDTO (value: any) : string {
    return explainArrayOf<OpAccountDTO>("OpAccountDTO", explainOpAccountDTO, value, isOpAccountDTO);
}

export function parseOpAccountListDTO (value: unknown) : OpAccountListDTO | undefined {
    if (isOpAccountListDTO(value)) return value;
    return undefined;
}

export function isOpAccountListDTOOrUndefined (value: unknown): value is OpAccountListDTO | undefined {
    return isUndefined(value) || isOpAccountListDTO(value);
}

export function explainOpAccountListDTOOrUndefined (value: unknown): string {
    return isOpAccountListDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpAccountListDTO', 'undefined']));
}
