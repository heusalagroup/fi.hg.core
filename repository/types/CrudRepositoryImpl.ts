import {Entity, EntityIdTypes} from "../Entity";
import Persister from "./Persister";
import EntityMetadata, {KeyValuePairs} from "./EntityMetadata";
import RepositoryEntityError from "./RepositoryEntityError";
import CrudRepository from "./CrudRepository";

export class CrudRepositoryImpl<T extends Entity, IdType extends EntityIdTypes>
    implements CrudRepository<T, IdType>
{

    private readonly _persister      : Persister;
    private readonly _entityMetadata : EntityMetadata;

    public constructor (
        emptyMetadata : EntityMetadata,
        persister     : Persister
    ) {

        this._entityMetadata = emptyMetadata;

        this._persister = persister;

    }

    public getPersister () : Persister {
        return this._persister;
    }

    public async save (entity: T): Promise<T> {

        const metadata = this._entityMetadata;

        const id = (entity as KeyValuePairs)[metadata.idPropertyName];

        if (!id) {
            return await this._persister.insert(entity, metadata);
        }

        const current = await this.findById(id);

        if (!current) {
            throw new RepositoryEntityError(id, RepositoryEntityError.Code.ENTITY_NOT_FOUND, `Entity "${id}" not found in table: ${metadata.tableName}`);
        }

        return await this._persister.update(entity, metadata);

    }

    public async delete (entity: T): Promise<void> {
        return await this._persister.delete(entity, this._entityMetadata);
    }

    public async findAll (): Promise<T[]> {
        return await this._persister.findAll(this._entityMetadata);
    }

    public async findAllById (ids: any[]): Promise<T[]> {
        return await this._persister.findAllById(ids, this._entityMetadata);
    }

    public async findById (id: any): Promise<T | undefined> {
        return await this._persister.findById(id, this._entityMetadata);
    }

    public async find (propertyName: string, value: any): Promise<T[]> {
        return await this._persister.findByProperty(propertyName, value, this._entityMetadata);
    }

}

export default CrudRepositoryImpl;
