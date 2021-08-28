// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import Logger from "./Logger";

export class ContextLogger implements Logger {

    private readonly _logger : Logger;

    public readonly name: string;

    public constructor (
        name       : string,
        logService : Logger
    ) {
        this.name = name;
        this._logger = logService;
    }

    public debug (...args: Array<any>) {
        this._logger.debug(`[${this.name}]`, ...args);
    }

    public info (...args: Array<any>) {
        this._logger.info(`[${this.name}]`, ...args);
    }

    public warn (...args: Array<any>) {
        this._logger.warn(`[${this.name}]`, ...args);
    }

    public error (...args: Array<any>) {
        this._logger.error(`[${this.name}]`, ...args);
    }

}

export default ContextLogger;
