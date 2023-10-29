// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SameSite } from "../../types/SameSite";

export interface CookieLike {

    getDomain() : string | undefined;

    getHttpOnly() : boolean | undefined;

    getMaxAge() : number | undefined;

    getName() : string;

    getValue() : string | undefined;
    getPath() : string | undefined;

    getSameSite() : SameSite | undefined;

    getSecure() : boolean | undefined;

    setDomain(domain : string) : void;

    setHttpOnly(httpOnly : boolean) : void;

    setMaxAge(maxAge: number) : void;

    setName(name : string) : void;
    setValue(name : string | undefined) : void;

    setPath(path: string) : void;

    setSameSite(sameSite: SameSite) : void;

    setSecure(secure: boolean) : void;

}
