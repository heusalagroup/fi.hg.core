// Copyright (c) 2021-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Disposable } from "../types/Disposable";

export interface SmsVerificationService extends Disposable {

    destroy (): void;

    verifyCode (
        sms : string,
        code  : string
    ) : boolean;

    removeVerificationCode (
        sms : string,
        code  : string
    ): void;

    createVerificationCode (
        sms: string
    ) : string;

}
