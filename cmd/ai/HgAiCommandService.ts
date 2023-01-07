// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CommandExitStatus } from "../types/CommandExitStatus";

export interface HgAiCommandService {

    setModel(value: string) : void;
    setStop(value: string) : void;
    setUser(value: string) : void;
    setLogProbs(value: number) : void;
    setBestOf(value: number) : void;
    setPresencePenalty(value: number) : void;
    setFrequencyPenalty(value: number) : void;
    setEcho(value: boolean) : void;
    setN(value: number) : void;
    setTopP(value: number) : void;
    setTemperature(value: number) : void;
    setMaxTokens(value: number) : void;

    main (args: readonly string[]) : Promise<CommandExitStatus>;

    edit (args: readonly string[]) : Promise<CommandExitStatus>;

}
