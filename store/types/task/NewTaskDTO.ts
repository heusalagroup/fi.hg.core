// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainString, isString } from "../../../types/String";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { explain, explainProperty } from "../../../types/explain";
import { explainTaskType, isTaskType, TaskType } from "./TaskType";
import { explainTaskState, isTaskState, TaskState } from "./TaskState";
import { explainReadonlyJsonObject, isReadonlyJsonObject, ReadonlyJsonObject } from "../../../Json";
import { explainBoolean, isBoolean } from "../../../types/Boolean";

export interface NewTaskDTO {
    readonly parentId       : string;
    readonly clientId       : string;
    readonly invoiceId      : string;
    readonly startDate      : string;
    readonly finishedDate   : string;
    readonly deadline       : string;
    readonly assignee       : string;
    readonly type           : TaskType;
    readonly state          : TaskState;
    readonly options        : ReadonlyJsonObject;
    readonly onHold         : boolean;
}

export function createNewTaskDTO (
    parentId       : string,
    clientId       : string,
    invoiceId      : string,
    startDate      : string,
    finishedDate   : string,
    deadline       : string,
    assignee       : string,
    type           : TaskType,
    state          : TaskState,
    options        : ReadonlyJsonObject,
    onHold         : boolean,
): NewTaskDTO {
    return {
        parentId,
        clientId,
        invoiceId,
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

export function isNewTaskDTO (value: any): value is NewTaskDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'parentId',
            'clientId',
            'invoiceId',
            'startDate',
            'finishedDate',
            'deadline',
            'assignee',
            'type',
            'state',
            'options',
            'onHold',
        ])
        && isString(value?.parentId)
        && isString(value?.clientId)
        && isString(value?.invoiceId)
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

export function explainNewTaskDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'parentId',
                'clientId',
                'invoiceId',
                'startDate',
                'finishedDate',
                'deadline',
                'assignee',
                'type',
                'state',
                'options',
                'onHold',
            ])
            , explainProperty("parentId", explainString(value?.parentId))
            , explainProperty("clientId", explainString(value?.clientId))
            , explainProperty("invoiceId", explainString(value?.invoiceId))
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

export function parseNewTaskDTO (value: any): NewTaskDTO | undefined {
    if ( isNewTaskDTO(value) ) return value;
    return undefined;
}
