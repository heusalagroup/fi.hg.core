// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ProductTableItemDataModel } from "../types/product/ProductTableItemDataModel";
import { filter, find, has, map, reduce, uniq } from "../../modules/lodash";
import { ProductFeatureCategory } from "../types/product/features/ProductFeatureCategory";
import { ProductFeatureId } from "../types/product/features/ProductFeatureId";
import { Product } from "../types/product/Product";
import { ProductTableItemModel } from "../types/product/ProductTableItemModel";
import { ProductPriceType } from "../types/product/ProductPriceType";
import { ProductPrice } from "../types/product/ProductPrice";
import { ProductFeatureCategoryMappingType } from "../types/product/features/ProductFeatureCategoryMappingType";
import { getProductFeatureCategoryTitleTranslationToken, getProductFeatureTitleTranslationToken } from "../constants/storeTranslation";
import { LogService } from "../../LogService";

const LOG = LogService.createLogger('ProductUtils');

export class ProductUtils {

    public static createProductTableItemsList (
        title: string,
        description : string,
        selectedPriceType : ProductPriceType,
        productList: Product[]
    ) : ProductTableItemModel[] {
        return [
            {
                id: 0,
                title: title,
                description: description,
                gb: 0,
                buttonTo: undefined,
                price: 0,
                priceType: selectedPriceType,
                priceVatPercent: 0.24,
                priceTypeOptions: [selectedPriceType],
                isButton: false,
                priceModel: undefined,
                productModel: undefined
            },
            ...map(
                filter(productList, (p) : boolean => {
                    return map(p?.prices ?? [], pp => pp?.type).includes(selectedPriceType);
                }),
                (item: Product, index: number): ProductTableItemModel => {
                    const price : ProductPrice | undefined = find(item?.prices, pp => pp?.type === selectedPriceType);
                    if (!price) throw new TypeError(`Price was not found for ${selectedPriceType}. This should not happen.`);
                    return {
                        id: index + 1,
                        title: item.title,
                        description: item.summary,
                        buttonTo: price.buyUrl,
                        gb: 0,
                        price: price.sum,
                        priceType: price.type,
                        priceVatPercent: price.vatPercent,
                        priceTypeOptions: map(item.prices, pp => pp.type),
                        isButton: true,
                        priceModel: price,
                        productModel: item
                    }
                }
            )
        ];
    }

    public static createProductTableItemDataModelList (
        categoryList : ProductFeatureCategory[],
        featureIdMap : ProductFeatureCategoryMappingType,
        productList  : Product[]
    ) : ProductTableItemDataModel[] {
        return map(
            categoryList,
            (categoryId: ProductFeatureCategory, index: number) : ProductTableItemDataModel => {
                const featureIdList : ProductFeatureId[] = has(featureIdMap, categoryId) ? featureIdMap[categoryId] : [];
                return {
                    id: index,
                    mainTitle: getProductFeatureCategoryTitleTranslationToken(categoryId),
                    title: map(featureIdList, (id: ProductFeatureId) => getProductFeatureTitleTranslationToken(id)),
                    product: map(
                        productList,
                        (item: Product) : readonly any[] => {
                            return map(featureIdList, (featureId: ProductFeatureId) => {
                                return find(item.features, f => f?.id === featureId) ?? '';
                            });
                        }
                    )
                };
            }
        );
    }

    public static createUniquePriceTypeList (
        list: readonly ProductTableItemModel[]
    ) : ProductPriceType[] {
        return reduce(
            list,
            (a: ProductPriceType[], item: ProductTableItemModel) => uniq([ ...a, ...item.priceTypeOptions ]),
            []
        );
    }

    /**
     * This will calculate the best product combination from provided
     * preferred options.
     *
     * @param model
     * @param options
     */
    public static calculateCompositeProductFromOptions (
        model   : Product,
        options : {readonly [key: string]: string|number}
    ) : Product {

        // Check if this is a composite product
        if (!model?.composite) {
            LOG.warn(`Warning! This model doesn't seem to be a composite product. Passing the product on without changes.`);
            return model;
        }



        return model;
    }

}
