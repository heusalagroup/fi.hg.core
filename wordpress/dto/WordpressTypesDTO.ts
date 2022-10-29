import {isString} from "../../modules/lodash";

export enum WordpressEnum {
    publish = "publish",
    future = "future",
    draft = "draft",
    pending = "pending",
    private = "private"
}

export function isWordpressTypesDTO (value: WordpressEnum): boolean {
    return (
        isString(value)
    )
}