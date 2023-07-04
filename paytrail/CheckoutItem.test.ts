
import { CheckoutItem } from "./CheckoutItem";

const TEST_UNIT_PRICE = 3000;
const TEST_UNIT_AMOUNT = 1;
const TEST_UNIT_VAT_PERCENTAGE = 2400;
const TEST_UNIT_PRODUCT_CODE = 'sku-123';
const TEST_UNIT_DELIVERY_DATE = '2023-06-30';
const TEST_UNIT_DESCRIPTION = 'Test product';
const TEST_UNIT_CATEGORY = '';
const TEST_UNIT_STAMP = '1234567';

describe('CheckoutItem', () => {
    let item: CheckoutItem;

    beforeEach(() => {
        item = new CheckoutItem(
            TEST_UNIT_PRICE,
            TEST_UNIT_AMOUNT,
            TEST_UNIT_VAT_PERCENTAGE,
            TEST_UNIT_PRODUCT_CODE,
            TEST_UNIT_DELIVERY_DATE,
            TEST_UNIT_DESCRIPTION,
            TEST_UNIT_CATEGORY,
            TEST_UNIT_STAMP,
        );
    });

    describe('#getUnitPrice', () => {
        it('returns the unit price of the CheckoutItem', () => {
            expect(item.getUnitPrice()).toBe(TEST_UNIT_PRICE);
        });
    });

    describe('#getUnits', () => {
        it('returns the units of the CheckoutItem', () => {
            expect(item.getUnits()).toBe(TEST_UNIT_AMOUNT);
        });
    });

    describe('#getVatPercentage', () => {
        it('returns the VAT percentage of the CheckoutItem', () => {
            expect(item.getVatPercentage()).toBe(TEST_UNIT_VAT_PERCENTAGE);
        });
    });

    describe('#getProductCode', () => {
        it('returns the product code of the CheckoutItem', () => {
            expect(item.getProductCode()).toBe(TEST_UNIT_PRODUCT_CODE);
        });
    });

    describe('#getDeliveryDate', () => {
        it('returns the delivery date of the CheckoutItem', () => {
            expect(item.getDeliveryDate()).toBe(TEST_UNIT_DELIVERY_DATE);
        });
    });

    describe('#getDescription', () => {
        it('returns the description of the CheckoutItem', () => {
            expect(item.getDescription()).toBe(TEST_UNIT_DESCRIPTION);
        });
    });

    describe('#getCategory', () => {
        it('returns the description of the CheckoutItem', () => {
            expect(item.getCategory()).toBe(TEST_UNIT_CATEGORY);
        });
    });

    describe('#getStamp', () => {
        it('returns the stamp of the CheckoutItem', () => {
            expect(item.getStamp()).toBe(TEST_UNIT_STAMP);
        });
    });

});
