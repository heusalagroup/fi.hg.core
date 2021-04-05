import {Entity, EntityIdTypes} from "../Entity";
import Repository from "./Repository";
import Persister from "./Persister";

export interface CrudRepository<T extends Entity, IdType extends EntityIdTypes>
    extends Repository<T, IdType>
{

    getPersister () : Persister;

    save (entity: T): Promise<T>;

    delete (entity: T): Promise<void>;

    findAll (): Promise<T[]>;

    findAllById (ids: any[]): Promise<T[]>;

    findById (id: any): Promise<T | undefined>;

    find (propertyName: string, value: any): Promise<T[]>;

}

export default CrudRepository;