import { Currency } from "./Currency";

export interface CurrencyExchangeCallback {
    (
        amount: number,
        from: Currency,
        to: Currency,
        accuracy ?: number
    ): Promise<number>;
}
