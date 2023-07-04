import { CheckoutParam } from "./CheckoutParam";

describe('CheckoutParam', () => {

    let param: CheckoutParam;

    beforeEach(() => {
        param = new CheckoutParam('param1', 'value1');
    });

    describe('#getName', () => {
        it('returns the name of the CheckoutParam', () => {
            expect(param.getName()).toBe('param1');
        });
    });

    describe('#getValue', () => {
        it('returns the value of the CheckoutParam', () => {
            expect(param.getValue()).toBe('value1');
        });
    });

});
