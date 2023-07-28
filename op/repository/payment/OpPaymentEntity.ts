// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogService } from "../../../LogService";
import { Table } from "../../../data/Table";
import { Entity } from "../../../data/Entity";
import { createOpPaymentDTO, explainOpPaymentDTO, isOpPaymentDTO } from "../../dto/OpPaymentDTO";
import type { OpPaymentDTO } from "../../dto/OpPaymentDTO";
import { Id } from "../../../data/Id";
import { Column } from "../../../data/Column";
import { OpPaymentType } from "../../types/OpPaymentType";
import { OpPaymentStatus } from "../../types/OpPaymentStatus";
import { Currency } from "../../../types/Currency";
import { OpIdentificationScheme } from "../../types/OpIdentificationScheme";
import { createOpPaymentRequestDTO } from "../../dto/OpPaymentRequestDTO";
import { createOpPaymentResponseDTO } from "../../dto/OpPaymentResponseDTO";
import { createOpPaymentCreditor } from "../../types/OpPaymentCreditor";
import { createOpAddress } from "../../types/OpPaymentAddress";
import { createOpPaymentDebtor } from "../../types/OpPaymentDebtor";
import { createOpPaymentInstructedAmount } from "../../types/OpPaymentInstructedAmount";
import { createOpUltimateDebtor } from "../../types/OpUltimateDebtor";
import { createOpPaymentIdentification } from "../../types/OpPaymentIdentification";
import { createOpUltimateCreditor } from "../../types/OpUltimateCreditor";
import { CountryCode } from "../../../types/CountryCode";
import { CreationTimestamp } from "../../../data/CreationTimestamp";
import { Temporal } from "../../../data/Temporal";
import { TemporalType } from "../../../data/types/TemporalType";
import { UpdateTimestamp } from "../../../data/UpdateTimestamp";

const LOG = LogService.createLogger('OpPaymentEntity');

@Table("op_payment")
export class OpPaymentEntity extends Entity {

    // The constructor

    public constructor ();
    public constructor (dto : OpPaymentDTO);

