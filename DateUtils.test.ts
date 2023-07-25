// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { DateUtils } from "./DateUtils";

describe('DateUtils', () => {

    describe('#cloneDate', () => {
        it('should create a new Date object that is a copy of the provided date', () => {
            const originalDate = new Date('2023-07-25T12:34:56.789Z');
            const clonedDate = DateUtils.cloneDate(originalDate);
            expect(clonedDate).toEqual(originalDate);
            expect(clonedDate).not.toBe(originalDate); // Make sure the dates are not the same object
        });
    });

    describe('#subtractDays', () => {
        it('should subtract a specified number of days from the given date', () => {
            const startDate = new Date(2023,6,25,0,0,0,0);
            const offset = 5;
            const resultDate = DateUtils.subtractDays(startDate, offset);
            expect(resultDate.getFullYear()).toBe(2023);
            expect(resultDate.getMonth()).toBe(6);
            expect(resultDate.getDate()).toBe(20);
            expect(resultDate.getHours()).toBe(0);
            expect(resultDate.getMinutes()).toBe(0);
            expect(resultDate.getSeconds()).toBe(0);
            expect(resultDate.getMilliseconds()).toBe(0);
        });
    });

    describe('#getFirstDayOfMonth', () => {

        it('should get the first day of the current month', () => {
            const startDate = new Date('2023-07-25T12:34:56.789Z');
            const firstDayOfMonth = DateUtils.getFirstDayOfMonth(startDate);
            expect(firstDayOfMonth.getFullYear()).toBe(2023);
            expect(firstDayOfMonth.getMonth()).toBe(6);
            expect(firstDayOfMonth.getDate()).toBe(1);
            expect(firstDayOfMonth.getHours()).toBe(0);
            expect(firstDayOfMonth.getMinutes()).toBe(0);
            expect(firstDayOfMonth.getSeconds()).toBe(0);
            expect(firstDayOfMonth.getMilliseconds()).toBe(0);
        });

        it('should get the first day of the next month', () => {
            const startDate = new Date('2023-07-25T12:34:56.789Z');
            const firstDayOfNextMonth = DateUtils.getFirstDayOfMonth(startDate, 1);
            expect(firstDayOfNextMonth.getFullYear()).toBe(2023);
            expect(firstDayOfNextMonth.getMonth()).toBe(7);
            expect(firstDayOfNextMonth.getDate()).toBe(1);
            expect(firstDayOfNextMonth.getHours()).toBe(0);
            expect(firstDayOfNextMonth.getMinutes()).toBe(0);
            expect(firstDayOfNextMonth.getSeconds()).toBe(0);
            expect(firstDayOfNextMonth.getMilliseconds()).toBe(0);
        });

    });

    describe('#getLastDayOfMonth', () => {

        it('should get the last day of the current month with time set to 23:59:59.999', () => {
            const startDate = new Date('2023-07-25T12:34:56.789Z');
            const lastDayOfMonth = DateUtils.getLastDayOfMonth(startDate);
            expect(lastDayOfMonth.getFullYear()).toBe(2023);
            expect(lastDayOfMonth.getMonth()).toBe(6);
            expect(lastDayOfMonth.getDate()).toBe(31);
            expect(lastDayOfMonth.getHours()).toBe(23);
            expect(lastDayOfMonth.getMinutes()).toBe(59);
            expect(lastDayOfMonth.getSeconds()).toBe(59);
            expect(lastDayOfMonth.getMilliseconds()).toBe(999);
        });

        it('should get the last day of the next month with time set to 23:59:59.999', () => {
            const startDate = new Date('2023-07-25T12:34:56.789Z');
            const lastDayOfNextMonth = DateUtils.getLastDayOfMonth(startDate, 1);
            expect(lastDayOfNextMonth.getFullYear()).toBe(2023);
            expect(lastDayOfNextMonth.getMonth()).toBe(7);
            expect(lastDayOfNextMonth.getDate()).toBe(31);
            expect(lastDayOfNextMonth.getHours()).toBe(23);
            expect(lastDayOfNextMonth.getMinutes()).toBe(59);
            expect(lastDayOfNextMonth.getSeconds()).toBe(59);
            expect(lastDayOfNextMonth.getMilliseconds()).toBe(999);
        });

    });

    describe('#getLastTimeOfDate', () => {
        it('should get the last time of the day (23:59:59.999) for the given date', () => {
            const date = new Date('2023-07-25T12:34:56.789Z');
            const lastTime = DateUtils.getLastTimeOfDate(date);
            expect(lastTime.getFullYear()).toBe(2023);
            expect(lastTime.getMonth()).toBe(6);
            expect(lastTime.getDate()).toBe(25);
            expect(lastTime.getHours()).toBe(23);
            expect(lastTime.getMinutes()).toBe(59);
            expect(lastTime.getSeconds()).toBe(59);
            expect(lastTime.getMilliseconds()).toBe(999);
        });
    });

    describe('#getFirstTimeOfDate', () => {
        it('should get the first time of the day (00:00:00.000) for the given date', () => {
            const date = new Date('2023-07-25T12:34:56.789Z');
            const firstTime = DateUtils.getFirstTimeOfDate(date);
            expect(firstTime.getFullYear()).toBe(2023);
            expect(firstTime.getMonth()).toBe(6);
            expect(firstTime.getDate()).toBe(25);
            expect(firstTime.getHours()).toBe(0);
            expect(firstTime.getMinutes()).toBe(0);
            expect(firstTime.getSeconds()).toBe(0);
            expect(firstTime.getMilliseconds()).toBe(0);
        });
    });

    describe('#getMicroSeconds', () => {
        it('should get the number of microseconds since January 1, 1970, for the given date', () => {
            const date = new Date('2023-07-25T12:34:56.789Z');
            const microseconds = DateUtils.getMicroSeconds(date);
            expect(microseconds).toBe(1690288496789000);
        });
    });

});
