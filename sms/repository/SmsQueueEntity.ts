// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Column } from "../../data/Column";
import { CreationTimestamp } from "../../data/CreationTimestamp";
import { Entity } from "../../data/Entity";
import { Id } from "../../data/Id";
import { Table } from "../../data/Table";
import { Temporal } from "../../data/Temporal";
import { TemporalType } from "../../data/types/TemporalType";
import { UpdateTimestamp } from "../../data/UpdateTimestamp";
import { EntityUtils } from "../../data/utils/EntityUtils";
import { LogService } from "../../LogService";
import type { NewSmsQueueDTO } from "../dto/NewSmsQueueDTO";
import { createSmsQueueDTO, explainSmsQueueDTO, isSmsQueueDTO, SmsQueueDTO } from "../dto/SmsQueueDTO";

const LOG = LogService.createLogger('SmsQueueEntity');

@Table("sms_queue")
export class SmsQueueEntity extends Entity {

    // The constructor
    public constructor ();
    public constructor (dto : NewSmsQueueDTO);

    public constructor (dto ?: NewSmsQueueDTO) {
        super();
        this.invoiceId      = dto?.invoiceId;
        this.clientId       = dto?.clientId;
        this.senderAddress  = dto?.senderAddress;
        this.targetAddress  = dto?.targetAddress;
        this.message        = dto?.message;
        this.sent           = !!dto?.sent;
        this.failed         = !!dto?.failed;
        this.isTerminated   = !!dto?.isTerminated;
    }

    @Id()
    @Column("sms_queue_id", 'BIGINT', { updatable : false, insertable: false })
    public smsQueueId?: string;

    @Column("client_id", 'BIGINT')
    public clientId?: string;

    @Column("invoice_id")
    public invoiceId?: string;

    @UpdateTimestamp()
    @Temporal(TemporalType.TIMESTAMP)
    @Column("updated", 'DATETIME')
    public updated?: string;

    @CreationTimestamp()
    @Temporal(TemporalType.TIMESTAMP)
    @Column("creation", 'DATETIME')
    public created?: string;

    @Column("sender_address")
    public senderAddress ?: string;

    @Column("target_address")
    public targetAddress ?: string;

    @Column("message")
    public message ?: string;

    @Column("sent", 'BOOL')
    public sent ?: boolean;

    @Column("failed", 'BOOL')
    public failed ?: boolean;

    @Column("is_terminated", 'BOOL')
    public isTerminated ?: boolean;

    public static toDTO (entity: SmsQueueEntity) : SmsQueueDTO {
        if (entity.smsQueueId === undefined) throw new TypeError('entity.smsQueueId missing');
        if (entity.updated === undefined) throw new TypeError('entity.updated missing');
        if (entity.created === undefined) throw new TypeError('entity.created missing');
        if (entity.invoiceId === undefined) throw new TypeError('entity.invoiceId missing');
        if (entity.clientId === undefined) throw new TypeError('entity.clientId missing');
        if (entity.senderAddress === undefined) throw new TypeError('entity.senderAddress missing');
        if (entity.targetAddress === undefined) throw new TypeError('entity.targetAddress missing');
        if (entity.message === undefined) throw new TypeError('entity.message missing');
        if (entity.sent === undefined) throw new TypeError('entity.sent missing');
        if (entity.failed === undefined) throw new TypeError('entity.failed missing');
        if (entity.isTerminated === undefined) throw new TypeError('entity.isTerminated missing');
        const dto : SmsQueueDTO = createSmsQueueDTO(
            entity.smsQueueId,
            entity.updated,
            entity.created,
            entity.invoiceId,
            entity.clientId,
            entity.senderAddress,
            entity.targetAddress,
            entity.message,
            EntityUtils.parseBoolean(entity.sent),
            EntityUtils.parseBoolean(entity.failed),
            EntityUtils.parseBoolean(entity.isTerminated),
        );
        // Redundant fail safe
        if (!isSmsQueueDTO(dto)) {
            LOG.debug(`toDTO: dto / entity = `, dto, entity);
            throw new TypeError(`Failed to create valid SmsQueueDTO: ${explainSmsQueueDTO(dto)}`);
        }
        return dto;
    }

}
