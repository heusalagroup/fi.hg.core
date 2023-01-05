import { Observer } from './Observer';

describe('Observer', () => {

    describe('#getName', () => {
        it('should return the name of the Observer', () => {
            const observer = new Observer('my-observer');
            expect(observer.getName()).toBe('my-observer');
        });
    });

    describe('destroy', () => {
        it('should remove all data associated with the Observer', () => {
            const observer = new Observer('my-observer');
            observer.destroy();
            // @ts-ignore
            expect(observer._name).toBeUndefined();
            // @ts-ignore
            expect(observer._callbacks).toBeUndefined();
        });
    });

    describe('waitForEvent', () => {
        it('should resolve the returned Promise when the specified event is triggered', async () => {
            const observer = new Observer('my-observer');
            const eventPromise = observer.waitForEvent('my-event', 100);
            observer.triggerEvent('my-event');
            await eventPromise;
        });

        it('should reject the returned Promise if the specified event is not triggered within the specified timeout', async () => {
            const observer = new Observer('my-observer');
            const eventPromise = observer.waitForEvent('my-event', 100);
            eventPromise.catch(error => {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toMatch(/timed out/i);
            });
        });

        it('should resolve the returned Promise when the specified event is triggered multiple times', async () => {
            const observer = new Observer('my-observer');
            console.warn = jest.fn();
            observer.triggerEvent('my-event');
            const eventPromise = observer.waitForEvent('my-event', 100);
            observer.triggerEvent('my-event');
            await eventPromise;
            expect(console.warn).toHaveBeenCalledWith(`Warning! The observer for "${observer.getName()}" did not have anything listening "${'my-event'}"`);
        });

    });

});
