// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import "../../../../jest/matchers/index";
import { RepositoryUtils } from "../../utils/RepositoryUtils";
import { LogLevel } from "../../../types/LogLevel";
import { CrudRepositoryImpl } from "../../types/CrudRepositoryImpl";
import { MemoryPersister } from "./MemoryPersister";
import { allRepositoryTests } from "../../tests/allRepositoryTests";
import { setCrudRepositoryLogLevel } from "../../types/CrudRepository";
import { PersisterMetadataManagerImpl } from "../types/PersisterMetadataManagerImpl";
import { PersisterType } from "../types/PersisterType";

describe('Repository integrations', () => {

    beforeAll(() => {
        RepositoryUtils.setLogLevel(LogLevel.NONE);
        setCrudRepositoryLogLevel(LogLevel.NONE);
        CrudRepositoryImpl.setLogLevel(LogLevel.NONE);
        PersisterMetadataManagerImpl.setLogLevel(LogLevel.NONE);
        MemoryPersister.setLogLevel(LogLevel.NONE);
    });

    describe('Memory-based', () => {
        allRepositoryTests(
            PersisterType.MEMORY,
            () => new MemoryPersister()
        );
    });

});
