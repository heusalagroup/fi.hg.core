// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CommandExitStatus } from "../types/CommandExitStatus";
import { HgCommandService } from "./HgCommandService";
import { HgAiCommandService } from "../ai/HgAiCommandService";

export class HgCommandServiceImpl implements HgCommandService {

    private readonly _ai : HgAiCommandService;

    public constructor (
        openAiApiKey : HgAiCommandService
    ) {
        this._ai = openAiApiKey;
    }

    public async main (args: readonly string[]) : Promise<CommandExitStatus> {

        if (args.length === 0) return CommandExitStatus.USAGE;

        const [arg, ...freeArgs] = args;
        switch (arg) {
            case 'ai': return await this._ai.main(freeArgs);
        }
        console.error(`Unknown command: ${arg}`);
        return CommandExitStatus.COMMAND_NOT_FOUND;
    }

    public async ai (args: readonly string[]) : Promise<CommandExitStatus> {
        return await this._ai.main(args);
    }

}
