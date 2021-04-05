
// noinspection SqlDialectInspection,SqlNoDataSourceInspection
export const INSERT_QUERY_STRING                 = 'INSERT INTO ?? (??) VALUES ?';

// noinspection SqlDialectInspection,SqlNoDataSourceInspection
export const DELETE_BY_ID_QUERY_STRING           = 'DELETE FROM ?? WHERE ?? = ?';

// noinspection SqlDialectInspection,SqlNoDataSourceInspection
export const UPDATE_QUERY_STRING                 = (assignmentListQueryString: string) => `UPDATE ?? SET ${assignmentListQueryString} WHERE ?? = ?`;

// noinspection SqlDialectInspection,SqlNoDataSourceInspection
export const SELECT_ALL_QUERY_STRING             = 'SELECT * FROM ??';

// noinspection SqlDialectInspection,SqlNoDataSourceInspection
export const SELECT_BY_COLUMN_LIST_QUERY_STRING  = 'SELECT * FROM ?? WHERE ?? IN (?)';

// noinspection SqlDialectInspection,SqlNoDataSourceInspection
export const SELECT_BY_COLUMN_QUERY_STRING       = 'SELECT * FROM ?? WHERE ?? = ?';
