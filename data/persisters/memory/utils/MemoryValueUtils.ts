// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Where } from "../../../Where";
import { reduce } from "../../../../functions/reduce";
import { Condition } from "../../../conditions/types/Condition";
import { isPropertyNameTarget, PropertyNameTarget } from "../../../conditions/types/PropertyNameTarget";
import { BetweenCondition, isBetweenCondition } from "../../../conditions/BetweenCondition";
import { EqualCondition, isEqualCondition } from "../../../conditions/EqualCondition";
import { isWhereConditionTarget } from "../../../conditions/types/WhereConditionTarget";
import { isOrCondition } from "../../../conditions/OrCondition";
import { isAndCondition } from "../../../conditions/AndCondition";
import { BeforeCondition, isBeforeCondition } from "../../../conditions/BeforeCondition";
import { AfterCondition, isAfterCondition } from "../../../conditions/AfterCondition";
import { isEqual } from "../../../../functions/isEqual";
import { get } from "../../../../functions/get";

// import { LogService } from "../../../../LogService";
// const LOG = LogService.createLogger('MemoryItemUtils');

export type MemoryValueTestCallback<T=any> = ((item: T) => boolean);
export type MemoryValueFetchCallback<T=any> = ((item: T) => T | undefined);

export class MemoryValueUtils {

    /**
     *
     * @param where
     */
    public static buildMatcherFunctionFromWhereUsingAnd (
        where: Where
    ) : MemoryValueTestCallback {
        return reduce(
            where.getConditions(),
            (
                ret : MemoryValueTestCallback | undefined,
                item : Condition
            ) : MemoryValueTestCallback => {
                //LOG.debug(`reduce and: start: item = `, item);
                const target = item.getConditionTarget();
                //LOG.debug(`reduce and: target = `, target);
                if (isWhereConditionTarget(target)) {
                    //LOG.debug(`reduce and: target where = `, target.getWhere());
                    if (isOrCondition(item)) return this.buildMatcherFunctionFromWhereUsingOr( item.getWhere() );
                    if (isAndCondition(item)) return this.buildMatcherFunctionFromWhereUsingAnd( item.getWhere() );
                    //LOG.debug(`reduce and: item = `, item);
                    throw new TypeError(`Unsupported condition target for where clause: ${item}`);
                }
                if (!isPropertyNameTarget(target)) {
                    if (isOrCondition(item)) throw new TypeError(`Unsupported condition target for or conditions: ${target}`);
                    if (isAndCondition(item)) throw new TypeError(`Unsupported condition target for and conditions: ${target}`);
                    //LOG.debug(`reduce and: target = `, target);
                    throw new TypeError(`Unsupported condition target: ${target}`);
                }
                if (isBetweenCondition(item)) {
                    //LOG.debug(`reduce and: isBetweenCondition: item = `, item);
                    return this.buildBetweenRangeConditionAndTest(ret, item, target);
                } else if (isEqualCondition(item)) {
                    //LOG.debug(`reduce and: isEqualCondition: item = `, item);
                    return this.buildEqualConditionAndTest(ret, item, target);
                } else if (isBeforeCondition(item)) {
                    //LOG.debug(`reduce and: isBeforeCondition: item = `, item);
                    return this.buildBeforeConditionAndTest(ret, item, target);
                } else if (isAfterCondition(item)) {
                    //LOG.debug(`reduce and: isAfterCondition: item = `, item);
                    return this.buildAfterConditionAndTest(ret, item, target);
                } else {
                    //LOG.debug(`reduce and: unknown: item = `, item);
                    throw new TypeError(`Unsupported condition: ${item}`);
                }
            },
            undefined
        ) as MemoryValueTestCallback;
    }

    /**
     *
     * @param where
     */
    public static buildMatcherFunctionFromWhereUsingOr (
        where: Where
    ) : MemoryValueTestCallback {
        return reduce(
            where.getConditions(),
            (
                ret  : MemoryValueTestCallback | undefined,
                item : Condition
            ) : MemoryValueTestCallback => {

                //LOG.debug(`reduce or: start: item = `, item);

                const target = item.getConditionTarget();
                //LOG.debug(`reduce or: target = `, target);
                if (isWhereConditionTarget(target)) {
                    //LOG.debug(`reduce or: target where = `, target.getWhere());
                    if (isOrCondition(item)) return this.buildMatcherFunctionFromWhereUsingOr( item.getWhere() );
                    if (isAndCondition(item)) return this.buildMatcherFunctionFromWhereUsingAnd( item.getWhere() );
                    //LOG.debug(`reduce or: item = `, item);
                    throw new TypeError(`Unsupported condition target for where clause: ${item}`);
                }
                if (!isPropertyNameTarget(target)) {
                    //LOG.debug(`reduce or: target = `, target);
                    if (isOrCondition(item)) throw new TypeError(`Unsupported condition target for or conditions: ${target}`);
                    if (isAndCondition(item)) throw new TypeError(`Unsupported condition target for and conditions: ${target}`);
                    //LOG.debug(`reduce or: item = `, item, target);
                    throw new TypeError(`Unsupported condition target or item: ${target} / ${item}`);
                }
                if (isBetweenCondition(item)) {
                    //LOG.debug(`reduce or: isBetweenCondition: item = `, item);
                    return this.buildBetweenRangeConditionOrTest(ret, item, target);
                } else if (isEqualCondition(item)) {
                    //LOG.debug(`reduce or: isEqualCondition: item = `, item);
                    return this.buildEqualConditionOrTest(ret, item, target);
                } else {
                    //LOG.debug(`reduce or: unknown: item = `, item);
                    throw new TypeError(`Unsupported condition: ${item}`);
                }
            },
            undefined
        ) as MemoryValueTestCallback;
    }

