import {Entity, EntityIdTypes} from "../Entity";
import Repository from "./Repository";
import Persister from "./Persister";

export interface CrudRepository<T extends Entity, IdType extends EntityIdTypes>
    extends Repository<T, IdType>
{

}

export default CrudRepository;