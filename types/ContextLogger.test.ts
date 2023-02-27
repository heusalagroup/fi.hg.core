import { Logger } from './Logger'
import  {ContextLogger} from "./ContextLogger";
import {MockLogger} from "../mocks/MockLogger";

describe('ContextLogger', () => {
    let logger: Logger;
    let contextLogger: ContextLogger;
    beforeEach(() => {
        logger = new MockLogger()
        contextLogger = new ContextLogger('Test', logger);
    });

    test('debug method should call parent logger', () => {
        // Create a spy on the parent logger's debug method
        const spy = jest.spyOn(logger, 'debug');

        // Call the context logger's debug method
        contextLogger.debug('This is a test');

        // Expect the parent logger's debug method to have been called with the correct arguments
        expect(spy).toHaveBeenCalledWith('[Test]', 'This is a test');
    });
});