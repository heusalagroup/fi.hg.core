// Copyright (c) 2022-2023. Heusala Group <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

export enum AuthSmsQueryParam {

    /**
     * Query key: `l`
     */
    LANGUAGE      = "l"

}

export function isAuthSmsQueryParam (value: any): value is AuthSmsQueryParam {
    switch (value) {
        case AuthSmsQueryParam.LANGUAGE:
            return true;

        default:
            return false;

    }
}

export function stringifyAuthSmsQueryParam (value: AuthSmsQueryParam): string {
    switch (value) {
        case AuthSmsQueryParam.LANGUAGE      : return 'LANGUAGE';
    }
    throw new TypeError(`Unsupported AuthSmsQueryParam value: ${value}`);
}

export function parseAuthSmsQueryParam (value: any): AuthSmsQueryParam | undefined {

    switch (`${value}`.toUpperCase()) {

        case 'L'       :
        case 'LANGUAGE':
            return AuthSmsQueryParam.LANGUAGE;

        default    :
            return undefined;

    }

}
