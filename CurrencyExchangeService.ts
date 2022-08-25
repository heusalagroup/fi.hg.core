// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Currency } from "./types/Currency";

export interface CurrencyExchangeService {

    convertCurrencyAmount (
        amount    : number,
        from      : Currency,
        to        : Currency,
        accuracy ?: number
    ) : Promise<number>;

}

