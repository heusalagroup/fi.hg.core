// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CommandExitStatus } from "../types/CommandExitStatus";

export interface HgAiCommandService {

    main (args: readonly string[]) : Promise<CommandExitStatus>;

    edit (args: readonly string[]) : Promise<CommandExitStatus>;

}
