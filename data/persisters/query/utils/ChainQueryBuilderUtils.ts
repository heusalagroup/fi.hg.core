// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { forEach } from "../../../../functions/forEach";
import { find } from "../../../../functions/find";
import { Where } from "../../../Where";
import { EntityField } from "../../../types/EntityField";
import { Condition } from "../../../conditions/types/Condition";
import { isWhereConditionTarget } from "../../../conditions/types/WhereConditionTarget";
import { isAndCondition } from "../../../conditions/AndCondition";
import { isOrCondition } from "../../../conditions/OrCondition";
import { isPropertyNameTarget } from "../../../conditions/types/PropertyNameTarget";
import { isEqualCondition } from "../../../conditions/EqualCondition";
import { isBetweenCondition } from "../../../conditions/BetweenCondition";
import { isBeforeCondition } from "../../../conditions/BeforeCondition";
import { isAfterCondition } from "../../../conditions/AfterCondition";
import { ChainQueryBuilder, ChainQueryBuilderFactory } from "../types/ChainQueryBuilder";

export class ChainQueryBuilderUtils {

    /**
     *
     * @param builder
     * @param where
     * @param completeTableName
     * @param fields
     * @param buildAndChain
     * @param buildOrChain
     */
    public static buildChain (
        builder           : ChainQueryBuilder,
        where             : Where,
        completeTableName : string,
        fields            : readonly EntityField[],
        buildAndChain     : ChainQueryBuilderFactory,
        buildOrChain      : ChainQueryBuilderFactory
    ) : void {
        forEach(
            where.getConditions(),
            (item: Condition) => {
                const target = item.getConditionTarget();

                if (isWhereConditionTarget(target)) {

                    if (isAndCondition(item)) {
                        const and : ChainQueryBuilder = buildAndChain();
                        ChainQueryBuilderUtils.buildChain(and, item.getWhere(), completeTableName, fields, buildAndChain, buildOrChain);
                        builder.setFromQueryBuilder(and);
                        return;
                    }

                    if (isOrCondition(item)) {
                        const or : ChainQueryBuilder = buildOrChain();
                        ChainQueryBuilderUtils.buildChain(or, item.getWhere(), completeTableName, fields, buildAndChain, buildOrChain);
                        builder.setFromQueryBuilder(or);
                        return;
                    }

                    throw new TypeError(`Unsupported condition for where target: ${item}`);
                }

                if (isPropertyNameTarget(target)) {
                    const propertyName = target.getPropertyName();
                    const columnName = find(fields, (field) => field.propertyName === propertyName)?.columnName;
                    if (!columnName) throw new TypeError(`Could not find column name for property "${propertyName}" from table "${completeTableName}"`);

                    if (isEqualCondition(item)) {
                        const value = item.getValue();
                        builder.setColumnEquals(completeTableName, columnName, value);
                    } else if (isBetweenCondition(item)) {
                        const start = item.getRangeStart();
                        const end = item.getRangeEnd();
                        builder.setColumnBetween(completeTableName, columnName, start, end);
                    } else if (isBeforeCondition(item)) {
                        const value = item.getValue();
                        builder.setColumnBefore(completeTableName, columnName, value);
                    } else if (isAfterCondition(item)) {
                        const value = item.getValue();
                        builder.setColumnAfter(completeTableName, columnName, value);
                    } else {
                        throw new TypeError(`The condition was unsupported: ${item}`)
                    }

                } else {
                    throw new TypeError(`The condition target was unsupported: ${target}`)
                }

            }
        );
    }

}
