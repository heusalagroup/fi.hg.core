// Copyright (c) 2020-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { map } from "../../../functions/map";
import { TaskDTO, isTaskDTO } from "./TaskDTO";
import { isArrayOf } from "../../../types/Array";

/**
 * The client object used in the REST API communication
 */
export interface TaskListDTO {
    readonly payload: readonly TaskDTO[];
}

export function createTaskListDTO (items: TaskDTO[]): TaskListDTO {
    return {
        payload: map(items, (item: TaskDTO): TaskDTO => item)
    };
}

export function isTaskListDTO (value: any): value is TaskListDTO {
    return (
        !!value
        && isArrayOf<TaskDTO>(value?.payload, isTaskDTO)
    );
}

export function parseTaskListDTO (value: any): TaskListDTO | undefined {
    if ( isTaskListDTO(value) ) return value;
    return undefined;
}
