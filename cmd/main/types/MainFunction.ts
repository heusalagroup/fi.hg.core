// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CommandExitStatus } from "../../types/CommandExitStatus";

export interface MainFunction {
    (
        args: readonly string[]
    ) : Promise<CommandExitStatus> | CommandExitStatus;
}
