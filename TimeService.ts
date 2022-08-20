// Copyright (c) 2021-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import moment from "moment";

export class TimeService {

    public static getCurrentTimeString () : string {
        const now = new Date();
        return now.toISOString();
    }

    public static getTimeAfterMonths (
        time: string,
        months: number
    ) : string {
        return moment(time).add(months, "months").toISOString();
    }

    public static parseISOString (
        time: string
    ) : string {
        return moment(time).toISOString();
    }

}
