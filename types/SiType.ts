// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

/**
 * This module provides utilities for working with SI standard values.
 *
 * The `SiType` enumeration consists of a set of predefined values representing
 * various units of measurement according to the International System of Units (SI).
 * The module also provides functions for parsing, stringifying, and checking
 * the validity of these values.
 *
 * @example <caption>To use the SiType enumeration in your code, you will first need to import it
 *          from the module that defines it. You can do this by adding the following line
 *          at the top of your file:</caption>
 *     import { SiType } from "./fi/hg/core/types/SiType";
 *
 * @example <caption>You could use the `SiType.KILO` constant in a function like this:</caption>
 *     function convertToKilometers (distanceInMeters: number): number {
 *        return distanceInMeters / 1000;
 *     }
 *     const translations = {
 *         [SiType.KILO]: "kilometers",
 *         // ...add more translations for other SiType values as needed
 *     };
 *     const distanceInKilometers = convertToKilometers(5000);  // 5
 *     console.log(`The distance is ${distanceInKilometers} ${translations[SiType.KILO]}.`);  // The distance is 5 kilometers. *
 *
 * @example <caption>The module provides three utility functions that you can use to work with
 *          SiType values: isSiType, stringifySiType, and parseSiType.</caption>
 *     import { isSiType, stringifySiType, parseSiType } from "./path/to/si-type-module";
 *
 *     // Check if a value is a valid SiType
 *     if (isSiType(SiType.MEGA)) {
 *         console.log("This is a valid SiType value.");
 *     } else {
 *         console.log("This is not a valid SiType value.");
 *     }
 *
 *     // Convert an SiType value to a string
 *     const siTypeString = stringifySiType(SiType.MEGA);  // "MEGA"
 *
 *     // Parse a value into an SiType
 *     const siTypeValue = parseSiType("mega");  // SiType.MEGA
 *
 */

import { toUpper } from "lodash";
import { isString } from "../modules/lodash";

/**
 * An enumeration of predefined SI standard values.
 */
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

/**
 * A type guard function that checks if a value is a valid SiType.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a valid SiType, `false` otherwise.
 * @throws {None} This function does not throw any exceptions.
 * @nosideeffects
 */
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

/**
 * Converts an SiType value to its string representation.
 *
 * @param value - The SiType value to stringify.
 * @returns The string representation of the SiType value.
 * @throws {TypeError} If the provided SiType value is not recognized.
 * @nosideeffects
 */
export function stringifySiType (value: SiType): string {
    switch (value) {
        case SiType.NONE : return 'NONE';
        case SiType.KILO : return 'KILO';
        case SiType.MEGA : return 'MEGA';
        case SiType.GIGA : return 'GIGA';
        case SiType.TERA : return 'TERA';
        case SiType.PETA : return 'PETA';
        case SiType.EXA   : return 'EXA';
        case SiType.ZETTA : return 'ZETTA';
        case SiType.YOTTA : return 'YOTTA';
    }
    throw new TypeError(`Unsupported SiType value: ${value}`);
}

/**
 * Attempts to parse a value into an SiType.
 *
 * @param value - The value to parse.
 * @returns The parsed SiType value, or `undefined` if the value could not be parsed.
 * @throws {None} This function does not throw any exceptions.
 * @nosideeffects
 */
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
