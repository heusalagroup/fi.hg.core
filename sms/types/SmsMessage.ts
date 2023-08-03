
/**
 * Sms message DTO
 */
export interface SmsMessage {
    readonly from?: string;
    readonly to: string | string[];
    readonly content?: string;
}
