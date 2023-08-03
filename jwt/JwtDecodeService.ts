// Copyright (c) 2021-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../Json";
import { LogLevel } from "../types/LogLevel";

export interface JwtDecodeService {

    setLogLevel (level: LogLevel): void;

    decodePayload (token: string) : ReadonlyJsonObject;

    decodePayloadAudience (token: string) : string;

    decodePayloadSubject (token: string) : string;

    decodePayloadVerified (token: string) : boolean;

}
