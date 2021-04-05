
export const NOR_REQUEST_CLIENT_MODE      : string  = process?.env?.NOR_REQUEST_CLIENT_MODE ?? process?.env?.REACT_APP_REQUEST_CLIENT_MODE ?? '';

export const REQUEST_CLIENT_FETCH_ENABLED : boolean = NOR_REQUEST_CLIENT_MODE === 'WINDOW' ? true : !!(typeof window !== 'undefined' && window.fetch);

export const REQUEST_CLIENT_NODE_ENABLED  : boolean = NOR_REQUEST_CLIENT_MODE === 'NODE'   ? true : !REQUEST_CLIENT_FETCH_ENABLED;
