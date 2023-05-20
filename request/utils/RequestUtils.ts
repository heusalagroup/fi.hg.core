// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { RequestMethod } from "../types/RequestMethod";
import { RequestMappingObject } from "../types/RequestMappingObject";
import { some } from "../../functions/some";

export class RequestUtils {

    static someMethodsMatch (
        value: RequestMethod,
        target: readonly RequestMethod[]
    ) : boolean {
        return some(target, (item : RequestMethod) : boolean => item === value);
    }

    static somePathsMatch (
        path: string,
        target: readonly string[]
    ) : boolean {
        return some(target, (item : string) : boolean => path.startsWith(item));
    }

    static requestMappingMatch (
        method: RequestMethod,
        path: string,
        mapping: RequestMappingObject
    ) : boolean {
        return (
             ( mapping.methods.length === 0 ? true : this.someMethodsMatch(method, mapping.methods) )
            && ( mapping.paths.length === 0 ? true : this.somePathsMatch(path, mapping.paths) )
        );
    }

}
