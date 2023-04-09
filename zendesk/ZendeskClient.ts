// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    ZENDESK_API_GET_INCREMENTAL_TICKET_CURSOR_EXPORT_START_PATH,
    ZENDESK_API_GET_INCREMENTAL_TICKET_CURSOR_EXPORT_NEXT_PATH
} from "./zendesk-api";
import { LogLevel } from "../types/LogLevel";
import { LogService } from "../LogService";
import { HttpService } from "../HttpService";
import { explainZendeskTicketListDTO, isZendeskTicketListDTO, ZendeskTicketListDTO } from "./dto/ZendeskTicketListDTO";
import { ZendeskTicketDTO } from "./dto/ZendeskTicketDTO";
import { forEach } from "../functions/forEach";
import { startsWith } from "../functions/startsWith";

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

    public static create (
        url      : string,
        user     : string,
        password : string
    ) : ZendeskClient {
        return new ZendeskClient(url, user, password);
    }

    public constructor (
        url      : string,
        user     : string,
        password : string
    ) {
        if (!startsWith(url, 'https://')) {
            throw new TypeError('Only HTTPS urls supported');
        }
        this._url = `https://${user}:${password}@${url.substring('https://'.length)}`;
    }

    public getUrl () : string {
        return this._url;
    }

    public async processTickets (
        callback: (ticket: ZendeskTicketDTO) => false | undefined,
        startTime: number = 0,
    ) : Promise<boolean> {
        let response = await this.startIncrementalTicketExport(startTime);
        if (this._processTickets(response.tickets, callback) === false) {
            return false;
        }
        while ( !response.end_of_stream && response.after_cursor ) {
            response = await this.continueIncrementalTicketExport(response.after_cursor);
            if (this._processTickets(response.tickets, callback) === false) {
                return false;
            }
        }
    }

    private _processTickets (
        tickets: readonly ZendeskTicketDTO[],
        callback: (ticket: ZendeskTicketDTO) => false | undefined
    ) : false | undefined {
        let discontinue = false;
        forEach(
            tickets,
            (ticket: ZendeskTicketDTO) => {
                if (callback(ticket) === false) {
                    discontinue = true;
                    return false;
                }
            }
        );
        if (discontinue) return false;
    }

    public async startIncrementalTicketExport (
        startTime: number
    ) : Promise<ZendeskTicketListDTO> {
        const result = await HttpService.getJson(`${this._url}${ZENDESK_API_GET_INCREMENTAL_TICKET_CURSOR_EXPORT_START_PATH(`${startTime}`)}`);
        if (!isZendeskTicketListDTO(result)) {
            LOG.debug(`startIncrementalTicketExport: result = `, result);
            throw new TypeError(`Result was not ZendeskTicketListDTO: ${explainZendeskTicketListDTO(result)}`);
        }
        return result;
    }

    public async continueIncrementalTicketExport (
        cursor: string
    ) : Promise<ZendeskTicketListDTO> {
        const result = await HttpService.getJson(`${this._url}${ZENDESK_API_GET_INCREMENTAL_TICKET_CURSOR_EXPORT_NEXT_PATH(cursor)}`);
        if (!isZendeskTicketListDTO(result)) {
            LOG.debug(`continueIncrementalTicketExport: result = `, result);
            throw new TypeError(`Result was not ZendeskTicketListDTO: ${explainZendeskTicketListDTO(result)}`);
        }
        return result;
    }

}
