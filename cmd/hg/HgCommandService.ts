// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CommandExitStatus } from "../types/CommandExitStatus";

export interface HgCommandService {

    main (args: readonly string[]) : Promise<CommandExitStatus>;

    ai (args: readonly string[]) : Promise<CommandExitStatus>;

}
