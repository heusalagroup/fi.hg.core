// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { MySqlUtils } from "./MySqlUtils";

describe('MySqlUtils', () => {

    describe('#getDateTimeStringFromISOString', () => {

        it('can parse string dates', () => {
            expect( MySqlUtils.getDateTimeStringFromISOString("2023-04-23T10:51:32.000Z") ).toBe('2023-04-23 10:51:32');
            expect( MySqlUtils.getDateTimeStringFromISOString("Sun Apr 23 2023 10:51:32 GMT+0000 (Coordinated Universal Time)") ).toBe('2023-04-23 10:51:32');
        });

        it('can cannot parse invalid dates', () => {
            expect( () => MySqlUtils.getDateTimeStringFromISOString("Sun Apr 23 2023 99:51:32 GMT+0000 (Coordinated Universal Time)") ).toThrow('Could not parse string: \'Sun Apr 23 2023 99:51:32 GMT+0000 (Coordinated Universal Time)\'');
        });

    });

    describe('#getDateTimeStringFromDate', () => {

        it('can parse string dates', () => {
            const now = new Date();
            now.setTime(1682247559306);
            expect( MySqlUtils.getDateTimeStringFromDate( now ) ).toBe('2023-04-23 10:59:19');
        });

        it('can cannot parse invalid dates', () => {
            expect( () => MySqlUtils.getDateTimeStringFromDate(new Date("Sun Apr 23 2023 99:51:32 GMT+0000 (Coordinated Universal Time)") ) ).toThrow("Could not parse date as string: 'Invalid Date'");
        });

    });

});
