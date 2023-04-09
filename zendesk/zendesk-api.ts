
/**
 * `GET /api/v2/incremental/tickets/cursor?start_time=START_TIME`
 */
export const ZENDESK_API_GET_INCREMENTAL_TICKET_CURSOR_EXPORT_START_PATH = (startTime: string) => `/api/v2/incremental/tickets/cursor?start_time=${q(startTime)}`;

/**
 * `GET /api/v2/incremental/tickets/cursor?cursor=CURSOR`
 */
export const ZENDESK_API_GET_INCREMENTAL_TICKET_CURSOR_EXPORT_NEXT_PATH = (cursor: string) => `/api/v2/incremental/tickets/cursor?cursor=${q(cursor)}`;

function q (value: string) : string {
    return encodeURIComponent(value);
}
