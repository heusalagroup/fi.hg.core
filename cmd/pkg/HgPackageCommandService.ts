// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CommandExitStatus } from "../types/CommandExitStatus";

/**
 */
export interface HgPackageCommandService {

    /**
     * The main command line handler
     *
     * @param args
     */
    main (args: readonly string[]) : Promise<CommandExitStatus>;

}
