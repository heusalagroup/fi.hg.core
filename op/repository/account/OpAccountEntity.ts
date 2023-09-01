// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogService } from "../../../LogService";
import { Table } from "../../../data/Table";
import { Entity } from "../../../data/Entity";
import type { OpAccountDTO } from "../../dto/OpAccountDTO";
import { createOpAccountDTO, explainOpAccountDTO, isOpAccountDTO } from "../../dto/OpAccountDTO";
import { Id } from "../../../data/Id";
import { Column } from "../../../data/Column";
import { ReadonlyJsonObject } from "../../../Json";
import { Temporal } from "../../../data/Temporal";
import { TemporalType } from "../../../data/types/TemporalType";
import { UpdateTimestamp } from "../../../data/UpdateTimestamp";
import { CreationTimestamp } from "../../../data/CreationTimestamp";
import { createOpAccountDetailsDTO, explainOpAccountDetailsDTO, isOpAccountDetailsDTO, OpAccountDetailsDTO } from "../../dto/OpAccountDetailsDTO";

const LOG = LogService.createLogger('OpAccountEntity');

@Table("op_account")
export class OpAccountEntity extends Entity {

    // The constructor

    public constructor ();
    public constructor (dto : OpAccountDTO & {details ?: OpAccountDetailsDTO});

    public constructor (dto ?: OpAccountDTO & {details ?: OpAccountDetailsDTO}) {

        super();

        this.bic             = dto?.bic             ?? '';
        this.iban            = dto?.iban            ?? '';
        this.name            = dto?.name            ?? '';
        this.balance         = dto?.balance         ?? '';
        this.currency        = dto?.currency        ?? '';
        this.surrogateId     = dto?.surrogateId     ?? '';
        this.productNames    = dto?.productNames    ?? null;
        this.accountTypeCode = dto?.accountTypeCode ?? '';

        this.dBic           = dto?.details?.bic;
        this.dIban          = dto?.details?.iban;
        this.dDueDate       = dto?.details?.dueDate ?? null;
        this.dOwnerId       = dto?.details?.ownerId;
        this.dCurrency      = dto?.details?.currency;
        this.dNetBalance    = dto?.details?.netBalance;
        this.dAccountName   = dto?.details?.accountName ?? null;
        this.dCreditLimit   = dto?.details?.creditLimit;
        this.dAccountOwner  = dto?.details?.accountOwner;
        this.dCreationDate  = dto?.details?.creationDate;
        this.dGrossBalance  = dto?.details?.grossBalance;
        this.dIntraDayLimit = dto?.details?.intraDayLimit ?? null;

    }

    @Id()
    @Column("op_account_id", 'BIGINT', { updatable : false, insertable: false })
    public opAccountId?: string;

    @UpdateTimestamp()
    @Temporal(TemporalType.TIMESTAMP)
    @Column("updated", 'DATETIME', { updatable : false, insertable: false })
    public updated?: string;

    @CreationTimestamp()
    @Temporal(TemporalType.TIMESTAMP)
    @Column("created", 'DATETIME', { updatable : false, insertable: false })
    public created?: string;

    @Column("bic")
    public bic ?: string;

    @Column("iban")
    public iban ?: string;

    @Column("name")
    public name ?: string;

    /**
     * Please note: This balance includes possible reserved funds (e.g. card
     * transactions, etc.) which may not be included in the transaction list yet.
     */
    @Column("balance")
    public balance ?: string;

    @Column("currency")
    public currency ?: string;

    @Column("surrogate_id")
    public surrogateId ?: string;

    @Column("product_names", 'JSON')
    public productNames ?: ReadonlyJsonObject | null;

    @Column("account_type_code")
    public accountTypeCode ?: string;

    // Fields for the extra details query

    @Column("d_bic")
    public dBic           ?: string;

    @Column("d_iban")
    public dIban          ?: string;

    @Column("d_due_date")
    public dDueDate       ?: string | null;

    @Column("d_owner_id")
    public dOwnerId       ?: string;

    @Column("d_currency")
    public dCurrency      ?: string;

    /**
     * Please note: This balance includes possible reserved funds (e.g. card
     * transactions, etc.) which may not be included in the transaction list yet.
     */
    @Column("d_net_balance")
    public dNetBalance    ?: string;

    @Column("d_account_name")
    public dAccountName   ?: string | null;

    @Column("d_credit_limit")
    public dCreditLimit   ?: number;

    @Column("d_account_owner")
    public dAccountOwner  ?: string;

    @Column("d_creation_date")
    public dCreationDate  ?: string;

    /**
     * Please note: This balance DOES NOT include possible reserved funds (e.g.
     * card transactions, etc.).
     */
    @Column("d_gross_balance")
    public dGrossBalance  ?: string;

    @Column("d_intra_day_limit")
    public dIntraDayLimit ?: string | null;


    public static toDTO (entity: OpAccountEntity) : OpAccountDTO {
        const dto : OpAccountDTO = createOpAccountDTO(
            entity?.bic ?? '',
            entity?.iban ?? '',
            entity?.name ?? '',
            entity?.balance ?? '',
            entity?.currency ?? '',
            entity?.surrogateId ?? '',
            entity?.productNames ?? {},
            entity?.accountTypeCode ?? '',
        );
        // Redundant fail safe
        if (!isOpAccountDTO(dto)) {
            LOG.debug(`toDTO: dto / entity = `, dto, entity);
            throw new TypeError(`Failed to create valid OpAccountDTO: ${explainOpAccountDTO(dto)}`);
        }
        return dto;
    }

    public static toDetailsDTO (entity: OpAccountEntity) : OpAccountDetailsDTO {
        const dto : OpAccountDetailsDTO = createOpAccountDetailsDTO(
            entity?.dBic ?? '',
            entity?.dIban ?? '',
            entity?.dDueDate ?? null,
            entity?.dOwnerId ?? '',
            entity?.dCurrency ?? '',
            entity?.dNetBalance ?? '',
            entity?.dAccountName ?? null,
            entity?.dCreditLimit ?? 0,
            entity?.surrogateId ?? '',
            entity?.dAccountOwner ?? '',
            entity?.dCreationDate ?? '',
            entity?.dGrossBalance ?? '',
            entity?.dIntraDayLimit ?? null,
        );
        // Redundant fail safe
        if (!isOpAccountDetailsDTO(dto)) {
            LOG.debug(`toDTO: dto / entity = `, dto, entity);
            throw new TypeError(`Failed to create valid OpAccountDetailsDTO: ${explainOpAccountDetailsDTO(dto)}`);
        }
        return dto;
    }

}
