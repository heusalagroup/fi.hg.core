// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { reduce } from "../../functions/reduce";
import { InvoiceDTO } from "../types/invoice/InvoiceDTO";
import { InvoiceRowDTO } from "../types/invoice/InvoiceRowDTO";
import { CurrencyUtils } from "../../CurrencyUtils";

export class InvoiceUtils {

    /**
     * Returns total sum as cents
     *
     * @param invoice
     */
    public static totalCentsIncludingVat (
        invoice: InvoiceDTO
    ) : number {
        return reduce(
            invoice?.rows ?? [],
            (prev: number, item: InvoiceRowDTO): number => {
                const itemSum = CurrencyUtils.getCents(
                    CurrencyUtils.getSumWithVat(
                        item.price,
                        item.amount,
                        item.vatPercent,
                        item.discountPercent,
                    )
                );
                if (prev === undefined) {
                    return itemSum;
                } else {
                    return prev + itemSum;
                }
            },
            0
        );
    }

}
