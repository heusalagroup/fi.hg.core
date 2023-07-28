// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpTransactionEntity } from "./OpTransactionEntity";
import { Repository } from "../../../data/types/Repository";
import { Sort } from "../../../data/Sort";

export interface OpTransactionRepository extends Repository<OpTransactionEntity, string> {

    findByOpSurrogateId (surrogateId: string, sort?: Sort) : Promise<OpTransactionEntity|undefined>;

    findAllByOpAccountId (opAccountId: string, sort?: Sort) : Promise<OpTransactionEntity[]>;
    findAllByOpSurrogateId (surrogateId: string, sort?: Sort) : Promise<OpTransactionEntity[]>;
    findAllByOpAccountId (opAccountId: string, sort?: Sort) : Promise<OpTransactionEntity[]>;
    findAllByArchiveId (archiveId: string, sort?: Sort) : Promise<OpTransactionEntity[]>;
    findAllByObjectId (objectId: string, sort?: Sort) : Promise<OpTransactionEntity[]>;
    findAllByDebtorBic (debtorBic: string, sort?: Sort) : Promise<OpTransactionEntity[]>;
    findAllByDebtorName (debtorName: string, sort?: Sort) : Promise<OpTransactionEntity[]>;
    findAllByValueDate (valueDate: string, sort?: Sort) : Promise<OpTransactionEntity[]>;
    findAllByBookingDate (bookingDate: string, sort?: Sort) : Promise<OpTransactionEntity[]>;
    findAllByCreditorBic (creditorBic: string, sort?: Sort) : Promise<OpTransactionEntity[]>;
    findAllByCreditorName (creditorName: string, sort?: Sort) : Promise<OpTransactionEntity[]>;
    findAllByPaymentDate (paymentDate: string, sort?: Sort) : Promise<OpTransactionEntity[]>;
    findAllByDebtorAccount (debtorAccount: string, sort?: Sort) : Promise<OpTransactionEntity[]>;
    findAllByCreditorAccount (creditorAccount: string, sort?: Sort) : Promise<OpTransactionEntity[]>;
    findAllByMessage (message: string, sort?: Sort) : Promise<OpTransactionEntity[]>;
    findAllByReference (reference: string, sort?: Sort) : Promise<OpTransactionEntity[]>;
    findAllByRfReference (rfReference: string, sort?: Sort) : Promise<OpTransactionEntity[]>;
    findAllByEndToEndId (endToEndId: string, sort?: Sort) : Promise<OpTransactionEntity[]>;
}
