// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import Persister from "./repository/types/Persister";
import Repository from "./repository/types/Repository";
import CrudRepository from "./repository/types/CrudRepository";
import CrudRepositoryImpl from "./repository/types/CrudRepositoryImpl";
import Entity, {EntityIdTypes} from "./repository/Entity";
import RepositoryUtils from "./repository/RepositoryUtils";
import EntityMetadata from "./repository/types/EntityMetadata";

export {
    Persister,
    Repository,
    CrudRepository
}

export function createCrudRepositoryWithPersister<
    T extends Entity,
    ID extends EntityIdTypes,
    RepositoryType extends Repository<T, ID>
> (
    emptyEntity : T,
    persister   : Persister
) : RepositoryType {

    const entityMetadata : EntityMetadata = emptyEntity.getMetadata();

    class FinalCrudRepositoryImpl<T extends Entity, ID extends EntityIdTypes>
        extends CrudRepositoryImpl<T, ID> {

        constructor (
            persister : Persister
        ) {

            super(entityMetadata, persister);

        }

    }

    const newImpl = (new FinalCrudRepositoryImpl(persister));

    RepositoryUtils.generateDefaultMethods<T, ID, RepositoryType>(FinalCrudRepositoryImpl.prototype, entityMetadata);

    // @ts-ignore
    return newImpl as RepositoryType;

}

export default Repository;
