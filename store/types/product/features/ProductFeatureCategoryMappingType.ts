// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ProductFeatureId } from "./ProductFeatureId";

export interface ProductFeatureCategoryMappingType {
    [key: string]: ProductFeatureId[];
}
