// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { TwilioMessageDTO } from "./dto/TwilioMessageDTO";
import { TwilioCreateMessageContent } from "./dto/types/TwilioCreateMessageContent";
import { TwilioCreateMessageRecipient } from "./dto/types/TwilioCreateMessageRecipient";
import { TwilioCreateMessageSender } from "./dto/types/TwilioCreateMessageSender";

/**
 * Twilio Messages API Client
 * @see https://www.twilio.com/docs/sms/api/message-resource#create-a-message-resource
 */
export interface TwilioMessageClient {

    /**
     * Initiates sending of SMS message
     *
     * @param content The intended content of the message
     * @param recipient The intended recipient
     * @param sender The intended sender of the message. If not specified, the implementation should use a configurable sender.
     * @see https://op-developer.fi/products/banking/docs/op-corporate-payment-api#operation/payment
     */
    sendSms (
        content    : string | TwilioCreateMessageContent,
        recipient  : string | TwilioCreateMessageRecipient,
        sender    ?: string | TwilioCreateMessageSender,
    ): Promise<TwilioMessageDTO>;

}
