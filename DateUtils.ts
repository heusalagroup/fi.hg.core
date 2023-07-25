// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

/**
 * Pure zero-dep JavaScript date operations.
 */
export class DateUtils {

    /**
     * Creates a new Date object that is a copy of the provided date.
     *
     * @param {Date} date - The original Date object to be cloned.
     * @returns {Date} A new Date object that is a copy of the original date.
     */
    public static cloneDate (date: Date) : Date {
        return new Date(date);
    }

    /**
     * Subtracts a specified number of days from a given date.
     *
     * Note! This handles times with local timezone.
     *
     * @param {Date} date - The original Date object.
     * @param {number} offset - The number of days to subtract.
     * @returns {Date} A new Date object resulting from subtracting the specified days from the original date.
     */
    public static subtractDays (
        date: Date,
        offset: number,
    ) : Date {
        const newDate = DateUtils.cloneDate(date);
        newDate.setDate(newDate.getDate() - offset);
        return newDate;
    }

    /**
     * Gets the first day of the month based on the provided start date and offset.
     *
     * Note! This handles times with local timezone.
     *
     * @param {Date} startDate - The starting date from which to calculate the first day of the month.
     * @param {number} offset - An optional offset to calculate the first day of a different month (default is 0).
     * @returns {Date} The first day of the month as a new Date object.
     */
    public static getFirstDayOfMonth (
        startDate: Date,
        offset: number = 0,
    ) : Date {
        const nextMonthFirstDay = DateUtils.cloneDate(startDate);
        nextMonthFirstDay.setMonth(nextMonthFirstDay.getMonth() + offset, 1);
        return DateUtils.getFirstTimeOfDate(nextMonthFirstDay);
    }

    /**
     * Gets the last day of the month based on the provided start date and offset.
     *
     * Note! This handles times with local timezone.
     *
     * @param {Date} startDate - The starting date from which to calculate the last day of the month.
     * @param {number} offset - An optional offset to calculate the last day of a different month (default is 0).
     * @returns {Date} The last day of the month as a new Date object with the time set to 23:59:59.999.
     */
    public static getLastDayOfMonth (
        startDate: Date,
        offset: number = 0,
    ) : Date {
        const firstDayOfMonth = DateUtils.getFirstDayOfMonth(startDate, offset + 1);
        // Subtract one day to get the last day of the month
        const lastDayOfMonth = DateUtils.subtractDays(firstDayOfMonth, 1);
        return DateUtils.getLastTimeOfDate(lastDayOfMonth);
    }

    /**
     * Gets the last time of the day (23:59:59.999) for a given date.
     *
     * Note! This handles times with local timezone.
     *
     * @param {Date} date - The input date.
     * @returns {Date} A new Date object representing the last time (23:59:59.999) of the given date.
     */
    public static getLastTimeOfDate (date: Date): Date {
        const lastTime = DateUtils.cloneDate(date);
        lastTime.setHours(23, 59, 59, 999);
        return lastTime;
    }

    /**
     * Gets the first time of the day (00:00:00.000) for a given date.
     *
     * Note! This handles times with local timezone.
     *
     * @param {Date} date - The input date.
     * @returns {Date} A new Date object representing the last time (00:00:00.000) of the given date.
     */
    public static getFirstTimeOfDate (date: Date): Date {
        const lastTime = DateUtils.cloneDate(date);
        lastTime.setHours(0, 0, 0, 0);
        return lastTime;
    }

    /**
     * Gets the number of microseconds since January 1, 1970 (Unix Epoch) for the given date.
     *
     * @param {Date} value - The date for which to calculate the number of microseconds.
     * @returns {number} The number of microseconds since January 1, 1970, for the given date.
     */
    public static getMicroSeconds (value: Date) : number {
        return value.getTime()*1000;
    }

}
