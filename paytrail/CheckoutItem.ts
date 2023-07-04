// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { iCheckoutItem } from "./iCheckoutItem";
import { isInteger } from "../types/Number";
import { isString } from "../types/String";

export class CheckoutItem implements iCheckoutItem {

    private readonly _unitPrice: number;
    private readonly _units: number;
    private readonly _vatPercentage: number;
    private readonly _productCode: string;
    private readonly _deliveryDate: string;
    private readonly _description: string;
    private readonly _category: string;
    private readonly _stamp: string;

    constructor(
        unitPrice: number,
        units: number,
        vatPercentage: number,
        productCode: string,
        deliveryDate: string,
        description = '',
        category = '',
        stamp = ''
    ) {
        if (!isInteger(unitPrice)) throw new Error('Invalid unitPrice: ' + unitPrice);
        if (!isInteger(units)) throw new Error('Invalid units: ' + units);
        if (!isInteger(vatPercentage)) throw new Error('Invalid vatPercentage: ' + vatPercentage);
        if (!isString(productCode)) throw new Error('Invalid productCode: ' + productCode);
        if (!isString(stamp)) throw new Error('Invalid stamp: ' + stamp);
        if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(deliveryDate)) throw new Error('Invalid deliveryDate: ' + deliveryDate);

        this._unitPrice = unitPrice;
        this._units = units;
        this._vatPercentage = vatPercentage;
        this._productCode = productCode;
        this._deliveryDate = deliveryDate;
        this._description = description;
        this._category = category;
        this._stamp = stamp;
    }

    getUnitPrice(): number {
        return this._unitPrice;
    }

    getUnits(): number {
        return this._units;
    }

    getVatPercentage(): number {
        return this._vatPercentage;
    }

    getProductCode(): string {
        return this._productCode;
    }

    getDescription(): string {
        return this._description;
    }

    getCategory(): string {
        return this._category;
    }

    getDeliveryDate(): string {
        return this._deliveryDate;
    }

    getStamp(): string {
        return this._stamp;
    }

}
