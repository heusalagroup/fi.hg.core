// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogService } from "../../../LogService";
import { Entity } from "../../Entity";
import { EntityUtils } from "../../utils/EntityUtils";
import { createSimpleDTO, isSimpleDTO, SimpleDTO } from "./SimpleDTO";
import { ReadonlyJsonObject } from "../../../Json";
import { join } from "../../../functions/join";

const LOG = LogService.createLogger('SimpleEntity');

export abstract class SimpleEntity extends Entity {

    public abstract entityId?: string;
    public abstract entityUpdated?: string;
    public abstract entityCreated?: string;
    public abstract entityData?: string;
    public abstract entityMembers?: string;
    public abstract entityInvited?: string;
    public abstract entityVersion?: number;
    public abstract entityDeleted?: boolean;

    public static parseId (entity: SimpleEntity) : string {
        return EntityUtils.parseIntegerAsString(entity.entityId) ?? '';
    }

    public static parseUpdated (entity: SimpleEntity) : string {
        return EntityUtils.parseMySQLDateAsIsoString(entity.entityUpdated) ?? '';
    }

    public static parseCreated (entity: SimpleEntity) : string {
        return EntityUtils.parseMySQLDateAsIsoString(entity.entityCreated) ?? '';
    }

    public static parseData (entity: SimpleEntity) : ReadonlyJsonObject {
        return EntityUtils.parseJsonObject(entity.entityData) ?? {};
    }

    public static parseMembers (entity: SimpleEntity) : readonly string[] {
        return EntityUtils.parseStringArray(entity.entityMembers, ' ');
    }

    public static parseInvited (entity: SimpleEntity) : readonly string[] {
        return EntityUtils.parseStringArray(entity.entityInvited, ' ');
    }

    public static prepareMembers (value : readonly string[]) : string {
        return join(value, ' ');
    }

    public static prepareInvited (value : readonly string[]) : string {
        return join(value, ' ');
    }

    public static parseVersion (entity: SimpleEntity) : number {
        return EntityUtils.parseNumber(entity.entityVersion) ?? 0;
    }

    public static parseDeleted (entity: SimpleEntity) : boolean {
        return EntityUtils.parseBoolean(entity.entityDeleted) ?? false;
    }

    public static parseNextVersion (entity: SimpleEntity) : number {
        return this.parseVersion(entity) + 1;
    }

    public static toDTO (entity: SimpleEntity) : SimpleDTO {
        const dto : SimpleDTO = createSimpleDTO(
            this.parseId(entity),
            this.parseUpdated(entity),
            this.parseCreated(entity),
            this.parseData(entity),
            this.parseMembers(entity),
            this.parseInvited(entity),
            this.parseVersion(entity),
            this.parseDeleted(entity)
        );
        // Redundant fail safe
        if (!isSimpleDTO(dto)) {
            LOG.debug(`toDTO: dto / entity = `, dto, entity);
            throw new TypeError(`Failed to create valid SimpleDTO`);
        }
        return dto;
    }

}

