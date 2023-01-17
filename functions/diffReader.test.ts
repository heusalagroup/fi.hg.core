// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { diffReader, parseDiffHunk } from "./diffReader";

const DIFF_CHUNK_1 = `diff --git a/AuthorizationClientService.ts b/AuthorizationClientService.ts
index 6cacefd..2c1b136 100644
--- a/AuthorizationClientService.ts
+++ b/AuthorizationClientService.ts
@@ -2,10 +2,10 @@

 import { RequestClient } from "./RequestClient";
 import { LogService } from "./LogService";
-import { isString } from "./modules/lodash";
 import { RequestError } from "./request/types/RequestError";
 import { RequestStatus } from "./request/types/RequestStatus";
 import { AuthorizationUtils } from "./AuthorizationUtils";
+import { isString } from "./types/String";

 const LOG = LogService.createLogger('AuthorizationClientService');

`;

const DIFF_CHUNK_2 = `diff --git a/AuthorizationUtils.ts b/AuthorizationUtils.ts
index a32ddcf..0cea9ec 100644
--- a/AuthorizationUtils.ts
+++ b/AuthorizationUtils.ts
@@ -1,7 +1,8 @@
 // Copyright (c) 2022. Heusala Group. All rights reserved.
 // Copyright (c) 2020-2021. Sendanor. All rights reserved.

-import { startsWith, trim } from "./modules/lodash";
+import { startsWith } from "./functions/startsWith";
+import { trim } from "./functions/trim";

 export class AuthorizationUtils {

`;

const DIFF_CHUNK_3 = `diff --git a/CacheService.ts b/CacheService.ts
index 772a587..9b927e0 100644
--- a/CacheService.ts
+++ b/CacheService.ts
@@ -1,6 +1,6 @@
 // Copyright (c) 2021-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

-import { reduce } from "./modules/lodash";
+import { reduce } from "./functions/reduce";

 export interface CacheClearCallback {
     () : Promise<void> | void;
`;

describe('diffReader', () => {

    it('can split chunks', () => {
        const result = diffReader(DIFF_CHUNK_1 + DIFF_CHUNK_2 + DIFF_CHUNK_3);
        expect(result.length).toBe(3);
        expect(result[0]).toBe(DIFF_CHUNK_1);
        expect(result[1]).toBe(DIFF_CHUNK_2);
        expect(result[2]).toBe(DIFF_CHUNK_3);
    });

});

