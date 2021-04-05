import {Entity, EntityIdTypes} from "./Entity";
import Repository from "./types/Repository";

export interface CrudRepository<T extends Entity, IdType extends EntityIdTypes>
    extends Repository<T, IdType>
{

}

export default CrudRepository;