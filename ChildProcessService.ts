// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Disposable } from "./types/Disposable";
import { DisposeAware } from "./types/DisposeAware";

export interface CommandEnvironment {
    readonly [key: string]: string;
}

export interface CommandOptions {
    readonly cwd ?: string;
    readonly env ?: CommandEnvironment;
    readonly argv0 ?: string;
    readonly serialization ?: string;
    readonly timeout ?: number;
    readonly uid ?: number;
    readonly gid ?: number;
    readonly killSignal ?: string | number;
    readonly maxBuffer ?: number;
    readonly stdio ?: string | readonly string[];
    readonly detached ?: boolean;
}

export interface CommandResponse {
    readonly name : string;
    readonly args : readonly string[];
    readonly output : string;
    readonly errors ?: string;
}

/**
 * Interface for running child processes in a system.
 *
 * The system may be a NodeJS environment or later some external backend
 * through an HTTP API. E.g. there could be a frontend client implementation as
 * well.
 *
 * @see {@link NodeChildProcessService}
 */
export interface ChildProcessService extends Disposable, DisposeAware {

    /**
     * Destroy the service and free any resources. Do not use the service
     * again after you have called this method.
     */
    destroy () : void;

    /**
     * Returns true if the service has been destroyed
     */
    isDestroyed () : boolean;

    /**
     * Returns the amount of children running
     */
    countChildProcesses () : Promise<number>;

    /**
     * Wait until all the started children have stopped
     */
    waitAllChildProcessesStopped () : Promise<void>;

    /**
     * Close any child processes running
     */
    shutdownChildProcesses () : Promise<void>;

    /**
     * Starts a new child process to run a command.
     *
     * @param name
     * @param args
     * @param opts
     */
    executeCommand (
        name  : string,
        args ?: readonly string[],
        opts ?: CommandOptions
    ) : Promise<CommandResponse>;

    /**
     *
     */
    sendShutdownToChildProcesses () : void;

}
