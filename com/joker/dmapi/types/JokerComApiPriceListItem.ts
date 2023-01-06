// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { filter } from "../../../../functions/filter";
import { map } from "../../../../functions/map";
import { reduce } from "../../../../functions/reduce";
import { trim } from "../../../../functions/trim";
import { explainJokerComApiPriceListItemType, isJokerComApiPriceListItemType, JokerComApiPriceListItemType, parseJokerComApiPriceListItemType } from "./JokerComApiPriceListItemType";
import { explainJokerComApiPriceListItemOperation, isJokerComApiPriceListItemOperation, JokerComApiPriceListItemOperation, parseJokerComApiPriceListItemOperation } from "./JokerComApiPriceListItemOperation";
import { explainJokerStringObject, isJokerStringObject, JokerStringObject } from "./JokerStringObject";
import { explainJokerComApiPriceAmountOrUndefined, isJokerComApiPriceAmountOrUndefined, JokerComApiPriceAmount, parseJokerComApiPriceAmount } from "./JokerComApiPriceAmount";
import { explain, explainProperty } from "../../../../types/explain";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../../../types/String";
import { explainRegularObject, isRegularObject } from "../../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../../../types/OtherKeys";

export interface JokerComApiPriceListItem {
    readonly type         : JokerComApiPriceListItemType;
    readonly operation    : JokerComApiPriceListItemOperation;
    readonly tld          : string;
    readonly tldCurrency  : string;
    readonly currency     : string;
    readonly price1y      : JokerComApiPriceAmount | undefined;
    readonly price2y      : JokerComApiPriceAmount | undefined;
    readonly price3y      : JokerComApiPriceAmount | undefined;
    readonly price4y      : JokerComApiPriceAmount | undefined;
    readonly price5y      : JokerComApiPriceAmount | undefined;
    readonly price6y      : JokerComApiPriceAmount | undefined;
    readonly price7y      : JokerComApiPriceAmount | undefined;
    readonly price8y      : JokerComApiPriceAmount | undefined;
    readonly price9y      : JokerComApiPriceAmount | undefined;
    readonly price10y     : JokerComApiPriceAmount | undefined;
    readonly validFrom    : string | undefined;
    readonly validUntil   : string | undefined;
    readonly columns      : JokerStringObject;
}

export function createJokerComApiPriceListItem (
    type         : JokerComApiPriceListItemType,
    operation       : JokerComApiPriceListItemOperation,
    tld          : string,
    tldCurrency  : string,
    currency     : string,
    price1y      : JokerComApiPriceAmount | undefined,
    price2y      : JokerComApiPriceAmount | undefined,
    price3y      : JokerComApiPriceAmount | undefined,
    price4y      : JokerComApiPriceAmount | undefined,
    price5y      : JokerComApiPriceAmount | undefined,
    price6y      : JokerComApiPriceAmount | undefined,
    price7y      : JokerComApiPriceAmount | undefined,
    price8y      : JokerComApiPriceAmount | undefined,
    price9y      : JokerComApiPriceAmount | undefined,
    price10y     : JokerComApiPriceAmount | undefined,
    validFrom    : string | undefined,
    validUntil   : string | undefined,
    columns      : JokerStringObject
) : JokerComApiPriceListItem {
    return {
        type,
        operation,
        tld,
        tldCurrency,
        currency,
        price1y,
        price2y,
        price3y,
        price4y,
        price5y,
        price6y,
        price7y,
        price8y,
        price9y,
        price10y,
        validFrom,
        validUntil,
        columns
    };
}

export function isJokerComApiPriceListItem (value: any) : value is JokerComApiPriceListItem {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'type',
            'operation',
            'tld',
            'tldCurrency',
            'currency',
            'price1y',
            'price2y',
            'price3y',
            'price4y',
            'price5y',
            'price6y',
            'price7y',
            'price8y',
            'price9y',
            'price10y',
            'validFrom',
            'validUntil',
            'columns'
        ])
        && isJokerComApiPriceListItemType(value?.type)
        && isJokerComApiPriceListItemOperation(value?.operation)
        && isString(value?.tld)
        && isString(value?.tldCurrency)
        && isString(value?.currency)
        && isJokerComApiPriceAmountOrUndefined(value?.price1y)
        && isJokerComApiPriceAmountOrUndefined(value?.price2y)
        && isJokerComApiPriceAmountOrUndefined(value?.price3y)
        && isJokerComApiPriceAmountOrUndefined(value?.price4y)
        && isJokerComApiPriceAmountOrUndefined(value?.price5y)
        && isJokerComApiPriceAmountOrUndefined(value?.price6y)
        && isJokerComApiPriceAmountOrUndefined(value?.price7y)
        && isJokerComApiPriceAmountOrUndefined(value?.price8y)
        && isJokerComApiPriceAmountOrUndefined(value?.price9y)
        && isJokerComApiPriceAmountOrUndefined(value?.price10y)
        && isStringOrUndefined(value?.validFrom)
        && isStringOrUndefined(value?.validUntil)
        && isJokerStringObject(value?.columns)
    );
}

