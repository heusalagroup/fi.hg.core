// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpAccountListDTO } from "./dto/OpAccountListDTO";
import { OpAccountDetailsDTO } from "./dto/OpAccountDetailsDTO";
import { OpTransactionListDTO } from "./dto/OpTransactionListDTO";

/**
 * OP Corporate AccountData API client
 * @see https://op-developer.fi/products/banking/docs/op-corporate-account-data-api
 */
export interface OpAccountDataClient {

    /**
     * Returns list of accounts and balances.
     *
     * @see https://op-developer.fi/products/banking/docs/op-corporate-account-data-api#operation/accounts
     */
    getAccountList (): Promise<OpAccountListDTO>;

    /**
     * Returns account details for single account.
     *
     * @param surrogateId Account surrogateId. You can get this value by using .getAccountList() call.     * @see https://op-developer.fi/products/banking/docs/op-corporate-account-data-api#operation/account
     */
    getAccountDetails (
        surrogateId: string
    ) : Promise<OpAccountDetailsDTO>;

    /**
     * Returns account transactions.
     *
     * @param surrogateId Account surrogateId. You can get this value by using .getAccountList() call.
     * @param fromTimestamp Note, this is microseconds! When looking into future items, subtract by one if you want to include any record with the same timestamp value.
     * @param maxPast
     * @param maxFuture
     * @see https://op-developer.fi/products/banking/docs/op-corporate-account-data-api#operation/transactionsV2
     * @see DateUtils.getMicroSeconds()
     */
    getTransactionListFromTimestamp (
        surrogateId: string,
        fromTimestamp : number,
        maxPast ?: number,
        maxFuture ?: number,
    ) : Promise<OpTransactionListDTO>;

    /**
     * Returns account transactions using object Id.
     *
     * @param surrogateId Account surrogateId. You can get this value by using .getAccountList() call.
     * @param objectId
     * @param maxPast
     * @param maxFuture
     * @see https://op-developer.fi/products/banking/docs/op-corporate-account-data-api#operation/transactionsV2
     */
    getTransactionListFromObjectId (
        surrogateId: string,
        objectId : string,
        maxPast ?: number,
        maxFuture ?: number,
    ) : Promise<OpTransactionListDTO>;

    /**
     * Returns account transactions between two timestamps.
     *
     * @param surrogateId Account surrogateId. You can get this value by using .getAccountList() call.
     * @param fromTimestamp Note, this is microseconds! Use something like `Date.now()*1000`. Any timestamp equal or greater than this value will be included in the set.
     * @param toTimestamp Note, this is microseconds! Use something like `Date.now()*1000`. Any timestamp equal or less than this value will be included in the set.
     * @param bufferSize How many items to request with single request.
     * @see https://op-developer.fi/products/banking/docs/op-corporate-account-data-api#operation/transactionsV2
     */
    getTransactionListFromTimestampRange (
        surrogateId    : string,
        fromTimestamp  : number,
        toTimestamp  : number,
        bufferSize     : number,
    ) : Promise<OpTransactionListDTO>;

}
