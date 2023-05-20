// Copyright (c) 2022-2023. Sendanor <info@sendanor.fi>. All rights reserved.
// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { JsonAny, ReadonlyJsonAny, ReadonlyJsonObject } from "./Json";
import { HttpService } from "./HttpService";
import { LogService } from "./LogService";
import { LogLevel } from "./types/LogLevel";
import { isTicketDTO, TicketDTO } from "./store/types/ticket/TicketDTO";
import { AuthorizationUtils } from "./AuthorizationUtils";
import { isTicketListDTO, TicketListDTO } from "./store/types/ticket/TicketListDTO";
import { NewTicketDTO } from "./store/types/ticket/NewTicketDTO";
import { ResponseEntity } from "./request/types/ResponseEntity";

const LOG = LogService.createLogger('TicketClientService');

export class TicketClientService {

    private static _authorizationHeaderName = 'Authorization';
    private static _addTicketPath = '/tickets';
    private static _ticketListPath = '/tickets';
    private static _getTicketPath = (ticketId: string) : string => `${TicketClientService._ticketListPath}/${encodeURIComponent(ticketId)}`;

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    public static async addTicket (
        data: NewTicketDTO,
        url: string,
        token ?: string
    ) : Promise<TicketDTO> {
        const response: ResponseEntity<JsonAny|undefined> | undefined = await HttpService.postJsonEntity(
            `${url}${this._addTicketPath}`,
            data as unknown as ReadonlyJsonObject,
            token ? this._createHeaders(token) : undefined
        );
        if (!response) {
            LOG.debug(`response = `, response);
            throw new TypeError(`Response was not ResponseEntity`);
        }

        const body = response.getBody();
        if ( !isTicketDTO(body) ) {
            LOG.debug(`body = `, body);
            throw new TypeError(`Body was not TicketDTO`);
        }
        return body;
    }

    public static async getTicket (
        url: string,
        ticketId : string,
        token: string
    ) : Promise<TicketDTO> {
        const response: ReadonlyJsonAny | undefined = await HttpService.getJson(
            `${url}${this._getTicketPath(ticketId)}`,
            this._createHeaders(token)
        );
        if ( !isTicketDTO(response) ) {
            LOG.debug(`response = `, response);
            throw new TypeError(`Response was not TicketDTO`);
        }
        return response;
    }

    public static async getTicketList (
        url: string,
        token: string
    ) : Promise<TicketListDTO> {
        const response: ReadonlyJsonAny | undefined = await HttpService.getJson(
            `${url}${this._ticketListPath}`,
            this._createHeaders(token)
        );
        if ( !isTicketListDTO(response) ) {
            LOG.debug(`response = `, response);
            throw new TypeError(`Response was not TicketListDTO`);
        }
        return response;
    }

    private static _createHeaders (
        sessionToken: string
    ) : {[key: string]: string} {
        return {
            [this._authorizationHeaderName]: AuthorizationUtils.createBearerHeader(sessionToken)
        };
    }

}
