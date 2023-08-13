// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../../types/explain";
import { isUndefined } from "../../../types/undefined";

export enum InventoryState {

    /**
     * Special type which may be used to mean the inventory item has not been
     * saved yet
     */
    UNINITIALIZED = "UNINITIALIZED",

    /**
     * Inventory item is under construction
     */
    DRAFT = "DRAFT",

    /**
     * Inventory item is queued to be approved to the background services
     */
    WAITING_APPROVAL  = "WAITING_APPROVAL",

    /**
     * Inventory item is was approved and is queued to be modified to the background services
     */
    CHANGING  = "CHANGING",

    /**
     * Inventory item has been successfully updated to the background services
     */
    READY     = "READY",

    /**
     * Inventory item was not successfully updated to the background services
     */
    ERROR     = "ERROR",

    /**
     * Inventory item was locked
     */
    LOCKED     = "LOCKED",

    /**
     * Inventory item was cancelled
     */
    CANCELLED     = "CANCELLED",

    /**
     * Inventory item was removed
     */
    DELETED     = "DELETED"

}

export function isInventoryState (value: any): value is InventoryState {
    switch (value) {
        case InventoryState.UNINITIALIZED:
        case InventoryState.DRAFT:
        case InventoryState.WAITING_APPROVAL:
        case InventoryState.CHANGING:
        case InventoryState.READY:
        case InventoryState.ERROR:
            return true;
        default:
            return false;
    }
}

export function explainInventoryState (value : any) : string {
    return explainEnum("InventoryState", InventoryState, isInventoryState, value);
}

export function stringifyInventoryState (value: InventoryState): string {
    switch (value) {
        case InventoryState.UNINITIALIZED   : return 'UNINITIALIZED';
        case InventoryState.DRAFT   : return 'DRAFT';
        case InventoryState.WAITING_APPROVAL  : return 'WAITING_APPROVAL';
        case InventoryState.CHANGING  : return 'CHANGING';
        case InventoryState.READY     : return 'READY';
        case InventoryState.ERROR     : return 'ERROR';
    }
    throw new TypeError(`Unsupported InventoryState value: ${value}`);
}

export function parseInventoryState (value: any): InventoryState | undefined {
    switch (`${value}`.toUpperCase()) {
        case 'UNINITIALIZED'  : return InventoryState.UNINITIALIZED;
        case 'DRAFT'  : return InventoryState.DRAFT;
        case 'WAITING_APPROVAL' : return InventoryState.WAITING_APPROVAL;
        case 'CHANGING' : return InventoryState.CHANGING;
        case 'READY'    : return InventoryState.READY;
        case 'ERROR'    : return InventoryState.ERROR;
        default     : return undefined;
    }
}

export function isInventoryStateOrUndefined (value: unknown): value is InventoryState | undefined {
    return isUndefined(value) || isInventoryState(value);
}

export function explainInventoryStateOrUndefined (value: unknown): string {
    return isInventoryStateOrUndefined(value) ? explainOk() : explainNot(explainOr(['InventoryState', 'undefined']));
}
