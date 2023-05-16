// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Persister } from "../../../types/Persister";
import { PersisterType } from "../../../persisters/types/PersisterType";

export interface RepositoryTestContext {

    persister ?: Persister;

    getPersister() : Persister;
    getPersisterType() : PersisterType;

}

export function createRepositoryTestContext (
    persisterType : PersisterType,
    persister ?: Persister | undefined
) : RepositoryTestContext {
    const context = {
        persister,
        getPersister (): Persister {
            let persisterOrNot = context.persister;
            if (!persisterOrNot) throw new TypeError(`The persister must be initialized first`);
            return persisterOrNot;
        },
        getPersisterType (): PersisterType {
            return persisterType;
        }
    };
    return context;
}
