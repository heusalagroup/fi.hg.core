// Copyright (c) 2021. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { reduce } from "./functions/reduce";
import { ReadonlyJsonObject } from "./Json";
import { Language } from "./types/Language";
import { TranslationResourceObject } from "./types/TranslationResourceObject";
import { TranslatedObject } from "./types/TranslatedObject";
import { TranslationFunction } from "./types/TranslationFunction";
import { I18NextResource } from "./types/I18NextResource";
import { keys } from "./functions/keys";

export class TranslationUtils {

    public static getConfig (
        resources : TranslationResourceObject
    ) : I18NextResource {
        return reduce(
            keys(resources) as Language[],
            (prev : I18NextResource, key: Language) : I18NextResource => {
                return {
                    ...prev,
                    [key]: { translation: resources[key]}
                };
            },
            {}
        );
    }

    /**
     * Returns the language as i18n compatible language string.
     *
     * @param lang
     */
    public static getLanguageStringForI18n (lang : Language) : string | undefined {
        switch (lang) {
            case Language.FINNISH: return 'fi';
            case Language.ENGLISH: return 'en';
        }
        return undefined;
    }

    public static translateKeys (
        t: TranslationFunction,
        keys: string[],
        translationParams: ReadonlyJsonObject
    ): TranslatedObject {
        return reduce(
            keys,
            (result: TranslatedObject, key: string): TranslatedObject => {
                result[key] = t(key, translationParams);
                return result;
            },
            {} as TranslatedObject
        );
    }

}
