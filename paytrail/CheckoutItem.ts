import { iCheckoutItem } from "./iCheckoutItem";
import { isInteger } from "../types/Number";

export class CheckoutItem implements iCheckoutItem {

    private _unitPrice: number;
    private _units: number;
    private _vatPercentage: number;
    private _productCode: string;
    private _deliveryDate: string;
    private _description: string;
    private _category: string;
    private _stamp: string;

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
        if (typeof productCode !== 'string') throw new Error('Invalid productCode: ' + productCode);
        if (typeof stamp !== 'string') throw new Error('Invalid stamp: ' + stamp);
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
