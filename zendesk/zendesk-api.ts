
/**
 * `GET /api/v2/users/{ID}`
 */
export const ZENDESK_API_GET_USER_PATH = (id: string) => `/api/v2/users/${id}`;

/**
 * `GET /api/v2/users?page[size]={SIZE}`
 */
export const ZENDESK_API_GET_USER_LIST_CURSOR_START_PATH = (size: string) => `/api/v2/users?page[size]=${q(size)}`;

/**
 * `GET /api/v2/users?page[size]={SIZE}&page[after]={CURSOR}`
 */
export const ZENDESK_API_GET_USER_LIST_CURSOR_NEXT_PATH = (size: string, cursor: string) => `/api/v2/users?page[size]=${q(size)}&page[after]=${q(cursor)}`;


/**
 * `GET /api/v2/organizations/{ID}`
 */
export const ZENDESK_API_GET_ORGANIZATION_PATH = (id: string) => `/api/v2/organizations/${id}`;

/**
 * `GET /api/v2/organizations?page[size]={SIZE}`
 */
export const ZENDESK_API_GET_ORGANIZATION_LIST_CURSOR_START_PATH = (size: string) => `/api/v2/organizations?page[size]=${q(size)}`;

/**
 * `GET /api/v2/organizations?page[size]={SIZE}&page[after]={CURSOR}`
 */
export const ZENDESK_API_GET_ORGANIZATION_LIST_CURSOR_NEXT_PATH = (size: string, cursor: string) => `/api/v2/organizations?page[size]=${q(size)}&page[after]=${q(cursor)}`;


/**
 * `GET /api/v2/organization_memberships/{ID}`
 */
export const ZENDESK_API_GET_ORGANIZATION_MEMBERSHIP_PATH = (id: string) => `/api/v2/organization_memberships/${id}`;

/**
 * `GET /api/v2/organization_memberships?page[size]={SIZE}`
 */
export const ZENDESK_API_GET_ORGANIZATION_MEMBERSHIP_LIST_CURSOR_START_PATH = (size: string) => `/api/v2/organization_memberships?page[size]=${q(size)}`;

/**
 * `GET /api/v2/organization_memberships?page[size]={SIZE}&page[after]={CURSOR}`
 */
export const ZENDESK_API_GET_ORGANIZATION_MEMBERSHIP_LIST_CURSOR_NEXT_PATH = (size: string, cursor: string) => `/api/v2/organization_memberships?page[size]=${q(size)}&page[after]=${q(cursor)}`;


/**
 * `GET /api/v2/group_memberships/{ID}`
 */
export const ZENDESK_API_GET_GROUP_MEMBERSHIP_PATH = (id: string) => `/api/v2/group_memberships/${id}`;

/**
 * `GET /api/v2/group_memberships?page[size]={SIZE}`
 */
export const ZENDESK_API_GET_GROUP_MEMBERSHIP_LIST_CURSOR_START_PATH = (size: string) => `/api/v2/group_memberships?page[size]=${q(size)}`;

/**
 * `GET /api/v2/group_memberships?page[size]={SIZE}&page[after]={CURSOR}`
 */
export const ZENDESK_API_GET_GROUP_MEMBERSHIP_LIST_CURSOR_NEXT_PATH = (size: string, cursor: string) => `/api/v2/group_memberships?page[size]=${q(size)}&page[after]=${q(cursor)}`;

/**
 * `GET /api/v2/suspended_tickets/{ID}`
 */
export const ZENDESK_API_GET_SUSPENDED_TICKETS_PATH = (id: string) => `/api/v2/suspended_tickets/${id}`;

/**
 * `GET /api/v2/suspended_tickets?page[size]={SIZE}`
 */
export const ZENDESK_API_GET_SUSPENDED_TICKETS_LIST_CURSOR_START_PATH = (size: string) => `/api/v2/suspended_tickets?page[size]=${q(size)}`;

/**
 * `GET /api/v2/suspended_tickets?page[size]={SIZE}&page[after]={CURSOR}`
 */
export const ZENDESK_API_GET_SUSPENDED_TICKETS_LIST_CURSOR_NEXT_PATH = (size: string, cursor: string) => `/api/v2/suspended_tickets?page[size]=${q(size)}&page[after]=${q(cursor)}`;


/**
 * `GET /api/v2/groups/{ID}`
 */
export const ZENDESK_API_GET_GROUP_PATH = (id: string) => `/api/v2/groups/${id}`;

/**
 * `GET /api/v2/groups?page[size]={SIZE}`
 */
export const ZENDESK_API_GET_GROUP_LIST_CURSOR_START_PATH = (size: string) => `/api/v2/groups?page[size]=${q(size)}`;

/**
 * `GET /api/v2/groups?page[size]={SIZE}&page[after]={CURSOR}`
 */
export const ZENDESK_API_GET_GROUP_LIST_CURSOR_NEXT_PATH = (size: string, cursor: string) => `/api/v2/groups?page[size]=${q(size)}&page[after]=${q(cursor)}`;


/**
 * `GET /api/v2/tickets/{ID}`
 */
export const ZENDESK_API_GET_TICKET_PATH = (id: string) => `/api/v2/tickets/${id}`;

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


/**
 * `GET /api/v2/users/{USER_ID}/identities?page[size]={SIZE}`
 */
export const ZENDESK_API_GET_USER_IDENTITY_LIST_CURSOR_START_PATH = (userId: string, size: string) => `/api/v2/users/${q(userId)}/identities?page[size]=${q(size)}`;

/**
 * `GET /api/v2/tickets/{TICKET_ID}/identities?page[size]={SIZE}&page[after]={CURSOR}`
 */
export const ZENDESK_API_GET_USER_IDENTITY_LIST_CURSOR_NEXT_PATH = (userId: string, size: string, cursor: string) => `/api/v2/users/${q(userId)}/identities?page[size]=${q(size)}&page[after]=${q(cursor)}`;


function q (value: string) : string {
    return encodeURIComponent(value);
}
