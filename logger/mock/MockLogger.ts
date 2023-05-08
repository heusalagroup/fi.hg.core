// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Logger } from "../../types/Logger";
import { LogLevel } from "../../types/LogLevel";

/**
 * @inheritDoc
 */
export class MockLogger implements Logger {

    /**
     * @inheritDoc
     */
    public debug (...args: readonly any[]): void {
    }

    /**
     * @inheritDoc
     */
    public error (...args: readonly any[]): void {
    }

    /**
     * @inheritDoc
     */
    public getLogLevel (): LogLevel {
        return LogLevel.DEBUG;
    }

    /**
     * @inheritDoc
     */
    public info (...args: readonly any[]): void {
    }

    /**
     * @inheritDoc
     */
    public setLogLevel (level: LogLevel | undefined): this {
        return this;
    }

    /**
     * @inheritDoc
     */
    public warn (...args: readonly any[]): void {
    }

}
