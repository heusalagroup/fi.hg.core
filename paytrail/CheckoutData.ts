// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { iCheckoutItem } from "./iCheckoutItem";
import { CONFIG_WEB_ADDRESS } from "./paytrail-constants";
import { iCheckoutData } from "./iCheckoutData";

export class CheckoutData implements iCheckoutData {

    private readonly _data: { [key: string]: any };
    private readonly _items: iCheckoutItem[];

    public constructor (webSecret: string, invoice: any, invoice_rows: iCheckoutItem[]) {
        this._items = invoice_rows;

        this._data = {
            stamp: invoice['checkout_stamp'],
            reference: invoice['reference_number'],
            return: CONFIG_WEB_ADDRESS + webSecret + "?test=1",
            delayed: CONFIG_WEB_ADDRESS + webSecret + "?test=2",
            amount: Math.round(invoice['total_open']*100),
            delivery_date: new Date(invoice['date']).toISOString().split('T')[0].replace(/-/g, ''),
            phone: invoice['client_phone'].trim(),
            firstname: invoice['client_firstname'].trim(),
            familyname: invoice['client_lastname'].trim(),
            address: invoice['client_address'],
            postcode: invoice['client_postcode'],
            postoffice: invoice['client_postname'],
            company: invoice['client_company'].trim(),
            company_code: invoice['client_company_code'].trim(),
            email: invoice['client_email'].trim()
        };
    }

    getStamp(): string {
        return this._data['stamp'];
    }

    getReference(): string {
        return this._data['reference'];
    }

    getMessage(): string {
        return this._data['message'];
    }

    getReturnURL(): string {
        return this._data['return'];
    }

    getDelayedURL(): string {
        return this._data['delayed'];
    }

    getAmount(): number {
        return this._data['amount'];
    }

    getDeliveryDate(): string {
        return this._data['delivery_date'];
    }

    getFirstName(): string {
        return this._data['firstname'];
    }

    getFamilyName(): string {
        return this._data['familyname'];
    }

    getAddress(): string {
        return this._data['address'];
    }

    getPostCode(): string {
        return this._data['postcode'];
    }

    getPostOffice(): string {
        return this._data['postoffice'];
    }

    getEmail(): string {
        return this._data['email'];
    }

    getPhone(): string {
        return this._data['phone'];
    }

    getCompany(): string {
        return this._data['company'];
    }

    isCompany(): boolean {
        return this.getCompanyCode().trim() !== '';
    }

    getCompanyCode(): string {
        return this._data['company_code'];
    }

    getVatId(): string {
        return 'FI' + this.getCompanyCode().replace('-', '');
    }

    getItems(): iCheckoutItem[] {
        return this._items;
    }

}
