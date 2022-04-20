// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CalendarDTO, createCalendarDTO } from "./types/CalendarDTO";
import { filter, find, isArray, map, reduce, split } from "./modules/lodash";
import { LogService } from "./LogService";
import { createInternetCalendarLine, InternetCalendarLine, isInternetCalendarLine } from "./types/InternetCalendarLine";
import { createInternetCalendarParam, InternetCalendarParam } from "./types/InternetCalendarParam";
import { CalendarEvent, createCalendarEvent } from "./types/CalendarEvent";

const LOG = LogService.createLogger('CalendarUtils');

export type ReadonlyInternetCalendarLineList = readonly InternetCalendarLine[];
export type ReadonlyInternetCalendarLineBlockList = readonly (InternetCalendarLine | ReadonlyInternetCalendarLineList)[];

export type InternetCalendarLineList = InternetCalendarLine[];
export type InternetCalendarLineBlockList = (InternetCalendarLine | InternetCalendarLineList)[];

export class CalendarUtils {

    /**
     *
     * @param line
     */
    public static parseInternetCalendarLine (line : string) : InternetCalendarLine {

        const index = line.indexOf(':');
        if (index < 0) {
            throw new TypeError(`CalendarUtils.parseInternetCalendarLine: No name found`)
        }

        const nameParams = line.substring(0, index);
        const value = line.substring(index+1);

        const paramIndex = nameParams.indexOf(';');

        if (paramIndex < 0) {
            return createInternetCalendarLine(
                nameParams,
                value
            );
        } else {
            const parts = split(nameParams, ';');
            const name = parts.shift();
            return createInternetCalendarLine(
                name,
                value,
                map(parts, (item : string) : InternetCalendarParam => {
                    const itemParts = split(item, '=');
                    const paramName = itemParts.shift();
                    const paramValue = itemParts.join('=');
                    return createInternetCalendarParam(paramName, paramValue);
                })
            );
        }

    }

    /**
     * Parses raw Internet Calendar (RFC 5545) text lines.
     *
     * Lines split on multiple lines will be unfold as one.
     *
     * @fixme From the RFC: "It is possible for very simple implementations to generate
     *        improperly folded lines in the middle of a UTF-8 multi-octet
     *        sequence.  For this reason, implementations need to unfold lines
     *        in such a way to properly restore the original sequence."
     *
     * @param rows
     */
    public static unfoldInternetCalendarLines (rows : readonly string[]) : readonly string[] {

        return reduce(
            rows,
            (list: string[], row: string) : string[] => {

                if (row.length) {

                    // // Remove possible CR
                    // if ( row[row.length-1] === '\r' ) {
                    //     row = row.substring(0, row.length - 1);
                    // }

                    // Detect split lines
                    if (/^\s/.test(row)) {
                        if (list.length) {
                            list[list.length - 1] += row.substring(1);
                        } else {
                            throw new TypeError(`Unexpected leading white space at: ` + row);
                        }
                    } else {
                        list.push(row);
                    }

                } else {
                    LOG.warn(`Warning: Empty line parsed at parseInternetCalendarRows().`);
                }

                return list;
            },
            []
        ) as readonly string[];

    }

    public static groupInternetCalendarLines (value : ReadonlyInternetCalendarLineList) : ReadonlyInternetCalendarLineBlockList {

        const stack : InternetCalendarLineBlockList[] = [];

        return reduce(
            value,
            (list: InternetCalendarLineBlockList, item: InternetCalendarLine) : InternetCalendarLineBlockList => {

                const itemName = item.name;

                if (itemName === 'BEGIN') {

                    const block = [
                        item
                    ];
                    stack.push(block);
                    list.push(block);

                    LOG.debug(`Started block "${item.value}"`);
                    return list;
                }

                if (itemName === 'END') {

                    const blockName = item.value;

                    if (stack.length === 0) {

                        const block = [
                            item
                        ];
                        list.push(block);

                        LOG.warn(`Warning! Ended block "${blockName}" without previous START`);
                        return list;

                    }

                    const lastBlock : InternetCalendarLineBlockList = stack[stack.length - 1];
                    const lastBegin : InternetCalendarLine | InternetCalendarLineList | undefined = lastBlock.length ? lastBlock[0] : undefined;
                    if (!isInternetCalendarLine(lastBegin)) {
                        throw new TypeError(`CalendarUtils.groupInternetCalendarLines: Could not detect BEGIN for END (${blockName})`);
                    }
                    if (lastBegin.value !== blockName) {
                        throw new TypeError(`CalendarUtils.groupInternetCalendarLines: Found wrong block for END (${blockName})`);
                    }

                    lastBlock.push(item);
                    stack.pop();

                    LOG.debug(`Ended block "${blockName}"`);
                    return list;

                }

                if (stack.length >= 1) {
                    stack[stack.length - 1].push(item);
                    return list;
                }

                list.push(item);
                return list;

            },
            []
        ) as ReadonlyInternetCalendarLineBlockList;
    }

