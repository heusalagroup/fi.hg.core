// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

/**
 * Public interface for autowire service
 */
export interface AutowireService {
    hasName (name : string) : boolean;
    getName<T> (name : string) : T;
    setName<T> (name : string, value: T) : void;
    deleteName (name : string) : void;
}
