// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogService } from "../LogService";

const TAX_FREE_LIMIT = 1000;
const TRANSFER_TAX_PERCENT = 0.016;
const TAX_RELIEF_LIMIT = 30000;
const CAPITAL_INCOME_TAX_PERCENT_BELOW_RELIEF = 0.30;
const CAPITAL_INCOME_TAX_PERCENT_ABOVE_RELIEF = 0.34;
const TAX_BASIS_AFTER_10_YEARS = 0.40;
const TAX_BASIS_STANDARD = 0.20;

const LOG = LogService.createLogger('FiStockTradeTaxCalculator');

export interface FiStockTradeTaxResult {

    readonly kauppaSummaBrutto: number;
    readonly hankintaHintaOlettama: number;
    readonly hankintaHintaOlettamaOsuus: number;
    readonly hankintaKulut: number;
    readonly veroVahennys: number;
    readonly verotettavaSumma: number;
    readonly yli30k: boolean;
    readonly ali30kSumma: number;
    readonly yli30kSumma: number;
    readonly vero30pSumma: number;
    readonly vero34pSumma: number;
    readonly veronSumma: number;
    readonly kauppaSummaNetto: number;
    readonly varainSiirtoVero: number;

}

export class FiStockTradeTaxCalculator {

    public static calculate (
        kauppaSummaValue: number,
        hankintaHintaValue: number,
        hankintaVarainsiirtoVeroValue: number,
        valitysPalkkioValue: number,
        ostinOsakkeet: boolean,
        yli10Years: boolean
    ): FiStockTradeTaxResult {

        const isTaxFree = kauppaSummaValue <= TAX_FREE_LIMIT;

        const hankintaHintaOlettamaOsuus = yli10Years ? TAX_BASIS_AFTER_10_YEARS : TAX_BASIS_STANDARD;
        const hankintaHintaOlettama = kauppaSummaValue * hankintaHintaOlettamaOsuus;
        const hankintaKulut = ostinOsakkeet ? hankintaHintaValue + hankintaVarainsiirtoVeroValue + valitysPalkkioValue : hankintaHintaValue;
        const veroVahennys = hankintaHintaOlettama > hankintaKulut ? hankintaHintaOlettama : hankintaKulut;
        const verotettavaSumma = isTaxFree ? 0 : (kauppaSummaValue >= veroVahennys ? kauppaSummaValue - veroVahennys : 0);
        const yli30k = verotettavaSumma >= TAX_RELIEF_LIMIT;
        const ali30kSumma = yli30k ? TAX_RELIEF_LIMIT : verotettavaSumma;
        const yli30kSumma = yli30k ? verotettavaSumma - TAX_RELIEF_LIMIT : 0;
        const vero30pSumma = ali30kSumma * CAPITAL_INCOME_TAX_PERCENT_BELOW_RELIEF;
        const vero34pSumma = yli30kSumma * CAPITAL_INCOME_TAX_PERCENT_ABOVE_RELIEF;
        const veronSumma = vero30pSumma + vero34pSumma;
        const kauppaSummaNetto = kauppaSummaValue - veronSumma;
        const varainSiirtoVero = kauppaSummaValue * TRANSFER_TAX_PERCENT;

        return {
            kauppaSummaBrutto: kauppaSummaValue,
            hankintaHintaOlettama: hankintaHintaOlettama,
            hankintaHintaOlettamaOsuus: hankintaHintaOlettamaOsuus,
            hankintaKulut: hankintaKulut,
            veroVahennys: veroVahennys,
            verotettavaSumma: verotettavaSumma,
            yli30k: yli30k,
            ali30kSumma: ali30kSumma,
            yli30kSumma: yli30kSumma,
            vero30pSumma: vero30pSumma,
            vero34pSumma: vero34pSumma,
            veronSumma: veronSumma,
            kauppaSummaNetto,
            varainSiirtoVero
        };

    }


    public static reverseCalculate (
        kauppaSummaNetto: number,
        hankintaHintaValue: number,
        hankintaVarainsiirtoVeroValue: number,
        valitysPalkkioValue: number,
        ostinOsakkeet: boolean,
        yli10Years: boolean
    ): FiStockTradeTaxResult | undefined {

        let minBruttoRange: number = kauppaSummaNetto;
        let maxBruttoRange: number = kauppaSummaNetto / (1 - CAPITAL_INCOME_TAX_PERCENT_ABOVE_RELIEF);

        LOG.debug(`range: ${minBruttoRange} - ${maxBruttoRange}`);

        let result: FiStockTradeTaxResult | undefined = undefined;

        let current: number = minBruttoRange;

        for ( ; current <= maxBruttoRange ; current += 0.01 ) {

            result = FiStockTradeTaxCalculator.calculate(
                current,
                hankintaHintaValue,
                hankintaVarainsiirtoVeroValue,
                valitysPalkkioValue,
                ostinOsakkeet,
                yli10Years
            );

            if ( Math.round(result.kauppaSummaNetto * 100) === Math.round(
                kauppaSummaNetto * 100) ) {
                LOG.debug(`Match found: `, result);
                return result;
            }

        }

        LOG.debug(`End of loop reached: `, result);
        return undefined;

    }

}
