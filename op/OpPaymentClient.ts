// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpPaymentRequestDTO } from "./types/OpPaymentRequestDTO";
import { OpPaymentResponseDTO } from "./types/OpPaymentResponseDTO";

/**
 * OP Corporate Payment API client
 * @see https://op-developer.fi/products/banking/docs/op-corporate-payment-api#section/Usage-example
 */
export interface OpPaymentClient {

    /**
     * Initiates payment processing
     *
     * @param paymentRequest The sandbox-signing.key
     */
    createPayment (
        paymentRequest: OpPaymentRequestDTO,
    ): Promise<OpPaymentResponseDTO>;

}
