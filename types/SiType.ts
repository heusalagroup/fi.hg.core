// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { toUpper } from "lodash";
import { isString } from "../modules/lodash";

export enum SiType {
    NONE = "NONE",
    KILO = "KILO",
    MEGA = "MEGA",
    GIGA = "GIGA",
    TERA = "TERA",
    PETA = "PETA",
    EXA = "EXA",
    ZETTA = "ZETTA",
    YOTTA = "YOTTA"
}

export function isSiType (value: any): value is SiType {
    switch (value) {

        case SiType.NONE:
        case SiType.KILO:
        case SiType.MEGA:
        case SiType.GIGA:
        case SiType.TERA:
        case SiType.PETA:
        case SiType.EXA:
        case SiType.ZETTA:
        case SiType.YOTTA:
            return true;

        default:
            return false;

    }
}

export function stringifySiType (value: SiType): string {
    switch (value) {
        case SiType.NONE : return 'NONE';
        case SiType.KILO : return 'KILO';
        case SiType.MEGA : return 'MEGA';
        case SiType.GIGA : return 'GIGA';
        case SiType.TERA : return 'TERA';
        case SiType.PETA : return 'PETA';
        case SiType.EXA : return 'EXA';
        case SiType.ZETTA : return 'ZETTA';
        case SiType.YOTTA : return 'YOTTA';
    }
    throw new TypeError(`Unsupported SiType value: ${value}`);
}

export function parseSiType (value: any): SiType | undefined {
    if (!isString(value)) value = `${value}`;
    value = value.length === 1 ? value : toUpper(value);
    switch ( value ) {

        case '':
        case 'NONE' : return SiType.NONE;

        case 'k':
        case 'KILO' : return SiType.KILO;

        case 'M':
        case 'MEGA' : return SiType.MEGA;

        case 'G':
        case 'GIGA' : return SiType.GIGA;

        case 'T':
        case 'TERA' : return SiType.TERA;

        case 'P':
        case 'PETA' : return SiType.PETA;

        case 'E':
        case 'EXA' : return SiType.EXA;

        case 'Z':
        case 'ZETTA' : return SiType.ZETTA;

        case 'Y':
        case 'YOTTA' : return SiType.YOTTA;

        default    : return undefined;

    }

}
