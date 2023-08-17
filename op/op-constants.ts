// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export const OP_PRODUCTION_URL = 'https://corporate-api.apiauth.services.op.fi';
export const OP_SANDBOX_URL = 'https://sandbox-api.apiauth.aws.op-palvelut.net';

export const OP_CREATE_SEPA_PAYMENT_PATH = "/corporate-payment/v1/sepa-payment";
export const OP_CREATE_SEPA_INSTANT_PAYMENT_PATH = "/corporate-payment/v1/sepa-instant-payment";
export const OP_SEPA_INSTANT_PAYMENT_STATUS_PATH = (instructionId: string) => `/corporate-payment/v1/sepa-instant-payment/${q(instructionId)}`

export const OP_CREATE_SEPA_REFUND_PATH = "/corporate-payment/v2/payment-refund";

export const OP_ACCOUNT_DATA_GET_ACCOUNT_LIST_PATH = `/corporate-account-data/v1/accounts`
export const OP_ACCOUNT_DATA_GET_ACCOUNT_DETAILS_PATH = (surrogateId: string) => `/corporate-account-data/v1/accounts/${q(surrogateId)}`
export const OP_ACCOUNT_DATA_GET_TRANSACTION_LIST_PATH = (surrogateId: string) => `/corporate-account-data/v2/accounts/${q(surrogateId)}/transactions`

function q (value: string) : string {
    return encodeURIComponent(value);
}
