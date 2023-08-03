// Copyright (c) 2021-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Disposable } from "../types/Disposable";

export interface EmailVerificationService extends Disposable {

    destroy (): void;

    verifyCode (
        email : string,
        code  : string
    ) : boolean;

    removeVerificationCode (
        email : string,
        code  : string
    ): void;

    createVerificationCode (
        email: string
    ) : string;

}
