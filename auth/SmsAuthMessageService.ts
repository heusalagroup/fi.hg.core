// Copyright (c) 2022-2023. <info@heusalagroup.fi>. All rights reserved.

import { Language } from "../types/Language";

export interface SmsAuthMessageService {

    sendAuthenticationCode (
        lang: Language,
        sms: string,
        code: string
    ): Promise<void>;

}
