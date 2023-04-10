// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    ZENDESK_API_GET_INCREMENTAL_TICKET_CURSOR_EXPORT_START_PATH,
    ZENDESK_API_GET_INCREMENTAL_TICKET_CURSOR_EXPORT_NEXT_PATH,
    ZENDESK_API_GET_TICKET_PATH,
    ZENDESK_API_GET_COMMENT_LIST_CURSOR_START_PATH,
    ZENDESK_API_GET_COMMENT_LIST_CURSOR_NEXT_PATH,
    ZENDESK_API_GET_USER_PATH,
    ZENDESK_API_GET_USER_LIST_CURSOR_START_PATH,
    ZENDESK_API_GET_USER_LIST_CURSOR_NEXT_PATH,
    ZENDESK_API_GET_ORGANIZATION_PATH,
    ZENDESK_API_GET_ORGANIZATION_LIST_CURSOR_START_PATH,
    ZENDESK_API_GET_ORGANIZATION_LIST_CURSOR_NEXT_PATH,
    ZENDESK_API_GET_GROUP_PATH,
    ZENDESK_API_GET_GROUP_LIST_CURSOR_START_PATH,
    ZENDESK_API_GET_GROUP_LIST_CURSOR_NEXT_PATH, ZENDESK_API_GET_ORGANIZATION_MEMBERSHIP_LIST_CURSOR_NEXT_PATH, ZENDESK_API_GET_ORGANIZATION_MEMBERSHIP_LIST_CURSOR_START_PATH, ZENDESK_API_GET_ORGANIZATION_MEMBERSHIP_PATH, ZENDESK_API_GET_USER_IDENTITY_LIST_CURSOR_NEXT_PATH, ZENDESK_API_GET_USER_IDENTITY_LIST_CURSOR_START_PATH, ZENDESK_API_GET_GROUP_MEMBERSHIP_LIST_CURSOR_NEXT_PATH, ZENDESK_API_GET_GROUP_MEMBERSHIP_LIST_CURSOR_START_PATH, ZENDESK_API_GET_GROUP_MEMBERSHIP_PATH
} from "./zendesk-api";
import { LogLevel } from "../types/LogLevel";
import { LogService } from "../LogService";
import { HttpService } from "../HttpService";
import { explainZendeskTicketListDTO, isZendeskTicketListDTO, ZendeskTicketListDTO } from "./dto/ZendeskTicketListDTO";
import { isZendeskTicket, ZendeskTicket } from "./dto/ZendeskTicket";
import { reduce } from "../functions/reduce";
import { filter } from "../functions/filter";
import { explainZendeskTicketDTO, isZendeskTicketDTO } from "./dto/ZendeskTicketDTO";
import { isZendeskComment, ZendeskComment } from "./dto/ZendeskComment";
import { explainZendeskCommentListDTO, isZendeskCommentListDTO, ZendeskCommentListDTO } from "./dto/ZendeskCommentListDTO";
import { isZendeskAttachment } from "./dto/ZendeskAttachment";
import { isArray } from "../types/Array";
import { explainZendeskUserListDTO, isZendeskUserListDTO, ZendeskUserListDTO } from "./dto/ZendeskUserListDTO";
import { isZendeskUser, ZendeskUser } from "./dto/ZendeskUser";
import { explainZendeskUserDTO, isZendeskUserDTO } from "./dto/ZendeskUserDTO";
import { isZendeskOrganization, ZendeskOrganization } from "./dto/ZendeskOrganization";
import { explainZendeskOrganizationDTO, isZendeskOrganizationDTO } from "./dto/ZendeskOrganizationDTO";
import { explainZendeskOrganizationListDTO, isZendeskOrganizationListDTO, ZendeskOrganizationListDTO } from "./dto/ZendeskOrganizationListDTO";
import { isZendeskGroup, ZendeskGroup } from "./dto/ZendeskGroup";
import { explainZendeskGroupDTO, isZendeskGroupDTO } from "./dto/ZendeskGroupDTO";
import { explainZendeskGroupListDTO, isZendeskGroupListDTO, ZendeskGroupListDTO } from "./dto/ZendeskGroupListDTO";
import { explainZendeskOrganizationMembershipListDTO, isZendeskOrganizationMembershipListDTO, ZendeskOrganizationMembershipListDTO } from "./dto/ZendeskOrganizationMembershipListDTO";
import { isZendeskOrganizationMembership, ZendeskOrganizationMembership } from "./dto/ZendeskOrganizationMembership";
import { explainZendeskOrganizationMembershipDTO, isZendeskOrganizationMembershipDTO } from "./dto/ZendeskOrganizationMembershipDTO";
import { isZendeskUserIdentity, ZendeskUserIdentity } from "./dto/ZendeskUserIdentity";
import { explainZendeskUserIdentityListDTO, isZendeskUserIdentityListDTO, ZendeskUserIdentityListDTO } from "./dto/ZendeskUserIdentityListDTO";
import { isZendeskGroupMembership, ZendeskGroupMembership } from "./dto/ZendeskGroupMembership";
import { explainZendeskGroupMembershipDTO, isZendeskGroupMembershipDTO } from "./dto/ZendeskGroupMembershipDTO";
import { explainZendeskGroupMembershipListDTO, isZendeskGroupMembershipListDTO, ZendeskGroupMembershipListDTO } from "./dto/ZendeskGroupMembershipListDTO";

