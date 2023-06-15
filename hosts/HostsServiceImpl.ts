// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createHostsModel, HostsModel } from "./HostsModel";
import { Observer, ObserverCallback, ObserverDestructor } from "../Observer";
import { HostsService } from "./HostsService";
import { createHostEntryModel, HostEntryModel } from "./HostEntryModel";
import { map } from "../functions/map";
import { isEqual } from "../functions/isEqual";
import { find } from "../functions/find";
import { some } from "../functions/some";
import { isString } from "../types/String";
import { concat } from "../functions/concat";
import { uniq } from "../functions/uniq";
import { forEach } from "../functions/forEach";
import { filter } from "../functions/filter";

export enum HostsServiceEvent {
    MODEL_UPDATED
}

export type HostsServiceDestructor = ObserverDestructor;

export class HostsServiceImpl implements HostsService {

    private _model : HostsModel;

    private readonly _observer: Observer<HostsServiceEvent>;

    public static Event = HostsServiceEvent;

    protected constructor (
        model: HostsModel
    ) {
        this._model = model;
        this._observer = new Observer<HostsServiceEvent>( "HostsServiceImpl" );
    }

    public static create (
        model: HostsModel
    ) : HostsServiceImpl {
        return new HostsServiceImpl(model);
    }

    /**
     * @inheritDoc
     */
    public getModel () : HostsModel {
        return this._model;
    }

    /**
     * @inheritDoc
     */
    public setModel (model: HostsModel) : void {
        this._setModel( model );
    }

    /**
     * @inheritDoc
     */
    public setAddress (
        address   : string,
        hostnames : readonly string[] | string
    ) : void {
        this._setModel( HostsServiceImpl._setAddress(this._model, address, hostnames) );
    }

    /**
     * @inheritDoc
     */
    public removeAddress (
        address   : string
    ) : void {
        this._setModel( HostsServiceImpl._removeAddress(this._model, address) );
    }

    /**
     * @inheritDoc
     */
    public replaceByHostnames (
        address   : string,
        hostnames : readonly string[] | string
    ) : void {
        hostnames = isString(hostnames) ? [hostnames] : hostnames;
        let model = this._model;

        forEach(
            hostnames,
            (hostname: string) => {
                model = HostsServiceImpl._replaceByHostname(model, address, hostname);
            }
        );

        this._setModel(model);

    }

    /**
     * @inheritDoc
     */
    public destroy (): void {
        this._observer.destroy();
    }

    public on (
        name: HostsServiceEvent,
        callback: ObserverCallback<HostsServiceEvent>
    ): HostsServiceDestructor {
        return this._observer.listenEvent( name, callback );
    }

    public getEntryByAddress (address: string) : HostEntryModel | undefined {
        return HostsServiceImpl._getEntryByAddress(this._model, address);
    }

    public getEntryByHostname (hostname: string) : HostEntryModel | undefined {
        return HostsServiceImpl._getEntryByHostname(this._model, hostname);
    }

    public toString () : string {
        return map(
            this._model.entries,
            (item: HostEntryModel) : string => `${item.address}\t${item.hostnames.join(' ')}`
        ).join('\n') + '\n';
    }

    /**
     * @inheritDoc
     */
    private static _setAddress (
        model     : HostsModel,
        address   : string,
        hostnames : readonly string[] | string
    ) : HostsModel {
        const newEntry = createHostEntryModel(address, hostnames);
        let added : boolean = false;
        const newEntries = map(
            model.entries,
            (item: HostEntryModel) : HostEntryModel => {
                if (item.address === address) {
                    added = true;
                    return newEntry;
                } else {
                    return item;
                }
            }
        );
        if (!added) {
            newEntries.push(newEntry);
        }
        return createHostsModel(newEntries);
    }

    /**
     * @inheritDoc
     */
    private static _removeAddress (
        model     : HostsModel,
        address   : string
    ) : HostsModel {
        const newEntries = filter(
            model.entries,
            (item: HostEntryModel) : boolean => item.address === address
        );
        return createHostsModel(newEntries);
    }

    public static _replaceByHostname (
        model    : HostsModel,
        address  : string,
        hostname : string
    ) : HostsModel {

        const oldEntryByHostname : HostEntryModel | undefined = HostsServiceImpl._getEntryByHostname(model, hostname);
        const oldEntryByAddress : HostEntryModel | undefined = HostsServiceImpl._getEntryByAddress(model, address);

        if (oldEntryByHostname !== undefined) {
            const newHostnames = filter(oldEntryByHostname.hostnames, (item : string) : boolean => item !== hostname);
            if (newHostnames.length) {
                model = HostsServiceImpl._setAddress(model, oldEntryByHostname.address, newHostnames);
            } else {
                model = HostsServiceImpl._removeAddress(model, oldEntryByHostname.address);
            }
        }

        if (oldEntryByAddress !== undefined) {
            model = HostsServiceImpl._setAddress(model, address, uniq(concat([], oldEntryByAddress.hostnames, [hostname])) );
        } else {
            model = HostsServiceImpl._setAddress(model, address, [hostname]);
        }

        return model;

    }

    private _setModel (
        newHostsModel: HostsModel
    ) : void {

        if (isEqual(this._model, newHostsModel)) {
            return;
        }

        this._model = newHostsModel;

        if (this._observer.hasCallbacks(HostsServiceEvent.MODEL_UPDATED)) {
            this._observer.triggerEvent(HostsServiceEvent.MODEL_UPDATED);
        }

    }

    private static _getEntryByAddress (model: HostsModel, address: string) : HostEntryModel | undefined {
        return find(
            model.entries,
            (entry: HostEntryModel) : boolean => entry.address === address
        );
    }

    private static _getEntryByHostname (model: HostsModel, hostname: string) : HostEntryModel | undefined {
        return find(
            model.entries,
            (entry: HostEntryModel) : boolean => some(entry.hostnames, (item: string) : boolean => item === hostname)
        );
    }

}