    public static parseCalendarDTOFromInternetCalendar (value : string) : CalendarDTO {

        const foldRows = split(value, /\r?\n/);

        const unfoldRows = CalendarUtils.unfoldInternetCalendarLines(foldRows);

        const parsedRows : InternetCalendarLine[] = map(unfoldRows, (item : string) : InternetCalendarLine => CalendarUtils.parseInternetCalendarLine(item))

        const grouped : ReadonlyInternetCalendarLineBlockList = CalendarUtils.groupInternetCalendarLines(parsedRows);

        // LOG.debug(`grouped = `, grouped);

        const eventBlocks : ReadonlyInternetCalendarLineList[] = filter(grouped, (item : InternetCalendarLine | ReadonlyInternetCalendarLineList) : boolean => {
            if (isArray(item) && item.length) {
                const itemType = item[0].value;
                return itemType === 'VEVENT';
            } else {
                return false;
            }
        }) as ReadonlyInternetCalendarLineList[];

        const events : CalendarEvent[] = map(
            eventBlocks,
            (item: ReadonlyInternetCalendarLineList) : CalendarEvent => {
                return CalendarUtils.parseCalendarEventFromInternetCalendarLines(item);
            }
        );

        return createCalendarDTO(events);

    }

    public static parseCalendarEventFromInternetCalendarLines (list : ReadonlyInternetCalendarLineList) : CalendarEvent {

        LOG.debug(`parseCalendarEventFromInternetCalendarLines: `, list);

        const start        : string = CalendarUtils._findCalendarLine('DTSTART'       , list)?.value ?? '';
        const end          : string = CalendarUtils._findCalendarLine('DTEND'         , list)?.value ?? '';
        const repeatRule   : string = CalendarUtils._findCalendarLine('RRULE'         , list)?.value ?? '';
        const stamp        : string = CalendarUtils._findCalendarLine('DTSTAMP'       , list)?.value ?? '';
        const uid          : string = CalendarUtils._findCalendarLine('UID'           , list)?.value ?? '';
        const created      : string = CalendarUtils._findCalendarLine('CREATED'       , list)?.value ?? '';
        const description  : string = CalendarUtils._findCalendarLine('DESCRIPTION'   , list)?.value ?? '';
        const lastModified : string = CalendarUtils._findCalendarLine('LAST-MODIFIED' , list)?.value ?? '';
        const location     : string = CalendarUtils._findCalendarLine('LOCATION'      , list)?.value ?? '';
        const sequence     : string = CalendarUtils._findCalendarLine('SEQUENCE'      , list)?.value ?? '';
        const status       : string = CalendarUtils._findCalendarLine('STATUS'        , list)?.value ?? '';
        const summary      : string = CalendarUtils._findCalendarLine('SUMMARY'       , list)?.value ?? '';
        const transparency : string = CalendarUtils._findCalendarLine('TRANSP'        , list)?.value ?? '';

        return createCalendarEvent(
            start,
            end,
            repeatRule,
            stamp,
            uid,
            created,
            description,
            lastModified,
            location,
            sequence,
            status,
            summary,
            transparency
        );

    }

    private static _findCalendarLine (name: string, list : ReadonlyInternetCalendarLineList) : InternetCalendarLine | undefined {
        return find(
            list,
            (item : InternetCalendarLine) : boolean => item.name === name
        );
    }

}
