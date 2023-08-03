// Copyright (c) 2022-2023. Heusala Group <info@hg.fi>. All rights reserved.
// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

export enum Language {
    FINNISH = "fi",
    ENGLISH = "en"
}

export function isLanguage (value: any): value is Language {
    switch (value) {
        case Language.FINNISH:
        case Language.ENGLISH:
            return true;

        default:
            return false;
    }
}

export function stringifyLanguage (value: Language): string {
    switch (value) {
        case Language.FINNISH : return 'fi';
        case Language.ENGLISH : return 'en';
    }
    throw new TypeError(`Unsupported Language value: ${value}`);
}

export function parseLanguage (value: any): Language | undefined {
    switch (`${value}`.toUpperCase()) {

        case 'FI' :
        case 'FINNISH' :
            return Language.FINNISH;

        case 'EN' :
        case 'ENGLISH' :
            return Language.ENGLISH;

        default    :
            return undefined;
    }
}
