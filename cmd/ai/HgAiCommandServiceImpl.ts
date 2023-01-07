// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CommandExitStatus } from "../types/CommandExitStatus";
import { HgAiCommandService } from "./HgAiCommandService";
import { OpenAiClient } from "../../openai/OpenAiClient";
import { isOpenAiErrorDTO } from "../../openai/dto/OpenAiErrorDTO";
import { OpenAiErrorDTO } from "../../openai/dto/OpenAiErrorDTO";
import { map } from "../../functions/map";
import { OpenAiEditResponseDTO } from "../../openai/dto/OpenAiEditResponseDTO";
import { OpenAiEditResponseChoice } from "../../openai/dto/OpenAiEditResponseChoice";
import { OpenAiCompletionResponseDTO } from "../../openai/dto/OpenAiCompletionResponseDTO";
import { OpenAiCompletionResponseChoice } from "../../openai/dto/OpenAiCompletionResponseChoice";
import { readFileSync, existsSync } from "fs";
import { explainOpenAiModel, OpenAiModel, parseOpenAiModel } from "../../openai/types/OpenAiModel";

export class HgAiCommandServiceImpl implements HgAiCommandService {

    private _client : OpenAiClient;
    private _model : OpenAiModel | string | undefined;
    private _echo : boolean | undefined;
    private _user : string | undefined;
    private _stop : string | readonly string[] | undefined;
    private _logProbs : number | undefined; // Integer
    private _bestOf : number | undefined; // Integer
    private _maxTokens : number | undefined; // Integer
    private _n : number | undefined; // Integer
    private _frequencyPenalty : number | undefined; // Float
    private _presencePenalty : number | undefined; // Float
    private _topP : number | undefined; // Float
    private _temperature : number | undefined; // Float

    public constructor (
        client : OpenAiClient
    ) {
        this._client = client;
    }

    public setModel(value: string) : void {
        this._model = value;
    }

    public setStop(value: string) : void {
        this._stop = value;
    }

    public setUser(value: string) : void {
        this._user = value;
    }

    public setLogProbs(value: number) : void {
        this._logProbs = value;
    }

    public setBestOf(value: number) : void {
        this._bestOf = value;
    }

    public setPresencePenalty(value: number) : void {
        this._presencePenalty = value;
    }

    public setFrequencyPenalty(value: number) : void {
        this._frequencyPenalty = value;
    }

    public setEcho(value: boolean) : void {
        this._echo = value;
    }

    public setN(value: number) : void {
        this._n = value;
    }

    public setTopP(value: number) : void {
        this._topP = value;
    }

    public setTemperature(value: number) : void {
        this._temperature = value;
    }

    public setMaxTokens(value: number) : void {
        this._maxTokens = value;
    }

    public async main (args: readonly string[]) : Promise<CommandExitStatus> {
        if (args.length === 0) {
            return CommandExitStatus.USAGE;
        }
        try {
            const [arg, ...freeArgs] = args;
            switch (arg) {

                case 'c':
                case 'comp':
                case 'completion': return await this.completion(freeArgs);

                case 'e':
                case 'edit': return await this.edit(freeArgs);

            }
            console.error(`Unknown command: ${arg}`);
            return CommandExitStatus.COMMAND_NOT_FOUND;
        } catch (err) {
            const body : unknown | OpenAiErrorDTO = (err as any)?.body;
            if (isOpenAiErrorDTO(body)) {
                console.error(`ERROR: [${body.error.type}] ${body.error.message}`);
            } else {
                throw err;
            }
        }
    }

    public async edit (args: readonly string[]) : Promise<CommandExitStatus> {
        if (args.length === 0) {
            return CommandExitStatus.USAGE;
        }
        const [instruction, ...freeArgs] = args;
        const input : string = map(
            freeArgs,
            (arg: string) : string => {
                if (existsSync(arg)) {
                    return readFileSync(arg, {encoding: 'utf8'}).toString();
                } else {
                    return arg;
                }
            }
        ).join('\n');
        const result : OpenAiEditResponseDTO = await this._client.getEdit(
            instruction,
            input,
            this._model,
            this._n,
            this._temperature,
            this._topP
        );
        const output = map(
            result.choices,
            (result: OpenAiEditResponseChoice) => {
                return result.text;
            }
        ).join('\n');
        console.log(output);
        return CommandExitStatus.OK;
    }

    public async completion (args: readonly string[]) : Promise<CommandExitStatus> {
        if (args.length === 0) {
            return CommandExitStatus.USAGE;
        }
        const [prompt, ...freeArgs] = args;
        const result : OpenAiCompletionResponseDTO = await this._client.getCompletion(
            prompt,
            this._model,
            this._maxTokens,
            this._temperature,
            this._topP,
            this._frequencyPenalty,
            this._presencePenalty
        );
        const output = map(
            result.choices,
            (result: OpenAiCompletionResponseChoice) => {
                return result.text;
            }
        ).join('\n');
        console.log(output);
        return CommandExitStatus.OK;
    }

}
