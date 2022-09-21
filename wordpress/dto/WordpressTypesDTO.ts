import {isString} from "../../modules/lodash";

export type WP_Types = {
    publish: "publish",
    future: "future",
    draft: "draft",
    pending: "pending",
    private: "private"
}

export function isWordpressTypesDTO (value: WP_Types): boolean {
    return (
        isString(value)
    )
}