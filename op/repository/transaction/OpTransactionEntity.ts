// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogService } from "../../../LogService";
import { Table } from "../../../data/Table";
import { Entity } from "../../../data/Entity";
import { parseInteger } from "../../../types/Number";
import { createOpTransactionDTO, explainOpTransactionDTO, isOpTransactionDTO, OpTransactionDTO } from "../../dto/OpTransactionDTO";
import { Id } from "../../../data/Id";
import { Column } from "../../../data/Column";
import { UpdateTimestamp } from "../../../data/UpdateTimestamp";
import { CreationTimestamp } from "../../../data/CreationTimestamp";
import { Temporal } from "../../../data/Temporal";
import { TemporalType } from "../../../data/types/TemporalType";

const LOG = LogService.createLogger('OpTransactionEntity');

@Table("op_transaction")
export class OpTransactionEntity extends Entity {

    // The constructor
    public constructor ();
    public constructor (dto : OpTransactionDTO & {opAccountId: string, opSurrogateId: string});

    public constructor (dto ?: OpTransactionDTO & {opAccountId: string, opSurrogateId: string}) {
        super();
        this.opAccountId                = dto?.opAccountId;
        this.opSurrogateId              = dto?.opSurrogateId;
        this.amount                     = dto?.amount;
        this.balanceBefore              = dto?.balanceBefore;
        this.balanceAfter               = dto?.balanceAfter;
        this.message                    = dto?.message;
        this.currency                   = dto?.currency;
        this.objectId                   = dto?.objectId;
        this.archiveId                  = dto?.archiveId;
        this.debtorBic                  = dto?.debtorBic;
        this.reference                  = dto?.reference;
        this.rfReference                = dto?.rfReference;
        this.valueDate                  = dto?.valueDate;
        this.debtorName                 = dto?.debtorName;
        this.bookingDate                = dto?.bookingDate;
        this.creditorBic                = dto?.creditorBic;
        this.paymentDate                = dto?.paymentDate;
        this.creditorName               = dto?.creditorName;
        this.debtorAccount              = dto?.debtorAccount;
        this.creditorAccount            = dto?.creditorAccount;
        this.endToEndId                 = dto?.endToEndId;
        this.timestamp                  = `${dto?.timestamp}`;
        this.transactionTypeCode        = dto?.transactionTypeCode;
        this.transactionTypeDescription = dto?.transactionTypeDescription;
        this.uetr                       = dto?.uetr;
    }

    @Id()
    @Column("op_transaction_id", 'BIGINT', { updatable : false, insertable: false })
    public opTransactionId?: string;

    @Column("op_account_id", 'BIGINT')
    public opAccountId?: string;

    @Column("op_surrogate_id")
    public opSurrogateId?: string;

    @UpdateTimestamp()
    @Temporal(TemporalType.TIMESTAMP)
    @Column("updated", 'DATETIME', { updatable : false, insertable: false })
    public updated?: string;

    @CreationTimestamp()
    @Temporal(TemporalType.TIMESTAMP)
    @Column("created", 'DATETIME', { updatable : false, insertable: false })
    public created?: string;

    @Column("amount")
    public amount ?: string;

    @Column("balance_before")
    public balanceBefore ?: string;

    @Column("balance_after")
    public balanceAfter ?: string;

    @Column("message")
    public message ?: string | null;

    @Column("currency")
    public currency ?: string | null;

    @Column("object_id")
    public objectId ?: string;

    @Column("archive_id")
    public archiveId ?: string;

    @Column("debtor_bic")
    public debtorBic ?: string;

    @Column("reference")
    public reference ?: string | null;

    @Column("rf_reference")
    public rfReference ?: string | null;

    @Column("value_date", 'DATETIME')
    public valueDate ?: string;

    @Column("debtor_name")
    public debtorName ?: string;

    @Column("booking_date", 'DATETIME')
    public bookingDate ?: string;

    @Column("creditor_bic")
    public creditorBic ? : string | null;

    @Column("payment_date", 'DATETIME')
    public paymentDate ?: string;

    @Column("creditor_name")
    public creditorName ?: string;

    @Column("debtor_account")
    public debtorAccount ?: string;

    @Column("creditor_account")
    public creditorAccount ?: string | null;

    @Column("end_to_end_id")
    public endToEndId ?: string | null;

    @Column("timestamp", 'BIGINT')
    public timestamp ?: string;

    @Column("transaction_type_code")
    public transactionTypeCode ?: string;

    @Column("transaction_type_description")
    public transactionTypeDescription ?: string;

    @Column("uetr")
    public uetr ?: string;

    public static toDTO (entity: OpTransactionEntity) : OpTransactionDTO {
        if (!entity.amount) throw new TypeError('entity.amount missing');
        if (!entity.balanceBefore) throw new TypeError('entity.balanceBefore missing');
        if (!entity.balanceAfter) throw new TypeError('entity.balanceAfter missing');
        if (!entity.objectId) throw new TypeError('entity.objectId missing');
        if (!entity.archiveId) throw new TypeError('entity.archiveId missing');
        if (!entity.debtorBic) throw new TypeError('entity.debtorBic missing');
        if (!entity.valueDate) throw new TypeError('entity.valueDate missing');
        if (!entity.debtorName) throw new TypeError('entity.debtorName missing');
        if (!entity.bookingDate) throw new TypeError('entity.bookingDate missing');
        if (!entity.paymentDate) throw new TypeError('entity.paymentDate missing');
        if (!entity.creditorName) throw new TypeError('entity.creditorName missing');
        if (!entity.debtorAccount) throw new TypeError('entity.debtorAccount missing');
        if (!entity.timestamp) throw new TypeError('entity.timestamp missing');
        if (!entity.transactionTypeCode) throw new TypeError('entity.transactionTypeCode missing');
        if (!entity.transactionTypeDescription) throw new TypeError('entity.transactionTypeDescription missing');
        if (!entity.uetr) throw new TypeError('entity.uetr missing');
        const timestamp = parseInteger(entity.timestamp);
        if (!timestamp) throw new TypeError('timestamp invalid: '+ entity.timestamp);
        const dto : OpTransactionDTO = createOpTransactionDTO(
            entity.amount,
            entity.balanceBefore,
            entity.balanceAfter,
            entity.message ?? null,
            entity.currency ?? null,
            entity.objectId,
            entity.archiveId,
            entity.debtorBic,
            entity.reference ?? null,
            entity.rfReference ?? null,
            entity.valueDate,
            entity.debtorName,
            entity.bookingDate,
            entity.creditorBic ?? null,
            entity.paymentDate,
            entity.creditorName,
            entity.debtorAccount,
            entity.creditorAccount ?? null,
            entity.endToEndId ?? null,
            timestamp,
            entity.transactionTypeCode,
            entity.transactionTypeDescription,
            entity.uetr,
        );
        // Redundant fail safe
        if (!isOpTransactionDTO(dto)) {
            LOG.debug(`toDTO: dto / entity = `, dto, entity);
            throw new TypeError(`Failed to create valid OpTransactionDTO: ${explainOpTransactionDTO(dto)}`);
        }
        return dto;
    }

}
