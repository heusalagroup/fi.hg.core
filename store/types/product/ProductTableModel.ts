// Copyright (c) 2021-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeys } from "../../../types/OtherKeys";

export interface SelectProductModelCallback {
    (item: ProductTableModel): void;
}

export interface ProductTableModel {

    /**
     * The title of the item
     */
    readonly id: number;

    /**
     * The title of the item
     */
    readonly title: string;

    /**
     * The current description of the item
     */
    readonly description: string;

    /**
     * The current price of the item
     */
    readonly month: number;

    /**
     * The price of the item
     */
    readonly price: number;

    /**
     * is there button of the item
     */
    readonly isButton: boolean;

}

export function isProductTableModel (value: any): value is ProductTableModel {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'id',
            'title',
            'description',
            'month',
            'price'

        ])
    );
}

export function isPartialProductTableModel (value: any): value is Partial<ProductTableModel> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [

            'id',
            'title',
            'description',
            'month',
            'price'

        ])
    );
}

export function stringifyProductTableModel (value: ProductTableModel): string {
    return `ProductTableModel(${value})`;
}

export function parseProductTableModel (value: any): ProductTableModel | undefined {
    if ( isProductTableModel(value) ) return value;
    return undefined;
}


