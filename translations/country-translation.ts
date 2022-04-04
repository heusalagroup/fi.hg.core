// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CountryCode } from "../types/CountryCode";

export function getCountryNameTranslationKey (code: CountryCode) : string {
    return `countryCode.${code}.name`;
}
