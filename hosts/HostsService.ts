// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { HostsModel } from "./HostsModel";
import { Disposable } from "../types/Disposable";
import { ObserverCallback } from "../Observer";
import { HostsServiceDestructor, HostsServiceEvent } from "./HostsServiceImpl";
import { HostEntryModel } from "./HostEntryModel";

export interface HostsService extends Disposable {

    destroy (): void;

    on (
        name: HostsServiceEvent,
        callback: ObserverCallback<HostsServiceEvent>
    ): HostsServiceDestructor;

    /**
     * Get full hosts model
     */
    getModel () : HostsModel;

    /**
     * Set full hosts model
     */
    setModel (model: HostsModel) : void;

    /**
     * Get entry by IP address
     *
     * @param address
     */
    getEntryByAddress (address: string) : HostEntryModel | undefined;

    /**
     * Get entry by DNS hostname
     *
     * @param hostname
     */
    getEntryByHostname (hostname: string) : HostEntryModel | undefined;

    /**
     * Set entry by address
     *
     * @param address
     * @param hostnames
     */
    setAddress (
        address   : string,
        hostnames : readonly string[] | string
    ) : void;

    /**
     * Remove entry by address
     *
     * @param address
     */
    removeAddress (
        address   : string
    ) : void;

    /**
     * Replace entry by hostname.
     *
     * This will look for old entries for the hostname and remove those before
     * updating the new entry. If the old entry with a different address has no
     * more hostnames, the whole entry will be removed.
     *
     * @param address The address for hostnames
     * @param hostnames List of hostnames -- or single hostname
     */
    replaceByHostnames (
        address   : string,
        hostnames : readonly string[] | string
    ) : void;

    /**
     * Returns the internal model in the standard /etc/hosts format
     */
    toString () : string;

}
