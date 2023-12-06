// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { TranslationUtils } from "./TranslationUtils";
import { Language } from "./types/Language";
import { TranslationResourceObject } from "./types/TranslationResourceObject";

describe('TranslationUtils', () => {

    describe('getConfig', () => {
        it('should return i18n compatible configuration', () => {
            const resources : TranslationResourceObject = {
                en: {
                    'en.foo.bar': 'En Foo Bar'
                },
                fi: {
                    'fi.foo.bar': 'Fi Foo Bar'
                }
            };
            const expectedResult = {
                en: {
                    translation: {
                        'en.foo.bar': 'En Foo Bar'
                    }
                },
                fi: {
                    translation: {
                        'fi.foo.bar': 'Fi Foo Bar'
                    }
                }
            };
            const result = TranslationUtils.getConfig(resources);
            expect(result).toEqual(expectedResult);
        });
    });

    describe('getLanguageStringForI18n', () => {
        it('should return i18n compatible language string', () => {
            expect(TranslationUtils.getLanguageStringForI18n(Language.ENGLISH)).toEqual('en');
            expect(TranslationUtils.getLanguageStringForI18n(Language.FINNISH)).toEqual('fi');
        });

        it('should return undefined for unsupported language', () => {
            // @ts-ignore
            expect(TranslationUtils.getLanguageStringForI18n('unsupported_language')).toEqual(undefined);
        });
    });

    describe('translateKeys', () => {
        it('should translate keys', () => {
            const t = jest.fn<any>().mockImplementation((key: any, params: any) : string => `${key}:${params.key}`);
            const keys = ['key1', 'key2'];
            const translationParams = { key: 'value' };
            const expectedResult = { key1: 'key1:value', key2: 'key2:value' };
            const result = TranslationUtils.translateKeys(t, keys, translationParams);
            expect(t).toHaveBeenCalledTimes(keys.length);
            expect(result).toEqual(expectedResult);
        });
    });

});
