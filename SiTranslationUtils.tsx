// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SiUtils } from "./SiUtils";
import { getCommonShortSi } from "./store/constants/storeTranslation";
import { TranslationFunction } from "./types/TranslationFunction";

export class SiTranslationUtils {

    public static formatSiBinary (
        value: number,
        label: string,
        t: TranslationFunction
    ): string {
        const [ size, type ] = SiUtils.getBinaryPair(value);
        return `${size.toFixed(2)} ${t(getCommonShortSi(type))}${t(label)}`;
    }

    public static formatSiDecimal (
        value: number,
        label: string,
        t: TranslationFunction
    ): string {
        const [ size, type ] = SiUtils.getDecimalPair(value);
        return `${size.toFixed(2)} ${t(getCommonShortSi(type))}${t(label)}`;
    }

}
