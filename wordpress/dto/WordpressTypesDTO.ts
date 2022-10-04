import {isString} from "../../modules/lodash";

export enum WP_Enum {
    publish = "publish",
    future = "future",
    draft = "draft",
    pending = "pending",
    private = "private"
}

export function isWordpressTypesDTO (value: WP_Enum): boolean {
    return (
        isString(value)
    )
}