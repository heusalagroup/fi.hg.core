// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainZendeskOrganizationMembership, isZendeskOrganizationMembership, ZendeskOrganizationMembership } from "./ZendeskOrganizationMembership";
import { explainNoOtherKeys, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explain, explainProperty } from "../../types/explain";

export interface ZendeskOrganizationMembershipDTO {
    readonly organization_membership: ZendeskOrganizationMembership;
}

export function createZendeskOrganizationMembershipDTO (
    organization_membership: ZendeskOrganizationMembership
) : ZendeskOrganizationMembershipDTO {
    return {
        organization_membership
    };
}

export function isZendeskOrganizationMembershipDTO (value: unknown) : value is ZendeskOrganizationMembershipDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'organization_membership'
        ])
        && isZendeskOrganizationMembership(value?.organization_membership)
    );
}

export function explainZendeskOrganizationMembershipDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'organization_membership'
            ])
            , explainProperty("organization_membership", explainZendeskOrganizationMembership(value?.organization_membership))
        ]
    );
}

export function stringifyZendeskOrganizationMembershipDTO (value : ZendeskOrganizationMembershipDTO) : string {
    return `ZendeskOrganizationMembershipDTO(${value})`;
}

export function parseZendeskOrganizationMembershipDTO (value: unknown) : ZendeskOrganizationMembershipDTO | undefined {
    if (isZendeskOrganizationMembershipDTO(value)) return value;
    return undefined;
}
