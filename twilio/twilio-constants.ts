// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export const TWILIO_PRODUCTION_URL = 'https://api.twilio.com/2010-04-01';

export const TWILIO_CREATE_MESSAGE_PATH = (AccountSid: string) => `https://api.twilio.com/2010-04-01/Accounts/${q(AccountSid)}/Messages.json`;

function q (value: string) : string {
    return encodeURIComponent(value);
}
