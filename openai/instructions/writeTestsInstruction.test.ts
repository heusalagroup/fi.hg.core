// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { writeTestsInstruction } from "./writeTestsInstruction";

describe("writeTestsInstruction", () => {
    it("generates instructions on how to write tests for the provided source code", () => {
        const language = "JavaScript";
        const framework = "Mocha";
        const examples = "Some example tests\n";
        const expectedInstruction = `// JavaScript
// Write test cases.
// Framework: Mocha

Some example tests
`;

        expect(writeTestsInstruction(language, framework, examples)).toBe(expectedInstruction);
    });
});
