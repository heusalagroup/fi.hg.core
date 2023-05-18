// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SortDirection } from "../../../types/SortDirection";

export const MY_PH_VALUE = `?`;
export const MY_PH_ASSIGN_VALUE = `?? = ?`;
export const MY_PH_ASSIGN_TIMESTAMP_VALUE = `?? = DATE_FORMAT(?, '%Y-%m-%d %H:%i:%s')`;
export const MY_PH_VALUE_AS_TEXT = `?::text`;
export const MY_PH_VALUE_TO_DATETIME = `DATE_FORMAT(?, '%Y-%m-%d %H:%i:%s')`;
export const MY_PH_VALUE_TO_ISO_STRING = `DATE_FORMAT(?, '%Y-%m-%dT%TZ')`;
export const MY_PH_TABLE_NAME = `??`;
export const MY_PH_COLUMN = `??`;
export const MY_PH_TABLE_COLUMN = `??.??`;
export const MY_PH_TABLE_COLUMN_AS = `??.?? AS ??`;
export const MY_PH_TABLE_ALL_COLUMNS = `'??.*'`;
export const MY_PH_TABLE_COLUMN_AS_TEXT = `CAST(??.?? as char)`;
export const MY_PH_FROM_TIME_TABLE_COLUMN_AS_TIME = `TIME_FORMAT(??.??, '%Y-%m-%dT%TZ')`;
export const MY_PH_FROM_DATE_TABLE_COLUMN_AS_DATE = `DATE_FORMAT(??.??, '%Y-%m-%dT%TZ')`;
export const MY_PH_FROM_TIMESTAMP_TABLE_COLUMN_AS_TIMESTAMP = `DATE_FORMAT(??.??, '%Y-%m-%dT%TZ')`;
export const MY_PH_AS = (value: string) => `${value} AS ??`;
export const MY_PH_TABLE_COLUMN_AS_TEXT_AS = MY_PH_AS(MY_PH_TABLE_COLUMN_AS_TEXT);
export const MY_PH_TABLE_COLUMN_AS_TIME_AS = MY_PH_AS(MY_PH_FROM_TIME_TABLE_COLUMN_AS_TIME);
export const MY_PH_TABLE_COLUMN_AS_DATE_AS = MY_PH_AS(MY_PH_FROM_DATE_TABLE_COLUMN_AS_DATE);
export const MY_PH_TABLE_COLUMN_AS_TIMESTAMP_AS = MY_PH_AS(MY_PH_FROM_TIMESTAMP_TABLE_COLUMN_AS_TIMESTAMP);
export const MY_PH_TABLE_COLUMN_WITH_SORT_ORDER = (order : SortDirection) : string => `??.??${ order === SortDirection.ASC ? '' : ' DESC'}`;
export const MY_PH_LEFT_JOIN = `LEFT JOIN ?? ON ??.?? = ??.??`;
export const MY_PH_GROUP_BY_TABLE_COLUMN = `GROUP BY ??.??`;
export const MY_PH_FROM_TABLE = `FROM ??`;
export const MY_PH_INTO_TABLE = `INTO ??`;

export const MY_PH_TABLE_COLUMN_EQUALS_LAST_INSERT_ID = `??.?? = LAST_INSERT_ID()`;

export const MY_PH_TABLE_COLUMN_BETWEEN_RANGE = `??.?? BETWEEN ? AND ?`;
export const MY_PH_TABLE_COLUMN_AFTER = `??.?? > ?`;
export const MY_PH_TABLE_COLUMN_BEFORE = `??.?? < ?`;
export const MY_PH_TABLE_COLUMN_EQUAL = `??.?? = ?`;
export const MY_PH_TABLE_COLUMN_EQUAL_AS_JSON = `??.?? = CAST(? AS JSON)`;
export const MY_PH_TABLE_COLUMN_IS_NULL = `??.?? IS NULL`;
export const MY_PH_TABLE_COLUMN_IN = `??.?? IN (?)`;

export const MY_PH_TABLE_COLUMN_BETWEEN_RANGE_AS_TIME = `??.?? BETWEEN ${MY_PH_VALUE_TO_DATETIME} AND ${MY_PH_VALUE_TO_DATETIME}`;
export const MY_PH_TABLE_COLUMN_AFTER_AS_TIME = `??.?? > ${MY_PH_VALUE_TO_DATETIME}`;
export const MY_PH_TABLE_COLUMN_BEFORE_AS_TIME = `??.?? < ${MY_PH_VALUE_TO_DATETIME}`;
export const MY_PH_TABLE_COLUMN_EQUAL_AS_TIME = `??.??_AS_TIME = ${MY_PH_VALUE_TO_DATETIME}`;
export const MY_PH_TABLE_COLUMN_IN_AS_TIME = `??.?? IN (?)`;
