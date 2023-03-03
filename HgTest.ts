// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogService } from "./LogService";
import { LogLevel } from "./types/LogLevel";
import { RequestClientInterface } from "./requestClient/RequestClientInterface";
import { MockRequestClient } from "./requestClient/mock/MockRequestClient";
import { RequestClient } from "./RequestClient";

const LOG = LogService.createLogger('HgTest');

export class HgTest {

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    /**
     * This method will initialize our libraries using frontend implementations.
     *
     * Right now it will call `RequestClient.setClient()` with a standard NodeJS
     * implementation. It has a dependency to NodeJS's http and https modules.
     *
     * @param requestClient
     */
    public static initialize (
        requestClient ?: RequestClientInterface | undefined
    ) {
        if (!requestClient) {
            requestClient = new MockRequestClient();
        }
        RequestClient.setClient(requestClient);
    }

}
