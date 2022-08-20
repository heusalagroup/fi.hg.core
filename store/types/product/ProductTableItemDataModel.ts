// Copyright (c) 2021. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export interface ProductTableItemDataModel {
    readonly id: number;
    readonly mainTitle: string;
    readonly title: readonly string[];
    readonly product: readonly any[];
}
