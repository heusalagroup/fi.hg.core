// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { MethodDecoratorFunction } from "./types/MethodDecoratorFunction";
import { isFunction } from "../types/Function";
import { LogService } from "../LogService";

const LOG = LogService.createLogger( 'createMethodDecorator' );

export type ClassMethodDecorator = (
    value: Function,
    context: ClassMethodDecoratorContext<any>
) => Function | void;

/**
 * Takes (future) standard ES method decorator and implements it as TypeScript's
 * older experimental decorator.
 *
 * Even though TypeScript 5 supports this format already, it doesn't support
 * parameter decorators or experimental metadata support, so we need to have
 * some way to use both to move forward.
 *
 * This call makes it possible to use the legacy decorators at the same time.
 *
 * @param esDecorator
 */
export function createMethodDecorator<T> (
    esDecorator: ClassMethodDecorator
) : MethodDecoratorFunction {
    return function methodDecorator (
        // @ts-ignore
        target        : any | Function,
        propertyName ?: string,
        descriptor   ?: TypedPropertyDescriptor<any>,
    ) : void {

        if (!propertyName) {
            throw new TypeError(`createMethodDecorator: Property name missing`);
        }

        if (!descriptor) {
            throw new TypeError(`createMethodDecorator: descriptor missing from the property "${propertyName}"`);
        }

        let method = descriptor.value!;
        if (!isFunction(method)) {
            throw new TypeError(`createMethodDecorator: The property "${propertyName}" is not a function: ${typeof method}`);
        }

        const overrideCallback = esDecorator(
            method,
            {
                kind: 'method',
                name: propertyName,
                static: false,
                private: false,
                access: {
                    has: () : boolean => descriptor.value !== undefined,
                    get: () => descriptor.value
                },
                addInitializer: (
                    // @ts-ignore
                    initializer: () => void): void => {
                    LOG.warn(`Warning! "addInitializer" not yet implemented.`);
                }
            } as unknown as ClassMethodDecoratorContext<any>
        );

        if (isFunction(overrideCallback)) {
            descriptor.value = function (this: T, ...args: any) : any {
                return overrideCallback.apply(this, args);
            };
        } else if (overrideCallback !== undefined) {
            LOG.warn(`The return value was not void or Function: ${typeof overrideCallback}`);
        }

    };
}
