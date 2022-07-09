// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    createProgram,
    getLineAndCharacterOfPosition,
    getPreEmitDiagnostics,
    ScriptTarget,
    ModuleKind,
    Program,
    Diagnostic,
    flattenDiagnosticMessageText,
    CompilerOptions,
    EmitResult,
    LineAndCharacter
} from "typescript";

export function requireTypeScript (file: string) : any {

    compileTypeScript([file], {
        noEmit: true,
        noImplicitAny: true,
        target: ScriptTarget.ES5,
        module: ModuleKind.CommonJS
    });

}

export function compileTypeScript (fileNames: string[], options: CompilerOptions): void {

    const program        : Program      = createProgram(fileNames, options);
    const emitResult     : EmitResult   = program.emit();
    const allDiagnostics : Diagnostic[] = getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

    allDiagnostics.forEach((diagnostic: Diagnostic) => {
        if (diagnostic.file) {
            const { line, character } : LineAndCharacter = getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
            const message : string = flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        } else {
            console.log(flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        }
    });

    const exitCode : number = emitResult.emitSkipped ? 1 : 0;
    console.log(`Process exiting with code '${exitCode}'.`);
    process.exit(exitCode);

}
