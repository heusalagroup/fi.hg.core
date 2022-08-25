// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CurrencyRates } from "./CurrencyRates";

export interface CurrencyFetchRatesCallback {
    (): Promise<CurrencyRates>;
}
