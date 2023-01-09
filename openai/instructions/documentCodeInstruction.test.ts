// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { documentCodeInstruction } from "./documentCodeInstruction";

describe("documentCodeInstruction", () => {
    it("generates instructions on how to write tests for the provided source code", () => {
        const language = "JavaScript";
        const framework = "JSDoc";
        const expectedInstruction = `Let's go step by step.
Improve the ${framework} documentations from the following ${language} code:`;

        expect(documentCodeInstruction(language, framework)).toBe(expectedInstruction);
    });
});
