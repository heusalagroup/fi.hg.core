import {Logger} from "../types/Logger";
import {LogLevel} from "../types/LogLevel";

export class MockLogger implements Logger {
    private logLevel: LogLevel | undefined;

    getLogLevel(): LogLevel | undefined {
        return this.logLevel;
    }

    setLogLevel(level: LogLevel | undefined): Logger {
        this.logLevel = level;
        return this;
    }

    debug(...args: any[]): void {
        console.debug(`[MOCK][DEBUG] ${args.join(", ")}`);
    }

    info(...args: any[]): void {
        console.info(`[MOCK][INFO] ${args.join(", ")}`);
    }

    warn(...args: any[]): void {
        console.warn(`[MOCK][WARN] ${args.join(", ")}`);
    }

    error(...args: any[]): void {
        console.error(`[MOCK][ERROR] ${args.join(", ")}`);
    }
}