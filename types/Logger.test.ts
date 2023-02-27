import {Logger} from "./Logger";
import {LogLevel} from "./LogLevel";


class TestLogger implements Logger {
    private _level: LogLevel | undefined;

    public getLogLevel(): LogLevel | undefined {
        return this._level;
    }

    public setLogLevel(level: LogLevel | undefined): Logger {
        this._level = level;
        return this;
    }

    public debug(...args: any[]): void {
        // do nothing
    }

    public info(...args: any[]): void {
        // do nothing
    }

    public warn(...args: any[]): void {
        // do nothing
    }

    public error(...args: any[]): void {
        // do nothing
    }
}

describe('TestLogger', () => {
    let testLogger: TestLogger;
    beforeEach(() => {
        testLogger = new TestLogger();
    });

    test('getLogLevel should return the set log level', () => {
        testLogger.setLogLevel(LogLevel.DEBUG);
        expect(testLogger.getLogLevel()).toEqual(LogLevel.DEBUG);
    });

    test('setLogLevel should set the log level', () => {
        testLogger.setLogLevel(LogLevel.DEBUG);
        expect(testLogger.getLogLevel()).toEqual(LogLevel.DEBUG);
    });
});