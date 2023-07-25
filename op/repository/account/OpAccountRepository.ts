// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpAccountEntity } from "./OpAccountEntity";
import { Repository } from "../../../data/types/Repository";

export interface OpAccountRepository extends Repository<OpAccountEntity, string> {
    findBySurrogateId (surrogateId: string) : Promise<OpAccountEntity|undefined>;
    findAllBySurrogateId (surrogateId: string) : Promise<OpAccountEntity[]>;
    findAllByAccountTypeCode (accountTypeCode: string) : Promise<OpAccountEntity[]>;
    findAllByBic (bic: string) : Promise<OpAccountEntity[]>;
    findAllByIban (iban: string) : Promise<OpAccountEntity[]>;
    findAllByName (name: string) : Promise<OpAccountEntity[]>;
}
