// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpTransactionEntity } from "./OpTransactionEntity";
import { Repository } from "../../../data/types/Repository";

export interface OpTransactionRepository extends Repository<OpTransactionEntity, string> {
    findAllByOpAccountId (opAccountId: string) : Promise<OpTransactionEntity[]>;
    findAllByOpSurrogateId (surrogateId: string) : Promise<OpTransactionEntity[]>;
    findAllByOpAccountId (opAccountId: string) : Promise<OpTransactionEntity[]>;
    findAllByArchiveId (archiveId: string) : Promise<OpTransactionEntity[]>;
    findAllByObjectId (objectId: string) : Promise<OpTransactionEntity[]>;
    findAllByDebtorBic (debtorBic: string) : Promise<OpTransactionEntity[]>;
    findAllByDebtorName (debtorName: string) : Promise<OpTransactionEntity[]>;
    findAllByValueDate (valueDate: string) : Promise<OpTransactionEntity[]>;
    findAllByBookingDate (bookingDate: string) : Promise<OpTransactionEntity[]>;
    findAllByCreditorBic (creditorBic: string) : Promise<OpTransactionEntity[]>;
    findAllByCreditorName (creditorName: string) : Promise<OpTransactionEntity[]>;
    findAllByPaymentDate (paymentDate: string) : Promise<OpTransactionEntity[]>;
    findAllByDebtorAccount (debtorAccount: string) : Promise<OpTransactionEntity[]>;
    findAllByCreditorAccount (creditorAccount: string) : Promise<OpTransactionEntity[]>;
    findAllByMessage (message: string) : Promise<OpTransactionEntity[]>;
    findAllByReference (reference: string) : Promise<OpTransactionEntity[]>;
    findAllByRfReference (rfReference: string) : Promise<OpTransactionEntity[]>;
    findAllByEndToEndId (endToEndId: string) : Promise<OpTransactionEntity[]>;
}