    public constructor (dto ?: OpPaymentDTO) {
        super();

        this.rInstructionId              = dto?.request?.instructionId;

        this.rCreditorName               = dto?.request?.creditor?.name;
        this.rCreditorIban               = dto?.request?.creditor?.iban;
        this.rCreditorAddressCountry     = dto?.request?.creditor?.address?.country;
        this.rCreditorAddressLine1        = dto?.request?.creditor?.address?.addressLine[0];
        this.rCreditorAddressLine2        = dto?.request?.creditor?.address?.addressLine[1];

        this.rDebtorName               = dto?.request?.debtor?.name;
        this.rDebtorIban               = dto?.request?.debtor?.iban;
        this.rDebtorAddressCountry     = dto?.request?.debtor?.address?.country;
        this.rDebtorAddressLine1        = dto?.request?.debtor?.address?.addressLine[0];
        this.rDebtorAddressLine2        = dto?.request?.debtor?.address?.addressLine[1];

        this.rInstructedAmountValue      = dto?.request?.instructedAmount?.amount;
        this.rInstructedAmountCurrency   = dto?.request?.instructedAmount?.currency;
        this.rReference                  = dto?.request?.reference;
        this.rMessage                    = dto?.request?.message;
        this.rEndToEndId                 = dto?.request?.endToEndId;

        this.rUltimateDebtorName                     = dto?.request?.ultimateDebtor?.name;
        this.rUltimateDebtorIdentificationId         = dto?.request?.ultimateDebtor?.identification?.id;
        this.rUltimateDebtorIdentificationSchemeName = dto?.request?.ultimateDebtor?.identification?.schemeName;
        this.rUltimateDebtorIdentificationIssuer     = dto?.request?.ultimateDebtor?.identification?.issuer;
        this.rUltimateDebtorAddressCountry           = dto?.request?.ultimateDebtor?.address?.country;
        this.rUltimateDebtorAddressLine1              = dto?.request?.ultimateDebtor?.address?.addressLine[0];
        this.rUltimateDebtorAddressLine2              = dto?.request?.ultimateDebtor?.address?.addressLine[1];

        this.rUltimateCreditorName                     = dto?.request?.ultimateCreditor?.name;
        this.rUltimateCreditorIdentificationId         = dto?.request?.ultimateCreditor?.identification?.id;
        this.rUltimateCreditorIdentificationSchemeName = dto?.request?.ultimateCreditor?.identification?.schemeName;
        this.rUltimateCreditorIdentificationIssuer     = dto?.request?.ultimateCreditor?.identification?.issuer;
        this.rUltimateCreditorAddressCountry           = dto?.request?.ultimateCreditor?.address?.country;
        this.rUltimateCreditorAddressLine1              = dto?.request?.ultimateCreditor?.address?.addressLine[0];
        this.rUltimateCreditorAddressLine2              = dto?.request?.ultimateCreditor?.address?.addressLine[1];

        this.amount               = dto?.response?.amount;
        this.status               = dto?.response?.status;
        this.currency             = dto?.response?.currency;
        this.archiveId            = dto?.response?.archiveId;
        this.debtorIban           = dto?.response?.debtorIban;
        this.bookingDate          = dto?.response?.bookingDate;
        this.paymentType          = dto?.response?.paymentType;
        this.creditorIban         = dto?.response?.creditorIban;
        this.creditorName         = dto?.response?.creditorName;
        this.ultimateDebtorName   = dto?.response?.ultimateDebtorName;
        this.ultimateCreditorName = dto?.response?.ultimateCreditorName;
        this.transactionId        = dto?.response?.transactionId;
        this.transactionDate      = dto?.response?.transactionDate;
        this.endToEndId           = dto?.response?.endToEndId;

    }

    @Id()
    @Column("op_payment_id", 'BIGINT', { updatable : false, insertable: false })
    public opPaymentId?: string;

    @Column("op_account_id", 'BIGINT')
    public opAccountId?: string;

    @UpdateTimestamp()
    @Temporal(TemporalType.TIMESTAMP)
    @Column("updated", 'DATETIME', { updatable : false, insertable: false })
    public updated?: string;

    @CreationTimestamp()
    @Temporal(TemporalType.TIMESTAMP)
    @Column("created", 'DATETIME', { updatable : false, insertable: false })
    public created?: string;

    @Column("r_instruction_id")
    public rInstructionId ?: string;

    @Column("r_creditor_name")
    public rCreditorName ?: string;

    @Column("r_creditor_iban")
    public rCreditorIban ?: string;

    @Column("r_creditor_address_country")
    public rCreditorAddressCountry ?: CountryCode;

    @Column("r_creditor_address_line1")
    public rCreditorAddressLine1 ?: string;

    @Column("r_creditor_address_line2")
    public rCreditorAddressLine2 ?: string;

    @Column("r_debtor_name")
    public rDebtorName ?: string;

    @Column("r_debtor_iban")
    public rDebtorIban ?: string;

    @Column("r_debtor_address_country")
    public rDebtorAddressCountry ?: CountryCode;

    @Column("r_debtor_address_line1")
    public rDebtorAddressLine1 ?: string;

    @Column("r_debtor_address_line2")
    public rDebtorAddressLine2 ?: string;

    @Column("r_instructed_amount_value")
    public rInstructedAmountValue ?: string;

    @Column("r_instructed_amount_currency")
    public rInstructedAmountCurrency ?: Currency;

    @Column("r_reference")
    public rReference ?: string;

    @Column("r_message")
    public rMessage ?: string;

    @Column("r_end_to_end_id")
    public rEndToEndId ?: string;

    @Column("r_ultimate_debtor_name")
    public rUltimateDebtorName ?: string;

