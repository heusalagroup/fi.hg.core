// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import "../../../jest/matchers/index";
import { Column, Entity, Id, Table } from "../Entity";
import { Repository } from "./Repository";
import { MockPersister } from "../persisters/mock/MockPersister";
import { Persister } from "./Persister";
import { RepositoryUtils } from "../utils/RepositoryUtils";
import { LogLevel } from "../../types/LogLevel";
import { CrudRepositoryImpl } from "./CrudRepositoryImpl";
import { createCrudRepositoryWithPersister, setCrudRepositoryLogLevel } from "./CrudRepository";

describe('CrudRepository', () => {

    beforeAll(() => {
        RepositoryUtils.setLogLevel(LogLevel.NONE);
        setCrudRepositoryLogLevel(LogLevel.NONE);
        CrudRepositoryImpl.setLogLevel(LogLevel.NONE);
    });

    describe('createCrudRepositoryWithPersister', () => {

        interface FooRepository extends Repository<FooEntity, string> {

            findAllByName(name: string) : Promise<FooEntity[]>;
            findByName (name: string): Promise<FooEntity | undefined>;
            deleteAllByName (ids: string[]): Promise<void>;
            existsByName (id : string): Promise<boolean>;
            countByName () : Promise<number>;

            findAllById() : Promise<FooEntity[]>;
            findById (name: string): Promise<FooEntity | undefined>;
            deleteAllById (ids: string[]): Promise<void>;
            existsById (id : string): Promise<boolean>;
            countById () : Promise<number>;

        }

        let persister : Persister;
        let repository : FooRepository;

        @Table('foo')
        class FooEntity extends Entity {
            constructor (dto ?: {name: string}) {
                super()
                this.name = dto?.name;
            }

            @Id()
            @Column('foo_id')
            public id ?: string;

            @Column('foo_name')
            public name ?: string;

        }

        beforeEach( () => {
            persister = new MockPersister();
            repository = createCrudRepositoryWithPersister<FooEntity, string, FooRepository>(
                new FooEntity(),
                persister
            );
        });

        it('can implement findAllByName() method', () => {
            expect(repository?.findAllByName).toBeFunction();
        });

        it('can implement findByName() method', () => {
            expect(repository?.findByName).toBeFunction();
        });

        it('can implement deleteAllByName() method', () => {
            expect(repository?.deleteAllByName).toBeFunction();
        });

        it('can implement existsByName() method', () => {
            expect(repository?.existsByName).toBeFunction();
        });

        it('can implement countByName() method', () => {
            expect(repository?.countByName).toBeFunction();
        });

        it('can implement findAllById() method', () => {
            expect(repository?.findAllById).toBeFunction();
        });

        it('can implement findById() method', () => {
            expect(repository?.findById).toBeFunction();
        });

        it('can implement deleteAllById() method', () => {
            expect(repository?.deleteAllById).toBeFunction();
        });

        it('can implement existsById() method', () => {
            expect(repository?.existsById).toBeFunction();
        });

        it('can implement countById() method', () => {
            expect(repository?.countById).toBeFunction();
        });

    });

});
