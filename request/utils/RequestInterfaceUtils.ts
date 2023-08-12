// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { has } from "../../functions/has";
import { map } from "../../functions/map";
import { filter } from "../../functions/filter";
import { TestCallback } from "../../types/TestCallback";
import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import { keys } from "../../functions/keys";
import { every } from "../../functions/every";
import { some } from "../../functions/some";

export class RequestInterfaceUtils {

    static isObject (value : any) : value is {} {
        return isObject(value);
    }

    static hasPropertyMethods (value : any) : value is {methods: any} {
        return has(value, 'methods');
    }

    static hasPropertyControllerProperties (value : any) : value is {controllerProperties: any} {
        return has(value, 'controllerProperties');
    }

    static hasPropertyPaths (value : any) : value is {paths: any} {
        return has(value, 'paths');
    }

    static hasPropertyParams (value : any) : value is {params: any} {
        return has(value, 'params');
    }

    static hasPropertyModelAttributes (value : any) : value is {modelAttributes: any} {
        return has(value, 'modelAttributes');
    }

    static hasPropertySynchronized (value : any) : value is {synchronized: any} {
        return has(value, 'synchronized');
    }

    static hasPropertyMappings (value : any) : value is {mappings: any} {
        return has(value, 'mappings');
    }

    static hasPropertyController (value : any) : value is {controller: any} {
        return has(value, 'controller');
    }

    static hasPropertyQueryParam (value : any) : value is {queryParam: any} {
        return has(value, 'queryParam');
    }

    static hasPropertyType (value : any) : value is {type: any} {
        return has(value, 'type');
    }

    static hasProperty__requestMappings (value : any) : value is {__requestMappings: any} {
        return has(value, '__requestMappings');
    }

    static hasPropertyStatus (value : any) : value is {status: any} {
        return has(value, 'status');
    }

    static hasPropertyMessage (value : any) : value is {message: any} {
        return has(value, 'message');
    }

    static createOrFunction (
        ...values: Array<Function|any>
    ) : (item : any) => boolean {

        return (item : any) : boolean => {

            return some(values, (item2 : Function|any) : boolean => {

                if (isFunction(item2)) return item2(item);

                return item === item2;

            });

        };

    }

    static everyPropertyIs<T> (
        value: {[key: string] : any},
        test : TestCallback
    ) : value is {[key: string] : T} {

        return every(map(keys(value), (key : string) : any => value[key]), test);

    }

    static explainEveryPropertyIs (
        value: {[key: string] : any},
        test : Function,
        explain : Function
    ) : Array<string> {
        return filter(
            map(
                map(keys(value), (key : string) : any => value[key]),
                (item: any, index: number) => {
                if (!test(item)) {
                    return `#${index}: ${explain(item)}`;
                } else {
                    return "";
                }
            }),
            (item: any) => !!item
        );
    }

}
