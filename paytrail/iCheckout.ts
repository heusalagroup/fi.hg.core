// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { iCheckoutTransaction } from "./iCheckoutTransaction";
import { iCheckoutData } from "./iCheckoutData";

export interface iCheckout {
    createTransaction(webSecret: string, data: iCheckoutData): Promise<iCheckoutTransaction>;
    getTransaction(transactionId: string): Promise<iCheckoutTransaction>;
    validateRequest(data: any): boolean;  // "any" is a placeholder, replace it with the appropriate type.
    isPaid(data: any): boolean;  // "any" is a placeholder, replace it with the appropriate type.
}
