// Copyright (c) 2020, 2021 Sendanor. All rights reserved.

import { ReadonlyJsonObject } from "../../Json";
import { RepositoryErrorCode, stringifyRepositoryErrorCode } from "./RepositoryErrorCode";

export class RepositoryError extends Error {

    static Code = RepositoryErrorCode;

    public readonly code: RepositoryErrorCode;

    // @ts-ignore
    private readonly __proto__: any;

    public constructor (
        code: RepositoryErrorCode,
        message: string | undefined = undefined
    ) {

        super(message ? message : stringifyRepositoryErrorCode(code));

        const actualProto = new.target.prototype;

        if ( Object.setPrototypeOf ) {
            Object.setPrototypeOf(this, actualProto);
        } else {
            this.__proto__ = actualProto;
        }

        this.code = code;

    }

    public valueOf (): RepositoryErrorCode {
        return this.code;
    }

    public toString (): string {
        return `${this.message} (#${this.code})`;
    }

    public toJSON (): ReadonlyJsonObject {
        return {
            error: this.message,
            code: this.code
        };
    }

    public getCode (): number {
        return this.code;
    }

}

export function isRepositoryError (value: any): value is RepositoryError {
    return (
        !!value
        && value instanceof RepositoryError
    );
}
