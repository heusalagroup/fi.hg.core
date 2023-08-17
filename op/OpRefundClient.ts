// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpRefundRequestDTO } from "./dto/OpRefundRequestDTO";
import { OpRefundResponseDTO } from "./dto/OpRefundResponseDTO";

/**
 * Interface for the OpRefundClient, which defines functionalities related to the refund payment process.
 */
export interface OpRefundClient {

    /**
     * Initiates a refund process based on the provided refund payment request data.
     *
     * @param {OpRefundRequestDTO} paymentRequest - The refund payment request data.
     * @returns {Promise<OpRefundResponseDTO>} - Returns a promise which resolves to the refund payment response data.
     *
     * @example
     * const refundClient = getRefundClient(); // Assuming this function provides an instance of OpRefundClient.
     * const request: OpRefundRequestDTO = {
     *   // ... refund request data
     * };
     *
     * refundClient.refundPayment(request)
     *   .then(response => {
     *     console.log(response);
     *   })
     *   .catch(error => {
     *     console.error(error);
     *   });
     *
     * @throws Will throw an error if the refund process fails.
     */
    refundPayment (
        paymentRequest: OpRefundRequestDTO,
    ): Promise<OpRefundResponseDTO>;

}
