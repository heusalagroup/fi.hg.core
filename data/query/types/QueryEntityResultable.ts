// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryResultable } from "./QueryResultable";
import { EntityField } from "../../types/EntityField";
import { TemporalProperty } from "../../types/TemporalProperty";

export interface QueryEntityResultable extends QueryResultable {


    includeEntityFields (
        tableName           : string,
        fields              : readonly EntityField[],
        temporalProperties  : readonly TemporalProperty[]
    ): void;


}
