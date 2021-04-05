import {REQUEST_CLIENT_FETCH_ENABLED, REQUEST_CLIENT_NODE_ENABLED} from "./request-client-constants";

export const OptionalHTTP = REQUEST_CLIENT_NODE_ENABLED ? require('http') : undefined;

export const OptionalFetchRequestClient = REQUEST_CLIENT_FETCH_ENABLED ? require("./requestClient/fetch/FetchRequestClient") : undefined;

export const OptionalNodeRequestClient = REQUEST_CLIENT_NODE_ENABLED ? require("./requestClient/node/NodeRequestClient") : undefined;

export const OptionalFsPromises = REQUEST_CLIENT_NODE_ENABLED ? require("fs/promises") : undefined;
