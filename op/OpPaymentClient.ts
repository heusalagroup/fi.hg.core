// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpPaymentRequestDTO } from "./dto/OpPaymentRequestDTO";
import { OpPaymentResponseDTO } from "./dto/OpPaymentResponseDTO";
import { OpPaymentListDTO } from "./dto/OpPaymentListDTO";

/**
 * OP Corporate Payment API client
 * @see https://op-developer.fi/products/banking/docs/op-corporate-payment-api#section/Usage-example
 */
export interface OpPaymentClient {

    /**
     * Initiates payment processing
     *
     * @param paymentRequest The sandbox-signing.key
     * @see https://op-developer.fi/products/banking/docs/op-corporate-payment-api#operation/payment
     */
    createPayment (
        paymentRequest: OpPaymentRequestDTO,
    ): Promise<OpPaymentResponseDTO>;

    /**
     * Initiates instant payment processing
     *
     * @param paymentRequest The sandbox-signing.key
     * @see https://op-developer.fi/products/banking/docs/op-corporate-payment-api#operation/instantPayment
     */
    createInstantPayment (
        paymentRequest: OpPaymentRequestDTO,
    ): Promise<OpPaymentResponseDTO>;

    /**
     * Get the status of an initiated SEPA Instant payment. Should be only used
     * to query payments that ended up with paymentType=SCT_INST and
     * status=PROCESSING. For other payment type and status combinations, the
     * result list may be empty.
     *
     * @param instructionId instructionId used when the payment was initiated
     * @see https://op-developer.fi/products/banking/docs/op-corporate-payment-api#operation/instantPaymentStatus
     */
    getInstantPaymentStatus (
        instructionId: string
    ): Promise<OpPaymentListDTO>;

}
