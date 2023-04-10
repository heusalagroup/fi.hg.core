// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainZendeskOrganization, isZendeskOrganization, ZendeskOrganization } from "./ZendeskOrganization";
import { explainNoOtherKeys, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explain, explainProperty } from "../../types/explain";

export interface ZendeskOrganizationDTO {
    readonly organization: ZendeskOrganization;
}

export function createZendeskOrganizationDTO (
    organization: ZendeskOrganization
) : ZendeskOrganizationDTO {
    return {
        organization
    };
}

export function isZendeskOrganizationDTO (value: unknown) : value is ZendeskOrganizationDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'organization'
        ])
        && isZendeskOrganization(value?.organization)
    );
}

export function explainZendeskOrganizationDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'organization'
            ])
            , explainProperty("organization", explainZendeskOrganization(value?.organization))
        ]
    );
}

export function stringifyZendeskOrganizationDTO (value : ZendeskOrganizationDTO) : string {
    return `ZendeskOrganizationDTO(${value})`;
}

export function parseZendeskOrganizationDTO (value: unknown) : ZendeskOrganizationDTO | undefined {
    if (isZendeskOrganizationDTO(value)) return value;
    return undefined;
}
