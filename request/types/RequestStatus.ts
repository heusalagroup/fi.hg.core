// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { find } from "../../functions/find";
import { trim } from "../../functions/trim";
import { isString } from "../../types/String";
import { isNumber } from "../../types/Number";
import { keys } from "../../functions/keys";

export enum RequestStatus {

    Continue                      = 100,
    SwitchingProtocols            = 101,
    Processing                    = 102,
    CheckPoint                    = 103,
    OK                            = 200,
    Created                       = 201,
    Accepted                      = 202,
    NonAuthoritativeInformation   = 203,
    NoContent                     = 204,
    ResetContent                  = 205,
    PartialContent                = 206,
    MultiStatus                   = 207,
    AlreadyReported               = 208,
    IMUsed                        = 226,
    MultipleChoices               = 300,
    MovedPermanently              = 301,
    Found                         = 302,
    SeeOther                      = 303,
    NotModified                   = 304,
    TemporaryRedirect             = 307,
    PermanentRedirect             = 308,
    BadRequest                    = 400,
    Unauthorized                  = 401,
    PaymentRequired               = 402,
    Forbidden                     = 403,
    NotFound                      = 404,
    MethodNotAllowed              = 405,
    NotAcceptable                 = 406,
    ProxyAuthenticationRequired   = 407,
    RequestTimeout                = 408,
    Conflict                      = 409,
    Gone                          = 410,
    LengthRequired                = 411,
    PreconditionFailed            = 412,
    PayloadTooLarge               = 413,
    URITooLong                    = 414,
    UnsupportedMediaType          = 415,
    RequestedRangeNotSatisfiable  = 416,
    ExpectationFailed             = 417,
    IAmATeapot                    = 418,
    UnprocessableEntity           = 422,
    Locked                        = 423,
    FailedDependency              = 424,
    TooEarly                      = 425,
    UpgradeRequired               = 426,
    PreconditionRequired          = 428,
    TooManyRequests               = 429,
    RequestHeaderFieldsTooLarge   = 431,
    UnavailableForLegalReasons    = 451,

    /**
     * @deprecated Use RequestStatus.InternalServerError
     */
    InternalError                 = 500,

    InternalServerError           = 500,
    NotImplemented                = 501,
    BadGateway                    = 502,
    ServiceUnavailable            = 503,
    GatewayTimeout                = 504,
    HttpVersionNotSupported       = 505,
    VariantAlsoNegotiates         = 506,
    InsufficientStorage           = 507,
    LoopDetected                  = 508,
    BandwidthLimitExceeded        = 509,
    NotExtended                   = 510,
    NetworkAuthenticationRequired = 511,

}

export function isRequestStatus (value: any) : value is RequestStatus {

    if (!isNumber(value)) return false;

    switch (value) {
        case RequestStatus.Continue:
        case RequestStatus.SwitchingProtocols:
        case RequestStatus.Processing:
        case RequestStatus.CheckPoint:
        case RequestStatus.OK:
        case RequestStatus.Created:
        case RequestStatus.Accepted:
        case RequestStatus.NonAuthoritativeInformation:
        case RequestStatus.NoContent:
        case RequestStatus.ResetContent:
        case RequestStatus.PartialContent:
        case RequestStatus.MultiStatus:
        case RequestStatus.AlreadyReported:
        case RequestStatus.IMUsed:
        case RequestStatus.MultipleChoices:
        case RequestStatus.MovedPermanently:
        case RequestStatus.Found:
        case RequestStatus.SeeOther:
        case RequestStatus.NotModified:
        case RequestStatus.TemporaryRedirect:
        case RequestStatus.PermanentRedirect:
        case RequestStatus.BadRequest:
        case RequestStatus.Unauthorized:
        case RequestStatus.PaymentRequired:
        case RequestStatus.Forbidden:
        case RequestStatus.NotFound:
        case RequestStatus.MethodNotAllowed:
        case RequestStatus.NotAcceptable:
        case RequestStatus.ProxyAuthenticationRequired:
        case RequestStatus.RequestTimeout:
        case RequestStatus.Conflict:
        case RequestStatus.Gone:
        case RequestStatus.LengthRequired:
        case RequestStatus.PreconditionFailed:
        case RequestStatus.PayloadTooLarge:
        case RequestStatus.URITooLong:
        case RequestStatus.UnsupportedMediaType:
        case RequestStatus.RequestedRangeNotSatisfiable:
        case RequestStatus.ExpectationFailed:
        case RequestStatus.IAmATeapot:
        case RequestStatus.UnprocessableEntity:
        case RequestStatus.Locked:
        case RequestStatus.FailedDependency:
        case RequestStatus.TooEarly:
        case RequestStatus.UpgradeRequired:
        case RequestStatus.PreconditionRequired:
        case RequestStatus.TooManyRequests:
        case RequestStatus.RequestHeaderFieldsTooLarge:
        case RequestStatus.UnavailableForLegalReasons:
        case RequestStatus.InternalServerError:
        case RequestStatus.NotImplemented:
        case RequestStatus.BadGateway:
        case RequestStatus.ServiceUnavailable:
        case RequestStatus.GatewayTimeout:
        case RequestStatus.HttpVersionNotSupported:
        case RequestStatus.VariantAlsoNegotiates:
        case RequestStatus.InsufficientStorage:
        case RequestStatus.LoopDetected:
        case RequestStatus.BandwidthLimitExceeded:
        case RequestStatus.NotExtended:
        case RequestStatus.NetworkAuthenticationRequired:
            return true;

    }

    return false;

}

