// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { trim } from "lodash";
import { LogService } from "../LogService"; 
const LOG = LogService.createLogger('DecimalField');

export class NumberFieldUtils {
    public static toNumber (value: string | undefined, focus?:boolean): number | undefined { // validates string and returns float 
        try {
                    LOG.debug('Focus Value', focus)
                    
                    if ( value === undefined ) return undefined;
                    value = trim(value);
                    
                    if ( value === '' ) return undefined;
                    
                    const parsedValue = parseFloat(value as string); 
                    
                    return isNaN(parsedValue) ? undefined : parsedValue;
                
            } catch (err) {
                LOG.warn(`Error while parsing string as integer "${value}": `, err);
                return undefined;
            }
        
    }
}