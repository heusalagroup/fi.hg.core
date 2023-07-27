// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../../types/String";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { explain, explainProperty } from "../../../types/explain";
import { explainTaskType, isTaskType, TaskType } from "./TaskType";
import { explainTaskState, isTaskState, TaskState } from "./TaskState";
import { explainReadonlyJsonObject, isReadonlyJsonObject, ReadonlyJsonObject } from "../../../Json";
import { explainBoolean, isBoolean } from "../../../types/Boolean";

export interface TaskDTO {
    readonly taskId         : string;
    readonly parentId      ?: string | undefined;
    readonly clientId      ?: string | undefined;
    readonly invoiceId     ?: string | undefined;
    readonly created        : string;
    readonly updated        : string;
    readonly startDate      : string;
    readonly finishedDate   : string;
    readonly deadline       : string;
    readonly assignee       : string;
    readonly type           : TaskType;
    readonly state          : TaskState;
    readonly options        : ReadonlyJsonObject;
    readonly onHold         : boolean;
}

export function createTaskDTO (
    taskId         : string,
    parentId       : string | undefined,
    clientId       : string | undefined,
    invoiceId      : string | undefined,
    created        : string,
    updated        : string,
    startDate      : string,
    finishedDate   : string,
    deadline       : string,
    assignee       : string,
    type           : TaskType,
    state          : TaskState,
    options        : ReadonlyJsonObject,
    onHold         : boolean,
): TaskDTO {
    return {
        taskId,
        parentId,
        clientId,
        invoiceId,
        created,
        updated,
        startDate,
        finishedDate,
        deadline,
        assignee,
        type,
        state,
        options,
        onHold,
    };
}

export function isTaskDTO (value: any): value is TaskDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'taskId',
            'parentId',
            'clientId',
            'invoiceId',
            'created',
            'updated',
            'startDate',
            'finishedDate',
            'deadline',
            'assignee',
            'type',
            'state',
            'options',
            'onHold',
        ])
        && isString(value?.taskId)
        && isStringOrUndefined(value?.parentId)
        && isStringOrUndefined(value?.clientId)
        && isStringOrUndefined(value?.invoiceId)
        && isString(value?.created)
        && isString(value?.updated)
        && isString(value?.startDate)
        && isString(value?.finishedDate)
        && isString(value?.deadline)
        && isString(value?.assignee)
        && isTaskType(value?.type)
        && isTaskState(value?.state)
        && isReadonlyJsonObject(value?.options)
        && isBoolean(value?.onHold)
    );
}

export function explainTaskDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'taskId',
                'parentId',
                'clientId',
                'invoiceId',
                'created',
                'updated',
                'startDate',
                'finishedDate',
                'deadline',
                'assignee',
                'type',
                'state',
                'options',
                'onHold',
            ])
            , explainProperty("taskId", explainString(value?.taskId))
            , explainProperty("parentId", explainStringOrUndefined(value?.parentId))
            , explainProperty("clientId", explainStringOrUndefined(value?.clientId))
            , explainProperty("invoiceId", explainStringOrUndefined(value?.invoiceId))
            , explainProperty("created", explainString(value?.created))
            , explainProperty("updated", explainString(value?.updated))
            , explainProperty("startDate", explainString(value?.startDate))
            , explainProperty("finishedDate", explainString(value?.finishedDate))
            , explainProperty("deadline", explainString(value?.deadline))
            , explainProperty("assignee", explainString(value?.assignee))
            , explainProperty("type", explainTaskType(value?.type))
            , explainProperty("state", explainTaskState(value?.state))
            , explainProperty("options", explainReadonlyJsonObject(value?.options))
            , explainProperty("onHold", explainBoolean(value?.onHold))
        ]
    );
}

export function parseTaskDTO (value: any): TaskDTO | undefined {
    if ( isTaskDTO(value) ) return value;
    return undefined;
}
