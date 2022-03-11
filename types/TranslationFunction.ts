// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { TranslationParams } from "./TranslationParams";

export interface TranslationFunction {
    (key: string, translationParams ?: TranslationParams) : string;
}
