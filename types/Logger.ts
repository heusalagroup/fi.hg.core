// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

export interface Logger {

    debug (...args: any[]) : void;

    info (...args: any[]) : void;

    warn (...args: any[]) : void;

    error (...args: any[]) : void;

}

export default Logger;
