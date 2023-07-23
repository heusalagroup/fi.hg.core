// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { RequestClientImpl } from "./RequestClientImpl";
import { LogService } from "./LogService";
import { RequestError } from "./request/types/RequestError";
import { RequestStatus } from "./request/types/RequestStatus";
import { AuthorizationUtils } from "./AuthorizationUtils";
import { isString } from "./types/String";

const LOG = LogService.createLogger('AuthorizationClientService');

export interface AuthorizationResultDTO {
    email : string;
}

export function isAuthorizationResultDTO (value : any) : value is AuthorizationResultDTO {
    return (
        !!value && isString(value?.email) && !!value?.email
    );
}

/**
 * Experimental service. Not recommended to use. May change later.
 */
export class AuthorizationClientService {

    private readonly _serviceUrl : string;

    public constructor(serviceUrl : string) {
        this._serviceUrl = serviceUrl;
    }

    public async verifySessionJwt (token: string) : Promise<AuthorizationResultDTO | undefined> {

        try {

            const result = await RequestClientImpl.postJson(`${this._serviceUrl}/verify`, {
                token
            });

            if (!isAuthorizationResultDTO(result)) {
                LOG.debug('verifyJwt: result not AuthorizationResultDTO: ', result);
                return undefined;
            }

            LOG.debug('verifyJwt: result: ', result);

            return {
                email : result.email
            };

        } catch (err) {
            LOG.error('verifyJwt: error: ', err);
            return undefined;
        }

    }

    public static async verifySessionAuthorizationHeader (
        authService : AuthorizationClientService,
        header      : string
    ) : Promise<AuthorizationResultDTO> {

        const jwt : string | undefined = AuthorizationUtils.parseBearerToken(header);

        if (!jwt) {
            LOG.debug('verifySessionAuthorizationHeader: Unsupported header value: ', header);
            throw new RequestError(RequestStatus.Forbidden, 'Forbidden');
        }

        LOG.debug('verifyAuthorizationHeader: jwt: ', jwt);

        const result : AuthorizationResultDTO | undefined = await authService.verifySessionJwt(jwt);

        if (!result) {
            LOG.debug('verifyAuthorizationHeader: Jwt is not valid: ', jwt);
            throw new RequestError(RequestStatus.Forbidden, 'Forbidden');
        }

        LOG.debug('verifyAuthorizationHeader: Jwt verified successfully: ', jwt);

        return {
            email: result.email
        };

    }

}

