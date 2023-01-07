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

export class HgAiCommandServiceImpl implements HgAiCommandService {

    private _client : OpenAiClient;

    public constructor (
        client : OpenAiClient
    ) {
        this._client = client;
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
        const result : OpenAiEditResponseDTO = await this._client.getEdit(instruction, input);
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
        const result : OpenAiCompletionResponseDTO = await this._client.getCompletion(prompt);
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
