export enum RepositoryErrorCode {

    ID_NOT_FOUND_FOR_TABLE      = 1001,
    ENTITY_NOT_FOUND            = 1002,
    CREATED_ENTITY_ID_NOT_FOUND = 2001,
    COLUMN_NAME_NOT_FOUND       = 3001,

}

export function stringifyRepositoryErrorCode (value : RepositoryErrorCode) : string {

    switch(value) {
        case RepositoryErrorCode.ID_NOT_FOUND_FOR_TABLE      : return 'ID_NOT_FOUND_FOR_TABLE';
        case RepositoryErrorCode.ENTITY_NOT_FOUND            : return 'ENTITY_NOT_FOUND';
        case RepositoryErrorCode.CREATED_ENTITY_ID_NOT_FOUND : return 'CREATED_ENTITY_ID_NOT_FOUND';
        case RepositoryErrorCode.COLUMN_NAME_NOT_FOUND       : return 'COLUMN_NAME_NOT_FOUND';
    }

    return `RepositoryErrorCode#${value}`;

}

export default RepositoryErrorCode;
