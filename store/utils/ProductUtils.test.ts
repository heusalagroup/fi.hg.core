import { createCompositeProduct, createProduct, Product } from "../types/product/Product";
import { ProductType } from "../types/product/ProductType";
import { createProductFeature } from "../types/product/features/ProductFeature";
import { ProductFeatureCategory } from "../types/product/features/ProductFeatureCategory";
import { ProductFeatureId } from "../types/product/features/ProductFeatureId";
import { createProductPrice } from "../types/product/ProductPrice";
import { ProductPriceType } from "../types/product/ProductPriceType";
import { ProductUtils } from "./ProductUtils";
import { LogLevel } from "../../types/LogLevel";
import { createCompositeProductSelection } from "../types/product/CompositeProductSelection";
import { CompositeProductOption, createCompositeProductOption } from "../types/product/CompositeProductOption";

ProductUtils.setLogLevel(LogLevel.NONE);

describe('ProductUtils', () => {

    describe('#calculateCompositeProductFromOptions', () => {

        it('can composite non-composable product', () => {

            const item : Product = createProduct(
                'shell-1',
                ProductType.SHELL,
                'Shell account',
                'Awesome shell account for irc',
                [
                    createProductFeature(
                        ProductFeatureId.DISK_SIZE,
                        ProductFeatureCategory.DISK,
                        10
                    )
                ],
                [
                    createProductPrice(
                        5,
                        0.24,
                        ProductPriceType.YEARLY
                    )
                ]

            );

            expect( ProductUtils.calculateCompositeProductFromOptions(item, {}, []) ).toStrictEqual(item);

        });

        it.skip('can composite composable product', () => {

            const shellId = 'shell-1';
            const extraDiskId = 'shell-disk-1';

            const shellProduct1 : Product = createProduct(
                shellId,
                ProductType.SHELL,
                'Shell account',
                'Awesome shell account for irc',
                [
                    createProductFeature(
                        ProductFeatureId.DISK_SIZE,
                        ProductFeatureCategory.DISK,
                        10
                    )
                ],
                [
                    createProductPrice(
                        5,
                        0.24,
                        ProductPriceType.YEARLY
                    )
                ]
            );

            const extraDiskProduct : Product = createProduct(
                extraDiskId,
                ProductType.SHELL,
                'Disk space for shell account',
                'Get more disk space for your awesome shell',
                [
                    createProductFeature(
                        ProductFeatureId.DISK_SIZE,
                        ProductFeatureCategory.DISK,
                        10
                    )
                ],
                [
                    createProductPrice(
                        10,
                        0.24,
                        ProductPriceType.YEARLY
                    )
                ]
            );

            const item : Product = createCompositeProduct(
                'my-shell-1',
                ProductType.SHELL,
                'Shell account with your choices',
                'Awesome shell account for irc -- with your options!',
                [
                    createCompositeProductSelection(
                        ProductFeatureId.DISK_SIZE,
                        'Disk space',
                        'Do you want more disk space?',
                        [
                            createCompositeProductOption(10, [shellId]),
                            createCompositeProductOption(20, [shellId, extraDiskId]),
                            createCompositeProductOption(30, [shellId, [2, extraDiskId]]),
                            createCompositeProductOption(40, [shellId, [3, extraDiskId]])
                        ],
                        10
                    )
                ]
            );

            const preferredOptions = {
                [ProductFeatureId.DISK_SIZE]: 20
            };

            const compositeProduct = ProductUtils.calculateCompositeProductFromOptions(
                item,
                preferredOptions,
                [
                    shellProduct1,
                    extraDiskProduct
                ]
            );

            expect( compositeProduct ).not.toStrictEqual(item);
            expect( compositeProduct?.prices?.length ).toStrictEqual(1);
            expect( compositeProduct?.prices[0]?.sum ).toStrictEqual(15);
            expect( compositeProduct?.prices[0]?.type ).toStrictEqual(ProductPriceType.YEARLY);
            expect( compositeProduct?.prices[0]?.vatPercent ).toStrictEqual(0.24);
            expect( compositeProduct?.features?.length ).toStrictEqual(1);
            expect( compositeProduct?.features[0]?.id ).toStrictEqual(ProductFeatureId.DISK_SIZE);
            expect( compositeProduct?.features[0]?.value ).toStrictEqual(20);

        });

    });

    describe('#sortCompositeProductOptionsByNumericValue', () => {

        it('returns negative for already sorted input', () => {
            expect(
                ProductUtils.sortCompositeProductOptionsByNumericValue(
                    createCompositeProductOption(10, []),
                    createCompositeProductOption(20, [])
                )
            ).toStrictEqual(-1);
        });

        it('returns positive for not sorted input', () => {
            expect(
                ProductUtils.sortCompositeProductOptionsByNumericValue(
                    createCompositeProductOption(20, []),
                    createCompositeProductOption(10, [])
                )
            ).toStrictEqual(1);
        });

        it('returns equal for equal input', () => {
            expect(
                ProductUtils.sortCompositeProductOptionsByNumericValue(
                    createCompositeProductOption(10, []),
                    createCompositeProductOption(10, [])
                )
            ).toStrictEqual(0);
        });

        it('can sort an array', () => {
            let list = [
                createCompositeProductOption(20, []),
                createCompositeProductOption(10, []),
                createCompositeProductOption(10, []),
                createCompositeProductOption(5, []),
                createCompositeProductOption(30, [])
            ];
            list.sort(ProductUtils.sortCompositeProductOptionsByNumericValue);
            expect( list[0].value ).toStrictEqual(5);
            expect( list[1].value ).toStrictEqual(10);
            expect( list[2].value ).toStrictEqual(10);
            expect( list[3].value ).toStrictEqual(20);
            expect( list[4].value ).toStrictEqual(30);
        });

    });

    describe('#sortCompositeProductOptionsByNumericValue', () => {

        it('can find exact matching product option', () => {

            let list = [
                createCompositeProductOption(20, ['a']),
                createCompositeProductOption(10, ['b']),
                createCompositeProductOption(10, ['c']),
                createCompositeProductOption(5, ['d']),
                createCompositeProductOption(30, ['e'])
            ];

            const option : CompositeProductOption | undefined = ProductUtils.getBestMatchingNumericCompositeProductOption(
                5,
                list
            );

            expect( option ).not.toBeUndefined();
            expect( option?.value ).toStrictEqual(5);
            expect( option?.products ).toStrictEqual(['d']);

        });

        it('can find best matching product option', () => {

            let list = [
                createCompositeProductOption(20, ['a']),
                createCompositeProductOption(10, ['b']),
                createCompositeProductOption(10, ['c']),
                createCompositeProductOption(5, ['d']),
                createCompositeProductOption(30, ['e'])
            ];

            const option : CompositeProductOption | undefined = ProductUtils.getBestMatchingNumericCompositeProductOption(
                15,
                list
            );

            expect( option ).not.toBeUndefined();
            expect( option?.value ).toStrictEqual(20);
            expect( option?.products ).toStrictEqual(['a']);

        });

        it('can find best matching product option from multiple options (first)', () => {

            let list = [
                createCompositeProductOption(20, ['a']),
                createCompositeProductOption(10, ['b']),
                createCompositeProductOption(10, ['c']),
                createCompositeProductOption(5, ['d']),
                createCompositeProductOption(30, ['e'])
            ];

            const option : CompositeProductOption | undefined = ProductUtils.getBestMatchingNumericCompositeProductOption(
                10,
                list
            );

            expect( option ).not.toBeUndefined();
            expect( option?.value ).toStrictEqual(10);
            expect( option?.products ).toStrictEqual(['b']);

        });

        it('can returns undefined if no match can be found', () => {

            let list = [
                createCompositeProductOption(20, ['a']),
                createCompositeProductOption(10, ['b']),
                createCompositeProductOption(10, ['c']),
                createCompositeProductOption(5, ['d']),
                createCompositeProductOption(30, ['e'])
            ];

            const option : CompositeProductOption | undefined = ProductUtils.getBestMatchingNumericCompositeProductOption(
                100,
                list
            );

            expect( option ).toBeUndefined();

        });

    });

});
