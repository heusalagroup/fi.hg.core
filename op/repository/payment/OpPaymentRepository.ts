// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpPaymentEntity } from "./OpPaymentEntity";
import { Repository } from "../../../data/types/Repository";
import { OpPaymentStatus } from "../../types/OpPaymentStatus";

export interface OpPaymentRepository extends Repository<OpPaymentEntity, string> {
    findAllByOpAccountId (opAccountId: string) : Promise<OpPaymentEntity[]>;
    findAllByRInstructionId (reference: string) : Promise<OpPaymentEntity[]>;
    findAllByRReference (reference: string) : Promise<OpPaymentEntity[]>;
    findAllByReference (reference: string) : Promise<OpPaymentEntity[]>;
    findAllByREndToEndId (endToEndId: string) : Promise<OpPaymentEntity[]>;
    findAllByEndToEndId (endToEndId: string) : Promise<OpPaymentEntity[]>;
    findAllByStatus (status: OpPaymentStatus) : Promise<OpPaymentEntity[]>;
    findAllByArchiveId (archiveId: string) : Promise<OpPaymentEntity[]>;
    findAllByArchiveId (archiveId: string) : Promise<OpPaymentEntity[]>;
    findAllByDebtorIban (debtorIban: string) : Promise<OpPaymentEntity[]>;
    findAllByTransactionId (transactionId: string) : Promise<OpPaymentEntity[]>;
}
