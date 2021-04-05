import {Entity, EntityIdTypes} from "../Entity";
import Persister from "../Persister";
import EntityMetadata, {KeyValuePairs} from "./EntityMetadata";
import RepositoryEntityError from "./RepositoryEntityError";
import CrudRepository from "../CrudRepository";
import {map, reduce} from "../../modules/lodash";
import EntityUtils from "../EntityUtils";

export class CrudRepositoryImpl<T extends Entity, ID extends EntityIdTypes>
    implements CrudRepository<T, ID>
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

    /**
     * You shouldn't use Persister directly through this API.
     *
     * This interface is exposed to a public access for our own internal implementation, because TypeScript doesn't
     * support a concept like "friends" found from other languages.
     */
    public __getPersister () : Persister {
        return this._persister;
    }

    public async delete (entity: T): Promise<void> {

        const id = EntityUtils.getId<T, ID>(entity, this._entityMetadata);

        return await this._persister.deleteById<T, ID>(id, this._entityMetadata);

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
        return await this._persister.findAllByProperty(propertyName, value, this._entityMetadata);
    }

    public async count (): Promise<number> {
        return await this._persister.count<T, ID>(this._entityMetadata);
    }

    public async deleteAll (): Promise<void>;
    public async deleteAll (entities: T[]): Promise<void>;

    public async deleteAll (entities?: T[]): Promise<void> {

        if (entities === undefined) {

            return await this._persister.deleteAll<T, ID>(this._entityMetadata);

        } else {

            const ids = map(entities, (item : T) => {
                return EntityUtils.getId<T, ID>(item, this._entityMetadata);
            });

            return await this._persister.deleteAllById<T, ID>(ids, this._entityMetadata);

        }

    }

    public async deleteById (id: ID): Promise<void> {
        return await this._persister.deleteById<T, ID>(id, this._entityMetadata);
    }

    public async deleteAllById (ids: ID[]): Promise<void> {
        return await this._persister.deleteAllById<T, ID>(ids, this._entityMetadata);
    }

    public async existsById (id: ID): Promise<boolean> {

        const idPropertyName : string = EntityUtils.getIdPropertyName(this._entityMetadata);

        return await this._persister.existsByProperty<T, ID>(idPropertyName, id, this._entityMetadata);

    }

    public async saveAll (
        entities: T[]
    ): Promise<T[]> {

        const results : T[] = [];

        await reduce(
            entities,
            async (p : Promise<void>, item : T) => {

                await p;

                const savedItem = await this.save(item);

                results.push(savedItem);

            },
            Promise.resolve()
        );

        return results;

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

}

export default CrudRepositoryImpl;
