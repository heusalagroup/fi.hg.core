// Copyright (c) 2021-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export class TimeService {

    public static getCurrentTimeString () : string {
        const now = new Date();
        return now.toISOString();
    }

}
