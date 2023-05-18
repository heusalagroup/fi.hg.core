// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { forEach } from "../../../functions/forEach";
import { find } from "../../../functions/find";
import { Where } from "../../Where";
import { EntityField } from "../../types/EntityField";
import { Condition } from "../../conditions/types/Condition";
import { isWhereConditionTarget } from "../../conditions/types/WhereConditionTarget";
import { isAndCondition } from "../../conditions/AndCondition";
import { isOrCondition } from "../../conditions/OrCondition";
import { isPropertyNameTarget } from "../../conditions/types/PropertyNameTarget";
import { isEqualCondition } from "../../conditions/EqualCondition";
import { isBetweenCondition } from "../../conditions/BetweenCondition";
import { isBeforeCondition } from "../../conditions/BeforeCondition";
import { isAfterCondition } from "../../conditions/AfterCondition";
import { ChainQueryBuilder, ChainQueryBuilderFactory } from "../types/ChainQueryBuilder";
import { TemporalProperty } from "../../types/TemporalProperty";
import { isJsonColumnDefinition, isTimeColumnDefinition } from "../../types/ColumnDefinition";

export class ChainQueryBuilderUtils {

    /**
     *
     * @param builder
     * @param where
     * @param completeTableName
     * @param fields
     * @param temporalProperties
     * @param timeColumnDefinitions
     * @param buildAndChain
     * @param buildOrChain
     */
    public static buildChain (
        builder               : ChainQueryBuilder,
        where                 : Where,
        completeTableName     : string,
        fields                : readonly EntityField[],
        temporalProperties    : readonly TemporalProperty[],
        buildAndChain         : ChainQueryBuilderFactory,
        buildOrChain          : ChainQueryBuilderFactory
    ) : void {
        forEach(
            where.getConditions(),
            (item: Condition) => {
                const target = item.getConditionTarget();

                if (isWhereConditionTarget(target)) {

                    if (isAndCondition(item)) {
                        const and : ChainQueryBuilder = buildAndChain();
                        ChainQueryBuilderUtils.buildChain(and, item.getWhere(), completeTableName, fields, temporalProperties, buildAndChain, buildOrChain);
                        builder.setFromQueryBuilder(and);
                        return;
                    }

                    if (isOrCondition(item)) {
                        const or : ChainQueryBuilder = buildOrChain();
                        ChainQueryBuilderUtils.buildChain(or, item.getWhere(), completeTableName, fields, temporalProperties, buildAndChain, buildOrChain);
                        builder.setFromQueryBuilder(or);
                        return;
                    }

                    throw new TypeError(`Unsupported condition for where target: ${item}`);
                }

                if (isPropertyNameTarget(target)) {
                    const propertyName = target.getPropertyName();
                    const field = find(fields, (field) => field.propertyName === propertyName);
                    if (!field) throw new TypeError(`Could not find field info for property "${propertyName}" from table "${completeTableName}"`);
                    const columnName = field?.columnName;
                    if (!columnName) throw new TypeError(`Could not find column name for property "${propertyName}" from table "${completeTableName}"`);

                    const { columnDefinition } = field;

                    const temporalProperty = find(temporalProperties, item => item.propertyName === propertyName);
                    const temporalType = temporalProperty?.temporalType;

                    const isTime : boolean = !!temporalType || isTimeColumnDefinition(columnDefinition);
                    const isJson : boolean = isTime ? false : isJsonColumnDefinition(columnDefinition);

                    if (isEqualCondition(item)) {
                        const value = item.getValue();
                        if (isTime) {
                            builder.setColumnEqualsAsTime(completeTableName, columnName, value);
                        } else if (isJson) {
                            builder.setColumnEqualsAsJson(completeTableName, columnName, value);
                        } else {
                            builder.setColumnEquals(completeTableName, columnName, value);
                        }
                    } else if (isBetweenCondition(item)) {
                        const start = item.getRangeStart();
                        const end = item.getRangeEnd();
                        if (isTime) {
                            builder.setColumnBetweenAsTime( completeTableName, columnName, start, end );
                        } else {
                            builder.setColumnBetween(completeTableName, columnName, start, end);
                        }
                    } else if (isBeforeCondition(item)) {
                        const value = item.getValue();
                        if (isTime) {
                            builder.setColumnBeforeAsTime(completeTableName, columnName, value);
                        } else {
                            builder.setColumnBefore( completeTableName, columnName, value );
                        }
                    } else if (isAfterCondition(item)) {
                        const value = item.getValue();
                        if (isTime) {
                            builder.setColumnAfterAsTime(completeTableName, columnName, value);
                        } else {
                            builder.setColumnAfter( completeTableName, columnName, value );
                        }
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
