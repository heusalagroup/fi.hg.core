// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CalendarDTO, createCalendarDTO } from "./types/CalendarDTO";
import { endsWith } from "./functions/endsWith";
import { filter } from "./functions/filter";
import { find } from "./functions/find";
import { map } from "./functions/map";
import { reduce } from "./functions/reduce";
import { split } from "./functions/split";
import { LogService } from "./LogService";
import { createInternetCalendarLine, InternetCalendarLine, isInternetCalendarLine } from "./types/InternetCalendarLine";
import { createInternetCalendarParam, InternetCalendarParam } from "./types/InternetCalendarParam";
import { CalendarEvent, createCalendarEvent } from "./types/CalendarEvent";
import { momentTz, parseUtc } from "./modules/moment";
import { isArray } from "./types/Array";

const LOG = LogService.createLogger('CalendarUtils');

export type ReadonlyInternetCalendarLineList = readonly InternetCalendarLine[];
export type ReadonlyInternetCalendarLineBlockList = readonly (InternetCalendarLine | ReadonlyInternetCalendarLineList)[];

export type InternetCalendarLineList = InternetCalendarLine[];
export type InternetCalendarLineBlockList = (InternetCalendarLine | InternetCalendarLineList)[];

/**
 * See also `TimeService`
 */
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
            const parts : string[] = split(nameParams, ';');
            const name : string = parts.shift() ?? '';
            return createInternetCalendarLine(
                name,
                value,
                map(parts, (item : string) : InternetCalendarParam => {
                    const itemParts = split(item, '=');
                    const paramName : string = itemParts.shift() ?? '';
                    const paramValue : string = itemParts.join('=');
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

        // LOG.debug(`parseCalendarEventFromInternetCalendarLines: `, list);

        const start        : string = CalendarUtils._findCalendarLineAsTime('DTSTART' , list) ?? '';
        const end          : string = CalendarUtils._findCalendarLineAsTime('DTEND'   , list) ?? '';
        const repeatRule   : string = CalendarUtils._findCalendarLine('RRULE'         , list)?.value ?? '';
        const stamp        : string = CalendarUtils._findCalendarLineAsTime('DTSTAMP' , list) ?? '';
        const uid          : string = CalendarUtils._findCalendarLine('UID'           , list)?.value ?? '';
        const created      : string = CalendarUtils._findCalendarLineAsTime('CREATED'       , list) ?? '';
        const description  : string = CalendarUtils._findCalendarLine('DESCRIPTION'   , list)?.value ?? '';
        const lastModified : string = CalendarUtils._findCalendarLineAsTime('LAST-MODIFIED' , list) ?? '';
        const location     : string = CalendarUtils._findCalendarLine('LOCATION'      , list)?.value ?? '';
        const sequence     : string = CalendarUtils._findCalendarLine('SEQUENCE'      , list)?.value ?? '';
        const status       : string = CalendarUtils._findCalendarLine('STATUS'        , list)?.value ?? '';
        const summary      : string = CalendarUtils._findCalendarLine('SUMMARY'       , list)?.value ?? '';
        const transparency : string = CalendarUtils._findCalendarLine('TRANSP'        , list)?.value ?? '';

        // FIXME: Print any keys which were not parsed as a warning line

        const event = createCalendarEvent(
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

        // LOG.debug(`parseCalendarEventFromInternetCalendarLines: event = `, event);

        return event;

    }

    private static _findCalendarLine (name: string, list : ReadonlyInternetCalendarLineList) : InternetCalendarLine | undefined {
        return find(
            list,
            (item : InternetCalendarLine) : boolean => item.name === name
        );
    }

    private static _findCalendarLineAsTime (name: string, list : ReadonlyInternetCalendarLineList) : string | undefined {

        const item : InternetCalendarLine | undefined = CalendarUtils._findCalendarLine(name, list);

        if (item) {

            const valueLine : InternetCalendarParam | undefined = find(
                item.params,
                (param: InternetCalendarParam) : boolean => param.name === 'VALUE'
            );

            const tzId : InternetCalendarParam | undefined = find(
                item.params,
                (param: InternetCalendarParam) : boolean => param.name === 'TZID'
            );

            if (tzId) {
                const tzValue = CalendarUtils.parseWindowsTimeZoneToIANA(tzId.value) ?? tzId.value;
                return momentTz(item.value, tzValue).toISOString();
            }

            if (endsWith(item.value, 'Z')) {
                return parseUtc(item.value).toISOString();
            }

            if (valueLine && valueLine.value === 'DATE') {
                return parseUtc(item.value).toISOString();
            }

            LOG.debug(`Unknown item format: "${item.value}": `, item);
            return item.value;

        } else {
            return undefined;
        }

    }

    public static parseWindowsTimeZoneToIANA (value : string) : string | undefined {
        switch(`${value}`.toLowerCase()) {
            case "dateline standard time": return "Etc/GMT+12";
            case "utc-11": return "Etc/GMT+11";
            case "aleutian standard time": return "America/Adak";
            case "hawaiian standard time": return "Pacific/Honolulu";
            case "marquesas standard time": return "Pacific/Marquesas";
            case "alaskan standard time": return "America/Anchorage";
            case "utc-09": return "Etc/GMT+9";
            case "pacific standard time (mexico)": return "America/Tijuana";
            case "utc-08": return "Etc/GMT+8";
            case "pacific standard time": return "America/Los_Angeles";
            case "us mountain standard time": return "America/Phoenix";
            case "mountain standard time (mexico)": return "America/Chihuahua";
            case "mountain standard time": return "America/Denver";
            case "central america standard time": return "America/Guatemala";
            case "central standard time": return "America/Chicago";
            case "easter island standard time": return "Pacific/Easter";
            case "central standard time (mexico)": return "America/Mexico_City";
            case "canada central standard time": return "America/Regina";
            case "sa pacific standard time": return "America/Bogota";
            case "eastern standard time (mexico)": return "America/Cancun";
            case "eastern standard time": return "America/New_York";
            case "haiti standard time": return "America/Port-au-Prince";
            case "cuba standard time": return "America/Havana";
            case "us eastern standard time": return "America/Indianapolis";
            case "paraguay standard time": return "America/Asuncion";
            case "atlantic standard time": return "America/Halifax";
            case "venezuela standard time": return "America/Caracas";
            case "central brazilian standard time": return "America/Cuiaba";
            case "sa western standard time": return "America/La_Paz";
            case "pacific sa standard time": return "America/Santiago";
            case "turks and caicos standard time": return "America/Grand_Turk";
            case "newfoundland standard time": return "America/St_Johns";
            case "tocantins standard time": return "America/Araguaina";
            case "e. south america standard time": return "America/Sao_Paulo";
            case "sa eastern standard time": return "America/Cayenne";
            case "argentina standard time": return "America/Buenos_Aires";
            case "greenland standard time": return "America/Godthab";
            case "montevideo standard time": return "America/Montevideo";
            case "magallanes standard time": return "America/Punta_Arenas";
            case "saint pierre standard time": return "America/Miquelon";
            case "bahia standard time": return "America/Bahia";
            case "utc-02": return "Etc/GMT+2";
            case "azores standard time": return "Atlantic/Azores";
            case "cape verde standard time": return "Atlantic/Cape_Verde";
            case "utc": return "Etc/GMT";
            case "morocco standard time": return "Africa/Casablanca";
            case "gmt standard time": return "Europe/London";
            case "greenwich standard time": return "Atlantic/Reykjavik";
            case "w. europe standard time": return "Europe/Berlin";
            case "central europe standard time": return "Europe/Budapest";
            case "romance standard time": return "Europe/Paris";
            case "central european standard time": return "Europe/Warsaw";
            case "w. central africa standard time": return "Africa/Lagos";
            case "jordan standard time": return "Asia/Amman";
            case "gtb standard time": return "Europe/Bucharest";
            case "middle east standard time": return "Asia/Beirut";
            case "egypt standard time": return "Africa/Cairo";
            case "e. europe standard time": return "Europe/Chisinau";
            case "syria standard time": return "Asia/Damascus";
            case "west bank standard time": return "Asia/Hebron";
            case "south africa standard time": return "Africa/Johannesburg";
            case "fle standard time": return "Europe/Kiev";
            case "israel standard time": return "Asia/Jerusalem";
            case "kaliningrad standard time": return "Europe/Kaliningrad";
            case "sudan standard time": return "Africa/Khartoum";
            case "libya standard time": return "Africa/Tripoli";
            case "namibia standard time": return "Africa/Windhoek";
            case "arabic standard time": return "Asia/Baghdad";
            case "turkey standard time": return "Europe/Istanbul";
            case "arab standard time": return "Asia/Riyadh";
            case "belarus standard time": return "Europe/Minsk";
            case "russian standard time": return "Europe/Moscow";
            case "e. africa standard time": return "Africa/Nairobi";
            case "iran standard time": return "Asia/Tehran";
            case "arabian standard time": return "Asia/Dubai";
            case "astrakhan standard time": return "Europe/Astrakhan";
            case "azerbaijan standard time": return "Asia/Baku";
            case "russia time zone 3": return "Europe/Samara";
            case "mauritius standard time": return "Indian/Mauritius";
            case "saratov standard time": return "Europe/Saratov";
            case "georgian standard time": return "Asia/Tbilisi";
            case "caucasus standard time": return "Asia/Yerevan";
            case "afghanistan standard time": return "Asia/Kabul";
            case "west asia standard time": return "Asia/Tashkent";
            case "ekaterinburg standard time": return "Asia/Yekaterinburg";
            case "pakistan standard time": return "Asia/Karachi";
            case "india standard time": return "Asia/Calcutta";
            case "sri lanka standard time": return "Asia/Colombo";
            case "nepal standard time": return "Asia/Katmandu";
            case "central asia standard time": return "Asia/Almaty";
            case "bangladesh standard time": return "Asia/Dhaka";
            case "omsk standard time": return "Asia/Omsk";
            case "myanmar standard time": return "Asia/Rangoon";
            case "se asia standard time": return "Asia/Bangkok";
            case "altai standard time": return "Asia/Barnaul";
            case "w. mongolia standard time": return "Asia/Hovd";
            case "north asia standard time": return "Asia/Krasnoyarsk";
            case "n. central asia standard time": return "Asia/Novosibirsk";
            case "tomsk standard time": return "Asia/Tomsk";
            case "china standard time": return "Asia/Shanghai";
            case "north asia east standard time": return "Asia/Irkutsk";
            case "singapore standard time": return "Asia/Singapore";
            case "w. australia standard time": return "Australia/Perth";
            case "taipei standard time": return "Asia/Taipei";
            case "ulaanbaatar standard time": return "Asia/Ulaanbaatar";
            case "aus central w. standard time": return "Australia/Eucla";
            case "transbaikal standard time": return "Asia/Chita";
            case "tokyo standard time": return "Asia/Tokyo";
            case "north korea standard time": return "Asia/Pyongyang";
            case "korea standard time": return "Asia/Seoul";
            case "yakutsk standard time": return "Asia/Yakutsk";
            case "cen. australia standard time": return "Australia/Adelaide";
            case "aus central standard time": return "Australia/Darwin";
            case "e. australia standard time": return "Australia/Brisbane";
            case "aus eastern standard time": return "Australia/Sydney";
            case "west pacific standard time": return "Pacific/Port_Moresby";
            case "tasmania standard time": return "Australia/Hobart";
            case "vladivostok standard time": return "Asia/Vladivostok";
            case "lord howe standard time": return "Australia/Lord_Howe";
            case "bougainville standard time": return "Pacific/Bougainville";
            case "russia time zone 10": return "Asia/Srednekolymsk";
            case "magadan standard time": return "Asia/Magadan";
            case "norfolk standard time": return "Pacific/Norfolk";
            case "sakhalin standard time": return "Asia/Sakhalin";
            case "central pacific standard time": return "Pacific/Guadalcanal";
            case "russia time zone 11": return "Asia/Kamchatka";
            case "new zealand standard time": return "Pacific/Auckland";
            case "utc+12": return "Etc/GMT-12";
            case "fiji standard time": return "Pacific/Fiji";
            case "chatham islands standard time": return "Pacific/Chatham";
            case "utc+13": return "Etc/GMT-13";
            case "tonga standard time": return "Pacific/Tongatapu";
            case "samoa standard time": return "Pacific/Apia";
            case "line islands standard time": return "Pacific/Kiritimati";
        }
        return undefined;
    }

}
