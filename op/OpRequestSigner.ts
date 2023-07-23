// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { RequestSigner } from "../types/RequestSigner";
import { LogService } from "../LogService";
import { createSign } from "crypto";
import { LogLevel } from "../types/LogLevel";

const LOG = LogService.createLogger( 'OpRequestSigner' );

export class OpRequestSigner {

    public static setLogLevel (level : LogLevel) : void {
        LOG.setLogLevel(level);
    }

    public static create (
        signingKid: string,
        signingKey: string,
    ) : RequestSigner {
        const signingAlgorithm = 'SHA256';
        return (
            bodyString: string
        ) : string => {
            const iat = Math.floor(Date.now() / 1000);
            const headerString = JSON.stringify({
                "b64": false,
                "crit": ["b64", "urn:op.api.iat"],
                "alg": "RS256",
                "urn:op.api.iat": iat,
                "kid": signingKid
            });
            const headerEnc = Buffer.from(headerString, 'utf8').toString('base64url');
            LOG.debug(`HEADER_ENC = "${headerEnc}"`);
            const sign = createSign(signingAlgorithm);
            sign.write(`${headerEnc}.${bodyString}`);
            sign.end();
            const signatureString = sign.sign(signingKey, 'base64url');
            LOG.debug(`SIGNATURE = "${signatureString}"`);
            const requestSignatureString = `${headerEnc}..${signatureString}`;
            LOG.debug(`REQ_SIGNATURE = "${requestSignatureString}"`);
            return requestSignatureString;
        };
    }

}

