// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { has } from "./functions/has";

export class ObjectUtils {

    /**
     * Returns true if the method name is already defined in this object or
     * one of the prototypes.
     *
     * @param obj
     * @param name
     */
    public static isReservedPropertyName (
        obj : any,
        name : string
    ) : boolean {
        if (!obj) return false;
        if (has(obj, name)) return true;
        const proto = Object.getPrototypeOf(obj);
        if (!proto) return false;
        if (proto === obj) return false;
        return ObjectUtils.isReservedPropertyName(proto, name);
    }

}