const LOG = LogService.createLogger('ZendeskClient');

/**
 * @see https://developer.zendesk.com/api-reference/ticketing/ticket-management
 */
export class ZendeskClient {

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
        HttpService.setLogLevel(level);
    }

    private readonly _url : string;
    private readonly _authorization : string;

    public static create (
        url           : string,
        authorization : string
    ) : ZendeskClient {
        return new ZendeskClient(url, authorization);
    }

    public constructor (
        url           : string,
        authorization : string
    ) {
        this._url = url;
        this._authorization = authorization;
    }

    public getUrl () : string {
        return this._url;
    }


    public async getTicket (
        ticketId : number
    ) : Promise<ZendeskTicket> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_TICKET_PATH(`${ticketId}`)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskTicketDTO(result)) {
            LOG.debug(`getTicket: Not ZendeskTicketDTO: ${explainZendeskTicketDTO(result)}`);
            LOG.debug(`getTicket: incorrect ticket = `, result);
            throw new TypeError(`Result was not ZendeskTicketDTO`);
        }
        return result.ticket;
    }

    public async processTickets (
        callback: (ticket: ZendeskTicket) => false | undefined | void | Promise<false | undefined | void>,
        startTime: number = 0,
    ) : Promise<boolean> {

        let response = await this._startIncrementalTicketExport(startTime);
        if (await this._processTickets(response.tickets, callback) === false) {
            LOG.debug(`processTickets: Ending because callback requested it`);
            return false;
        }

        while ( !response?.end_of_stream && response?.after_cursor ) {
            response = await this._continueIncrementalTicketExport(response.after_cursor);
            if (await this._processTickets(response.tickets, callback) === false) {
                LOG.debug(`processTickets: Ending because callback requested it`);
                return false;
            }
        }

        if (response?.end_of_stream) {
            LOG.debug(`processTickets: Ending since end of stream`);
        } else if( response?.after_cursor ) {
            LOG.debug(`processTickets: Ending since no after_cursor detected`);
        }

    }

    private async _processTickets (
        tickets: readonly ZendeskTicket[],
        callback: (ticket: ZendeskTicket) => false | undefined | void | Promise<false | undefined | void>
    ) : Promise<false | undefined | void> {

        const response = await reduce(
            tickets,
            async (
                prev : Promise<false | undefined | void>,
                ticket : ZendeskTicket
            ) : Promise<false | undefined | void> => {
                const prevRet = await prev;
                if (prevRet === false) return false;
                return callback(ticket);
            },
            Promise.resolve()
        );

        if (response === false) return false;

    }

    private async _startIncrementalTicketExport (
        startTime: number
    ) : Promise<ZendeskTicketListDTO> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_INCREMENTAL_TICKET_CURSOR_EXPORT_START_PATH(`${startTime}`)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskTicketListDTO(result)) {
            LOG.debug(`_startIncrementalTicketExport: Not ZendeskTicketListDTO: ${explainZendeskTicketListDTO(result)}`);
            const list = filter(
                (result as any)?.tickets ?? [],
                (item: any) : boolean => !isZendeskTicket(item)
            );
            LOG.debug(`_startIncrementalTicketExport: incorrect tickets = `, list);
            throw new TypeError(`Result was not ZendeskTicketListDTO`);
        }
        return result;
    }

    private async _continueIncrementalTicketExport (
        cursor: string
    ) : Promise<ZendeskTicketListDTO> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_INCREMENTAL_TICKET_CURSOR_EXPORT_NEXT_PATH(cursor)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskTicketListDTO(result)) {
            LOG.debug(`_continueIncrementalTicketExport: Not ZendeskTicketListDTO: ${explainZendeskTicketListDTO(result)}`);
            const list = filter(
                (result as any)?.tickets ?? [],
                (item: any) : boolean => !isZendeskTicket(item)
            );
            LOG.debug(`_continueIncrementalTicketExport: incorrect tickets = `, list);
            throw new TypeError(`Result was not ZendeskTicketListDTO`);
        }
        return result;
    }


    public async processTicketComments (
        ticketId: number,
        size: number,
        callback: (ticket: ZendeskComment) => false | undefined | void | Promise<false | undefined | void>,
    ) : Promise<boolean> {
        let response = await this._startCommentExport(ticketId, size);
        if (await this._processTicketComments(response.comments, callback) === false) {
            LOG.debug(`processTicketComments: Ending because callback requested it`);
            return false;
        }

        while ( response?.meta?.has_more && response?.meta?.after_cursor ) {
            response = await this._continueCommentExport(ticketId, size, response?.meta?.after_cursor);
            if (await this._processTicketComments(response.comments, callback) === false) {
                LOG.debug(`processTicketComments: Ending because callback requested it`);
                return false;
            }
        }

        if (!response?.meta?.has_more) {
            LOG.debug(`processTicketComments: Ending since has no more data`);
        } else if( response?.meta?.after_cursor ) {
            LOG.debug(`processTicketComments: Ending since no after_cursor detected`);
        }

    }

    private async _processTicketComments (
        list: readonly ZendeskComment[],
        callback: (ticket: ZendeskComment) => false | undefined | void | Promise<false | undefined | void>
    ) : Promise<false | undefined | void> {

        const response = await reduce(
            list,
            async (
                prev : Promise<false | undefined | void>,
                item : ZendeskComment
            ) : Promise<false | undefined | void> => {
                const prevRet = await prev;
                if (prevRet === false) return false;
                return callback(item);
            },
            Promise.resolve()
        );

        if (response === false) return false;

    }

    private async _startCommentExport (
        ticketId: number,
        size: number
    ) : Promise<ZendeskCommentListDTO> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_COMMENT_LIST_CURSOR_START_PATH(`${ticketId}`, `${size}`)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskCommentListDTO(result)) {
            LOG.debug(`_startCommentExport: Not ZendeskCommentListDTO: ${explainZendeskCommentListDTO(result)}`);
            const list = filter(
                (result as any)?.comments ?? [],
                (item: any) : boolean => !isZendeskComment(item)
            );
            LOG.debug(`_startCommentExport: incorrect comments = `, list);

            const attachments = filter(
                reduce(
                    list,
                    (prev: any[], item: any) : any[] => {
                        const attachments = isArray(item?.attachments) ? item?.attachments : [];
                        return [
                            ...prev,
                            ...attachments,
                            ...(reduce(
                                attachments,
                                (list: any[], item: any) : any[] => {
                                    return [
                                        ...list,
                                        ...(isArray(item?.thumbnails) ? item?.thumbnails : [])
                                    ];
                                },
                                []
                            ))
                        ];
                    },
                    []
                ),
                (item: any) : boolean => !isZendeskAttachment(item)
            );
            LOG.debug(`_startCommentExport: incorrect attachments in comments = `, attachments);

            throw new TypeError(`Result was not ZendeskCommentListDTO`);
        }
        return result;
    }

    private async _continueCommentExport (
        ticketId: number,
        size: number,
        cursor: string
    ) : Promise<ZendeskCommentListDTO> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_COMMENT_LIST_CURSOR_NEXT_PATH(`${ticketId}`, `${size}`, cursor)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskCommentListDTO(result)) {
            LOG.debug(`_continueCommentExport: Not ZendeskCommentListDTO: ${explainZendeskCommentListDTO(result)}`);
            const list = filter(
                (result as any)?.comments ?? [],
                (item: any) : boolean => !isZendeskComment(item)
            );
            LOG.debug(`_continueCommentExport: incorrect comments = `, list);
            throw new TypeError(`Result was not ZendeskCommentListDTO`);
        }
        return result;
    }


    public async getUser (
        userId : number
    ) : Promise<ZendeskUser> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_USER_PATH(`${userId}`)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskUserDTO(result)) {
            LOG.debug(`getUser: Not ZendeskUserDTO: ${explainZendeskUserDTO(result)}`);
            LOG.debug(`getUser: incorrect user = `, result);
            throw new TypeError(`Result was not ZendeskUserDTO`);
        }
        return result.user;
    }

    public async processUsers (
        size: number,
        callback: (ticket: ZendeskUser) => false | undefined | void | Promise<false | undefined | void>,
    ) : Promise<boolean> {

        let response = await this._startUserExport(size);
        if (await this._processUsers(response.users, callback) === false) {
            LOG.debug(`processUsers: Ending because callback requested it`);
            return false;
        }

        while ( response?.meta?.has_more && response?.meta?.after_cursor ) {
            response = await this._continueUserExport(size, response?.meta?.after_cursor);
            if (await this._processUsers(response.users, callback) === false) {
                LOG.debug(`processUsers: Ending because callback requested it`);
                return false;
            }
        }

        if (!response?.meta?.has_more) {
            LOG.debug(`processUsers: Ending since has no more data`);
        } else if( response?.meta?.after_cursor ) {
            LOG.debug(`processUsers: Ending since no after_cursor detected`);
        }

    }

    private async _processUsers (
        list: readonly ZendeskUser[],
        callback: (ticket: ZendeskUser) => false | undefined | void | Promise<false | undefined | void>
    ) : Promise<false | undefined | void> {

        const response = await reduce(
            list,
            async (
                prev : Promise<false | undefined | void>,
                item : ZendeskUser
            ) : Promise<false | undefined | void> => {
                const prevRet = await prev;
                if (prevRet === false) return false;
                return callback(item);
            },
            Promise.resolve()
        );

        if (response === false) return false;

    }

    private async _startUserExport (
        size: number
    ) : Promise<ZendeskUserListDTO> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_USER_LIST_CURSOR_START_PATH(`${size}`)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskUserListDTO(result)) {
            LOG.debug(`_startUserExport: Not ZendeskUserListDTO: ${explainZendeskUserListDTO(result)}`);
            const list = filter(
                (result as any)?.users ?? [],
                (item: any) : boolean => !isZendeskUser(item)
            );
            LOG.debug(`_startUserExport: incorrect users = `, list);

            throw new TypeError(`Result was not ZendeskUserListDTO`);
        }
        return result;
    }

    private async _continueUserExport (
        size: number,
        cursor: string
    ) : Promise<ZendeskUserListDTO> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_USER_LIST_CURSOR_NEXT_PATH( `${size}`, cursor)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskUserListDTO(result)) {
            LOG.debug(`_continueUserExport: Not ZendeskUserListDTO: ${explainZendeskUserListDTO(result)}`);
            const list = filter(
                (result as any)?.users ?? [],
                (item: any) : boolean => !isZendeskUser(item)
            );
            LOG.debug(`_continueUserExport: incorrect users = `, list);
            throw new TypeError(`Result was not ZendeskUserListDTO`);
        }
        return result;
    }




    public async getOrganization (
        orgId : number
    ) : Promise<ZendeskOrganization> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_ORGANIZATION_PATH(`${orgId}`)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskOrganizationDTO(result)) {
            LOG.debug(`getOrganization: Not ZendeskOrganizationDTO: ${explainZendeskOrganizationDTO(result)}`);
            LOG.debug(`getOrganization: incorrect org = `, result);
            throw new TypeError(`Result was not ZendeskOrganizationDTO`);
        }
        return result.organization;
    }

    public async processOrganizations (
        size: number,
        callback: (ticket: ZendeskOrganization) => false | undefined | void | Promise<false | undefined | void>,
    ) : Promise<boolean> {

        let response = await this._startOrganizationExport(size);
        if (await this._processOrganizations(response.organizations, callback) === false) {
            LOG.debug(`processOrganizations: Ending because callback requested it`);
            return false;
        }

        while ( response?.meta?.has_more && response?.meta?.after_cursor ) {
            response = await this._continueOrganizationExport(size, response?.meta?.after_cursor);
            if (await this._processOrganizations(response.organizations, callback) === false) {
                LOG.debug(`processOrganizations: Ending because callback requested it`);
                return false;
            }
        }

        if (!response?.meta?.has_more) {
            LOG.debug(`processOrganizations: Ending since has no more data`);
        } else if( response?.meta?.after_cursor ) {
            LOG.debug(`processOrganizations: Ending since no after_cursor detected`);
        }

    }

    private async _processOrganizations (
        list: readonly ZendeskOrganization[],
        callback: (ticket: ZendeskOrganization) => false | undefined | void | Promise<false | undefined | void>
    ) : Promise<false | undefined | void> {

        const response = await reduce(
            list,
            async (
                prev : Promise<false | undefined | void>,
                item : ZendeskOrganization
            ) : Promise<false | undefined | void> => {
                const prevRet = await prev;
                if (prevRet === false) return false;
                return callback(item);
            },
            Promise.resolve()
        );

        if (response === false) return false;

    }

    private async _startOrganizationExport (
        size: number
    ) : Promise<ZendeskOrganizationListDTO> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_ORGANIZATION_LIST_CURSOR_START_PATH(`${size}`)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskOrganizationListDTO(result)) {

            LOG.debug(`_startOrganizationExport: Not ZendeskOrganizationListDTO: ${explainZendeskOrganizationListDTO(result)}`);
            const list = filter(
                (result as any)?.organizations ?? [],
                (item: any) : boolean => !isZendeskOrganization(item)
            );
            LOG.debug(`_startOrganizationExport: incorrect organizations = `, list);

            throw new TypeError(`Result was not ZendeskOrganizationListDTO`);
        }
        return result;
    }

    private async _continueOrganizationExport (
        size: number,
        cursor: string
    ) : Promise<ZendeskOrganizationListDTO> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_ORGANIZATION_LIST_CURSOR_NEXT_PATH( `${size}`, cursor)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskOrganizationListDTO(result)) {
            LOG.debug(`_continueOrganizationExport: Not ZendeskOrganizationListDTO: ${explainZendeskOrganizationListDTO(result)}`);
            const list = filter(
                (result as any)?.organizations ?? [],
                (item: any) : boolean => !isZendeskOrganization(item)
            );
            LOG.debug(`_continueOrganizationExport: incorrect organizations = `, list);
            throw new TypeError(`Result was not ZendeskOrganizationListDTO`);
        }
        return result;
    }



    public async getGroup (
        groupId : number
    ) : Promise<ZendeskGroup> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_GROUP_PATH(`${groupId}`)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskGroupDTO(result)) {
            LOG.debug(`getGroup: Not ZendeskGroupDTO: ${explainZendeskGroupDTO(result)}`);
            LOG.debug(`getGroup: incorrect group = `, result);
            throw new TypeError(`Result was not ZendeskGroupDTO`);
        }
        return result.group;
    }

    public async processGroups (
        size: number,
        callback: (ticket: ZendeskGroup) => false | undefined | void | Promise<false | undefined | void>,
    ) : Promise<boolean> {

        let response = await this._startGroupExport(size);
        if (await this._processGroups(response.groups, callback) === false) {
            LOG.debug(`processGroups: Ending because callback requested it`);
            return false;
        }

        while ( response?.meta?.has_more && response?.meta?.after_cursor ) {
            response = await this._continueGroupExport(size, response?.meta?.after_cursor);
            if (await this._processGroups(response.groups, callback) === false) {
                LOG.debug(`processGroups: Ending because callback requested it`);
                return false;
            }
        }

        if (!response?.meta?.has_more) {
            LOG.debug(`processGroups: Ending since has no more data`);
        } else if( response?.meta?.after_cursor ) {
            LOG.debug(`processGroups: Ending since no after_cursor detected`);
        }

    }

    private async _processGroups (
        list: readonly ZendeskGroup[],
        callback: (ticket: ZendeskGroup) => false | undefined | void | Promise<false | undefined | void>
    ) : Promise<false | undefined | void> {

        const response = await reduce(
            list,
            async (
                prev : Promise<false | undefined | void>,
                item : ZendeskGroup
            ) : Promise<false | undefined | void> => {
                const prevRet = await prev;
                if (prevRet === false) return false;
                return callback(item);
            },
            Promise.resolve()
        );

        if (response === false) return false;

    }

    private async _startGroupExport (
        size: number
    ) : Promise<ZendeskGroupListDTO> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_GROUP_LIST_CURSOR_START_PATH(`${size}`)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskGroupListDTO(result)) {

            LOG.debug(`_startGroupExport: Not ZendeskGroupListDTO: ${explainZendeskGroupListDTO(result)}`);
            const list = filter(
                (result as any)?.groups ?? [],
                (item: any) : boolean => !isZendeskGroup(item)
            );
            LOG.debug(`_startGroupExport: incorrect groups = `, list);

            throw new TypeError(`Result was not ZendeskGroupListDTO`);
        }
        return result;
    }

    private async _continueGroupExport (
        size: number,
        cursor: string
    ) : Promise<ZendeskGroupListDTO> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_GROUP_LIST_CURSOR_NEXT_PATH( `${size}`, cursor)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskGroupListDTO(result)) {
            LOG.debug(`_continueGroupExport: Not ZendeskGroupListDTO: ${explainZendeskGroupListDTO(result)}`);
            const list = filter(
                (result as any)?.groups ?? [],
                (item: any) : boolean => !isZendeskGroup(item)
            );
            LOG.debug(`_continueGroupExport: incorrect groups = `, list);
            throw new TypeError(`Result was not ZendeskGroupListDTO`);
        }
        return result;
    }




    public async getOrganizationMembership (
        organizationMembershipId : number
    ) : Promise<ZendeskOrganizationMembership> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_ORGANIZATION_MEMBERSHIP_PATH(`${organizationMembershipId}`)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskOrganizationMembershipDTO(result)) {
            LOG.debug(`getOrganizationMembership: Not ZendeskOrganizationMembershipDTO: ${explainZendeskOrganizationMembershipDTO(result)}`);
            LOG.debug(`getOrganizationMembership: incorrect organization_membership = `, result);
            throw new TypeError(`Result was not ZendeskOrganizationMembershipDTO`);
        }
        return result.organization_membership;
    }

    public async processOrganizationMemberships (
        size: number,
        callback: (ticket: ZendeskOrganizationMembership) => false | undefined | void | Promise<false | undefined | void>,
    ) : Promise<boolean> {

        let response = await this._startOrganizationMembershipExport(size);
        if (await this._processOrganizationMemberships(response.organization_memberships, callback) === false) {
            LOG.debug(`processOrganizationMemberships: Ending because callback requested it`);
            return false;
        }

        while ( response?.meta?.has_more && response?.meta?.after_cursor ) {
            response = await this._continueOrganizationMembershipExport(size, response?.meta?.after_cursor);
            if (await this._processOrganizationMemberships(response.organization_memberships, callback) === false) {
                LOG.debug(`processOrganizationMemberships: Ending because callback requested it`);
                return false;
            }
        }

        if (!response?.meta?.has_more) {
            LOG.debug(`processOrganizationMemberships: Ending since has no more data`);
        } else if( response?.meta?.after_cursor ) {
            LOG.debug(`processOrganizationMemberships: Ending since no after_cursor detected`);
        }

    }

    private async _processOrganizationMemberships (
        list: readonly ZendeskOrganizationMembership[],
        callback: (ticket: ZendeskOrganizationMembership) => false | undefined | void | Promise<false | undefined | void>
    ) : Promise<false | undefined | void> {

        const response = await reduce(
            list,
            async (
                prev : Promise<false | undefined | void>,
                item : ZendeskOrganizationMembership
            ) : Promise<false | undefined | void> => {
                const prevRet = await prev;
                if (prevRet === false) return false;
                return callback(item);
            },
            Promise.resolve()
        );

        if (response === false) return false;

    }

    private async _startOrganizationMembershipExport (
        size: number
    ) : Promise<ZendeskOrganizationMembershipListDTO> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_ORGANIZATION_MEMBERSHIP_LIST_CURSOR_START_PATH(`${size}`)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskOrganizationMembershipListDTO(result)) {

            LOG.debug(`_startOrganizationMembershipExport: Not ZendeskOrganizationMembershipListDTO: ${explainZendeskOrganizationMembershipListDTO(result)}`);
            const list = filter(
                (result as any)?.groups ?? [],
                (item: any) : boolean => !isZendeskOrganizationMembership(item)
            );
            LOG.debug(`_startOrganizationMembershipExport: incorrect groups = `, list);

            throw new TypeError(`Result was not ZendeskOrganizationMembershipListDTO`);
        }
        return result;
    }

    private async _continueOrganizationMembershipExport (
        size: number,
        cursor: string
    ) : Promise<ZendeskOrganizationMembershipListDTO> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_ORGANIZATION_MEMBERSHIP_LIST_CURSOR_NEXT_PATH( `${size}`, cursor)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskOrganizationMembershipListDTO(result)) {
            LOG.debug(`_continueOrganizationMembershipExport: Not ZendeskOrganizationMembershipListDTO: ${explainZendeskOrganizationMembershipListDTO(result)}`);
            const list = filter(
                (result as any)?.groups ?? [],
                (item: any) : boolean => !isZendeskOrganizationMembership(item)
            );
            LOG.debug(`_continueOrganizationMembershipExport: incorrect groups = `, list);
            throw new TypeError(`Result was not ZendeskOrganizationMembershipListDTO`);
        }
        return result;
    }


    public async processUserIdentities (
        userId: number,
        size: number,
        callback: (ticket: ZendeskUserIdentity) => false | undefined | void | Promise<false | undefined | void>,
    ) : Promise<boolean> {
        let response = await this._startUserIdentityExport(userId, size);
        if (await this._processUserIdentities(response.identities, callback) === false) {
            LOG.debug(`processUserIdentities: Ending because callback requested it`);
            return false;
        }

        while ( response?.meta?.has_more && response?.meta?.after_cursor ) {
            response = await this._continueUserIdentityExport(userId, size, response?.meta?.after_cursor);
            if (await this._processUserIdentities(response.identities, callback) === false) {
                LOG.debug(`processUserIdentities: Ending because callback requested it`);
                return false;
            }
        }

        if (!response?.meta?.has_more) {
            LOG.debug(`processUserIdentities: Ending since has no more data`);
        } else if( response?.meta?.after_cursor ) {
            LOG.debug(`processUserIdentities: Ending since no after_cursor detected`);
        }

    }

    private async _processUserIdentities (
        list: readonly ZendeskUserIdentity[],
        callback: (ticket: ZendeskUserIdentity) => false | undefined | void | Promise<false | undefined | void>
    ) : Promise<false | undefined | void> {

        const response = await reduce(
            list,
            async (
                prev : Promise<false | undefined | void>,
                item : ZendeskUserIdentity
            ) : Promise<false | undefined | void> => {
                const prevRet = await prev;
                if (prevRet === false) return false;
                return callback(item);
            },
            Promise.resolve()
        );

        if (response === false) return false;

    }

    private async _startUserIdentityExport (
        ticketId: number,
        size: number
    ) : Promise<ZendeskUserIdentityListDTO> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_USER_IDENTITY_LIST_CURSOR_START_PATH(`${ticketId}`, `${size}`)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskUserIdentityListDTO(result)) {
            LOG.debug(`_startUserIdentityExport: Not ZendeskUserIdentityListDTO: ${explainZendeskUserIdentityListDTO(result)}`);
            const list = filter(
                (result as any)?.identities ?? [],
                (item: any) : boolean => !isZendeskUserIdentity(item)
            );
            LOG.debug(`_startCommentExport: incorrect identities = `, list);

            throw new TypeError(`Result was not ZendeskUserIdentityListDTO`);
        }
        return result;
    }

    private async _continueUserIdentityExport (
        ticketId: number,
        size: number,
        cursor: string
    ) : Promise<ZendeskUserIdentityListDTO> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_USER_IDENTITY_LIST_CURSOR_NEXT_PATH(`${ticketId}`, `${size}`, cursor)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskUserIdentityListDTO(result)) {
            LOG.debug(`_continueUserIdentityExport: Not ZendeskUserIdentityListDTO: ${explainZendeskUserIdentityListDTO(result)}`);
            const list = filter(
                (result as any)?.identities ?? [],
                (item: any) : boolean => !isZendeskUserIdentity(item)
            );
            LOG.debug(`_continueUserIdentityExport: incorrect identities = `, list);
            throw new TypeError(`Result was not ZendeskUserIdentityListDTO`);
        }
        return result;
    }


    public async getGroupMembership (
        groupMembershipId : number
    ) : Promise<ZendeskGroupMembership> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_GROUP_MEMBERSHIP_PATH(`${groupMembershipId}`)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskGroupMembershipDTO(result)) {
            LOG.debug(`getGroupMembership: Not ZendeskGroupMembershipDTO: ${explainZendeskGroupMembershipDTO(result)}`);
            LOG.debug(`getGroupMembership: incorrect group_membership = `, result);
            throw new TypeError(`Result was not ZendeskGroupMembershipDTO`);
        }
        return result.group_membership;
    }

    public async processGroupMemberships (
        size: number,
        callback: (ticket: ZendeskGroupMembership) => false | undefined | void | Promise<false | undefined | void>,
    ) : Promise<boolean> {

        let response = await this._startGroupMembershipExport(size);
        if (await this._processGroupMemberships(response.group_memberships, callback) === false) {
            LOG.debug(`processGroupMemberships: Ending because callback requested it`);
            return false;
        }

        while ( response?.meta?.has_more && response?.meta?.after_cursor ) {
            response = await this._continueGroupMembershipExport(size, response?.meta?.after_cursor);
            if (await this._processGroupMemberships(response.group_memberships, callback) === false) {
                LOG.debug(`processGroupMemberships: Ending because callback requested it`);
                return false;
            }
        }

        if (!response?.meta?.has_more) {
            LOG.debug(`processGroupMemberships: Ending since has no more data`);
        } else if( response?.meta?.after_cursor ) {
            LOG.debug(`processGroupMemberships: Ending since no after_cursor detected`);
        }

    }

    private async _processGroupMemberships (
        list: readonly ZendeskGroupMembership[],
        callback: (ticket: ZendeskGroupMembership) => false | undefined | void | Promise<false | undefined | void>
    ) : Promise<false | undefined | void> {

        const response = await reduce(
            list,
            async (
                prev : Promise<false | undefined | void>,
                item : ZendeskGroupMembership
            ) : Promise<false | undefined | void> => {
                const prevRet = await prev;
                if (prevRet === false) return false;
                return callback(item);
            },
            Promise.resolve()
        );

        if (response === false) return false;

    }

    private async _startGroupMembershipExport (
        size: number
    ) : Promise<ZendeskGroupMembershipListDTO> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_GROUP_MEMBERSHIP_LIST_CURSOR_START_PATH(`${size}`)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskGroupMembershipListDTO(result)) {

            LOG.debug(`_startGroupMembershipExport: Not ZendeskGroupMembershipListDTO: ${explainZendeskGroupMembershipListDTO(result)}`);
            const list = filter(
                (result as any)?.groups ?? [],
                (item: any) : boolean => !isZendeskGroupMembership(item)
            );
            LOG.debug(`_startGroupMembershipExport: incorrect groups = `, list);

            throw new TypeError(`Result was not ZendeskGroupMembershipListDTO`);
        }
        return result;
    }

    private async _continueGroupMembershipExport (
        size: number,
        cursor: string
    ) : Promise<ZendeskGroupMembershipListDTO> {
        const result = await HttpService.getJson(
            `${this._url}${ZENDESK_API_GET_GROUP_MEMBERSHIP_LIST_CURSOR_NEXT_PATH( `${size}`, cursor)}`,
            {
                'Authorization': this._authorization
            }
        );
        if (!isZendeskGroupMembershipListDTO(result)) {
            LOG.debug(`_continueGroupMembershipExport: Not ZendeskGroupMembershipListDTO: ${explainZendeskGroupMembershipListDTO(result)}`);
            const list = filter(
                (result as any)?.groups ?? [],
                (item: any) : boolean => !isZendeskGroupMembership(item)
            );
            LOG.debug(`_continueGroupMembershipExport: incorrect groups = `, list);
            throw new TypeError(`Result was not ZendeskGroupMembershipListDTO`);
        }
        return result;
    }


}
