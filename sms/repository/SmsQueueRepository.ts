// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Sort } from "../../data/Sort";
import { Repository } from "../../data/types/Repository";
import { SmsQueueEntity } from "./SmsQueueEntity";

export interface SmsQueueRepository extends Repository<SmsQueueEntity, string> {
    findAllByClientId (clientId: string, sort?: Sort) : Promise<SmsQueueEntity[]>;
    findAllByInvoiceId (invoiceId: string, sort?: Sort) : Promise<SmsQueueEntity[]>;
    findAllBySenderAddress (from: string, sort?: Sort) : Promise<SmsQueueEntity[]>;
    findAllByTargetAddress (to: string, sort?: Sort) : Promise<SmsQueueEntity[]>;
    findAllBySent (sent: boolean, sort?: Sort) : Promise<SmsQueueEntity[]>;
    findAllByFailed (failed: boolean, sort?: Sort) : Promise<SmsQueueEntity[]>;
    findAllByIsTerminated (isTerminated: boolean, sort?: Sort) : Promise<SmsQueueEntity[]>;
}
