// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SiType } from "./types/SiType";

export const KILO_IN_BINARY  = 1024;
export const MEGA_IN_BINARY  = 1024*1024;
export const GIGA_IN_BINARY  = 1024*1024*1024;
export const TERA_IN_BINARY  = 1024*1024*1024*1024;
export const PETA_IN_BINARY  = 1024*1024*1024*1024*1024;
export const EXA_IN_BINARY   = 1024*1024*1024*1024*1024*1024;
export const ZETTA_IN_BINARY = 1024*1024*1024*1024*1024*1024*1024;
export const YOTTA_IN_BINARY = 1024*1024*1024*1024*1024*1024*1024*1024;

export const KILO_IN_DECIMAL  = 1000;
export const MEGA_IN_DECIMAL  = 1000*1000;
export const GIGA_IN_DECIMAL  = 1000*1000*1000;
export const TERA_IN_DECIMAL  = 1000*1000*1000*1000;
export const PETA_IN_DECIMAL  = 1000*1000*1000*1000*1000;
export const EXA_IN_DECIMAL   = 1000*1000*1000*1000*1000*1000;
export const ZETTA_IN_DECIMAL = 1000*1000*1000*1000*1000*1000*1000;
export const YOTTA_IN_DECIMAL = 1000*1000*1000*1000*1000*1000*1000*1000;

export type SiPair = [number, SiType];

export class SiUtils {

    public static getValue (value: number, type: SiType) : number {
        switch (type) {
            case SiType.NONE  : return value;
            case SiType.KILO  : return value/KILO_IN_BINARY;
            case SiType.MEGA  : return value/MEGA_IN_BINARY;
            case SiType.GIGA  : return value/GIGA_IN_BINARY;
            case SiType.TERA  : return value/TERA_IN_BINARY;
            case SiType.PETA  : return value/PETA_IN_BINARY;
            case SiType.EXA   : return value/EXA_IN_BINARY;
            case SiType.ZETTA : return value/ZETTA_IN_BINARY;
            case SiType.YOTTA : return value/YOTTA_IN_BINARY;
            default:           throw new TypeError(`SiType not implemented: ${type}`);
        }
    }

    public static getPair (value: number, type: SiType) : SiPair {
        return [SiUtils.getValue(value, type), type];
    }

    public static getBinaryPair (value: number) : SiPair {
        if (value < KILO_IN_BINARY) return SiUtils.getPair(value, SiType.NONE);
        if (value < MEGA_IN_BINARY) return SiUtils.getPair(value, SiType.KILO);
        if (value < GIGA_IN_BINARY) return SiUtils.getPair(value, SiType.MEGA);
        if (value < TERA_IN_BINARY) return SiUtils.getPair(value, SiType.GIGA);
        if (value < PETA_IN_BINARY) return SiUtils.getPair(value, SiType.TERA);
        if (value < EXA_IN_BINARY) return SiUtils.getPair(value, SiType.PETA);
        if (value < ZETTA_IN_BINARY) return SiUtils.getPair(value, SiType.EXA);
        if (value < YOTTA_IN_BINARY) return SiUtils.getPair(value, SiType.ZETTA);
        return SiUtils.getPair(value, SiType.YOTTA);
    }

    public static getDecimalPair (value: number) : SiPair {
        if (value < KILO_IN_DECIMAL) return SiUtils.getPair(value, SiType.NONE);
        if (value < MEGA_IN_DECIMAL) return SiUtils.getPair(value, SiType.KILO);
        if (value < GIGA_IN_DECIMAL) return SiUtils.getPair(value, SiType.MEGA);
        if (value < TERA_IN_DECIMAL) return SiUtils.getPair(value, SiType.GIGA);
        if (value < PETA_IN_DECIMAL) return SiUtils.getPair(value, SiType.TERA);
        if (value < EXA_IN_DECIMAL) return SiUtils.getPair(value, SiType.PETA);
        if (value < ZETTA_IN_DECIMAL) return SiUtils.getPair(value, SiType.EXA);
        if (value < YOTTA_IN_DECIMAL) return SiUtils.getPair(value, SiType.ZETTA);
        return SiUtils.getPair(value, SiType.YOTTA);
    }

    /**
     * Convert value to bytes
     *
     * @param value The value to convert
     * @param type
     */
    public static getBytes (value : number, type: SiType) : number {
        switch (type) {
            case SiType.NONE   : return value;
            case SiType.KILO   : return value*KILO_IN_BINARY;
            case SiType.MEGA   : return value*MEGA_IN_BINARY;
            case SiType.GIGA   : return value*GIGA_IN_BINARY;
            case SiType.TERA   : return value*TERA_IN_BINARY;
            case SiType.PETA   : return value*PETA_IN_BINARY;
            case SiType.EXA    : return value*EXA_IN_BINARY;
            case SiType.ZETTA  : return value*ZETTA_IN_BINARY;
            case SiType.YOTTA  : return value*YOTTA_IN_BINARY;
            default: throw new TypeError('Undefined si type: ' + type);
        }
    }

}
