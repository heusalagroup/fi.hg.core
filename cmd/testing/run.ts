// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { execSync } from "child_process";
import { log } from "./log";

/**
 * Run command on system synchronously and return data as `Buffer`.
 *
 * Utility for testing framework.
 *
 * @param command
 */
export function run (command : string) {
    try {
        log(`# ${command}`)
        return execSync(command);
    } catch (err) {
        throw new Error(`Command '${command}' failed: ${err}`);
    }
}
