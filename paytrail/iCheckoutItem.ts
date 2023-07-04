// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export interface iCheckoutItem {
    getUnitPrice(): number;
    getUnits(): number;
    getVatPercentage(): number;
    getDeliveryDate(): string;
    getProductCode(): string;
    getDescription(): string;
    getCategory(): string;
    getStamp(): string;
}
