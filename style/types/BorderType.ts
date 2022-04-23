// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export enum BorderType {
    DOTTED = "dotted",
    DASHED = "dashed",
    SOLID = "solid",
    DOUBLE = "double",
    GROOVE = "groove",
    RIDGE = "ridge",
    INSET = "inset",
    OUTSET = "outset",
    NONE = "none",
    HIDDEN = "hidden"
}

export function isBorderType (value: any): value is BorderType {
    switch (value) {
        case BorderType.DOTTED:
        case BorderType.DASHED:
        case BorderType.SOLID:
        case BorderType.DOUBLE:
        case BorderType.GROOVE:
        case BorderType.RIDGE:
        case BorderType.INSET:
        case BorderType.OUTSET:
        case BorderType.NONE:
        case BorderType.HIDDEN:
            return true;

        default:
            return false;

    }
}

export function stringifyBorderType (value: BorderType): string {
    switch (value) {
        case BorderType.DOTTED : return 'DOTTED';
        case BorderType.DASHED : return 'DASHED';
        case BorderType.SOLID : return 'SOLID';
        case BorderType.DOUBLE : return 'DOUBLE';
        case BorderType.GROOVE : return 'GROOVE';
        case BorderType.RIDGE : return 'RIDGE';
        case BorderType.INSET : return 'INSET';
        case BorderType.OUTSET : return 'OUTSET';
        case BorderType.NONE : return 'NONE';
        case BorderType.HIDDEN : return 'HIDDEN';
    }
    throw new TypeError(`Unsupported BorderType value: ${value}`);
}

export function parseBorderType (value: any): BorderType | undefined {

    switch (`${value}`.toUpperCase()) {

        case 'DOTTED' : return BorderType.DOTTED;
        case 'DASHED' : return BorderType.DASHED;
        case 'SOLID' : return BorderType.SOLID;
        case 'DOUBLE' : return BorderType.DOUBLE;
        case 'GROOVE' : return BorderType.GROOVE;
        case 'RIDGE' : return BorderType.RIDGE;
        case 'INSET' : return BorderType.INSET;
        case 'OUTSET' : return BorderType.OUTSET;
        case 'NONE' : return BorderType.NONE;
        case 'HIDDEN' : return BorderType.HIDDEN;
        default     : return undefined;

    }

}
