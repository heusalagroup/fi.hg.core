// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PermissionList } from "../PermissionService";

export interface PermissionManager {
    getPermissionListByEntityId (entityId: string) : PermissionList;
}
