// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isNonEmptyString } from "../types/String";
import { LogService } from "../LogService";
import { LogLevel } from "../types/LogLevel";
import { explainJsonObject, isJsonObject, parseJson } from "../Json";
import { OP_PRODUCTION_URL } from "./op-constants";
import { OpAuthClient } from "./OpAuthClient";
import { RequestClient } from "../RequestClient";

const LOG = LogService.createLogger( 'OpAuthClientImpl' );

/**
 * OP Auth API implementation
 */
export class OpAuthClientImpl implements OpAuthClient {

    private readonly _client: RequestClient;
    private readonly _url: string;
    private _token: string | undefined;

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    protected constructor (
        client: RequestClient,
        url: string,
        token ?: string | undefined,
    ) {
        this._client = client;
        this._url = url;
        this._token = token;
    }

    public static create (
        client  : RequestClient,
        url     : string = OP_PRODUCTION_URL,
        token  ?: string | undefined,
    ) : OpAuthClientImpl {
        return new OpAuthClientImpl(
            client,
            url,
            token,
        );
    }

    public isAuthenticated () : boolean {
        return !!this._token;
    }

    public async authenticate (
        clientId: string,
        clientSecret: string,
    ) : Promise<void> {
        this._token = await OpAuthClientImpl.getAccessToken(
            this._client,
            this._url,
            clientId,
            clientSecret
        );
    }

    public getAccessKey () : string {
        if (!this._token) throw new Error('Not authenticated');
        return this._token;
    }

    public static async getAccessToken (
        client: RequestClient,
        url: string,
        clientId: string,
        clientSecret: string,
    ): Promise<string> {
        const a = new URLSearchParams();
        a.append('grant_type', 'client_credentials');
        a.append('client_id', clientId);
        a.append('client_secret', clientSecret);
        const credentialsData = a.toString();
        LOG.debug(`getAccessToken: credentialsData = `, credentialsData);
        const response = await client.postText(
            `${url}/corporate-oidc/v1/token`,
            credentialsData,
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        );
        const data = parseJson(response!);
        if (!isJsonObject(data)) {
            LOG.debug(`getAccessToken: response = `, response);
            throw new TypeError(`Response was invalid: ${explainJsonObject(data)}`);
        }
        const accessToken = data?.access_token;
        if (!isNonEmptyString(accessToken)) {
            throw new TypeError('OpAuthClientImpl.getAccessToken: No access token found in the response');
        }
        return accessToken;
    }

}
