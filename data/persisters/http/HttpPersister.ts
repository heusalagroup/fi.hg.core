// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Persister } from "../../types/Persister";
import { Entity, EntityIdTypes } from "../../Entity";
import { EntityMetadata } from "../../types/EntityMetadata";
import { Where } from "../../Where";
import { PersisterType } from "../types/PersisterType";
import { LogLevel } from "../../../types/LogLevel";
import { HttpService } from "../../../HttpService";
import { LogService } from "../../../LogService";
import { ZENDESK_API_GET_GROUP_LIST_CURSOR_NEXT_PATH } from "../../../zendesk/zendesk-api";
import { explainZendeskGroupListDTO, isZendeskGroupListDTO } from "../../../zendesk/dto/ZendeskGroupListDTO";
import { filter } from "../../../functions/filter";
import { isZendeskGroup } from "../../../zendesk/dto/ZendeskGroup";
import { API_V1_URL_COUNT } from "./constants/api";
import { explainHgRsCountResponseDTO, HgRsCountResponseDTO, isHgRsCountResponseDTO } from "./types/HgRsCountResponseDTO";

const LOG = LogService.createLogger( 'HttpPersister' );

export class HttpPersister implements Persister {

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
        HttpService.setLogLevel(level);
    }

    private readonly _url : string;
    private readonly _token : string;

    private constructor (
        url   : string,
        token : string
    ) {
        this._url = url;
        this._token = token;
    }

    public destroy (): void {
    }

    public static create (
        url : string,
        token ?: string
    ) {
        if (!token) throw new TypeError(`Token was missing`);
        return new HttpPersister(url, token);
    }

    public count<T extends Entity, ID extends EntityIdTypes> (
        metadata : EntityMetadata,
        where    : Where | undefined
    ): Promise<number> {
        const body :

        const result = await HttpService.getJson(
            `${this._url}${API_V1_URL_COUNT}`,
            {
                'Authorization': this._token
            }
        );
        if (!isHgRsCountResponseDTO(result)) {
            LOG.debug(`_continueGroupExport: Not ZendeskGroupListDTO: ${explainHgRsCountResponseDTO(result)}`);
            const list = filter(
                (result as any)?.groups ?? [],
                (item: any) : boolean => !isZendeskGroup(item)
            );
            LOG.debug(`_continueGroupExport: incorrect groups = `, list);
            throw new TypeError(`Result was not ZendeskGroupListDTO`);
        }
        return result;

    }

    public deleteAll<T extends Entity, ID extends EntityIdTypes> (metadata: EntityMetadata, where: Where | undefined): Promise<void> {
        return Promise.resolve( undefined );
    }

    public existsBy<T extends Entity, ID extends EntityIdTypes> (metadata: EntityMetadata, where: Where): Promise<boolean> {
        return Promise.resolve( false );
    }

    public findAll<T extends Entity, ID extends EntityIdTypes> (metadata: EntityMetadata, where: Where | undefined, sort: Sort | undefined): Promise<T[]> {
        return Promise.resolve( [] );
    }

    public findBy<T extends Entity, ID extends EntityIdTypes> (metadata: EntityMetadata, where: Where, sort: Sort | undefined): Promise<T | undefined> {
        return Promise.resolve( undefined );
    }

    public getPersisterType (): PersisterType {
        return PersisterType.HTTP;
    }

    public insert<T extends Entity, ID extends EntityIdTypes> (metadata: EntityMetadata, entity: readonly T[] | T): Promise<T> {
        return Promise.resolve( undefined );
    }

    public setupEntityMetadata (metadata: EntityMetadata): void {
    }

    public update<T extends Entity, ID extends EntityIdTypes> (metadata: EntityMetadata, entity: T): Promise<T> {
        return Promise.resolve( undefined );
    }

}
