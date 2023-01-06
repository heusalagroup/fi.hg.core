// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../../types/Enum";

export enum JokerComApiDomainPeriod {
    Y1 = "1y",
    Y2 = "2y",
    Y3 = "3y",
    Y4 = "4y",
    Y5 = "5y",
    Y6 = "6y",
    Y7 = "7y",
    Y8 = "8y",
    Y9 = "9y",
    Y10 = "10y"
}

export function isJokerComApiDomainPeriod (value: any) : value is JokerComApiDomainPeriod {
    switch (value) {
        case JokerComApiDomainPeriod.Y1:
        case JokerComApiDomainPeriod.Y2:
        case JokerComApiDomainPeriod.Y3:
        case JokerComApiDomainPeriod.Y4:
        case JokerComApiDomainPeriod.Y5:
        case JokerComApiDomainPeriod.Y6:
        case JokerComApiDomainPeriod.Y7:
        case JokerComApiDomainPeriod.Y8:
        case JokerComApiDomainPeriod.Y9:
        case JokerComApiDomainPeriod.Y10:
            return true;
        default:
            return false;
    }
}

export function explainJokerComApiDomainPeriod (value : any) : string {
    return explainEnum("JokerComApiDomainPeriod", JokerComApiDomainPeriod, isJokerComApiDomainPeriod, value);
}

export function stringifyJokerComApiDomainPeriod (value : JokerComApiDomainPeriod) : string {
    switch (value) {
        case JokerComApiDomainPeriod.Y1  : return '1y';
        case JokerComApiDomainPeriod.Y2  : return '2y';
        case JokerComApiDomainPeriod.Y3  : return '3y';
        case JokerComApiDomainPeriod.Y4  : return '4y';
        case JokerComApiDomainPeriod.Y5  : return '5y';
        case JokerComApiDomainPeriod.Y6  : return '6y';
        case JokerComApiDomainPeriod.Y7  : return '7y';
        case JokerComApiDomainPeriod.Y8  : return '8y';
        case JokerComApiDomainPeriod.Y9  : return '9y';
        case JokerComApiDomainPeriod.Y10  : return '10y';
    }
    throw new TypeError(`Unsupported JokerComApiDomainPeriod value: ${value}`)
}

export function parseJokerComApiDomainPeriod (value: any) : JokerComApiDomainPeriod | undefined {
    if (value === undefined) return undefined;
    switch(`${value}`.toLowerCase()) {

        case 'y1':
        case '1y' : return JokerComApiDomainPeriod.Y1;

        case 'y2':
        case '2y' : return JokerComApiDomainPeriod.Y2;

        case 'y3':
        case '3y' : return JokerComApiDomainPeriod.Y3;

        case 'y4':
        case '4y' : return JokerComApiDomainPeriod.Y4;

        case 'y5':
        case '5y' : return JokerComApiDomainPeriod.Y5;

        case 'y6':
        case '6y' : return JokerComApiDomainPeriod.Y6;

        case 'y7':
        case '7y' : return JokerComApiDomainPeriod.Y7;

        case 'y8':
        case '8y' : return JokerComApiDomainPeriod.Y8;

        case 'y9':
        case '9y' : return JokerComApiDomainPeriod.Y9;

        case 'y10':
        case '10y' : return JokerComApiDomainPeriod.Y10;

        default     : return undefined;
    }
}
