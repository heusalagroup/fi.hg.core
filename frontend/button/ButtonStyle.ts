// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { trim } from "../../functions/trim";

export enum ButtonStyle {
    PRIMARY   = "primary",
    SECONDARY = "secondary",
    SUCCESS   = "success",
    DANGER    = "danger",
    WARNING   = "warning",
    INFO      = "info",
    LINK      = "link"
}

export function isButtonStyle (value: any): value is ButtonStyle {

    switch (value) {
        case ButtonStyle.PRIMARY:
        case ButtonStyle.SECONDARY:
        case ButtonStyle.SUCCESS:
        case ButtonStyle.DANGER:
        case ButtonStyle.WARNING:
        case ButtonStyle.INFO:
        case ButtonStyle.LINK:
            return true;

        default:
            return false;

    }
}

export function isButtonStyleOrUndefined (value: any): value is ButtonStyle | undefined {
    if (value === undefined) return true;
    return isButtonStyle(value);
}

export function stringifyButtonStyle (value: ButtonStyle): string {
    switch (value) {
        case ButtonStyle.PRIMARY   : return 'primary';
        case ButtonStyle.SECONDARY : return 'secondary';
        case ButtonStyle.SUCCESS   : return 'success';
        case ButtonStyle.DANGER    : return 'danger';
        case ButtonStyle.WARNING   : return 'warning';
        case ButtonStyle.INFO      : return 'info';
        case ButtonStyle.LINK      : return 'link';
    }
    throw new TypeError(`Unsupported ButtonStyle value: ${value}`);
}

export function parseButtonStyle (value: any): ButtonStyle | undefined {

    if (value === undefined) return undefined;

    switch (trim(`${value}`).toUpperCase()) {
        case 'PRIMARY'   : return ButtonStyle.PRIMARY;
        case 'SECONDARY' : return ButtonStyle.SECONDARY;
        case 'SUCCESS'   : return ButtonStyle.SUCCESS;
        case 'DANGER'    : return ButtonStyle.DANGER;
        case 'WARNING'   : return ButtonStyle.WARNING;
        case 'INFO'      : return ButtonStyle.INFO;
        case 'LINK'      : return ButtonStyle.LINK;
        default          : return undefined;
    }

}



