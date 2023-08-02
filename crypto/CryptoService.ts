// Copyright (c) 2021-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export interface CryptoService {

    /**
     * Creates random string containing numbers between 0 and 9.
     *
     * Eg. `size=2` gives values between 0 and 99.
     * Eg. `size=4` gives values between 0 and 9999.
     *
     * @param size
     */
    createRandomInteger (
        size: number
    ) : number;

    /**
     * Creates random string containing numbers between 0 and 9.
     *
     * Eg. `size=2` gives values between "00" and "99".
     * Eg. `size=4` gives values between "0000" and "9999".
     *
     * @param size
     */
    createRandomIntegerString (
        size: number
    ) : string;

}
