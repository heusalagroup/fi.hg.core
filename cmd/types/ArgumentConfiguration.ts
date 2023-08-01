// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ArgumentConfigurationWithEnv } from "./ArgumentConfigurationWithEnv";
import { ArgumentConfigurationWithoutEnv } from "./ArgumentConfigurationWithoutEnv";
import { ArgumentConfigurationWithEnvAndDefaultValue } from "./ArgumentConfigurationWithEnvAndDefaultValue";

/**
 * User defined program arguments.
 *
 * Type | Long argument | Short argument | Environment variable name | default value
 *
 * @example
 *         [ ArgumentType.STRING, '--backend', undefined, undefined, 'localhost' ]
 * @example
 *         [ ArgumentType.STRING, undefined, '-b', undefined, 'localhost' ]
 * @example
 *         [ ArgumentType.STRING, '--backend', '-b', undefined, 'localhost' ]
 * @example
 *         [ ArgumentType.STRING, '--backend', '-b', 'AGENT_BACKEND', 'localhost' ]
 * @example
 *         [ ArgumentType.STRING, '--backend', '-b', 'AGENT_BACKEND' ]
 * @example
 *         [ ArgumentType.STRING, '--backend', '-b' ]
 */
export type ArgumentConfiguration = (
    ArgumentConfigurationWithEnv
    | ArgumentConfigurationWithoutEnv
    | ArgumentConfigurationWithEnvAndDefaultValue
    );
