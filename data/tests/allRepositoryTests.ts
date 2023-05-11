// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createRepositoryTestContext, RepositoryTestContext } from "./types/types/RepositoryTestContext";
import { basicCrudTests } from "./basicCrudTests";
import { entityRelationshipTests } from "./entityRelationshipTests";
import { Persister } from "../types/Persister";

export const allRepositoryTests = (
    createPersister     : () => Persister,
    basicCrud           : boolean,
    entityRelationships : boolean
) => {

    let context : RepositoryTestContext = createRepositoryTestContext();

    beforeEach(() => {
        context.persister = createPersister();
    });

    afterEach( () => {
        context.persister?.destroy();
        context.persister = undefined;
    });

    (basicCrud ? describe : describe.skip)('CRUD operations', () => {
        basicCrudTests(context);
    });

    (entityRelationships ? describe : describe.skip)('Entity relationships', () => {
        entityRelationshipTests(context);
    });

};
