// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { changelogInstruction } from "./changelogInstruction";

describe("changelogInstruction", () => {
    it("generates instructions on how to write changelog for the provided source code diff", () => {
        const expectedInstruction = `Write a change log for the following commit diff:`;
        expect(changelogInstruction()).toBe(expectedInstruction);
    });
});
