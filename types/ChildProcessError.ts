// Copyright (c) 2022-2023 Heusala Group Oy. All rights reserved.
// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { ReadonlyJsonObject } from "../Json";

export class ChildProcessError extends Error {

    public readonly name     : string;
    public readonly args     : readonly string[];
    public readonly status   : number;
    public readonly signal  ?: string | number | undefined;
    public readonly origMessage  ?: string | undefined;

    // @ts-ignore
    private readonly __proto__: any;

    public constructor (
        name     : string,
        args     : readonly string[],
        status   : number,
        signal  ?: number | string | undefined,
        message ?: string
    ) {

        super( ChildProcessError.stringifyExceptionArguments(
            name,
            args,
            status,
            signal,
            message
        ));

        const actualProto = new.target.prototype;

        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(this, actualProto);
        } else {
            this.__proto__ = actualProto;
        }

        this.name   = name;
        this.args   = args;
        this.status = status;
        this.signal = signal;
        this.origMessage = message;
    }

    /**
     * *Note!* For some reason this method is called instead of toString() for
     * exception conversions, so this returns a full string presentaton now.
     */
    public valueOf () : string {
        return this.toString();
    }

    public toString () : string {
        return ChildProcessError.stringifyExceptionArguments(
            this.name,
            this.args,
            this.status,
            this.signal,
            this.origMessage
        );
    }

    public toJSON () : ReadonlyJsonObject {
        const {
            name,
            args,
            status,
            signal,
            message
        } = this;
        return {
            name,
            args,
            status,
            signal,
            message
        };
    }

    public getStatusCode () : number {
        return this.status;
    }

    public static stringifyExceptionArguments (
        name     : string,
        args     : readonly string[],
        status   : number,
        signal  ?: number | string | undefined,
        message ?: string
    ) : string {
        return `Command "${name}${args?.length?' ':''}${(args??[]).join(' ')}": ${
            message
                ? message
                : (
                    signal
                        ? `Signal ${signal}`
                        : (
                            status
                                ? `Exit status ${status}`
                                : `Unspecified error`
                        )
                )
        }`;
    }

    public static create (
        name     : string,
        args     : readonly string[],
        status   : number,
        signal  ?: number | string,
        message ?: string
    ) : ChildProcessError {
        return new ChildProcessError(
            name,
            args,
            status,
            signal,
            message
        );
    }

}

export function createChildProcessError (
    name     : string,
    args     : readonly string[],
    status   : number,
    signal  ?: number | string,
    message ?: string
) : ChildProcessError {
    return ChildProcessError.create(
        name,
        args,
        status,
        signal,
        message
    );
}

export function isChildProcessError (value : any) : value is ChildProcessError {
    return (
        !!value
        && value instanceof ChildProcessError
    );
}
