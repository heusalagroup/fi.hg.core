// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../../types/Enum";

export enum OperatingSystem {
    LINUX_UBUNTU_LTS_18_04 = "LINUX_UBUNTU_LTS_18_04",
    LINUX_UBUNTU_LTS_20_04 = "LINUX_UBUNTU_LTS_20_04",
    LINUX_UBUNTU_LTS_22_04 = "LINUX_UBUNTU_LTS_22_04",
    LINUX_DEBIAN_10        = "LINUX_DEBIAN_10",
    LINUX_ARCH             = "LINUX_ARCH",
    LINUX_NIXOS            = "LINUX_NIXOS",
    LINUX_FREEBSD          = "LINUX_FREEBSD",
    FREEBSD                = "FREEBSD",
}

export function isOperatingSystem (value: any): value is OperatingSystem {
    switch (value) {
        case OperatingSystem.LINUX_UBUNTU_LTS_18_04:
        case OperatingSystem.LINUX_UBUNTU_LTS_20_04:
        case OperatingSystem.LINUX_UBUNTU_LTS_22_04:
        case OperatingSystem.LINUX_DEBIAN_10:
        case OperatingSystem.LINUX_ARCH:
        case OperatingSystem.LINUX_NIXOS:
        case OperatingSystem.LINUX_FREEBSD:
        case OperatingSystem.FREEBSD:
            return true;
        default:
            return false;
    }
}

export function explainOperatingSystem (value: any): string {
    return explainEnum("OperatingSystem", OperatingSystem, isOperatingSystem, value);
}

export function stringifyOperatingSystem (value: OperatingSystem): string {
    switch (value) {
        case OperatingSystem.LINUX_UBUNTU_LTS_20_04  : return 'LINUX_UBUNTU_LTS_20_04';
        case OperatingSystem.LINUX_UBUNTU_LTS_22_04  : return 'LINUX_UBUNTU_LTS_22_04';
        case OperatingSystem.LINUX_UBUNTU_LTS_18_04  : return 'LINUX_UBUNTU_LTS_18_04';
        case OperatingSystem.LINUX_DEBIAN_10         : return 'LINUX_DEBIAN_10';
        case OperatingSystem.LINUX_ARCH              : return 'LINUX_ARCH';
        case OperatingSystem.LINUX_NIXOS             : return 'LINUX_NIXOS';
        case OperatingSystem.FREEBSD                 : return 'FREEBSD';
        case OperatingSystem.LINUX_FREEBSD           : return 'LINUX_FREEBSD';
    }
    throw new TypeError(`Unsupported OperatingSystem value: ${value}`);
}

export function parseOperatingSystem (value: any): OperatingSystem | undefined {
    if ( value === undefined ) return undefined;
    switch (`${value}`.toUpperCase()) {

        case 'LINUX':
        case 'LINUX_UBUNTU':
        case 'LINUX_UBUNTU_LTS':
        case 'LINUX_UBUNTU_LTS_22_04' : return OperatingSystem.LINUX_UBUNTU_LTS_22_04;

        case 'LINUX_UBUNTU_LTS_20_04' : return OperatingSystem.LINUX_UBUNTU_LTS_20_04;
        case 'LINUX_UBUNTU_LTS_18_04' : return OperatingSystem.LINUX_UBUNTU_LTS_18_04;

        case 'LINUX_DEBIAN_10'        : return OperatingSystem.LINUX_DEBIAN_10;
        case 'LINUX_ARCH'             : return OperatingSystem.LINUX_ARCH;
        case 'LINUX_NIXOS'            : return OperatingSystem.LINUX_NIXOS;
        case 'FREEBSD'                : return OperatingSystem.FREEBSD;
        case 'LINUX_FREEBSD'          : return OperatingSystem.LINUX_FREEBSD;

        default     : return undefined;
    }
}
