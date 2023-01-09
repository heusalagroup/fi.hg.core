// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { aiDocumentCodeInstruction } from "./aiDocumentCodeInstruction";

describe("aiDocumentCodeInstruction", () => {

    it("generates instructions to document code without detail", () => {
        const language = "JavaScript";
        const framework = "JSDoc";
        const inDetail = false;
        const expectedInstruction = `Let's go step by step.
Write instructions to AI how to document the public interface from this ${language} code in ${framework}.
`;
        expect(aiDocumentCodeInstruction(language, framework, inDetail)).toBe(expectedInstruction);
    });

    it("generates instructions to document code in detail", () => {
        const language = "JavaScript";
        const framework = "JSDoc";
        const inDetail = true;
        const expectedInstruction = `Let's go step by step.
Write instructions to AI how to document the public interface from this ${language} code in ${framework}.
`;
        expect(aiDocumentCodeInstruction(language, framework, inDetail)).toBe(expectedInstruction);
    });

});
