// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { split } from "./split";
import { startsWith } from "./startsWith";
import { parseInteger } from "../types/Number";

export interface DiffHunk {
    oldStart: number;
    newStart: number;
    oldLines: number;
    newLines: number;
}

/**
 * Splits a diff string into an array of chunks, where each chunk represents a
 * single file.
 *
 * Each chunk is a string that contains the full diff of a file, including the
 * hunk headers.
 *
 * A hunk header has the format `@@ -REMOVED,LINES +ADDED,LINES @@`, and
 * specifies the number of lines that were removed or added.
 *
 * Here is an example of a chunk:
 *
 * ```diff
 * diff --git a/AuthorizationClientService.ts b/AuthorizationClientService.ts
 * index 6cacefd..2c1b136 100644
 * --- a/AuthorizationClientService.ts
 * +++ b/AuthorizationClientService.ts
 * @@ -2,10 +2,10 @@
 *
 *  import { RequestClient } from "./RequestClient";
 *  import { LogService } from "./LogService";
 * -import { isString } from "./modules/lodash";
 *  import { RequestError } from "./request/types/RequestError";
 *  import { RequestStatus } from "./request/types/RequestStatus";
 *  import { AuthorizationUtils } from "./AuthorizationUtils";
 * +import { isString } from "./types/String";
 *
 *  const LOG = LogService.createLogger('AuthorizationClientService');
 * ```
 *
 * A chunk starts with an optional `diff --git` line, followed by an optional
 * `index HASH1..HASH2 PERMISSIONS` line, followed by `---`, `+++`, and `@@`
 * lines, and then the actual diff. The chunk ends when a new `diff --git`
 * line is encountered.
 *
 * @param diffString The diff string to split into chunks
 * @returns An array of chunks
 */
export function diffReader (diffString: string) : string[] {
    const chunks: string[] = [];
    let currentChunk = '';
    let currentHunk: DiffHunk | null = null;
    for (const line of split(diffString, '\n')) {

        if (startsWith(line, 'diff --git')) {
            if (currentChunk) {
                chunks.push(currentChunk);
            }
            currentChunk = line + '\n';
            currentHunk = null;
        } else if (startsWith(line, '@@')) {
            const hunk = parseDiffHunk(line);
            if (hunk) {
                currentHunk = hunk;
            }
            currentChunk += line + '\n';
        } else if ( currentHunk || startsWith(line, '-') ) {
            currentChunk += line + '\n';
            if (currentHunk) {
                if (startsWith(line, '-')) {
                    currentHunk.oldLines--;
                } else if (startsWith(line, '+')) {
                    currentHunk.newLines--;
                } else {
                    currentHunk.oldLines--;
                    currentHunk.newLines--;
                }
            }
        } else {
            currentChunk += line + '\n';
        }
    }
    if (currentChunk) {
        chunks.push(currentChunk.substring(0, currentChunk.length-1));
    }
    return chunks;
}

/**
 *
 * @param line
 */
export function parseDiffHunk (line: string) : DiffHunk | null {
    let res = /^@@ -(\d+),\d+ \+(\d+)(,\d+)? @@/.exec(line);
    if (res && res.length >= 3) {
        const [, oldStartString, newStartString] = res;
        const oldStart = parseInteger(oldStartString);
        const newStart = parseInteger(newStartString);
        if ( oldStart !== undefined && newStart !== undefined ) {
            return {
                oldStart,
                oldLines: 0,
                newStart,
                newLines: 0,
            };
        }
    }
    res = /^@@ -(\d+) \+(\d+)(,\d+)? @@/.exec(line);
    if (res && res.length >= 3) {
        const [, oldStartString, newStartString] = res;
        const oldStart = parseInteger(oldStartString);
        const newStart = parseInteger(newStartString);
        if ( oldStart !== undefined && newStart !== undefined ) {
            return {
                oldStart,
                oldLines: 0,
                newStart,
                newLines: 0,
            };
        }
    }
    return null;
}