export function stringifyRequestStatus (value : RequestStatus) : string {
    switch (value) {

        case RequestStatus.Continue                      : return 'Continue';
        case RequestStatus.SwitchingProtocols            : return 'Switching Protocols';
        case RequestStatus.Processing                    : return 'Processing';
        case RequestStatus.CheckPoint                    : return 'Check Point';
        case RequestStatus.OK                            : return 'OK';
        case RequestStatus.Created                       : return 'Created';
        case RequestStatus.Accepted                      : return 'Accepted';
        case RequestStatus.NonAuthoritativeInformation   : return 'Non-Authoritative Information';
        case RequestStatus.NoContent                     : return 'No Content';
        case RequestStatus.ResetContent                  : return 'Reset Content';
        case RequestStatus.PartialContent                : return 'Partial Content';
        case RequestStatus.MultiStatus                   : return 'Multi Status';
        case RequestStatus.AlreadyReported               : return 'Already Reported';
        case RequestStatus.IMUsed                        : return 'IM Used';
        case RequestStatus.MultipleChoices               : return 'Multiple Choices';
        case RequestStatus.MovedPermanently              : return 'Moved Permanently';
        case RequestStatus.Found                         : return 'Found';
        case RequestStatus.SeeOther                      : return 'See Other';
        case RequestStatus.NotModified                   : return 'Not Modified';
        case RequestStatus.TemporaryRedirect             : return 'Temporary Redirect';
        case RequestStatus.PermanentRedirect             : return 'Permanent Redirect';
        case RequestStatus.BadRequest                    : return 'Bad Request';
        case RequestStatus.Unauthorized                  : return 'Unauthorized';
        case RequestStatus.PaymentRequired               : return 'Payment Required';
        case RequestStatus.Forbidden                     : return 'Forbidden';
        case RequestStatus.NotFound                      : return 'Not Found';
        case RequestStatus.MethodNotAllowed              : return 'Method Not Allowed';
        case RequestStatus.NotAcceptable                 : return 'Not Acceptable';
        case RequestStatus.ProxyAuthenticationRequired   : return 'Proxy Authentication Required';
        case RequestStatus.RequestTimeout                : return 'Request Timeout';
        case RequestStatus.Conflict                      : return 'Conflict';
        case RequestStatus.Gone                          : return 'Gone';
        case RequestStatus.LengthRequired                : return 'Length Required';
        case RequestStatus.PreconditionFailed            : return 'Precondition Failed';
        case RequestStatus.PayloadTooLarge               : return 'Payload Too Large';
        case RequestStatus.URITooLong                    : return 'URI Too Long';
        case RequestStatus.UnsupportedMediaType          : return 'Unsupported Media Type';
        case RequestStatus.RequestedRangeNotSatisfiable  : return 'Requested Range Not Satisfiable';
        case RequestStatus.ExpectationFailed             : return 'Expectation Failed';
        case RequestStatus.IAmATeapot                    : return 'I Am a Teapot';
        case RequestStatus.UnprocessableEntity           : return 'Unprocessable Entity';
        case RequestStatus.Locked                        : return 'Locked';
        case RequestStatus.FailedDependency              : return 'Failed Dependency';
        case RequestStatus.TooEarly                      : return 'Too Early';
        case RequestStatus.UpgradeRequired               : return 'Upgrade Required';
        case RequestStatus.PreconditionRequired          : return 'Precondition Required';
        case RequestStatus.TooManyRequests               : return 'Too Many Requests';
        case RequestStatus.RequestHeaderFieldsTooLarge   : return 'Request Header Fields Too Large';
        case RequestStatus.UnavailableForLegalReasons    : return 'Unavailable For Legal Reasons';
        case RequestStatus.InternalServerError           : return 'Internal Server Error';
        case RequestStatus.NotImplemented                : return 'Not Implemented';
        case RequestStatus.BadGateway                    : return 'Bad Gateway';
        case RequestStatus.ServiceUnavailable            : return 'Service Unavailable';
        case RequestStatus.GatewayTimeout                : return 'Gateway Timeout';
        case RequestStatus.HttpVersionNotSupported       : return 'Http Version Not Supported';
        case RequestStatus.VariantAlsoNegotiates         : return 'Variant Also Negotiates';
        case RequestStatus.InsufficientStorage           : return 'Insufficient Storage';
        case RequestStatus.LoopDetected                  : return 'Loop Detected';
        case RequestStatus.BandwidthLimitExceeded        : return 'Bandwidth Limit Exceeded';
        case RequestStatus.NotExtended                   : return 'Not Extended';
        case RequestStatus.NetworkAuthenticationRequired : return 'Network Authentication Required';

        default                                          :

            if (value < 400) return 'HTTP Status';

            return 'HTTP Error';

    }
}

export function parseRequestStatus (value: any) : RequestStatus {

    if (isRequestStatus(value)) return value;

    if (isString(value)) {

        value = trim(value);

        const integerValue = parseInt(value, 10);
        if (isRequestStatus(integerValue)) return integerValue;

        value = normaliseStatusString(value);

        const statusKey : string | undefined = find(keys(RequestStatus), (key : string) => {
            // @ts-ignore
            const item : RequestStatus = RequestStatus[key];
            return normaliseStatusString(stringifyRequestStatus(item)) === value;
        });

        if (statusKey) {
            // @ts-ignore
            return RequestStatus[statusKey];
        }

    }

    throw new TypeError(`Cannot parse value "${value}" as a valid RequestStatus`);

}

function normaliseStatusString (value: string) : string {
    return value.toLowerCase().replace(/[ _-]+/g, "-");
}


