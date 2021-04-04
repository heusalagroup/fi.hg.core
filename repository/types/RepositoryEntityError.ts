import RepositoryError from "./RepositoryError";
import RepositoryErrorCode from "./RepositoryErrorCode";

export class RepositoryEntityError extends RepositoryError {

    public readonly entityId : string | number;

    public constructor (
        entityId : string | number,
        code     : RepositoryErrorCode,
        message  : string | undefined = undefined,
    ) {

        super(code, message);

        this.entityId = entityId;

    }

}

export default RepositoryEntityError;
