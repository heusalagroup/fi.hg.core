// Copyright (c) 2022-2023. Heusala Group Oy. All rights reserved.
// Copyright (c) 2020-2021. Sendanor. All rights reserved.

import { isArray, isArrayOf } from "../types/Array";
import { map } from "../functions/map";
import { reduce } from "../functions/reduce";
import { isBoolean } from "../types/Boolean";
import { forEach } from "../functions/forEach";
import { isString } from "../types/String";
import { isNumber } from "../types/Number";
import { isUndefined } from "../types/undefined";
import { isNull } from "../types/Null";
import { isFunction } from "../types/Function";
import { CreateEntityLikeCallback, EntityLike } from "./types/EntityLike";
import { cloneJson, isJsonAny, isReadonlyJsonAny, ReadonlyJsonObject } from "../Json";
import { EntityMetadata } from "./types/EntityMetadata";
import { EntityMetadataUtils } from "./utils/EntityMetadataUtils";
import { EntityField } from "./types/EntityField";
import { EntityRelationOneToMany } from "./types/EntityRelationOneToMany";
import { EntityRelationManyToOne } from "./types/EntityRelationManyToOne";
import { LogService } from "../LogService";
import { EntityFieldType } from "./types/EntityFieldType";

const LOG = LogService.createLogger( 'Entity' );

/**
 * Base type for all supported ID types
 */
export type EntityIdTypes = string | number;

export interface EntityConstructor {
    new (...args: any): Entity;
}

export class Entity implements EntityLike {

    protected constructor () {
    }

    /**
     * @inheritDoc
     */
    public getMetadata (): EntityMetadata {
        return EntityMetadataUtils.getMetadata(this.constructor);
    }

    /**
     * @inheritDoc
     */
    public toJSON () : ReadonlyJsonObject {
        return entityToJSON(this, this.getMetadata());
    }

    /**
     * @inheritDoc
     */
    public clone () : Entity {
        return cloneEntity(this, this.getMetadata());
    }

}

export function isEntity (value: unknown) : value is Entity {
    return !!value && (value instanceof Entity);
}

/**
 *
 * @param entity
 * @param metadata
 */
export function entityToJSON (
    entity: Entity,
    metadata: EntityMetadata
) : ReadonlyJsonObject {

    let json = reduce(
        metadata.fields,
        (prev: ReadonlyJsonObject, field: EntityField) : ReadonlyJsonObject => {
            const propertyName = field?.propertyName;
            if (!propertyName) throw new TypeError(`The field did not have propertyName defined`);
            const value : unknown = (entity as any)[propertyName];
            if (value === undefined) return prev;
            if (!isReadonlyJsonAny(value)) {
                LOG.warn(`Could not convert property "${propertyName}" as JSON: Value not compatible for JSON:`, value);
                return prev;
            }
            return {
                ...prev,
                [propertyName]: value
            };
        },
        {} as ReadonlyJsonObject
    );

    json = reduce(
        metadata.oneToManyRelations,
        (prev: ReadonlyJsonObject, oneToMany: EntityRelationOneToMany) : ReadonlyJsonObject => {
            const { propertyName } = oneToMany;
            if (propertyName) {
                const value : unknown = (entity as any)[propertyName];
                if (value === undefined) return prev;
                if (!isArrayOf<Entity>(value, isEntity)) {
                    LOG.warn(`Could not convert property "${propertyName}" as JSON: Value not entity array:`, value);
                    return prev;
                }
                return {
                    ...prev,
                    [propertyName]: map(value, (item : Entity) : ReadonlyJsonObject => item.toJSON())
                };
            }
            return prev;
        },
        json
    );

    json = reduce(
        metadata.manyToOneRelations,
        (prev: ReadonlyJsonObject, manyToOne: EntityRelationManyToOne) : ReadonlyJsonObject => {
            const { propertyName } = manyToOne;
            if (propertyName) {
                const value : unknown = (entity as any)[propertyName];
                if (value === undefined) return prev;
                if (!isEntity(value)) {
                    LOG.warn(`Could not convert property "${propertyName}" as JSON: Value not entity:`, value);
                    return prev;
                }
                return {
                    ...prev,
                    [propertyName]: value.toJSON()
                };
            }
            return prev;
        },
        json
    );

    return json;

}

/**
 *
 * @param entity
 * @param metadata
 */
export function cloneEntity (
    entity: Entity,
    metadata: EntityMetadata
) : Entity {
    const idPropertyName = metadata?.idPropertyName;
    if (!idPropertyName) throw new TypeError(`The entity metadata did not have id property name defined`);
    const createEntity : CreateEntityLikeCallback | undefined = metadata?.createEntity;
    if (!isFunction(createEntity)) {
        throw new TypeError(`The entity metadata did not have ability to create new entities. Did you forget '@table()' annotation?`);
    }
    const clonedEntity = createEntity();

    // We need to copy all normal fields because entity constructor might not
    // initialize everything same way
    forEach(
        metadata?.fields,
        (field: EntityField) => {
            const propertyName = field.propertyName;
            // Note: Joined entities will be copied below at manyToOneRelations
            if (propertyName && field.fieldType !== EntityFieldType.JOINED_ENTITY) {
                (clonedEntity as any)[propertyName] = cloneEntityValue((entity as any)[propertyName]);
            }
        }
    );

    // We also need to copy @OneToMany relations
    forEach(
        metadata.oneToManyRelations,
        (oneToMany: EntityRelationOneToMany) : void => {
            const { propertyName } = oneToMany;
            if (propertyName) {
                (clonedEntity as any)[propertyName] = cloneEntityValue((entity as any)[propertyName]);
            }
        },
    );

    // We also need to copy @ManyToOne relations
    forEach(
        metadata.manyToOneRelations,
        (manyToOne: EntityRelationManyToOne) : void => {
            const { propertyName } = manyToOne;
            if (propertyName) {
                (clonedEntity as any)[propertyName] = cloneEntityValue((entity as any)[propertyName]);
            }
        },
    );

    return clonedEntity;
}

/**
 *
 * @param value
 */
function cloneEntityValue<T = any> (value: T) : T {

    if ( isString(value)
        || isNumber(value)
        || isBoolean(value)
        || isUndefined(value)
        || isNull(value)
    ) {
        return value;
    }

    if ( isArray(value) ) {
        return map(
            value,
            (item: any) => cloneEntityValue(item)
        ) as unknown as T;
    }

    if ( isEntity(value) ) {
        return value.clone() as unknown as T;
    }

    if ( isJsonAny(value) ) {
        return cloneJson(value) as unknown as T;
    }

    LOG.debug(`value = `, value);
    throw new TypeError(`Could not clone value: ${value}`);
}