    @Column("r_ultimate_debtor_identification_id")
    public rUltimateDebtorIdentificationId ?: string;

    @Column("r_ultimate_debtor_identification_scheme_name")
    public rUltimateDebtorIdentificationSchemeName ?: OpIdentificationScheme;

    @Column("r_ultimate_debtor_identification_issuer")
    public rUltimateDebtorIdentificationIssuer ?: string;

    @Column("r_ultimate_debtor_address_country")
    public rUltimateDebtorAddressCountry ?: CountryCode;

    @Column("r_ultimate_debtor_address_line1")
    public rUltimateDebtorAddressLine1 ?: string;

    @Column("r_ultimate_debtor_address_line2")
    public rUltimateDebtorAddressLine2 ?: string;

    @Column("r_ultimate_creditor_name")
    public rUltimateCreditorName ?: string;

    @Column("r_ultimate_creditor_identification_id")
    public rUltimateCreditorIdentificationId ?: string;

    @Column("r_ultimate_creditor_identification_scheme_name")
    public rUltimateCreditorIdentificationSchemeName ?: OpIdentificationScheme;

    @Column("r_ultimate_creditor_identification_issuer")
    public rUltimateCreditorIdentificationIssuer ?: string;

    @Column("r_ultimate_creditor_address_country")
    public rUltimateCreditorAddressCountry ?: CountryCode;

    @Column("r_ultimate_creditor_address_line1")
    public rUltimateCreditorAddressLine1 ?: string;

    @Column("r_ultimate_creditor_address_line2")
    public rUltimateCreditorAddressLine2 ?: string;


    @Column("amount")
    public amount ?: string;

    @Column("status")
    public status ?: OpPaymentStatus;

    @Column("currency")
    public currency ?: Currency;

    @Column("archive_id")
    public archiveId ?: string;

    @Column("debtor_iban")
    public debtorIban ?: string;

    @Column("booking_date")
    public bookingDate ?: string;

    @Column("payment_type")
    public paymentType ?: OpPaymentType;

    @Column("creditor_iban")
    public creditorIban ?: string;

    @Column("creditor_name")
    public creditorName ?: string;

    @Column("ultimate_debtor_name")
    public ultimateDebtorName ?: string;

    @Column("ultimate_creditor_name")
    public ultimateCreditorName ?: string;

    @Column("transaction_id")
    public transactionId ?: string;

    @Column("transaction_date")
    public transactionDate ?: string;

    @Column("end_to_end_id")
    public endToEndId ?: string;

