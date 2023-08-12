// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isFunction } from "../types/Function";
import { LogService } from "../LogService";
import { ClassDecoratorFunction } from "./types/ClassDecoratorFunction";

const LOG = LogService.createLogger( 'createClassDecorator' );

export type ClassDecorator = (
    value: Function,
    context: {
        kind: 'class';
        name: string | undefined;
        addInitializer(initializer: () => void): void;
    }
) => Function | void;

/**
 * Takes (future) standard ES method decorator and implements it as
 * TypeScript's older experimental decorator.
 *
 * Even though TypeScript 5 supports this format already, it doesn't support
 * parameter decorators or experimental metadata support, so we need to have
 * some way to use both to move forward.
 *
 * This call makes it possible to use the legacy decorators at the same time.
 *
 * @param esDecorator
 */
export function createClassDecorator (
    esDecorator: ClassDecorator
) : ClassDecoratorFunction {
    return (
        target : any
    ) : void | Function => {
        if (!isFunction(target)) {
            throw new TypeError(`The constructor is not a function: ${typeof target}`);
        }
        const overrideConstructor : void | Function = esDecorator(
            target,
            {
                kind: 'class',
                name: undefined,
                addInitializer: (
                    // @ts-ignore
                    initializer: () => void): void => {
                    LOG.warn(`Warning! "addInitializer" not yet implemented.`);
                }
            }
        );
        if (isFunction(overrideConstructor)) {
            return overrideConstructor;
        } else if (overrideConstructor !== undefined) {
            LOG.warn(`The return value was not void or Function: ${typeof overrideConstructor}`);
        }
    };
}
