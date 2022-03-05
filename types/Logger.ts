// Copyright (c) 2022. Heusala Group <info@hg.fi>. All rights reserved.
// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { LogLevel } from "./LogLevel";

export interface Logger {

    getLogLevel () : LogLevel | undefined;
    setLogLevel (level : LogLevel | undefined) : Logger;

    debug (...args: any[]) : void;

    info (...args: any[]) : void;

    warn (...args: any[]) : void;

    error (...args: any[]) : void;

}
