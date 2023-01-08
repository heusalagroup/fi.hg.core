// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { describeCodeInstruction } from "./describeCodeInstruction";

describe("describeCodeInstruction", () => {

    it("generates instructions to describe code without detail", () => {
        const language = "JavaScript";
        const inDetail = false;
        const expectedInstruction = `Let's go step by step.
Describe what this ${language} does?`;
        expect(describeCodeInstruction(language, inDetail)).toBe(expectedInstruction);
    });

    it("generates instructions to describe code in detail", () => {
        const language = "JavaScript";
        const inDetail = true;
        const expectedInstruction = `Let's go step by step.
Describe in detail what this ${language} does?`;
        expect(describeCodeInstruction(language, inDetail)).toBe(expectedInstruction);
    });

});
