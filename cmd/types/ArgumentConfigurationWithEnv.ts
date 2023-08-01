// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { UserDefinedArgumentType } from "./UserDefinedArgumentType";

/**
 * User defined program arguments.
 *
 * Type | Long argument | Short argument | Environment variable name
 *
 * @example
 *         [ ArgumentType.STRING, '--backend', undefined, undefined ]
 * @example
 *         [ ArgumentType.STRING, undefined, '-b', undefined ]
 * @example
 *         [ ArgumentType.STRING, '--backend', '-b', undefined ]
 * @example
 *         [ ArgumentType.STRING, '--backend', '-b', 'AGENT_BACKEND' ]
 * @example
 *         [ ArgumentType.STRING, '--backend', '-b' ]
 */
export type ArgumentConfigurationWithEnv = readonly [
    UserDefinedArgumentType,
        string | undefined,
        string | undefined,
        string | undefined
];
