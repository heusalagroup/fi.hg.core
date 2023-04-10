// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    ZENDESK_API_GET_INCREMENTAL_TICKET_CURSOR_EXPORT_START_PATH,
    ZENDESK_API_GET_INCREMENTAL_TICKET_CURSOR_EXPORT_NEXT_PATH,
    ZENDESK_API_GET_TICKET_PATH,
    ZENDESK_API_GET_COMMENT_LIST_CURSOR_START_PATH,
    ZENDESK_API_GET_COMMENT_LIST_CURSOR_NEXT_PATH
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

}
