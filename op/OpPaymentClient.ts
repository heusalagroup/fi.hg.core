// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpPaymentRequestDTO } from "./dto/OpPaymentRequestDTO";
import { OpPaymentResponseDTO } from "./dto/OpPaymentResponseDTO";

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
