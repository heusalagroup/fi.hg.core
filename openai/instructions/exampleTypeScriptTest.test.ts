// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { exampleTypeScriptTest } from "./exampleTypeScriptTest";

describe("exampleTypeScriptTest", () => {
    it("generates an example of a TypeScript test with the provided class, method, and test names", () => {
        const className = "MyClass";
        const methodName = "myMethod";
        const testName = "can do something";
        const expectedTest = `describe("MyClass", () => {
    describe("myMethod", () => {
        it("can do something", () => {
        });
    });
});
`;
        expect(exampleTypeScriptTest(className, methodName, testName)).toBe(expectedTest);
    });
});
