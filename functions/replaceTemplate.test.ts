// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { replaceTemplate } from './replaceTemplate';

describe('replaceTemplate', () => {

    it('replaces all occurrences of a string in the template', () => {
        const template = 'Hello, {{name}}! You have {{count}} new messages.';
        const replacements = { '{{name}}': 'Alice', '{{count}}': '3' };
        const expected = 'Hello, Alice! You have 3 new messages.';

        expect(replaceTemplate(template, replacements)).toEqual(expected);
    });

    it('replaces multiple keys in the template', () => {
        const template = '{{greeting}}, {{name}}! You have {{count}} new messages.';
        const replacements = { '{{greeting}}': 'Hi', '{{name}}': 'Alice', '{{count}}': '3' };
        const expected = 'Hi, Alice! You have 3 new messages.';

        expect(replaceTemplate(template, replacements)).toEqual(expected);
    });

    it('returns the original template string if no replacements are provided', () => {
        const template = 'Hello, {{name}}! You have {{count}} new messages.';
        const replacements = {};
        const expected = 'Hello, {{name}}! You have {{count}} new messages.';

        expect(replaceTemplate(template, replacements)).toEqual(expected);
    });

    it('returns the original template string if no matching keys are found in the replacements', () => {
        const template = 'Hello, {{name}}! You have {{count}} new messages.';
        const replacements = { '{{greeting}}': 'Hi' };
        const expected = 'Hello, {{name}}! You have {{count}} new messages.';

        expect(replaceTemplate(template, replacements)).toEqual(expected);
    });

    it('handles empty string values in the replacements', () => {
        const template = 'Hello, {{name}}! You have {{count}} new messages.';
        const replacements = { '{{name}}': '', '{{count}}': '3' };
        const expected = 'Hello, ! You have 3 new messages.';

        expect(replaceTemplate(template, replacements)).toEqual(expected);
    });

});
