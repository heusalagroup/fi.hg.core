// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

export interface VoidCallback {
    () : void;
}

export interface ChangeCallback<T> {
    (name : T) : void;
}

export interface EventCallback<T> {
    (event : T) : void;
}

export interface EventCallbackWithArgs<T> {
    (event : T, ...params: any[]) : void;
}

export interface DropCallback<T> {
    (id : T, ...params: any[]) : void;
}

