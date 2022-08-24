// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export class WindowObjectService {

    public static hasWindow (): boolean {
        return !!_getWindow();
    }

    public static getWindow (): Window | undefined {
        return _getWindow();
    }

    public static getParent (): Window | undefined {
        return _getWindow()?.parent;
    }

}

function _getWindow () : Window | undefined {
    if ( typeof window === "undefined" ) return undefined;
    return window;
}
