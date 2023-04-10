
/**
 * `GET /api/v2/tickets/{TICKET_ID}`
 */
export const ZENDESK_API_GET_TICKET_PATH = (ticket_id: string) => `/api/v2/tickets/${ticket_id}`;

/**
 * `GET /api/v2/incremental/tickets/cursor?start_time=START_TIME`
 */
export const ZENDESK_API_GET_INCREMENTAL_TICKET_CURSOR_EXPORT_START_PATH = (startTime: string) => `/api/v2/incremental/tickets/cursor?start_time=${q(startTime)}`;

/**
 * `GET /api/v2/incremental/tickets/cursor?cursor=CURSOR`
 */
export const ZENDESK_API_GET_INCREMENTAL_TICKET_CURSOR_EXPORT_NEXT_PATH = (cursor: string) => `/api/v2/incremental/tickets/cursor?cursor=${q(cursor)}`;

/**
 * `GET /api/v2/tickets/{TICKET_ID}/comments?page[size]={SIZE}`
 */
export const ZENDESK_API_GET_COMMENT_LIST_CURSOR_START_PATH = (ticketId: string, size: string) => `/api/v2/tickets/${q(ticketId)}/comments?page[size]=${q(size)}`;

/**
 * `GET /api/v2/tickets/{TICKET_ID}/comments?page[size]={SIZE}&page[after]={CURSOR}`
 */
export const ZENDESK_API_GET_COMMENT_LIST_CURSOR_NEXT_PATH = (ticketId: string, size: string, cursor: string) => `/api/v2/tickets/${q(ticketId)}/comments?page[size]=${q(size)}&page[after]=${q(cursor)}`;

function q (value: string) : string {
    return encodeURIComponent(value);
}
