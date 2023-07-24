// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { TestCallbackNonStandardOf } from "../types/TestCallback";
import { ExplainCallback } from "../types/ExplainCallback";
import { JsonAny, parseJson } from "../Json";
import { OpAuthClient } from "./OpAuthClient";
import { LogLevel } from "../types/LogLevel";
import { LogService } from "../LogService";
import { RequestClient } from "../RequestClient";
import { RequestSigner } from "../types/RequestSigner";

const LOG = LogService.createLogger( 'OpRequestUtils' );

export class OpRequestUtils {

    public static setLogLevel (level : LogLevel) : void {
        LOG.setLogLevel(level);
    }

    /**
     *
     * @param token
     */
    public static createRequestHeaders (
        token : string
    ) : {[key: string]: string} {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'X-Request-ID': OpRequestUtils.createRequestId()
        };
    }

    /**
     * Create unique ID for this request
     */
    public static createRequestId () : string {
        return `${Date.now()}-${(Math.random()*100000000).toFixed(0)}`;
    }

    /**
     * Authenticates with the Op API if there is no session open.
     *
     * @param authClient
     * @param clientId
     * @param clientSecret
     */
    public static async authenticateIfNot (
        authClient   : OpAuthClient,
        clientId     : string,
        clientSecret : string,
    ) : Promise<void> {
        if (!authClient.isAuthenticated()) {
            await authClient.authenticate(clientId, clientSecret);
        }
    }

    /**
     * Performs JSON request on the OP API.
     *
     * Use `await OpRequestUtils.authenticateIfNot()` before calling this to
     * verify there is open API access active.
     *
     * @param requestClient
     * @param authClient
     * @param url
     * @param path
     * @param isDTO
     * @param explainDTO
     * @param dtoName
     */
    public static async getJsonRequest<T> (
        requestClient: RequestClient,
        authClient: OpAuthClient,
        url: string,
        path: string,
        isDTO: TestCallbackNonStandardOf<T>,
        explainDTO: ExplainCallback,
        dtoName : string,
    ) : Promise<T> {
        const dto : JsonAny | undefined = await requestClient.getJson(
            `${url}${path}`,
            OpRequestUtils.createRequestHeaders(authClient.getAccessKey())
        );
        if (!isDTO(dto)) {
            LOG.debug(`'${path}': invalid response = `, dto);
            throw new TypeError(`'${path}': Response was not ${dtoName}: ${explainDTO(dto)}`);
        }
        return dto;
    }

    /**
     * Initiate a signed POST request.
     *
     * Use `await OpRequestUtils.authenticateIfNot()` before calling this to
     * verify there is open API access active.
     *
     * @param requestClient
     * @param authClient
     * @param requestSigner
     * @param url
     * @param path Request path
     * @param body Request body
     * @param isDTO Response DTO check callback
     * @param explainDTO Response DTO explain callback
     * @param dtoName Response DTO type name
     */
    public static async postSignedRequest<BodyT, T> (
        requestClient: RequestClient,
        authClient: OpAuthClient,
        requestSigner : RequestSigner,
        url: string,
        path: string,
        body: BodyT,
        isDTO: TestCallbackNonStandardOf<T>,
        explainDTO: ExplainCallback,
        dtoName : string,
    ) : Promise<T> {
        const token = authClient.getAccessKey();
        const bodyString : string = JSON.stringify(body);
        const xReqSignature : string = requestSigner(bodyString);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'X-Req-Signature': xReqSignature
        };
        const resultString = await requestClient.postText(
            `${url}${path}`,
            bodyString,
            headers
        );
        const dto = parseJson(resultString!);
        if (!isDTO(dto)) {
            LOG.debug(`'${path}': Response = `, dto);
            throw new TypeError(`'${path}': Response was not ${dtoName}: ${explainDTO(dto)}`);
        }
        return dto;
    }

}
