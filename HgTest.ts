// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogService } from "./LogService";
import { LogLevel } from "./types/LogLevel";
import { RequestClientAdapter } from "./requestClient/RequestClientAdapter";
import { MockRequestClientAdapter } from "./requestClient/mock/MockRequestClientAdapter";
import { RequestClientImpl } from "./RequestClientImpl";

const LOG = LogService.createLogger('HgTest');

export class HgTest {

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    /**
     * This method will initialize our libraries using frontend implementations.
     *
     * Right now it will call `RequestClientImpl.setClient()` with a standard NodeJS
     * implementation. It has a dependency to NodeJS's http and https modules.
     *
     * @param requestClient The request client adapter to be used by default
     */
    public static initialize (
        requestClient ?: RequestClientAdapter | undefined
    ) {
        if (!requestClient) {
            requestClient = new MockRequestClientAdapter();
        }
        RequestClientImpl.setClient(requestClient);
    }

}
