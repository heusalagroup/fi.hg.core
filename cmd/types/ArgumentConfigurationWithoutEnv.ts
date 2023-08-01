// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { UserDefinedArgumentType } from "./UserDefinedArgumentType";

/**
 * User defined program arguments.
 *
 * Type | Long argument | Short argument
 *
 * @example
 *         [ ArgumentType.STRING, '--backend', undefined ]
 * @example
 *         [ ArgumentType.STRING, undefined, '-b' ]
 * @example
 *         [ ArgumentType.STRING, '--backend', '-b' ]
 */
export type ArgumentConfigurationWithoutEnv = readonly [
    UserDefinedArgumentType,
        string | undefined,
        string | undefined
];
