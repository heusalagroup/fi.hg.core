// Copyright (c) 2021-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Language } from "../types/Language";
import { ReadonlyJsonObject } from "../Json";
import { TranslationResourceObject } from "../types/TranslationResourceObject";
import { TranslatedObject } from "../types/TranslatedObject";
import { LogLevel } from "../types/LogLevel";
import { TranslationFunction } from "../types/TranslationFunction";

export interface TranslationService {

    setLogLevel (level: LogLevel) : void;

    initialize (
        defaultLanguage : Language,
        resources       : TranslationResourceObject
    ) : Promise<void>;

    translateKeys (
        lang              : Language,
        keys              : string[],
        translationParams : ReadonlyJsonObject
    ): Promise<TranslatedObject>;

    translateJob<T> (
        lang     : Language,
        callback : ((t: TranslationFunction) => T)
    ) : Promise<T>;

}
