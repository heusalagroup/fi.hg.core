// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { exampleTypeScriptTest } from "./exampleTypeScriptTest";

describe("exampleTypeScriptTest", () => {
    it("generates an example of a TypeScript test with the provided class, method, and test names", () => {
        const className = "MyClass";
        const methodName = "myMethod";
        const testName = "can do something";
        const expectedTest = `### MyClass.ts

\`\`\`typescript
export class MyClass {
    // ...
    public myMethod ( ... ) {
        // ...
    }
    // ...
}
\`\`\`

### MyClass.test.ts

\`\`\`typescript
import { MyClass } from "./MyClass";

describe("MyClass", () => {
    // ...
    describe("myMethod", () => {
        it("can do something", () => {
            // Implement test
        });
    });
    // ...
});
\`\`\`
`;
        expect(exampleTypeScriptTest(className, methodName, testName)).toBe(expectedTest);
    });
});
