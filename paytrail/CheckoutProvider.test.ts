import { CheckoutProvider } from "./CheckoutProvider";
import { iCheckoutParam } from "./iCheckoutParam";

describe('CheckoutProvider', () => {
    let provider: CheckoutProvider;
    let params: iCheckoutParam[];

    beforeEach(() => {

        // Initialize an array of iCheckoutParam objects
        params = [
            /* ... */
        ];

        provider = new CheckoutProvider(
            'http://example.com',
            'Provider Name',
            'icon.svg',
            params
        );

    });

    describe('#getName', () => {
        it('returns the name of the CheckoutProvider', () => {
            expect(provider.getName()).toBe('Provider Name');
        });
    });

    describe('#getURL', () => {
        it('returns the URL of the CheckoutProvider', () => {
            expect(provider.getURL()).toBe('http://example.com');
        });
    });

    describe('#getParams', () => {
        it('returns the parameters of the CheckoutProvider', () => {
            expect(provider.getParams()).toBe(params);
        });
    });

    describe('#getIcon', () => {
        it('returns the icon of the CheckoutProvider', () => {
            expect(provider.getIcon()).toBe('icon.svg');
        });
    });

    describe('constructor', () => {
        it('throws an error when url is missing', () => {
            expect(() => new CheckoutProvider('', 'Provider Name', 'icon.svg', params))
            .toThrowError('URL not provided:');
        });

        it('throws an error when name is missing', () => {
            expect(() => new CheckoutProvider('http://example.com', '', 'icon.svg', params))
            .toThrowError('Name not provided:');
        });

        it('throws an error when icon is missing', () => {
            expect(() => new CheckoutProvider('http://example.com', 'Provider Name', '', params))
            .toThrowError('Icon not provided:');
        });

        it('throws an error when params is not an array', () => {
            // @ts-ignore
            expect(() => new CheckoutProvider('http://example.com', 'Provider Name', 'icon.svg', 'not-an-array'))
            .toThrowError('Params is not array:');
        });
    });

});
