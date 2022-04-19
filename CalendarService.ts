// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CalendarDTO, createCalendarDTO } from "./types/CalendarDTO";
import { HttpService } from "./HttpService";
import { LogService } from "./LogService";
import { CalendarUtils } from "./CalendarUtils";
import { ContentType } from "./request/ContentType";

const LOG = LogService.createLogger('CalendarService');

export class CalendarService {

    public static async fetchFromUrl (url : string) : Promise<CalendarDTO> {
        const responseString : string | undefined = await HttpService.getText(
            url,
            {
                'Accept': ContentType.CALENDAR
            }
        );
        // LOG.debug(`responseString = `, responseString);
        if (!responseString) {
            throw new TypeError(`CalendarService.fetchFromUrl: Response was not calendar data`);
        }
        return CalendarUtils.parseCalendarDTOFromInternetCalendar(responseString);
    }

}
