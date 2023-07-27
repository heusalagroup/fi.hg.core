// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { AutowireService } from './AutowireService';
import { AutowireServiceImpl } from "./AutowireServiceImpl";

describe('AutowireServiceImpl', () => {
    let autowireService: AutowireService;

    beforeEach(() => {
        autowireService = AutowireServiceImpl.create();
    });

    describe('with already setup service', () => {

        beforeEach(() => {
            AutowireServiceImpl.setAutowireService(autowireService);
        });

        describe('getName', () => {
            it('stores and retrieves a value by name', () => {
                autowireService.setName('test', 'testValue');
                expect(autowireService.getName('test')).toEqual('testValue');
            });

            it('throws error when getting a non-existant name', () => {
                expect(() => autowireService.getName('nonExistant')).toThrowError('Autowire service did not have name: nonExistant');
            });
        });

        describe('setName', () => {
            it('stores and retrieves a value by name', () => {
                autowireService.setName('test', 'testValue');
                expect(autowireService.getName('test')).toEqual('testValue');
            });

            it('throws error when getting a non-existant name', () => {
                expect(() => autowireService.getName('nonExistant')).toThrowError('Autowire service did not have name: nonExistant');
            });
        });

        describe('hasName', () => {
            it('returns true if the name exists', () => {
                autowireService.setName('test', 'testValue');
                expect(autowireService.hasName('test')).toBe(true);
            });

            it('returns false if the name does not exist', () => {
                expect(autowireService.hasName('nonExistant')).toBe(false);
            });
        });

        describe('deleteName', () => {
            it('deletes a name', () => {
                autowireService.setName('test', 'testValue');
                autowireService.deleteName('test');
                expect(autowireService.hasName('test')).toBe(false);
            });
        });

        describe('getAutowireService', () => {
            it('returns the current autowire service', () => {
                expect(AutowireServiceImpl.getAutowireService()).toEqual(autowireService);
            });
        });

    });

    describe('with uninitialized service', () => {

        beforeEach(() => {
            AutowireServiceImpl.setAutowireService(undefined);
        });

        describe('getAutowireService', () => {
            it('throws error when no autowire service has been set', () => {
                expect(() => AutowireServiceImpl.getAutowireService()).toThrowError('Autowire service has not been initialized');
            });
        });

    });

});
