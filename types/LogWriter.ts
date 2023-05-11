// Copyright (c) 2023. Heusala Group <info@hg.fi>. All rights reserved.

export interface LogWriter {

    /**
     * Writes string messages to log output
     *
     * @param input
     */
    write (input: string) : void;

}
