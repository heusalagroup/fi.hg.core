// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

/**
 * Generates cryptographic signature of the request. Some APIs require this
 * type of signature for extra security to prevent SSL attacks.
 */
export interface RequestSigner {

    /**
     * Generates cryptographic signature of the request. Some APIs require this
     * type of signature for extra security to prevent SSL attacks.
     *
     * @param bodyString The request body
     */
    (
        bodyString : string
    ) : string;

}
