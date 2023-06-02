// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

/**
 * Interface to be implemented by applications that want to release resources on
 * destruction.
 */
export interface Disposable {

    /**
     * Invoked by the containing application framework on destruction of the class.
     */
    destroy() : void;

}
