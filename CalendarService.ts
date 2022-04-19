// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CalendarDTO, createCalendarDTO } from "./types/CalendarDTO";
import { HttpService } from "./HttpService";
import { LogService } from "./LogService";

const LOG = LogService.createLogger('CalendarService');

export class CalendarService {

    public static async fetchFromUrl (url : string) : Promise<CalendarDTO> {

        const responseString : string | undefined = await HttpService.getText(url);

        LOG.debug(`responseString = `, responseString);

        return createCalendarDTO([]);

    }

}
