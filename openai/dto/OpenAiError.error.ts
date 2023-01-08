[main] Loglevel as DEBUG
[HttpService] Started POST request to "https://api.openai.com/v1/edits" (1 requests)
[HttpService] Stopped POST request to "https://api.openai.com/v1/edits" (0 requests)
[HttpOpenAiClient] getEdit: result =  {
  object: 'edit',
  created: 1673104819,
  choices: [
    { error: [Object], index: 0 },
    { error: [Object], index: 1 },
    {
      text: '// Copyright (c) 2023. Heusala Limited <info@heusala.com>. All rights reserved.\n' +
        '\n' +
        'import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";\n' +
        'import { explainRegularObject, isRegularObject } from "../../types/RegularObject";\n' +
        'import { explain, explainProperty } from "../../types/explain";\n' +
        'import { explainString, isString } from "../../types/String";\n' +
        'import { startsWith } from "../../functions/startsWith";\n' +
        'import { parseJson } from "../../Json";\n' +
        '\n' +
        'export interface OpenAiError {\n' +
        '    readonly message : string;\n' +
        '    readonly type    : string;\n' +
        '}\n' +
        '\n' +
        'export function createOpenAiError (\n' +
        '    message : string,\n' +
        '    type : string\n' +
        ') : OpenAiError {\n' +
        '    return {\n' +
        '        message,\n' +
        '        type\n' +
        '    };\n' +
        '}\n' +
        '\n' +
        'export function isOpenAiError (value: unknown) : value is OpenAiError {\n' +
        '    return (\n' +
        '        isRegularObject(value)\n' +
        '        && hasNoOtherKeysInDevelopment(value, [\n' +
        "            'message',\n" +
        "            'type'\n" +
        '        ])\n' +
        '        && isString(value?.message)\n' +
        '        && isString(value?.type)\n' +
        '    );\n' +
        '}\n' +
        '\n' +
        'export function explainOpenAiError (value: any) : string {\n' +
        '    return explain(\n' +
        '        [\n' +
        '            explainRegularObject(value),\n' +
        '            explainNoOtherKeysInDevelopment(value, [\n' +
        "                'message',\n" +
        "                'type'\n" +
        '            ])\n' +
        '            , explainProperty("message", explainString(value?.message))\n' +
        '            , explainProperty("type", explainString(value?.type))\n' +
        '        ]\n' +
        '    );\n' +
        '}\n' +
        '\n' +
        'export function stringifyOpenAiError (value : OpenAiError) : string {\n' +
        '    return `OpenAiError(${JSON.stringify(value)})`;\n' +
        '}\n' +
        '\n' +
        'export function parseOpenAiError (value: unknown) : OpenAiError | undefined {\n' +
        '    if (isString(value)) {\n' +
        '        if (startsWith(value, "OpenAiError(")) {\n' +
        '            value = value.substring("OpenAiError(".length, value.length -1 );\n' +
        '        }\n' +
        '        value = parseJson(value);\n' +
        '    }\n' +
        '    if (isOpenAiError(value)) return value;\n' +
        '    return undefined;\n' +
        '}\n',
      index: 2
    },
    { error: [Object], index: 3 },
    { error: [Object], index: 4 },
    { error: [Object], index: 5 },
    { error: [Object], index: 6 },
    { error: [Object], index: 7 },
    {
      text: '// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.\n' +
        '\n' +
        'import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";\n' +
        'import { explainRegularObject, isRegularObject } from "../../types/RegularObject";\n' +
        'import { explain, explainProperty } from "../../types/explain";\n' +
        'import { explainString, isString } from "../../types/String";\n' +
        'import { startsWith } from "../../functions/startsWith";\n' +
        'import { parseJson } from "../../Json";\n' +
        'import { OpenAiError } from "./OpenAiError";\n' +
        '\n' +
        'export { OpenAiError } from "./OpenAiError";\n' +
        'export { OpenAiQuiz } from "./OpenAiQuiz";\n' +
        'export { OpenAiResult } from "./OpenAiQuestion";\n',
      index: 8
    },
    { error: [Object], index: 9 }
  ],
  usage: { prompt_tokens: 581, completion_tokens: 8320, total_tokens: 8901 }
}
[ProcessUtils] DEBUG: Closing process because "exit" event:  6
[main] Stopping command from process utils event
