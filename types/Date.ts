// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isNumber } from "./Number";

export function isValidDate (time: Date) : boolean {
    try {
        if (!time) return false;
        const utcFullYear = time.getUTCFullYear();
        const utcMonth = time.getUTCMonth();
        const utcDate = time.getUTCDate();
        const utcHours = time.getUTCHours();
        const utcMinutes = time.getUTCMinutes();
        const utcSeconds = time.getUTCSeconds();
        return (
            isNumber(utcFullYear) && utcFullYear >= 0
            && isNumber(utcMonth) && utcMonth >= 0
            && isNumber(utcDate) && utcDate >= 0
            && isNumber(utcHours) && utcHours >= 0
            && isNumber(utcMinutes) && utcMinutes >= 0
            && isNumber(utcSeconds) && utcSeconds >= 0
        );
    } catch (err) {
        return false;
    }
}
