// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export class WindowObjectService {

    public static hasWindow (): boolean {
        return typeof window !== 'undefined';
    }

    public static getWindow (): Window | undefined {
        if ( typeof window === "undefined" ) return undefined;
        return window;
    }

    public static getParent (): Window | undefined {
        if ( typeof window === "undefined" ) return undefined;
        return window?.parent;
    }

}
