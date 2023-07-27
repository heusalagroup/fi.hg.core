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

const LOG = LogService.createLogger('OpAccountEntity');

@Table("op_account")
export class OpAccountEntity extends Entity {

    // The constructor

    public constructor ();
    public constructor (dto : OpAccountDTO);

    public constructor (dto ?: OpAccountDTO) {
        super();
        this.bic             = dto?.bic             ?? '';
        this.iban            = dto?.iban            ?? '';
        this.name            = dto?.name            ?? '';
        this.balance         = dto?.balance         ?? '';
        this.currency        = dto?.currency        ?? '';
        this.surrogateId     = dto?.surrogateId     ?? '';
        this.productNames    = dto?.productNames    ?? null;
        this.accountTypeCode = dto?.accountTypeCode ?? '';
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

}
