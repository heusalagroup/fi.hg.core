// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { log } from "./log";

/**
 * Change the current working directory.
 *
 * Utility for testing framework.
 *
 * @param dir
 */
export function chdir (dir: string) : void {
    try {
        log(`# cd ${dir}`)
        process.chdir(dir);
    } catch (err) {
        throw new Error(`Directory change to '${dir}' failed: ${err}`);
    }
}
