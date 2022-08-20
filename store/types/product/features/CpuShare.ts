// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export enum CpuShare {
    CPU_1_10 = "CPU_1_10",
    CPU_1_5 = "CPU_1_5"
}

export function isCpuShare (value: any): value is CpuShare {
    switch (value) {
        case CpuShare.CPU_1_10:
        case CpuShare.CPU_1_5:
            return true;

        default:
            return false;

    }
}

export function stringifyCpuShare (value: CpuShare): string {
    switch (value) {
        case CpuShare.CPU_1_10 : return '1/10';
        case CpuShare.CPU_1_5  : return '1/5';
        default : return `${value}`;
    }
}

export function parseCpuShare (value: any): CpuShare | undefined {
    switch (`${value}`.toUpperCase()) {

        case '0.1':
        case '1/10':
        case 'CPU_1_10'  : return CpuShare.CPU_1_10;

        case '0.2':
        case '1/5':
        case 'CPU_1_5'   : return CpuShare.CPU_1_5;

        default          : return undefined;
    }
}
