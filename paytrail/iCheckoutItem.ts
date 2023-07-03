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
