// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { autowired } from "./autowired";
import { addAutowired } from "./addAutowired";
import { AutowireServiceImpl } from "./services/AutowireServiceImpl";
import { AutowireUtils } from "./utils/AutowireUtils";
import { LogLevel } from "../../types/LogLevel";

describe('autowired', () => {

    beforeAll(() => {
        AutowireUtils.setLogLevel(LogLevel.NONE);
        addAutowired.setLogLevel(LogLevel.NONE);
        autowired.setLogLevel(LogLevel.NONE);
    });

    it('successfully updates metadata and invokes the method with autowired parameters', () => {
        let retrievedArg: string = '';
        let retrievedArg2: string = 'xxx';
        let retrievedArg3: string = '';

        // Define an example class with a method decorated with `addAutowired`
        class MyApp {
            @addAutowired()
            public run(
                @autowired('hello')
                name: string = '',
                @autowired('bar')
                bar: string = '',
                @autowired('foobar')
                foobar: string = '',
            ) {
                retrievedArg = name;
                retrievedArg2 = bar;
                retrievedArg3 = foobar;
            }
        }

        const autowireService = AutowireServiceImpl.create();
        AutowireServiceImpl.setAutowireService(
            autowireService
        );
        autowireService.setName('hello', 'world');
        autowireService.setName('foobar', 'hello world');
        const app = new MyApp();
        app.run();
        // Check if autowired parameter matches the context
        expect(retrievedArg).toEqual('world');
        expect(retrievedArg2).toEqual('');
        expect(retrievedArg3).toEqual('hello world');
    });

    it('successfully updates metadata and invokes the method with missing autowired parameters', () => {
        let retrievedArg: string = '';
        let retrievedArg2: string = 'xxx';
        let retrievedArg3: string = '';

        // Define an example class with a method decorated with `addAutowired`
        class MyApp {
            @addAutowired()
            public run(
                @autowired('hello')
                name: string = '',
                @autowired('bar')
                bar: string = '',
                @autowired('foobar')
                foobar: string = '',
            ) {
                retrievedArg = name;
                retrievedArg2 = bar;
                retrievedArg3 = foobar;
            }
        }

        const autowireService = AutowireServiceImpl.create();
        AutowireServiceImpl.setAutowireService(
            autowireService
        );
        autowireService.setName('foobar', 'hello world');
        const app = new MyApp();
        app.run();
        // Check if autowired parameter matches the context
        expect(retrievedArg).toEqual('');
        expect(retrievedArg2).toEqual('');
        expect(retrievedArg3).toEqual('hello world');
    });

});
