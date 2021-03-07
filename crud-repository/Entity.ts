// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import "reflect-metadata";

import EntityMetadata from "./persistence/EntityMetadata";

const metadataKey = Symbol("metadata");

function updateMetadata(target: any, setValue: (metadata: EntityMetadata) => void): void {
    const metadata: EntityMetadata = Reflect.getMetadata(metadataKey, target) || {
        tableName: "",
        idColumnName: "",
        fields: [],
    };
    setValue(metadata);
    Reflect.defineMetadata(metadataKey, metadata, target);
}

export const Table = (tableName: string) => {
    return (target: any) => {
        updateMetadata(target, (metadata: EntityMetadata) => {
            metadata.tableName = tableName;
        });
    };
};

export const Column = (columnName: string): PropertyDecorator => {
    return (target, property) => {
        updateMetadata(target.constructor, (metadata: EntityMetadata) => {
            metadata.fields.push({ propertyName: property as string, columnName });
        });
    };
};

export const Id = (): PropertyDecorator => {
    return (target, property) => {
        updateMetadata(target.constructor, (metadata: EntityMetadata) => {
            metadata.idPropertyName = property as string;
        });
    };
};

export class Entity {
    public getMetadata(): EntityMetadata {
        return Reflect.getMetadata(metadataKey, this.constructor);
    }
}