export function explainJokerComApiPriceListItem (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'type',
                'operation',
                'tld',
                'tldCurrency',
                'currency',
                'price1y',
                'price2y',
                'price3y',
                'price4y',
                'price5y',
                'price6y',
                'price7y',
                'price8y',
                'price9y',
                'price10y',
                'validFrom',
                'validUntil',
                'columns'
            ]),
            explainProperty("type", explainJokerComApiPriceListItemType(value?.type)),
            explainProperty("operation", explainJokerComApiPriceListItemOperation(value?.operation)),
            explainProperty("tld", explainString(value?.tld)),
            explainProperty("tldCurrency", explainString(value?.tldCurrency)),
            explainProperty("currency", explainString(value?.currency)),
            explainProperty("price1y", explainJokerComApiPriceAmountOrUndefined(value?.price1y)),
            explainProperty("price2y", explainJokerComApiPriceAmountOrUndefined(value?.price2y)),
            explainProperty("price3y", explainJokerComApiPriceAmountOrUndefined(value?.price3y)),
            explainProperty("price4y", explainJokerComApiPriceAmountOrUndefined(value?.price4y)),
            explainProperty("price5y", explainJokerComApiPriceAmountOrUndefined(value?.price5y)),
            explainProperty("price6y", explainJokerComApiPriceAmountOrUndefined(value?.price6y)),
            explainProperty("price7y", explainJokerComApiPriceAmountOrUndefined(value?.price7y)),
            explainProperty("price8y", explainJokerComApiPriceAmountOrUndefined(value?.price8y)),
            explainProperty("price9y", explainJokerComApiPriceAmountOrUndefined(value?.price9y)),
            explainProperty("price10y", explainJokerComApiPriceAmountOrUndefined(value?.price10y)),
            explainProperty("validFrom", explainStringOrUndefined(value?.validFrom)),
            explainProperty("validUntil", explainStringOrUndefined(value?.validUntil)),
            explainProperty("columns", explainJokerStringObject(value?.columns))
        ]
    );
}

export function stringifyJokerComApiPriceListItem (value : JokerComApiPriceListItem) : string {
    return `JokerComApiPriceListItem(${value})`;
}

export function parseJokerComApiPriceListItem (value: any) : JokerComApiPriceListItem | undefined {
    if (isJokerComApiPriceListItem(value)) return value;
    return undefined;
}

export function parseJokerComApiPriceListItemFromString (
    value       : string,
    columnsKeys : readonly string[]
) : JokerComApiPriceListItem {
    const columnValues = value.split('\t');
    const columns : JokerStringObject = reduce(
        columnsKeys,
        (obj: JokerStringObject, key: string, index: number) : JokerStringObject => {
            const value = index < columnValues.length ? columnValues[index] : undefined;
            return {
                ...obj,
                [key.toLowerCase()]: value ?? ''
            };
        },
        {}
    );
    const typeString = columns['type'];
    const type = parseJokerComApiPriceListItemType(typeString);
    if (!type) throw new TypeError(`parseJokerComApiPriceListItemFromString: Could not parse "type" from: "${value}": ${explainJokerComApiPriceListItemType(typeString)}`);
    const operationString = columns['operation'];
    const operation = parseJokerComApiPriceListItemOperation(operationString);
    if (!operation) throw new TypeError(`parseJokerComApiPriceListItemFromString: Could not parse "operation" from: "${value}": ${explainJokerComApiPriceListItemOperation(operationString)}`);
    const tld = columns['tld'];
    if (!tld) throw new TypeError(`parseJokerComApiPriceListItemFromString: Could not parse "tld" from: "${value}"`);
    const tldCurrency = parseCurrency(columns['tld-currency']);
    if (!tldCurrency) throw new TypeError(`parseJokerComApiPriceListItemFromString: Could not parse "tld-currency" from: "${value}"`);
    const currency = parseCurrency(columns['currency']);
    if (!currency) throw new TypeError(`parseJokerComApiPriceListItemFromString: Could not parse "currency" from: "${value}"`);
    const price1y = parseJokerComApiPriceAmount(columns['price-1y']);
    const price2y = parseJokerComApiPriceAmount(columns['price-2y']);
    const price3y = parseJokerComApiPriceAmount(columns['price-3y']);
    const price4y = parseJokerComApiPriceAmount(columns['price-4y']);
    const price5y = parseJokerComApiPriceAmount(columns['price-5y']);
    const price6y = parseJokerComApiPriceAmount(columns['price-6y']);
    const price7y = parseJokerComApiPriceAmount(columns['price-7y']);
    const price8y = parseJokerComApiPriceAmount(columns['price-8y']);
    const price9y = parseJokerComApiPriceAmount(columns['price-9y']);
    const price10y = parseJokerComApiPriceAmount(columns['price-10y']);
    const validFrom = parseDate(columns['valid_from']);
    const validUntil = parseDate(columns['valid_until']);
    return createJokerComApiPriceListItem(
        type,
        operation,
        tld,
        tldCurrency,
        currency,
        price1y,
        price2y,
        price3y,
        price4y,
        price5y,
        price6y,
        price7y,
        price8y,
        price9y,
        price10y,
        validFrom,
        validUntil,
        columns
    );
}

export function parseDate (value : string) : string | undefined {
    value = trim(value);
    if (value === '') return undefined;
    if (value === 'n/a') return undefined;
    return value;
}

export function parseCurrency (value : string) : string | undefined {
    value = trim(value);
    if (value === '') return undefined;
    if (value === 'n/a') return undefined;
    return value;
}

export function parseJokerComApiPriceListItemListFromString (
    value   : string,
    columns : readonly string[]
) : readonly JokerComApiPriceListItem[] {
    if (value === '') return [];
    return map(
        filter(
            value.split('\n'),
            (line : string ) : boolean => !!line
        ),
        (line: string) : JokerComApiPriceListItem => parseJokerComApiPriceListItemFromString(
            line,
            columns
        )
    );
}
