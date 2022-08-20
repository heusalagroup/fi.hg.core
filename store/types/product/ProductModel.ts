// Copyright (c) 2021-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { hasNoOtherKeys, isNumber, isRegularObject, isString, isStringOrUndefined } from "../../../modules/lodash";

export interface SelectProductModelCallback {
  (item: ProductModel): void;
}

export interface ProductModel {
  readonly icon        : any;
  readonly title       : string;
  readonly description : string;
  readonly price       : number;
  readonly route      ?: string;
}

export function isProductModel (value: any): value is ProductModel {
  return (
      isRegularObject(value)
      && hasNoOtherKeys(value, [

        'title',
        'description',
        'icon',
        'price'

      ])
  );
}

export function isPartialProductModel (value: any): value is Partial<ProductModel> {
  return (
      isRegularObject(value)
      && hasNoOtherKeys(value, [
        'icon',
        'title',
        'description',
        'price',
        'route'
      ])
      && isString(value?.title)
      && isString(value?.description)
      && isNumber(value?.price)
      && isStringOrUndefined(value?.route)
  );
}

export function stringifyProductModel (value: ProductModel): string {
  return `ProductModel(${value})`;
}

export function parseProductModel (value: any): ProductModel | undefined {
  if ( isProductModel(value) ) return value;
  return undefined;
}


