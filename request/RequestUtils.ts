// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import RequestMethod from "./types/RequestMethod";
import {some} from "../modules/lodash";
import RequestMappingObject from "./types/RequestMappingObject";

export class RequestUtils {

    static someMethodsMatch (value: RequestMethod, target: Array<RequestMethod>) : boolean {
        return some(target, (item : RequestMethod) : boolean => item === value);
    }

    static somePathsMatch (path: string, target: Array<string>) : boolean {
        return some(target, (item : string) : boolean => path.startsWith(item));
    }

    static requestMappingMatch (method: RequestMethod, path: string, mapping: RequestMappingObject) : boolean {
        return (
             ( mapping.methods.length === 0 ? true : this.someMethodsMatch(method, mapping.methods) )
            && ( mapping.paths.length === 0 ? true : this.somePathsMatch(path, mapping.paths) )
        );
    }

}

export default RequestUtils;
