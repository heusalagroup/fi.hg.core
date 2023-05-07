// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ChildProcessService, CommandOptions, CommandResponse } from "./ChildProcessService";
import { LogService } from "./LogService";

const LOG = LogService.createLogger('SystemService');

export class SystemService {

    private static _childProcessService : ChildProcessService | undefined;

    public static destroy () {
        if (this._childProcessService) {
            this._childProcessService.destroy();
            this._childProcessService = undefined;
        }
    }

    public static initialize (
        childProcessService : ChildProcessService
    ) {
        if (this._childProcessService === undefined) {
            this._childProcessService = childProcessService;
        } else {
            LOG.warn(`Warning! Child process service was already initialized`);
        }
    }

    private static _getChildProcessService () : ChildProcessService {
        if (!this._childProcessService) {
            throw new TypeError(`You must call HgNode.initialize() before using this service`);
        }
        return this._childProcessService;
    }

    /**
     * Starts a new child process to run a command.
     *
     * @param name
     * @param args
     * @param opts
     */
    public static async executeCommand (
        name  : string,
        args ?: readonly string[],
        opts ?: CommandOptions
    ) : Promise<CommandResponse> {
        return this._getChildProcessService().executeCommand(name, args, opts);
    }

    public static countChildProcesses (): Promise<number> {
        return this._getChildProcessService().countChildProcesses();
    }

    public static shutdownChildProcesses (): Promise<void> {
        return this._getChildProcessService().shutdownChildProcesses();
    }

    public static waitAllChildProcessesStopped (): Promise<void> {
        return this._getChildProcessService().waitAllChildProcessesStopped();
    }

}
