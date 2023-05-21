// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createRepositoryTestContext, RepositoryTestContext } from "./types/types/RepositoryTestContext";
import { basicCrudTests } from "./basicCrudTests";
import { entityRelationshipTests } from "./entityRelationshipTests";
import { Persister } from "../types/Persister";
import { typeJsonTests } from "./typeJsonTests";
import { typeNativeJsonTests } from "./typeNativeJsonTests";
import { PersisterType } from "../persisters/types/PersisterType";
import { basicLifeCycleTests } from "./basicLifeCycleTests";

export const allRepositoryTests = (
    persisterType   : PersisterType,
    createPersister : () => Persister
) => {

    let context : RepositoryTestContext = createRepositoryTestContext(persisterType);

    beforeEach(() => {
        context.persister = createPersister();
    });

    afterEach( () => {
        context.persister?.destroy();
        context.persister = undefined;
    });

    describe('CRUD operations', () => {
        basicCrudTests(context);
    });

    describe('Life cycle operations', () => {
        basicLifeCycleTests(context);
    });

    describe('Entity relationships', () => {
        entityRelationshipTests(context);
    });

    describe('Types', () => {

        describe('JSON (string)', () => {
            typeJsonTests(context);
        });

        describe('JSON (native)', () => {
            typeNativeJsonTests(context);
        });

    });

};
