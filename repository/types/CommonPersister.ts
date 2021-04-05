import Persister from "./Persister";
import EntityMetadata, {KeyValuePairs} from "./EntityMetadata";
import RepositoryEntityError from "./RepositoryEntityError";

/**
 * This is a wrapper which implements some common shared persister features.
 */
export class CommonPersister<T, IdType = any> {

    private readonly _persister      : Persister<T, IdType>;

    private readonly _entityMetadata : EntityMetadata;

    public constructor (
        persister      : Persister<T, IdType>,
        entityMetadata : EntityMetadata
    ) {
        this._persister = persister;
        this._entityMetadata = entityMetadata;
    }


}

export default CommonPersister;
