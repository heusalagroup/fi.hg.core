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

export function createCrudRepositoryWithPersister<RepositoryType, T extends Entity, IdType extends EntityIdTypes = string> (
    emptyEntity : T,
    persister   : Persister
) : RepositoryType {

    const entityMetadata : EntityMetadata = emptyEntity.getMetadata();

    class FinalCrudRepositoryImpl<T extends Entity, IdType extends EntityIdTypes>
        extends CrudRepositoryImpl<T, IdType> {

        constructor (
            persister : Persister
        ) {

            super(entityMetadata, persister);

        }

    }

    const newImpl = (new FinalCrudRepositoryImpl(persister));

    RepositoryUtils.generateDefaultMethods<T, IdType>(FinalCrudRepositoryImpl.prototype, entityMetadata);

    // @ts-ignore
    return newImpl as RepositoryType;

}

export default Repository;
