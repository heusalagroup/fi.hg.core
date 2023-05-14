// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { MemoryValueTestCallback, MemoryValueUtils } from "./MemoryValueUtils";
import { Where } from "../../../Where";
import { PropertyNameTarget } from "../../../conditions/types/PropertyNameTarget";
import { BetweenCondition } from "../../../conditions/BetweenCondition";
import { EqualCondition } from "../../../conditions/EqualCondition";

describe('MemoryValueUtils', () => {

    describe('#buildMatcherFunctionFromWhereUsingAnd', () => {

        it('builds a matcher function from a Where instance with equal conditions', () => {
            const where = Where.propertyEquals('city', 'New York');
            const matcher = MemoryValueUtils.buildMatcherFunctionFromWhereUsingAnd(where);

            const itemMatching = { city: 'New York', age: 25 };
            const itemNotMatching = { city: 'Los Angeles', age: 25 };

            expect(matcher(itemMatching)).toBe(true);
            expect(matcher(itemNotMatching)).toBe(false);
        });

        it('builds a matcher function from a Where instance with between conditions', () => {
            const where = Where.propertyBetween('age', 18, 30);
            const matcher = MemoryValueUtils.buildMatcherFunctionFromWhereUsingAnd(where);

            const itemMatching = { city: 'New York', age: 25 };
            const itemNotMatching = { city: 'New York', age: 35 };

            expect(matcher(itemMatching)).toBe(true);
            expect(matcher(itemNotMatching)).toBe(false);
        });

        it('builds a matcher function from a Where instance with multiple conditions', () => {
            const where = Where.and(
                Where.propertyEquals('city', 'New York'),
                Where.propertyBetween('age', 18, 30)
            );
            const matcher = MemoryValueUtils.buildMatcherFunctionFromWhereUsingAnd(where);

            const itemMatching = { city: 'New York', age: 25 };
            const itemNotMatchingAge = { city: 'New York', age: 35 };
            const itemNotMatchingCity = { city: 'Los Angeles', age: 25 };

            expect(matcher(itemMatching)).toBe(true);
            expect(matcher(itemNotMatchingAge)).toBe(false);
            expect(matcher(itemNotMatchingCity)).toBe(false);
        });

        it('throws an error when an unsupported condition target is used', () => {
            const unsupportedTarget = {}; // Assuming this is not a PropertyNameTarget
            const where = Where.fromConditionList([{ getConditionTarget: () => unsupportedTarget }] as any );
            expect(() => {
                MemoryValueUtils.buildMatcherFunctionFromWhereUsingAnd(where);
            }).toThrow(TypeError);
        });

        it('throws an error when an unsupported condition is used', () => {
            const unsupportedCondition = {}; // Assuming this is not a supported condition
            const propertyNameTarget = PropertyNameTarget.create('city');
            const where = Where.fromConditionList([{ getConditionTarget: () => propertyNameTarget, ...unsupportedCondition }] as any);
            expect(() => {
                MemoryValueUtils.buildMatcherFunctionFromWhereUsingAnd(where);
            }).toThrow(TypeError);
        });

        it('builds a matcher function from a Where instance with propertyListEquals conditions', () => {
            const values = ['New York', 'Los Angeles', 'Chicago'];
            const where = Where.propertyListEquals('city', values);
            const matcher = MemoryValueUtils.buildMatcherFunctionFromWhereUsingAnd(where);

            const itemMatching = { city: 'New York', age: 25 };
            const itemNotMatching = { city: 'San Francisco', age: 25 };

            expect(matcher(itemMatching)).toBe(true);
            expect(matcher(itemNotMatching)).toBe(false);
        });

        it('builds a matcher function from a Where instance with multiple conditions, including propertyListEquals', () => {
            const values = ['New York', 'Los Angeles', 'Chicago'];
            const where = Where.and(
                Where.propertyListEquals('city', values),
                Where.propertyBetween('age', 18, 30)
            );
            const matcher = MemoryValueUtils.buildMatcherFunctionFromWhereUsingAnd(where);

            const itemMatching = { city: 'New York', age: 25 };
            const itemNotMatchingAge = { city: 'New York', age: 35 };
            const itemNotMatchingCity = { city: 'San Francisco', age: 25 };

            expect(matcher(itemMatching)).toBe(true);
            expect(matcher(itemNotMatchingAge)).toBe(false);
            expect(matcher(itemNotMatchingCity)).toBe(false);
        });

        it('returns false for items with a missing property in propertyListEquals conditions', () => {
            const values = ['New York', 'Los Angeles', 'Chicago'];
            const where = Where.propertyListEquals('city', values);
            const matcher = MemoryValueUtils.buildMatcherFunctionFromWhereUsingAnd(where);

            const itemMissingProperty = { age: 25 };

            expect(matcher(itemMissingProperty)).toBe(false);
        });

        it('builds a matcher function from a Where instance with multiple equal conditions using OR', () => {
            const where = Where.or(
                Where.propertyEquals('city', 'New York'),
                Where.propertyEquals('city', 'Los Angeles')
            );

            //console.log(`where = ${where}`);
            const matcher = MemoryValueUtils.buildMatcherFunctionFromWhereUsingAnd(where);

            const itemMatching1 = { city: 'New York', age: 25 };
            const itemMatching2 = { city: 'Los Angeles', age: 25 };
            const itemNotMatching = { city: 'San Francisco', age: 25 };

            expect(matcher(itemMatching1)).toBe(true);
            expect(matcher(itemMatching2)).toBe(true);
            expect(matcher(itemNotMatching)).toBe(false);
        });

        it('builds a matcher function from a Where instance with multiple between conditions using OR', () => {
            const where = Where.or(
                Where.propertyBetween('age', 18, 30),
                Where.propertyBetween('age', 50, 65)
            );
            const matcher = MemoryValueUtils.buildMatcherFunctionFromWhereUsingAnd(where);

            const itemMatching1 = { city: 'New York', age: 25 };
            const itemMatching2 = { city: 'New York', age: 55 };
            const itemNotMatching = { city: 'New York', age: 40 };

            expect(matcher(itemMatching1)).toBe(true);
            expect(matcher(itemMatching2)).toBe(true);
            expect(matcher(itemNotMatching)).toBe(false);
        });

        it('builds a matcher function from a Where instance with a mix of equal and between conditions using OR', () => {
            const where = Where.or(
                Where.propertyEquals('city', 'New York'),
                Where.propertyBetween('age', 50, 65)
            );
            const matcher = MemoryValueUtils.buildMatcherFunctionFromWhereUsingAnd(where);

            const itemMatching1 = { city: 'New York', age: 25 };
            const itemMatching2 = { city: 'Los Angeles', age: 55 };
            const itemNotMatching = { city: 'Los Angeles', age: 25 };

            expect(matcher(itemMatching1)).toBe(true);
            expect(matcher(itemMatching2)).toBe(true);
            expect(matcher(itemNotMatching)).toBe(false);
        });

    });

    describe('#buildMatcherFunctionFromWhereUsingOr', () => {

        it('builds a matcher function from a Where instance with equal conditions', () => {
            const where = Where.propertyEquals('city', 'New York');
            const matcher = MemoryValueUtils.buildMatcherFunctionFromWhereUsingOr(where);

            const itemMatching = { city: 'New York', age: 25 };
            const itemNotMatching = { city: 'Los Angeles', age: 25 };

            expect(matcher(itemMatching)).toBe(true);
            expect(matcher(itemNotMatching)).toBe(false);
        });

        it('builds a matcher function from a Where instance with between conditions', () => {
            const where = Where.propertyBetween('age', 18, 30);
            const matcher = MemoryValueUtils.buildMatcherFunctionFromWhereUsingOr(where);

            const itemMatching = { city: 'New York', age: 25 };
            const itemNotMatching = { city: 'New York', age: 35 };

            expect(matcher(itemMatching)).toBe(true);
            expect(matcher(itemNotMatching)).toBe(false);
        });

        it('builds a matcher function from a Where instance with multiple conditions', () => {
            const where = Where.or(
                Where.propertyEquals('city', 'New York'),
                Where.propertyBetween('age', 18, 30)
            );
            const matcher = MemoryValueUtils.buildMatcherFunctionFromWhereUsingOr(where);

            const itemMatchingBoth = { city: 'New York', age: 25 };
            const itemMatchingCity = { city: 'New York', age: 35 };
            const itemMatchingAge = { city: 'Los Angeles', age: 25 };
            const itemNotMatching = { city: 'San Francisco', age: 35 };

            expect(matcher(itemMatchingBoth)).toBe(true);
            expect(matcher(itemMatchingCity)).toBe(true);
            expect(matcher(itemMatchingAge)).toBe(true);
            expect(matcher(itemNotMatching)).toBe(false);
        });

    });

    describe('#buildBetweenRangeConditionAndTest', () => {

        it('should return true if the condition is met', () => {
            const target = PropertyNameTarget.create('age');
            const condition = BetweenCondition.create(target, 20, 30);
            const item = { city: 'New York', age: 25 };
            const test = MemoryValueUtils.buildBetweenRangeConditionAndTest(undefined, condition, target);

            expect(test(item)).toBe(true);
        });

        it('should return false if the condition is not met', () => {
            const target = PropertyNameTarget.create('age');
            const condition = BetweenCondition.create(target, 20, 30);
            const item = { city: 'New York', age: 35 };
            const test = MemoryValueUtils.buildBetweenRangeConditionAndTest(undefined, condition, target);

            expect(test(item)).toBe(false);
        });

    });

    describe('#buildEqualConditionAndTest', () => {

        it('should return true if the condition is met', () => {
            const target = PropertyNameTarget.create('city');
            const condition = EqualCondition.create(target, 'New York');
            const item = { city: 'New York', age: 25 };
            const test = MemoryValueUtils.buildEqualConditionAndTest(undefined, condition, target);

            expect(test(item)).toBe(true);
        });

        it('should return false if the condition is not met', () => {
            const target = PropertyNameTarget.create('city');
            const condition = EqualCondition.create(target, 'New York');
            const item = { city: 'Chicago', age: 25 };
            const test = MemoryValueUtils.buildEqualConditionAndTest(undefined, condition, target);

            expect(test(item)).toBe(false);
        });

    });

    describe('#buildBetweenRangeConditionOrTest', () => {

        it('should return true if the condition is met', () => {
            const target = PropertyNameTarget.create('age');
            const condition = BetweenCondition.create(target, 20, 30);
            const item = { city: 'New York', age: 25 };
            const test = MemoryValueUtils.buildBetweenRangeConditionOrTest(undefined, condition, target);

            expect(test(item)).toBe(true);
        });

        it('should return false if the condition is not met', () => {
            const target = PropertyNameTarget.create('age');
            const condition = BetweenCondition.create(target, 20, 30);
            const item = { city: 'New York', age: 35 };
            const test = MemoryValueUtils.buildBetweenRangeConditionOrTest(undefined, condition, target);

            expect(test(item)).toBe(false);
        });

    });

    describe('#buildEqualConditionOrTest', () => {

        it('should return true if the condition is met', () => {
            const target = PropertyNameTarget.create('city');
            const condition = EqualCondition.create(target, 'New York');
            const item = { city: 'New York', age: 25 };
            const test = MemoryValueUtils.buildEqualConditionOrTest(undefined, condition, target);

            expect(test(item)).toBe(true);
        });

        it('should return false if the condition is not met', () => {
            const target = PropertyNameTarget.create('city');
            const condition = EqualCondition.create(target, 'New York');
            const item = { city: 'Chicago', age: 25 };
            const test = MemoryValueUtils.buildEqualConditionOrTest(undefined, condition, target);

            expect(test(item)).toBe(false);
        });

        it('should return true if the previous condition or the current condition is met #1', () => {

            // Non-matching condition
            const target1 = PropertyNameTarget.create('city');
            const condition1 = EqualCondition.create(target1, 'New York');

            // Matching condition
            const target2 = PropertyNameTarget.create('age');
            const condition2 = EqualCondition.create(target2, 30);

            const item = { city: 'Chicago', age: 30 };

            const previousTest = MemoryValueUtils.buildEqualConditionOrTest(undefined, condition1, target1);
            const test = MemoryValueUtils.buildEqualConditionOrTest(previousTest, condition2, target2);

            expect(test(item)).toBe(true);
        });

        it('should return true if the previous condition or the current condition is met #2', () => {

            // Matching condition
            const target1 = PropertyNameTarget.create('city');
            const condition1 = EqualCondition.create(target1, 'New York');

            // Non-matching condition
            const target2 = PropertyNameTarget.create('age');
            const condition2 = EqualCondition.create(target2, 30);

            const item = { city: 'New York', age: 40 };

            const previousTest = MemoryValueUtils.buildEqualConditionOrTest(undefined, condition1, target1);
            const test = MemoryValueUtils.buildEqualConditionOrTest(previousTest, condition2, target2);

            expect(test(item)).toBe(true);
        });

        it('should return true if the previous condition and the current condition are met #3', () => {

            // Matching condition
            const target1 = PropertyNameTarget.create('city');
            const condition1 = EqualCondition.create(target1, 'New York');

            // Matching condition
            const target2 = PropertyNameTarget.create('age');
            const condition2 = EqualCondition.create(target2, 30);

            const item = { city: 'New York', age: 30 };

            const previousTest = MemoryValueUtils.buildEqualConditionOrTest(undefined, condition1, target1);
            const test = MemoryValueUtils.buildEqualConditionOrTest(previousTest, condition2, target2);

            expect(test(item)).toBe(true);
        });

        it('should return false if the previous condition and the current condition is not met #4', () => {

            // Non-matching condition
            const target1 = PropertyNameTarget.create('city');
            const condition1 = EqualCondition.create(target1, 'New York');

            // Non-matching condition
            const target2 = PropertyNameTarget.create('age');
            const condition2 = EqualCondition.create(target2, 30);

            const item = { city: 'Oulu', age: 40 };

            const previousTest = MemoryValueUtils.buildEqualConditionOrTest(undefined, condition1, target1);
            const test = MemoryValueUtils.buildEqualConditionOrTest(previousTest, condition2, target2);

            expect(test(item)).toBe(false);
        });

    });

    describe('#buildOrTest', () => {

        it('should return true if either condition is met', () => {
            const test1: MemoryValueTestCallback = () => true;
            const test2: MemoryValueTestCallback = () => false;
            const combinedTest = MemoryValueUtils.buildOrTest(test1, test2);
            const item = { city: 'New York', age: 25 };

            expect(combinedTest(item)).toBe(true);
        });

        it('should return false if none of the conditions is met', () => {
            const test1: MemoryValueTestCallback = () => false;
            const test2: MemoryValueTestCallback = () => false;
            const combinedTest = MemoryValueUtils.buildOrTest(test1, test2);
            const item = { city: 'New York', age: 25 };

            expect(combinedTest(item)).toBe(false);
        });

    });

    describe('#buildAndTest', () => {

        it('should return true if both conditions are met', () => {
            const test1: MemoryValueTestCallback = () => true;
            const test2: MemoryValueTestCallback = () => true;
            const combinedTest = MemoryValueUtils.buildAndTest(test1, test2);
            const item = { city: 'New York', age: 25 };

            expect(combinedTest(item)).toBe(true);
        });

        it('should return false if any of the conditions is not met', () => {
            const test1: MemoryValueTestCallback = () => true;
            const test2: MemoryValueTestCallback = () => false;
            const combinedTest = MemoryValueUtils.buildAndTest(test1, test2);
            const item = { city: 'New York', age: 25 };

            expect(combinedTest(item)).toBe(false);
        });

    });

    describe('#buildValueGetter', () => {

        it('creates a function that retrieves the value of a property in a MemoryItem', () => {
            const getCity = MemoryValueUtils.buildValueGetter('city');
            const getAge = MemoryValueUtils.buildValueGetter('age');

            const item = { city: 'New York', age: 25 };

            expect(getCity(item)).toBe('New York');
            expect(getAge(item)).toBe(25);
        });

    });

    describe('#buildRangeTest', () => {

        it('creates a function that checks if a property value is within a specified range', () => {
            const isAgeWithinRange = MemoryValueUtils.buildRangeTest('age', 18, 30);

            const itemInRange = { city: 'New York', age: 25 };
            const itemOutOfRange = { city: 'New York', age: 35 };

            expect(isAgeWithinRange(itemInRange)).toBe(true);
            expect(isAgeWithinRange(itemOutOfRange)).toBe(false);
        });

    });

    describe('#buildEqualTest', () => {

        it('creates a function that checks if a property value equals a specified value', () => {
            const isCityNewYork = MemoryValueUtils.buildEqualTest('city', 'New York');

            const itemMatching = { city: 'New York', age: 25 };
            const itemNotMatching = { city: 'Los Angeles', age: 25 };

            expect(isCityNewYork(itemMatching)).toBe(true);
            expect(isCityNewYork(itemNotMatching)).toBe(false);
        });

    });

    describe('#getPropertyValue', () => {

        it('retrieves the value of a property in a MemoryItem', () => {
            const item = { city: 'New York', age: 25 };

            expect(MemoryValueUtils.getPropertyValue(item, 'city')).toBe('New York');
            expect(MemoryValueUtils.getPropertyValue(item, 'age')).toBe(25);
        });

        it('returns undefined for non-existent properties', () => {
            const item = { city: 'New York', age: 25 };

            expect(MemoryValueUtils.getPropertyValue(item, 'nonexistent')).toBeUndefined();
        });

    });

    describe('#rangeTest', () => {
        it('checks if a value is within a specified range', () => {
            expect(MemoryValueUtils.rangeTest(25, 18, 30)).toBe(true);
            expect(MemoryValueUtils.rangeTest(35, 18, 30)).toBe(false);
        });
    });

    describe('#equalTest', () => {
        it('checks if a value equals a specified value', () => {
            expect(MemoryValueUtils.equalTest('New York', 'New York')).toBe(true);
            expect(MemoryValueUtils.equalTest('Los Angeles', 'New York')).toBe(false);
        });
    });

    describe('#beforeTest', () => {
        it('checks if a value is before a specified value', () => {
            expect(MemoryValueUtils.beforeTest(25, 30)).toBe(true);
            expect(MemoryValueUtils.beforeTest(40, 30)).toBe(false);
        });
    });

    describe('#afterTest', () => {
        it('checks if a value is after a specified value', () => {
            expect(MemoryValueUtils.afterTest(25, 30)).toBe(false);
            expect(MemoryValueUtils.afterTest(40, 30)).toBe(true);
        });
    });

});
