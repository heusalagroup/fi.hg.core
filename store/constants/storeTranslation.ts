// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ProductFeatureCategory } from "../types/product/features/ProductFeatureCategory";
import { ProductFeatureId } from "../types/product/features/ProductFeatureId";
import { ProductPriceType } from "../types/product/ProductPriceType";
import { DiskType } from "../types/product/features/DiskType";
import { ProductType } from "../types/product/ProductType";
import { SiType } from "../../types/SiType";
import { ProductPrice } from "../types/product/ProductPrice";
import { InventoryState } from "../types/inventory/InventoryState";
import { NetworkType } from "../types/product/features/NetworkType";
import { RaidType } from "../types/product/features/RaidType";
import { NetworkIpType } from "../types/product/features/NetworkIpType";
import { NetworkZone } from "../types/product/features/NetworkZone";
import { VirtualizationType } from "../types/product/features/VirtualizationType";
import { OperatingSystem } from "../types/product/features/OperatingSystem";

export function getProductFeatureCategoryTitleTranslationToken (categoryId: ProductFeatureCategory) {
    return `productFeatureCategory.${categoryId}`;
}

export function getProductFeatureTitleTranslationToken (featureId: ProductFeatureId) {
    return `productFeatureId.${featureId}`;
}

export function getPriceTypeTranslationToken (priceType: ProductPriceType) {
    return `priceType.${priceType}`;
}

export function getDiskTypeFeatureTranslation (diskType: DiskType): string {
    return `diskType.${diskType}`;
}

export function getBackupFeatureTranslation (diskType: DiskType): string {
    return `backupType.${diskType}`;
}

export function getSelectPriceTypeTextForPriceType (type: ProductPriceType): string {
    return `product.selectPriceType.${type}`;
}

export function getProductTypeTranslationKey (type: ProductType): string {
    return `product.type.${type}`;
}

export function getCommonShortSi (type: SiType): string {
    return `common.si.${type}.short`;
}

export function getSelectPriceTypeTextForPrice (item: ProductPrice): string {
    return getSelectPriceTypeTextForPriceType(item.type);
}

export function getInventoryStateTranslationKey (type: InventoryState | undefined): string {
    return `inventoryItem.state.${type}`;
}

export const T_COMMON_TRAFFIC_MONTHLY = "common.traffic.monthly";
export const T_COMMON_BYTE_SHORT = "common.byte.short";
export const T_COMMON_PIECE = "common.piece";

export function getNetworkTypeFeatureTranslation (networkType: NetworkType): string {
    return `networkType.${networkType}`;
}

export function getNetworkZoneFeatureTranslation (networkZone: NetworkZone): string {
    return `networkZone.${networkZone}`;
}

export function getNetworkIpTypeFeatureTranslation (networkIpType: NetworkIpType): string {
    return `networkIpType.${networkIpType}`;
}

export function getVirtualizationTypeFeatureTranslation (value: VirtualizationType): string {
    return `virtualizationType.${value}`;
}

export function getOperatingSystemFeatureTranslation (value: OperatingSystem): string {
    return `operatingSystem.${value}`;
}

export function getDiskRaidTypeFeatureTranslation (raidType: RaidType): string {
    return `raidType.${raidType}`;
}
