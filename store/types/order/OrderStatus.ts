// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export enum OrderStatus {
    CANCELLED  = "cancelled",
    COMPLETED  = "completed",
    PROCESSING = "processing",
    REFUNDED   = "refunded"
}

export function isOrderStatus (value: any): value is OrderStatus {
    switch (value) {
        case OrderStatus.CANCELLED:
        case OrderStatus.COMPLETED:
        case OrderStatus.PROCESSING:
        case OrderStatus.REFUNDED:
            return true;
        default:
            return false;
    }
}

export function stringifyOrderStatus (value: OrderStatus): string {
    switch (value) {
        case OrderStatus.CANCELLED  : return 'cancelled';
        case OrderStatus.COMPLETED  : return 'completed';
        case OrderStatus.PROCESSING : return 'processing';
        case OrderStatus.REFUNDED   : return 'refunded';
    }
    throw new TypeError(`Unsupported OrderStatus value: ${value}`);
}

export function parseOrderStatus (value: any): OrderStatus | undefined {
    switch (`${value}`.toUpperCase()) {
        case 'CANCELLED'  : return OrderStatus.CANCELLED;
        case 'COMPLETED'  : return OrderStatus.COMPLETED;
        case 'PROCESSING' : return OrderStatus.PROCESSING;
        case 'REFUNDED'   : return OrderStatus.REFUNDED;
        default     : return undefined;
    }
}
