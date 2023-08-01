// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { trim } from "lodash";
import { LogService } from "./LogService";
import { isString } from "./types/String";

const LOG = LogService.createLogger('NumberUtils');

export class NumberUtils {

    /**
     * Validates string and returns float
     *
     * @param value
     */
    public static parseNumber (value: any): number | undefined {
        try {
            if ( value === undefined ) return undefined;
            if ( !isString(value) ) {
                value = `${value}`;
            }
            value = trim(value);
            if ( value === '' ) return undefined;
            const parsedValue = parseFloat(value as string);
            return isNaN(parsedValue) ? undefined : parsedValue;
        } catch (err) {
            LOG.warn(`toNumber: Error while parsing value as number "${value}": `, err);
            return undefined;
        }
    }

}
