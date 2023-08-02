
/**
 * Email message DTO
 */
export interface EmailMessage {
    readonly from?: string;
    readonly to: string | string[];
    readonly cc?: string | string[];
    readonly subject: string;
    readonly content?: string;
    readonly htmlContent?: string;
}
