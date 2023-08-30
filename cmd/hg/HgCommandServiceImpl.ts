// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { HgPackageCommandService } from "../pkg/HgPackageCommandService";
import { CommandExitStatus } from "../types/CommandExitStatus";
import { HgCommandService } from "./HgCommandService";
import { HgAiCommandService } from "../ai/HgAiCommandService";

export class HgCommandServiceImpl implements HgCommandService {

    private readonly _ai : HgAiCommandService;
    private readonly _pkg : HgPackageCommandService;

    public static create (
        ai : HgAiCommandService,
        pkg : HgPackageCommandService,
    ) : HgCommandServiceImpl {
        return new HgCommandServiceImpl(
            ai,
            pkg
        );
    }

    protected constructor (
        ai : HgAiCommandService,
        pkg : HgPackageCommandService,
    ) {
        this._ai = ai;
        this._pkg = pkg;
    }

    public async main (args: readonly string[]) : Promise<CommandExitStatus> {

        if (args.length === 0) return CommandExitStatus.USAGE;

        const [arg, ...freeArgs] = args;
        switch (arg) {
            case 'ai': return await this._ai.main(freeArgs);
            case 'pkg': return await this._pkg.main(freeArgs);
        }
        console.error(`Unknown command: ${arg}`);
        return CommandExitStatus.COMMAND_NOT_FOUND;
    }

    public async ai (args: readonly string[]) : Promise<CommandExitStatus> {
        return await this._ai.main(args);
    }

}
