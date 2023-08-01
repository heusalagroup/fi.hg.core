// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ArgumentConfiguration } from "./ArgumentConfiguration";

/**
 * User defined program arguments.
 *
 * @example
 *         {
 *             backend : [ ArgumentType.STRING, '--backend', '-b', 'AGENT_BACKEND', 'localhost' ]
 *         }
 */
export interface ArgumentConfigurationMap {
    [key: string]: ArgumentConfiguration;
}
