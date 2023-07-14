// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNot, explainOk, explainOr } from "../../../types/explain";
import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../../types/Enum";
import { isUndefined } from "../../../types/undefined";

export enum TaskState {
    NEW = "new",
    IN_PROGRESS = "in_progress",
    CLOSED = "closed",
    FAILED = "failed",
    CANCELLED = "cancelled",
}

export function isTaskState (value: unknown) : value is TaskState {
    return isEnum(TaskState, value);
}

export function explainTaskState (value : unknown) : string {
    return explainEnum("TaskState", TaskState, isTaskState, value);
}

export function stringifyTaskState (value : TaskState) : string {
    return stringifyEnum(TaskState, value);
}

export function parseTaskState (value: any) : TaskState | undefined {
    return parseEnum(TaskState, value) as TaskState | undefined;
}

export function isTaskStateOrUndefined (value: unknown): value is TaskState | undefined {
    return isUndefined(value) || isTaskState(value);
}

export function explainTaskStateOrUndefined (value: unknown): string {
    return isTaskStateOrUndefined(value) ? explainOk() : explainNot(explainOr(['TaskState', 'undefined']));
}
