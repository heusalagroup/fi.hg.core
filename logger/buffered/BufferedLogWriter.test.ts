// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { BufferedLogWriter } from "./BufferedLogWriter";

describe('BufferedLogWriter', () => {

    jest.useFakeTimers();

    let mockWriter : jest.MockedFunction<(value: string) => void>;
    let writer : BufferedLogWriter;

    beforeEach( () => {
        mockWriter = jest.fn();
        writer = new BufferedLogWriter(
            mockWriter,
            10,
            100,
            '>>>',
            '...\n',
            '\n'
        );
    });

    afterEach( () => {
        jest.clearAllMocks();
    });

    describe('#write', () => {

        it('buffers input until chunk size is reached', () => {
            writer.write('123456');
            expect(mockWriter).not.toHaveBeenCalled();
            writer.write('7890123456');
            expect(mockWriter).toHaveBeenNthCalledWith(1,'123456...\n');
            expect(mockWriter).toHaveBeenNthCalledWith(2,'>>>789...\n');
            expect(mockWriter).toHaveBeenNthCalledWith(3,'>>>012...\n');
            expect(mockWriter).toHaveBeenNthCalledWith(4,'>>>3456');
            expect(mockWriter).toHaveBeenCalledTimes(4);
        });

        it('flushes buffer when timeout expires', async () => {
            writer.write('123456');
            writer.write('789');
            expect(mockWriter).not.toHaveBeenCalled();
            jest.advanceTimersByTime(200);
            expect(mockWriter).toHaveBeenNthCalledWith(1, '123456789');
            expect(mockWriter).toHaveBeenCalledTimes(1);
        });

        it('splits input into chunks of chunk size', () => {
            writer.write('123456');
            writer.write('7890\nabc\ndefg\nhi');
            writer.write('jk');
            expect(mockWriter).toHaveBeenNthCalledWith(1,'123456...\n');
            expect(mockWriter).toHaveBeenNthCalledWith(2,'>>>7890\n');
            expect(mockWriter).toHaveBeenNthCalledWith(3,'abc\ndefg\n');
            expect(mockWriter).toHaveBeenCalledTimes(3);
        });

        it('does not buffer empty inputs', async () => {
            writer.write('');
            expect(mockWriter).not.toHaveBeenCalled();
            jest.advanceTimersByTime(200);
            expect(mockWriter).not.toHaveBeenCalled();
        });

        it('handles inputs larger than chunk size', () => {
            writer.write('1234567890abcdefg');
            expect(mockWriter).toHaveBeenNthCalledWith(1,'123456...\n');
            expect(mockWriter).toHaveBeenNthCalledWith(2,'>>>789...\n');
            expect(mockWriter).toHaveBeenNthCalledWith(3,'>>>0ab...\n');
            expect(mockWriter).toHaveBeenNthCalledWith(4,'>>>cdefg');
            expect(mockWriter).toHaveBeenCalledTimes(4);
        });

        it('handles multiple flushes in one write', async () => {

            writer.write('1234');
            writer.write('5678');
            jest.advanceTimersByTime(50); // The timeout is only 100 ms
            expect(mockWriter).not.toHaveBeenCalled();

            writer.write('abcd');
            writer.write('efgh');
            jest.advanceTimersByTime(150); // Timeout should be triggered now

            expect(mockWriter).toHaveBeenNthCalledWith(1, '123456...\n');
            expect(mockWriter).toHaveBeenNthCalledWith(2, '>>>78abcd');
            expect(mockWriter).toHaveBeenNthCalledWith(3, 'efgh');
            expect(mockWriter).toHaveBeenCalledTimes(3);
        });

    });

    describe('#drain', () => {

        it('flushes current buffer to writer', () => {
            writer.write('123456');
            writer.write('7890123456');
            expect(mockWriter).toHaveBeenNthCalledWith(1,'123456...\n');
            writer.drain();
            expect(mockWriter).toHaveBeenNthCalledWith(2,'>>>789...\n');
            expect(mockWriter).toHaveBeenNthCalledWith(3,'>>>012...\n');
            expect(mockWriter).toHaveBeenNthCalledWith(4,'>>>3456');
            expect(mockWriter).toHaveBeenCalledTimes(4);
        });

        it('skips empty inputs', () => {
            writer.write('');
            expect(mockWriter).not.toHaveBeenCalled();
            writer.drain();
            expect(mockWriter).not.toHaveBeenCalled();
        });

        it('handles inputs smaller than chunk size', () => {
            writer.write('123456');
            writer.drain();
            expect(mockWriter).toHaveBeenNthCalledWith(1,'123456');
            expect(mockWriter).toHaveBeenCalledTimes(1);
        });

        it('handles input rows larger than chunk size', () => {
            writer.write('1234567890abcdefg\n');
            writer.drain();
            expect(mockWriter).toHaveBeenNthCalledWith(1, '123456...\n');
            expect(mockWriter).toHaveBeenNthCalledWith(2, '>>>789...\n');
            expect(mockWriter).toHaveBeenNthCalledWith(3, '>>>0ab...\n');
            expect(mockWriter).toHaveBeenNthCalledWith(4, '>>>cdefg\n');
            expect(mockWriter).toHaveBeenCalledTimes(4);
        });

        it('handles inputs with newlines', () => {
            writer.write('1234\n5678\n');
            writer.write('abcd\nefgh\n');
            writer.drain();
            expect(mockWriter).toHaveBeenNthCalledWith(1, '1234\n5678\n');
            expect(mockWriter).toHaveBeenNthCalledWith(2, 'abcd\nefgh\n');
            expect(mockWriter).toHaveBeenCalledTimes(2);
        });

    });

});