    public static buildBetweenRangeConditionAndTest<T = any> (
        ret    : MemoryValueTestCallback | undefined,
        item   : BetweenCondition,
        target : PropertyNameTarget,
    ) : MemoryValueTestCallback {
        const propertyName = target.getPropertyName();
        const rangeStart = item.getRangeStart();
        const rangeEnd = item.getRangeEnd();
        const stagingTest = this.buildRangeTest<T>(propertyName, rangeStart, rangeEnd);
        if (ret === undefined) return stagingTest;
        return this.buildAndTest<T>(ret, stagingTest);
    }

    public static buildEqualConditionAndTest<T = any> (
        ret    : MemoryValueTestCallback | undefined,
        item   : EqualCondition,
        target : PropertyNameTarget
    ) : MemoryValueTestCallback {
        const propertyName = target.getPropertyName();
        const propertyValue = item.getValue();
        const stagingTest = this.buildEqualTest(propertyName, propertyValue);
        if (ret === undefined) return stagingTest;
        return this.buildAndTest<T>(ret, stagingTest);
    }

    public static buildBeforeConditionAndTest<T = any> (
        ret    : MemoryValueTestCallback | undefined,
        item   : BeforeCondition,
        target : PropertyNameTarget
    ) : MemoryValueTestCallback {
        const propertyName = target.getPropertyName();
        const propertyValue = item.getValue();
        const stagingTest = this.buildBeforeTest(propertyName, propertyValue);
        if (ret === undefined) return stagingTest;
        return this.buildAndTest<T>(ret, stagingTest);
    }

    public static buildAfterConditionAndTest<T = any> (
        ret    : MemoryValueTestCallback | undefined,
        item   : AfterCondition,
        target : PropertyNameTarget
    ) : MemoryValueTestCallback<T> {
        const propertyName = target.getPropertyName();
        const propertyValue = item.getValue();
        const stagingTest = this.buildAfterTest(propertyName, propertyValue);
        if (ret === undefined) return stagingTest;
        return this.buildAndTest<T>(ret, stagingTest);
    }

    public static buildBetweenRangeConditionOrTest<T = any> (
        ret    : MemoryValueTestCallback | undefined,
        item   : BetweenCondition,
        target : PropertyNameTarget,
    ) : MemoryValueTestCallback {
        const propertyName = target.getPropertyName();
        const rangeStart = item.getRangeStart();
        const rangeEnd = item.getRangeEnd();
        const stagingTest = this.buildRangeTest(propertyName, rangeStart, rangeEnd);
        if (ret === undefined) return stagingTest;
        return this.buildOrTest<T>(ret, stagingTest);
    }

    public static buildEqualConditionOrTest<T = any> (
        ret    : MemoryValueTestCallback | undefined,
        item   : EqualCondition,
        target : PropertyNameTarget
    ) : MemoryValueTestCallback {
        const propertyName = target.getPropertyName();
        const propertyValue = item.getValue();
        const stagingTest = this.buildEqualTest(propertyName, propertyValue);
        if ( ret === undefined ) return stagingTest;
        return this.buildOrTest<T>(ret, stagingTest);
    }

    public static buildOrTest<T = any> (
        a    : MemoryValueTestCallback,
        b    : MemoryValueTestCallback,
    ) : MemoryValueTestCallback {
        return (m: T) : boolean => a(m) || b(m);
    }

    public static buildAndTest<T = any> (
        a    : MemoryValueTestCallback,
        b    : MemoryValueTestCallback,
    ) : MemoryValueTestCallback {
        return (m: T) : boolean => a(m) && b(m);
    }

    public static buildValueGetter<T = any> (
        propertyName: string
    ) : MemoryValueFetchCallback {
        return (m: T) : any => this.getPropertyValue(m, propertyName);
    }

    public static buildRangeTest<T = any> (
        propertyName: string,
        start: T,
        end: T
    ) : MemoryValueTestCallback {
        const getValue = this.buildValueGetter(propertyName);
        return (m: T) : boolean => this.rangeTest(getValue(m), start, end);
    }

    public static buildEqualTest<T = any> (
        propertyName: string,
        propertyValue: any
    ) : MemoryValueTestCallback {
        const getValue = this.buildValueGetter(propertyName);
        return (m: T) : boolean => this.equalTest<T>(getValue(m), propertyValue);
    }

    public static buildBeforeTest<T = any> (
        propertyName: string,
        propertyValue: any
    ) : MemoryValueTestCallback {
        const getValue = this.buildValueGetter(propertyName);
        return (m: T) : boolean => this.beforeTest<T>(getValue(m), propertyValue);
    }

    public static buildAfterTest<T = any> (
        propertyName: string,
        propertyValue: any
    ) : MemoryValueTestCallback {
        const getValue = this.buildValueGetter(propertyName);
        return (m: T) : boolean => this.afterTest<T>(getValue(m), propertyValue);
    }

    public static getPropertyValue<T = any> (
        value: T,
        propertyName: string
    ) : T | undefined {
        return get(value, propertyName);
    }

    /**
     * This method is used in the between tests.
     *
     * @param value
     * @param rangeStart
     * @param rangeEnd
     */
    public static rangeTest<T = any> (
        value      : T,
        rangeStart : T,
        rangeEnd   : T
    ) : boolean {
        return value >= rangeStart && value <= rangeEnd;
    }

    public static equalTest<T = any> (
        value     : T,
        testValue : T
    ) : boolean {
        return isEqual(value, testValue);
    }

    public static beforeTest<T = any> (
        value     : T,
        testValue : T
    ) : boolean {
        return value < testValue;
    }

    public static afterTest<T = any> (
        value     : T,
        testValue : T
    ) : boolean {
        return value > testValue;
    }

}
