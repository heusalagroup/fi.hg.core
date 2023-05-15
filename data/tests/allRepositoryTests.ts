// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createRepositoryTestContext, RepositoryTestContext } from "./types/types/RepositoryTestContext";
import { basicCrudTests } from "./basicCrudTests";
import { entityRelationshipTests } from "./entityRelationshipTests";
import { Persister } from "../types/Persister";
import { typeJsonTests } from "./typeJsonTests";

export const allRepositoryTests = (
    createPersister     : () => Persister
) => {

    let context : RepositoryTestContext = createRepositoryTestContext();

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

    describe('Entity relationships', () => {
        entityRelationshipTests(context);
    });

    describe('Types', () => {

        describe('JSON', () => {
            typeJsonTests(context);
        });

    });

};
