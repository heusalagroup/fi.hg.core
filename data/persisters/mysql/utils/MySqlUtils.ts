// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { padStart } from "../../../../functions/padStart";
import { isNumber } from "../../../../types/Number";
import { isValidDate } from "../../../../types/Date";

export class MySqlUtils {

    public static getDateTimeStringFromDate (
        time: Date
    ) : string {

        const utcFullYear = time.getUTCFullYear();
        const utcMonth = time.getUTCMonth();
        const utcDate = time.getUTCDate();
        const utcHours = time.getUTCHours();
        const utcMinutes = time.getUTCMinutes();
        const utcSeconds = time.getUTCSeconds();

        const year    = isNumber(utcFullYear) && utcFullYear >= 0 ? `${utcFullYear}` : '';
        const month   = isNumber(utcMonth) && utcMonth >= 0 ? padStart(`${1 + utcMonth}`, 2, '0') : '';
        const date    = isNumber(utcDate) && utcDate >= 0 ? padStart(`${utcDate}`, 2, '0') : '';
        const hours   = isNumber(utcHours) && utcHours >= 0 ? padStart(`${utcHours}`, 2, '0') : '';
        const minutes = isNumber(utcMinutes) && utcMinutes >= 0 ? padStart(`${utcMinutes}`, 2, '0') : '';
        const seconds = isNumber(utcSeconds) && utcSeconds >= 0 ? padStart(`${utcSeconds}`, 2, '0') : '';
        if (year && month && date && hours && minutes && seconds) {
            return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
        }
        throw new TypeError(`Could not parse date as string: '${time}'`);
    }

    public static getDateTimeStringFromISOString (
        isoDate: string
    ) : string {
        const date = new Date(isoDate);
        if (!isValidDate(date)) {
            throw new TypeError(`Could not parse string: '${isoDate}'`);
        }
        return MySqlUtils.getDateTimeStringFromDate( date );
    }

}
