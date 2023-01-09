// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { aiDocumentCodeInstruction } from "./aiDocumentCodeInstruction";

describe("aiDocumentCodeInstruction", () => {

    it("generates instructions to document code without detail", () => {
        const language = "JavaScript";
        const framework = "JSDoc";
        const inDetail = false;
        const examples = "...";
        const expectedInstruction = `Let's go step by step.
Document the public interface from the following ${language} code using ${framework}.
Include the source code unmodified.

${examples}
`;

        expect(aiDocumentCodeInstruction(language, framework, inDetail, examples)).toBe(expectedInstruction);
    });

    it("generates instructions to document code in detail", () => {
        const language = "JavaScript";
        const framework = "JSDoc";
        const examples = "...";
        const inDetail = true;
        const expectedInstruction = `Let's go step by step.
Document the public interface from the following ${language} code in detail using ${framework}.
Include the source code unmodified.

${examples}
`;
        expect(aiDocumentCodeInstruction(language, framework, inDetail, examples)).toBe(expectedInstruction);
    });

});