    public static toDTO (entity: OpPaymentEntity) : OpPaymentDTO {

        if (!entity?.rInstructionId) throw new TypeError('entity.rInstructionId missing');
        if (!entity?.rCreditorName) throw new TypeError('entity.rCreditorName missing');
        if (!entity?.rCreditorAddressCountry) throw new TypeError('entity.rCreditorAddressCountry missing');
        if (!entity?.rCreditorAddressLine1) throw new TypeError('entity.rCreditorAddressLine1 missing');
        if (!entity?.rCreditorAddressLine2) throw new TypeError('entity.rCreditorAddressLine2 missing');
        if (!entity?.rDebtorName) throw new TypeError('entity.rDebtorName missing');
        if (!entity?.rDebtorAddressCountry) throw new TypeError('entity.rDebtorAddressCountry missing');
        if (!entity?.rDebtorAddressLine1) throw new TypeError('entity.rDebtorAddressLine1 missing');
        if (!entity?.rDebtorAddressLine2) throw new TypeError('entity.rDebtorAddressLine2 missing');
        if (!entity?.rInstructedAmountValue) throw new TypeError('entity.rInstructedAmountValue missing');
        if (!entity?.rInstructedAmountCurrency) throw new TypeError('entity.rInstructedAmountCurrency missing');

        const dto : OpPaymentDTO = createOpPaymentDTO(
            createOpPaymentRequestDTO(
                entity?.rInstructionId,
                createOpPaymentCreditor(
                    entity?.rCreditorName,
                    entity?.rCreditorIban,
                    createOpAddress(
                        entity?.rCreditorAddressCountry,
                        [
                            entity?.rCreditorAddressLine1,
                            entity?.rCreditorAddressLine2,
                        ]
                    ),
                ),
                createOpPaymentDebtor(
                    entity?.rDebtorName,
                    entity?.rDebtorIban,
                    createOpAddress(
                        entity?.rDebtorAddressCountry,
                        [
                            entity?.rDebtorAddressLine1,
                            entity?.rDebtorAddressLine2,
                        ]
                    ),
                ),
                createOpPaymentInstructedAmount(
                    entity?.rInstructedAmountValue,
                    entity?.rInstructedAmountCurrency,
                ),
                entity?.rReference,
                entity?.rMessage,
                entity?.rEndToEndId,
                (
                    entity?.rUltimateDebtorName
                    && entity?.rUltimateDebtorIdentificationId
                    && entity?.rUltimateDebtorIdentificationSchemeName
                    && entity?.rUltimateDebtorAddressCountry
                    && entity?.rUltimateDebtorAddressLine1
                    && entity?.rUltimateDebtorAddressLine2
                ) ? createOpUltimateDebtor(
                    entity?.rUltimateDebtorName,
                    createOpPaymentIdentification(
                        entity?.rUltimateDebtorIdentificationId,
                        entity?.rUltimateDebtorIdentificationSchemeName,
                        entity?.rUltimateDebtorIdentificationIssuer,
                    ),
                    createOpAddress(
                        entity?.rUltimateDebtorAddressCountry,
                        [
                            entity?.rUltimateDebtorAddressLine1,
                            entity?.rUltimateDebtorAddressLine2,
                        ]
                    ),
                ) : undefined,
                (
                    entity?.rUltimateCreditorName
                    && entity?.rUltimateCreditorIdentificationId
                    && entity?.rUltimateCreditorIdentificationSchemeName
                    && entity?.rUltimateCreditorAddressCountry
                    && entity?.rUltimateCreditorAddressLine1
                    && entity?.rUltimateCreditorAddressLine2
                ) ? createOpUltimateCreditor(
                    entity?.rUltimateCreditorName,
                    createOpPaymentIdentification(
                        entity?.rUltimateCreditorIdentificationId,
                        entity?.rUltimateCreditorIdentificationSchemeName,
                        entity?.rUltimateCreditorIdentificationIssuer,
                    ),
                    createOpAddress(
                        entity?.rUltimateCreditorAddressCountry,
                        [
                            entity?.rUltimateCreditorAddressLine1,
                            entity?.rUltimateCreditorAddressLine2,
                        ]
                    ),
                ) : undefined,
            ),
            (
                entity?.amount
                && entity?.status
                && entity?.currency
                && entity?.archiveId
                && entity?.debtorIban
                && entity?.bookingDate
                && entity?.paymentType
                && entity?.creditorIban
                && entity?.creditorName
                && entity?.transactionId
                && entity?.transactionDate
                && entity?.endToEndId
            ) ? createOpPaymentResponseDTO(
                entity?.amount,
                entity?.status,
                entity?.currency,
                entity?.archiveId,
                entity?.debtorIban,
                entity?.ultimateDebtorName,
                entity?.bookingDate,
                entity?.paymentType,
                entity?.creditorIban,
                entity?.creditorName,
                entity?.ultimateCreditorName,
                entity?.transactionId,
                entity?.transactionDate,
                entity?.endToEndId,
            ) : undefined
        );
        // Redundant fail safe
        if (!isOpPaymentDTO(dto)) {
            LOG.debug(`toDTO: dto / entity = `, dto, entity);
            throw new TypeError(`Failed to create valid OpPaymentDTO: ${explainOpPaymentDTO(dto)}`);
        }
        return dto;
    }

}