describe ('parseDiffHunk', () => {

    it( 'can parse hunks', () => {

        expect( parseDiffHunk('@@ -1,4 +1,8 @@') ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -95,6 +93,8 @@ export class RequestInterfaceUtils {') ).toStrictEqual({newLines: 0, newStart: 93, oldLines: 0, oldStart: 95});

        expect( parseDiffHunk('@@ -0,0 +0 @@')              ).toStrictEqual({newLines: 0, newStart: 0, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1 @@')              ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0 +1,2 @@')              ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0 +1 @@')                ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,10 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,100 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,101 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,103 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,11 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,115 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,116 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,119 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,120 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,124 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,127 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,13 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,134 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,14 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,148 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,150 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,154 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,167 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,170 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,173 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,18 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,184 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,19 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,193 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,20 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,201 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,21 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,214 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,214 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,23 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,24 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,263 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,268 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,27 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,281 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,30 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,31 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,317 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,33 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,35 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,36 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,376 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,38 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,38 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,39 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,40 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,423 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,43 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,44 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,45 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,47 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,49 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,5 @@')            ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,509 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,52 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,58 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,6 @@')            ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,61 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,63 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,68 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,72 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,74 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,752 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,77 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,85 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});
        expect( parseDiffHunk('@@ -0,0 +1,94 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 0});

        expect( parseDiffHunk('@@ -1,10 +1,8 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,10 +1,9 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,11 +1,8 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,11 +1,9 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,12 +1,10 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,13 +1,10 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,13 +1,12 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,13 +1,8 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,13 +1,9 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,14 +1,10 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,14 +1,8 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,15 +1,12 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,15 +1,13 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,15 +1,9 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,16 +1,48 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,1623 +0,0 @@')         ).toStrictEqual({newLines: 0, newStart: 0, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,14 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,15 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,16 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,17 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,18 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,19 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,20 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,21 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,22 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,23 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,24 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,25 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,26 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,27 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,28 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,29 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,3 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,30 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,31 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,32 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,33 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,34 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,35 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,36 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,37 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,38 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,39 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,4 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,40 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,41 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,42 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,43 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,44 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,45 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,46 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,47 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,48 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,49 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,5 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,50 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,51 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,52 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,53 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,54 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,55 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,56 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,57 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,58 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,58 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,59 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,6 @@')           ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,60 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,61 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,62 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,63 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});
        expect( parseDiffHunk('@@ -1,17 +1,64 @@')          ).toStrictEqual({newLines: 0, newStart: 1, oldLines: 0, oldStart: 1});

        expect( parseDiffHunk('@@ -10,17 +10,15 @@ import {')                                                           ).toStrictEqual({newLines: 0, newStart: 10,  oldLines: 0, oldStart: 10});
        expect( parseDiffHunk("@@ -10,4 +11,8 @@ const LOG = LogService.createLogger('ProcessUtils');")                 ).toStrictEqual({newLines: 0, newStart: 11,  oldLines: 0, oldStart: 10});
        expect( parseDiffHunk('@@ -10,5 +10,5 @@ import {')                                                             ).toStrictEqual({newLines: 0, newStart: 10,  oldLines: 0, oldStart: 10});
        expect( parseDiffHunk('@@ -101,5 +186,6 @@ export class CommandArgumentUtils {')                                ).toStrictEqual({newLines: 0, newStart: 186, oldLines: 0, oldStart: 101});
        expect( parseDiffHunk('@@ -102,6 +102,7 @@ export class RequestInterfaceUtils {')                               ).toStrictEqual({newLines: 0, newStart: 102, oldLines: 0, oldStart: 102});
        expect( parseDiffHunk('@@ -104,12 +109,14 @@ export class ProcessUtils {')                                      ).toStrictEqual({newLines: 0, newStart: 109, oldLines: 0, oldStart: 104});
        expect( parseDiffHunk('@@ -11,17 +11,16 @@')                                                                    ).toStrictEqual({newLines: 0, newStart: 11,  oldLines: 0, oldStart: 11});
        expect( parseDiffHunk('@@ -11,7 +11,9 @@ import {')                                                             ).toStrictEqual({newLines: 0, newStart: 11,  oldLines: 0, oldStart: 11});
        expect( parseDiffHunk('@@ -123,5 +156,5 @@ export class Observer<EventName extends keyof any> {')               ).toStrictEqual({newLines: 0, newStart: 156, oldLines: 0, oldStart: 123});
        expect( parseDiffHunk('@@ -124,5 +210,6 @@ export class CommandArgumentUtils {')                                ).toStrictEqual({newLines: 0, newStart: 210, oldLines: 0, oldStart: 124});
        expect( parseDiffHunk('@@ -13,4 +15,7 @@ import { OpenAPIV3 } from "../../types/openapi";')                     ).toStrictEqual({newLines: 0, newStart: 15,  oldLines: 0, oldStart: 13});
        expect( parseDiffHunk('@@ -130,2 +217,82 @@ export class CommandArgumentUtils {')                               ).toStrictEqual({newLines: 0, newStart: 217, oldLines: 0, oldStart: 130});
        expect( parseDiffHunk('@@ -141,5 +140,5 @@ export function getCsvFromJsonObjectList<T = ReadonlyJsonObject> (') ).toStrictEqual({newLines: 0, newStart: 140, oldLines: 0, oldStart: 141});

        expect( parseDiffHunk('@@ -15,4 +17,5 @@ import { BorderStyleLayout } from "./style/layout/BorderStyleLayout";')             ).toStrictEqual({newLines: 0, newStart: 17,    oldLines: 0, oldStart: 15});
        expect( parseDiffHunk('@@ -15,4 +20,5 @@ import { LogLevel } from "../../types/LogLevel";')                                  ).toStrictEqual({newLines: 0, newStart: 20,    oldLines: 0, oldStart: 15});
        expect( parseDiffHunk('@@ -15,4 +42,5 @@ export interface ParsedCommandArgumentObject {')                                    ).toStrictEqual({newLines: 0, newStart: 42,    oldLines: 0, oldStart: 15});
        expect( parseDiffHunk('@@ -168,11 +201,9 @@ export class Observer<EventName extends keyof any> {')                           ).toStrictEqual({newLines: 0, newStart: 201,   oldLines: 0, oldStart: 168});
        expect( parseDiffHunk('@@ -18,5 +50,5 @@ export type ObserverRecord<EventName extends keyof any> = Record<EventName, Obse')  ).toStrictEqual({newLines: 0, newStart: 50,    oldLines: 0, oldStart: 18});
        expect( parseDiffHunk('@@ -191,8 +222,12 @@ export class Observer<EventName extends keyof any> {')                           ).toStrictEqual({newLines: 0, newStart: 222,   oldLines: 0, oldStart: 191});

        expect( parseDiffHunk('@@ -2,10 +2,13 @@')     ).toStrictEqual({newLines: 0, newStart: 2, oldLines: 0, oldStart: 2});
        expect( parseDiffHunk('@@ -2,10 +2,8 @@')      ).toStrictEqual({newLines: 0, newStart: 2, oldLines: 0, oldStart: 2});
        expect( parseDiffHunk('@@ -2,12 +2,9 @@')      ).toStrictEqual({newLines: 0, newStart: 2, oldLines: 0, oldStart: 2});
        expect( parseDiffHunk('@@ -2,13 +2,11 @@')     ).toStrictEqual({newLines: 0, newStart: 2, oldLines: 0, oldStart: 2});
        expect( parseDiffHunk('@@ -2,13 +2,8 @@')      ).toStrictEqual({newLines: 0, newStart: 2, oldLines: 0, oldStart: 2});
        expect( parseDiffHunk('@@ -2,14 +2,8 @@')      ).toStrictEqual({newLines: 0, newStart: 2, oldLines: 0, oldStart: 2});
        expect( parseDiffHunk('@@ -2,14 +2,9 @@')      ).toStrictEqual({newLines: 0, newStart: 2, oldLines: 0, oldStart: 2});
        expect( parseDiffHunk('@@ -2,15 +2,9 @@')      ).toStrictEqual({newLines: 0, newStart: 2, oldLines: 0, oldStart: 2});
        expect( parseDiffHunk('@@ -2,18 +2,9 @@')      ).toStrictEqual({newLines: 0, newStart: 2, oldLines: 0, oldStart: 2});

        expect( parseDiffHunk('@@ -2,5 +2,10 @@')  ).toStrictEqual({newLines: 0, newStart: 2, oldLines: 0, oldStart: 2});
        expect( parseDiffHunk('@@ -2,5 +2,5 @@')   ).toStrictEqual({newLines: 0, newStart: 2, oldLines: 0, oldStart: 2});
        expect( parseDiffHunk('@@ -2,5 +2,6 @@')   ).toStrictEqual({newLines: 0, newStart: 2, oldLines: 0, oldStart: 2});
        expect( parseDiffHunk('@@ -2,5 +2,7 @@')   ).toStrictEqual({newLines: 0, newStart: 2, oldLines: 0, oldStart: 2});
        expect( parseDiffHunk('@@ -2,5 +2,8 @@')   ).toStrictEqual({newLines: 0, newStart: 2, oldLines: 0, oldStart: 2});
        expect( parseDiffHunk('@@ -2,5 +2,9 @@')   ).toStrictEqual({newLines: 0, newStart: 2, oldLines: 0, oldStart: 2});
        expect( parseDiffHunk('@@ -2,6 +2,6 @@')   ).toStrictEqual({newLines: 0, newStart: 2, oldLines: 0, oldStart: 2});
        expect( parseDiffHunk('@@ -2,6 +2,7 @@')   ).toStrictEqual({newLines: 0, newStart: 2, oldLines: 0, oldStart: 2});
        expect( parseDiffHunk('@@ -2,8 +2,14 @@')  ).toStrictEqual({newLines: 0, newStart: 2, oldLines: 0, oldStart: 2});


    });

    it( 'cannot parse invalid lines', () => {

        expect( parseDiffHunk('')  ).toBeNull();
        expect( parseDiffHunk('Hello World')  ).toBeNull();
        expect( parseDiffHunk('-2,6 +2,4')  ).toBeNull();
        expect( parseDiffHunk('12345')  ).toBeNull();
        expect( parseDiffHunk('@@')  ).toBeNull();
        expect( parseDiffHunk('@@@@')  ).toBeNull();
        expect( parseDiffHunk('@@ @@')  ).toBeNull();

    });

});
