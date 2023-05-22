// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { PersisterEntityManagerImpl } from "./PersisterEntityManagerImpl";
import { EntityField } from "../../types/EntityField";
import { EntityFieldType } from "../../types/EntityFieldType";
import { EntityLike } from "../../types/EntityLike";
import { createEntityMetadata, EntityMetadata } from "../../types/EntityMetadata";
import { LogLevel } from "../../../types/LogLevel";

describe('PersisterEntityManagerImpl', () => {

    // Simple mock class for the tests
    class MockEntity implements EntityLike {
        foo: string;
        bar: string;

        constructor (foo: string, bar: string) {
            this.foo = foo;
            this.bar = bar;
        }

        public getMetadata (): EntityMetadata {
            return createEntityMetadata(
                'foos',
                'id',
                [],
                [],
                [],
                [],
                undefined,
                [],
                [],
                []
            );
        }

        toJSON () {
            return {};
        }

        clone() {
            return new MockEntity(this.foo, this.bar);
        }

    }

    let persisterEntityManager: PersisterEntityManagerImpl;

    beforeEach(() => {
        persisterEntityManager = PersisterEntityManagerImpl.create();
    });

    describe('#create', () => {

        it('should create a new instance', () => {
            expect(persisterEntityManager).toBeInstanceOf(PersisterEntityManagerImpl);
        });

    });

    describe('#savePersisterState', () => {

        it('should save the current state of the entity', () => {
            const entity = new MockEntity('foo1', 'bar2');
            persisterEntityManager.saveLastEntityState(entity);
            // Change the state
            entity.foo = 'hello';
            // This is a bit tricky, as your _symbol is private, but you can verify the changes in another way.
            // For example, you can verify it with getPersisterState method:
            const savedEntity = persisterEntityManager.getLastEntityState(entity) as unknown as MockEntity;
            expect(savedEntity).toBeDefined();
            expect(savedEntity.foo).toBe('foo1');
        });

    });

    describe('#getPersisterState', () => {

        it('should get the saved state of the entity', () => {
            const entity = new MockEntity('foo1', 'bar2');
            persisterEntityManager.saveLastEntityState(entity);
            // Change the state
            entity.foo = 'hello';
            const savedEntity = persisterEntityManager.getLastEntityState(entity) as unknown as MockEntity;
            expect(savedEntity).toBeDefined();
            expect(savedEntity.foo).toBe('foo1');
        });

        it('should return undefined if no state has been saved', () => {
            const entity = new MockEntity('foo1', 'bar2');
            const savedEntity = persisterEntityManager.getLastEntityState(entity);
            expect(savedEntity).toBeUndefined();
        });

    });

    describe('#getChangedFields', () => {

        // Mock EntityField
        let mockFields: EntityField[];

        beforeEach( () => {
            mockFields = [
                {
                    fieldType: EntityFieldType.UNKNOWN,
                    propertyName: 'foo',
                    columnName: 'foo',
                    nullable: false,
                    updatable: true,
                    insertable: true
                },
                {
                    fieldType: EntityFieldType.UNKNOWN,
                    propertyName: 'bar',
                    columnName: 'bar',
                    nullable: false,
                    updatable: true,
                    insertable: true
                },
            ];
        })

        it('should return changed fields', () => {
            const entity = new MockEntity('foo1', 'bar2');
            persisterEntityManager.saveLastEntityState(entity);
            // Change the state
            entity.foo = 'hello';
            const changedFields = persisterEntityManager.getChangedFields(entity, mockFields);

            // As 'foo' is the only field and it has been updated
            expect(changedFields).toStrictEqual([
                {
                    fieldType: EntityFieldType.UNKNOWN,
                    propertyName: 'foo',
                    columnName: 'foo',
                    nullable: false,
                    updatable: true,
                    insertable: true
                }
            ]);

        });

        it('should not return unchanged fields', () => {
            const entity = new MockEntity('foo1', 'bar2');
            persisterEntityManager.saveLastEntityState(entity);
            // Don't change the state
            const changedFields = persisterEntityManager.getChangedFields(entity, mockFields);
            expect(changedFields).toStrictEqual([]); // As 'foo' is the only field and it has not been updated
        });

        it('should ignore non-updatable fields', () => {
            // Mock EntityField
            const mockFields: EntityField[] = [
                {
                    fieldType: EntityFieldType.UNKNOWN,
                    propertyName: 'foo',
                    columnName: 'foo',
                    nullable: false,
                    updatable: false,
                    insertable: true
                },
                {
                    fieldType: EntityFieldType.UNKNOWN,
                    propertyName: 'bar',
                    columnName: 'bar',
                    nullable: false,
                    updatable: false,
                    insertable: true
                },
            ];

            const entity = new MockEntity('foo1', 'bar2');
            persisterEntityManager.saveLastEntityState(entity);
            // Change the state
            entity.foo = 'hello';
            const changedFields = persisterEntityManager.getChangedFields(entity, mockFields);
            // As 'foo' is non-updatable and bar was not changed
            expect(changedFields).toStrictEqual([]);
        });

        it('should ignore non-updatable fields when other fields change', () => {
            // Mock EntityField
            const mockFields: EntityField[] = [
                {
                    fieldType: EntityFieldType.UNKNOWN,
                    propertyName: 'foo',
                    columnName: 'foo',
                    nullable: false,
                    updatable: false,
                    insertable: true
                },
                {
                    fieldType: EntityFieldType.UNKNOWN,
                    propertyName: 'bar',
                    columnName: 'bar',
                    nullable: false,
                    updatable: true,
                    insertable: true
                },
            ];

            const entity = new MockEntity('foo1', 'bar2');
            persisterEntityManager.saveLastEntityState(entity);
            // Change the state
            entity.foo = 'hello';
            entity.bar = 'world';
            const changedFields = persisterEntityManager.getChangedFields(entity, mockFields);
            // As 'foo' is non-updatable and bar was not changed
            expect(changedFields).toStrictEqual([
                {
                    fieldType: EntityFieldType.UNKNOWN,
                    propertyName: 'bar',
                    columnName: 'bar',
                    nullable: false,
                    updatable: true,
                    insertable: true
                },
            ]);
        });

        it('should return all updatable fields if no previous state was saved', () => {
            PersisterEntityManagerImpl.setLogLevel(LogLevel.NONE);
            const entity = new MockEntity('foo1', 'bar2');
            const changedFields = persisterEntityManager.getChangedFields(entity, mockFields);
            expect(changedFields).toStrictEqual(mockFields); // As 'foo' updatable
        });

    });

});
