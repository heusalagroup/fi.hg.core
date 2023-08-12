// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { isWhere, Where } from './Where';
import { Condition } from "./conditions/types/Condition";
import { PropertyNameTarget } from "./conditions/types/PropertyNameTarget";
import { BetweenCondition } from "./conditions/BetweenCondition";
import { EqualCondition } from "./conditions/EqualCondition";
import { OrCondition } from "./conditions/OrCondition";
import { AndCondition } from "./conditions/AndCondition";

describe('Where', () => {

    describe('#getConditions', () => {
        it('returns the list of conditions', () => {
            const conditions: readonly Condition[] = [
                BetweenCondition.create(PropertyNameTarget.create('age'), 18, 30),
                EqualCondition.create(PropertyNameTarget.create('city'), 'New York')
            ];
            const where = Where.fromConditionList(conditions);
            expect(where.getConditions()).toStrictEqual(conditions);
        });
    });

    describe('#and', () => {

        it('combines two Where instances', () => {
            const where1 = Where.propertyEquals('city', 'New York');
            const where2 = Where.propertyBetween('age', 18, 30);
            const whereCombined = where1.and(where2);

            expect(whereCombined.getConditions()).toStrictEqual(
                [
                                                              ...where1.getConditions(),
                                                              ...where2.getConditions()
                                                          ]
            );
        });

        it('combines two Where instances with or logic', () => {
            const where1 = Where.propertyEquals('city', 'Oulu');
            const where2 = Where.propertyBetween('age', 17, 25);

            const where3 = Where.propertyEquals('city', 'New York');
            const where4 = Where.propertyBetween('age', 18, 30);
            //console.log(`where1 = ${where1}`)
            //console.log(`where2 = ${where2}`)
            //console.log(`where3 = ${where3}`)
            //console.log(`where4 = ${where4}`)

            const whereCombined = Where.or(where1, where2).and(
                Where.or(where3, where4)
            );

            //console.log(`whereCombined = ${whereCombined}`)

            // Where(
            //   OrCondition(
            //     EqualCondition(PropertyNameTarget(city) === Oulu)
            //     or BetweenCondition(PropertyNameTarget(age) is between 17 and 25)
            //   ),
            //   OrCondition(
            //     EqualCondition(PropertyNameTarget(city) === New York)
            //     or BetweenCondition(PropertyNameTarget(age) is between 18 and 30)
            //   )
            // )

            expect(whereCombined.getConditions()).toStrictEqual(
                [
                    OrCondition.create(
                        Where.fromConditionList(
                        [
                                ...where1.getConditions(),
                                ...where2.getConditions(),
                            ]
                        )
                    ),
                    OrCondition.create(
                        Where.fromConditionList(
                        [
                                ...where3.getConditions(),
                                ...where4.getConditions()
                            ]
                        )
                    )
                ]
            );

        });

    });

    describe('#or', () => {

        it('combines two Where instances into a new one with an OrCondition', () => {

            const whereA = Where.propertyEquals('city', 'New York');
            const whereB = Where.propertyEquals('city', 'Los Angeles');

            const whereCombined = whereA.or(whereB);

            //console.log(`whereCombined = ${whereCombined}`)

            // Where(
            //   OrCondition(
            //     EqualCondition(PropertyNameTarget(city) === New York)
            //     or EqualCondition(PropertyNameTarget(city) === Los Angeles)
            //   )
            // )

            const conditions = whereCombined.getConditions();

            expect(conditions).toHaveLength(1);
            expect(conditions[0]).toBeInstanceOf(OrCondition);
            expect((conditions[0] as OrCondition).getWhere().getConditions()).toStrictEqual(
                [
                   ...whereA.getConditions(),
                   ...whereB.getConditions()
                ]
            );

        });

        it('combines multiple conditions correctly', () => {
            const whereA = Where.and(
                Where.propertyEquals('city', 'New York'),
                Where.propertyEquals('age', 25)
            );

            const whereB = Where.and(
                Where.propertyEquals('city', 'Los Angeles'),
                Where.propertyBetween('age', 30, 40)
            );

            const whereCombined = whereA.or(whereB);

            const conditions = whereCombined.getConditions();

            expect(conditions).toHaveLength(1);
            expect(conditions[0]).toBeInstanceOf(OrCondition);
            expect((conditions[0] as OrCondition).getWhere().getConditions()).toStrictEqual(
                [
                   AndCondition.create(whereA),
                   AndCondition.create(whereB),
               ]
            );
        });

        it('combines two Where instances with and logic', () => {

            const where1 = Where.propertyEquals('city', 'Oulu');
            const where2 = Where.propertyBetween('age', 17, 25);

            const where3 = Where.propertyEquals('city', 'New York');
            const where4 = Where.propertyBetween('age', 18, 30);

            const whereCombined = Where.and(where1, where2).or(
                Where.and(where3, where4)
            );

            //console.log(`whereCombined = ${whereCombined}`)

            // Where(
            //   OrCondition(
            //     AndCondition(
            //       EqualCondition(PropertyNameTarget(city) === Oulu)
            //       and BetweenCondition(PropertyNameTarget(age) is between 17 and 25)
            //     )
            //     or AndCondition(
            //       EqualCondition(PropertyNameTarget(city) === New York)
            //       and BetweenCondition(PropertyNameTarget(age) is between 18 and 30)
            //     )
            //   )
            // )

            expect(whereCombined.getConditions()).toStrictEqual(
                [
                    OrCondition.create(
                        Where.fromConditionList(
                            [
                                AndCondition.create(
                                    Where.fromConditionList(
                                        [
                                            ...where1.getConditions(),
                                            ...where2.getConditions(),
                                        ]
                                    )
                                ),
                                AndCondition.create(
                                    Where.fromConditionList(
                                        [
                                            ...where3.getConditions(),
                                            ...where4.getConditions(),
                                        ]
                                    )
                                )
                            ]
                        )
                    )
                ]
            );

        });

    });

    describe('#propertyBetween', () => {
        it('creates a Where instance with a between condition', () => {
            const where = Where.propertyBetween('age', 18, 30);
            const conditions = where.getConditions();

            expect(conditions.length).toBe(1);
            expect(conditions[0]).toBeInstanceOf(BetweenCondition);
        });
    });

    describe('#propertyEquals', () => {
        it('creates a Where instance with an equal condition', () => {
            const where = Where.propertyEquals('city', 'New York');
            const conditions = where.getConditions();

            expect(conditions.length).toBe(1);
            expect(conditions[0]).toBeInstanceOf(EqualCondition);
        });
    });

    describe('#propertyListEquals', () => {

        it('creates a Where instance with multiple equal conditions', () => {
            const values = ['New York', 'Los Angeles', 'Chicago'];
            const where = Where.propertyListEquals('city', values);
            const conditions = where.getConditions();

            expect(conditions.length).toBe(1);
            conditions.forEach((condition) => {
                expect(condition).toBeInstanceOf(OrCondition);

                const childConditions = (condition as OrCondition).getWhere().getConditions();

                expect(childConditions.length).toBe(3);
                childConditions.forEach((childCondition, childIndex) => {
                    expect(childCondition).toBeInstanceOf(EqualCondition);
                    expect((childCondition as EqualCondition).getValue()).toStrictEqual(values[childIndex]);
                });

            });
        });

        it('throws an error when the value list is empty', () => {
            expect(() => {
                Where.propertyListEquals('city', []);
            }).toThrow(TypeError);
        });

    });

    describe('#and (static)', () => {
        it('combines two Where instances', () => {

            const where1 = Where.propertyEquals('city', 'New York');
            const where2 = Where.propertyBetween('age', 18, 30);
            const whereCombined = Where.and(where1, where2);
            //console.log(`whereCombined = ${whereCombined}`)

            //  Where(
            //    EqualCondition(PropertyNameTarget(city) === New York),
            //    BetweenCondition(PropertyNameTarget(age) is between 18 and 30)
            //  )

            expect(whereCombined.getConditions()).toStrictEqual(
                [
                  ...where1.getConditions(),
                  ...where2.getConditions()
              ]
            );
        });
    });

    describe('#or (static)', () => {

        it('combines two Where instances', () => {
            const where1 = Where.propertyEquals('city', 'New York');
            const where2 = Where.propertyBetween('age', 18, 30);
            const whereCombined = Where.or(where1, where2);
            //console.log(`whereCombined = ${whereCombined}`)

            // Where(
            //   OrCondition(
            //     EqualCondition(PropertyNameTarget(city) === New York)
            //     or BetweenCondition(PropertyNameTarget(age) is between 18 and 30)
            //   )
            // )

            expect(whereCombined.getConditions()).toStrictEqual(
                [
                    OrCondition.create(
                        Where.fromConditionList(
                            [
                                ...where1.getConditions(),
                                ...where2.getConditions()
                            ]
                        )
                    )
              ]
            );
        });

        it('has identical results with non-static version', () => {
            const where1 = Where.propertyEquals('city', 'New York');
            const where2 = Where.propertyBetween('age', 18, 30);
            const whereCombined1 = Where.or(where1, where2);
            const whereCombined2 = where1.or(where2);

            expect(whereCombined1).toStrictEqual(whereCombined2);
        });

    });

});

describe('isWhere', () => {

    it('returns true for Where instances', () => {
        const where = Where.propertyEquals('city', 'New York');
        expect(isWhere(where)).toBe(true);
    });

    it('returns false for non-Where instances', () => {
        const notWhere = { someKey: 'someValue' };
        expect(isWhere(notWhere)).toBe(false);
    });

});
