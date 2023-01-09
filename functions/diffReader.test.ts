// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { diffReader } from "./diffReader";

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
