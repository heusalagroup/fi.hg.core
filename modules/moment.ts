// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import moment from "moment-timezone";

import {
    tz as momentTz,
    utc as parseUtc
} from 'moment-timezone';

export type momentType = moment.Moment;

export {
    moment,
    momentTz,
    parseUtc
};
