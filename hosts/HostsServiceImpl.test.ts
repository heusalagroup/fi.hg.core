// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { HostsServiceImpl } from "./HostsServiceImpl";
import { createHostsModel, HostsModel } from "./HostsModel";
import { createHostEntryModel } from "./HostEntryModel";

const HOSTS_MODEL : HostsModel = createHostsModel(
    [
        createHostEntryModel('127.0.0.1', 'localhost')
    ]
);

describe('HostsService', () => {

    let service : HostsServiceImpl;
    beforeEach(() => {
        service = HostsServiceImpl.create(HOSTS_MODEL);
    });

    describe('#getModel', () => {

        it('can read the model', () => {
            expect(service.getModel()).toStrictEqual(
                {
                    entries: [
                        {
                            address: '127.0.0.1',
                            hostnames: [
                                'localhost'
                            ]
                        }
                    ]
                }
            )
        });

    });

    describe('#toString', () => {

        it('can stringify model with single entry', () => {
            expect(service.toString()).toBe(
                '127.0.0.1\tlocalhost\n'
            )
        });

        it('can stringify model with multiple entries', () => {
            service.setAddress(
                '10.0.0.1',
                'something.local'
            );
            expect(service.toString()).toBe(
                '127.0.0.1\tlocalhost\n'
                +'10.0.0.1\tsomething.local\n'
            );
        });


        it('can stringify model with multiple entries and more hostnames', () => {
            service.setAddress(
                '10.0.0.1',
                'something.local'
            );
            service.setAddress(
                '10.0.0.5',
                ['fs.local', 'fs.test', 'fs.dev']
            );
            expect(service.toString()).toBe(
                '127.0.0.1\tlocalhost\n'
                +'10.0.0.1\tsomething.local\n'
                +'10.0.0.5\tfs.local fs.test fs.dev\n'
            );
        });

    });

    describe('#getEntryByAddress', () => {
        it('can read an entry', () => {
            expect(service.getEntryByAddress('127.0.0.1')).toStrictEqual(
                {
                    address: '127.0.0.1',
                    hostnames: [
                        'localhost'
                    ]
                }
            )
        });
    });

    describe('#getEntryByHostname', () => {
        it('can read an entry', () => {
            expect(service.getEntryByHostname('localhost')).toStrictEqual(
                {
                    address: '127.0.0.1',
                    hostnames: [
                        'localhost'
                    ]
                }
            )
        });
    });

    describe('#setAddress', () => {

        it('can set a new model entry', () => {

            service.setAddress(
                '10.0.0.1',
                'something.local'
            );

            expect(service.getModel()).toStrictEqual(
                {
                    entries: [
                        {
                            address: '127.0.0.1',
                            hostnames: [
                                'localhost'
                            ]
                        },
                        {
                            address: '10.0.0.1',
                            hostnames: [
                                'something.local'
                            ]
                        }
                    ]
                }
            );

        });

        it('can replace model entry', () => {

            service.setAddress(
                '127.0.0.1',
                [
                    'localhost',
                    'something.local'
                ]
            );

            expect(service.getModel()).toStrictEqual(
                {
                    entries: [
                        {
                            address: '127.0.0.1',
                            hostnames: [
                                'localhost',
                                'something.local'
                            ]
                        }
                    ]
                }
            );

        });

    });

    describe('#replaceByHostnames', () => {

        it('can set a new model entry for new address', () => {

            service.replaceByHostnames(
                '10.0.0.1',
                'something.local'
            );

            expect(service.getModel()).toStrictEqual(
                {
                    entries: [
                        {
                            address: '127.0.0.1',
                            hostnames: [
                                'localhost'
                            ]
                        },
                        {
                            address: '10.0.0.1',
                            hostnames: [
                                'something.local'
                            ]
                        }
                    ]
                }
            );

        });

        it('can replace model entry for existing address', () => {

            service.replaceByHostnames(
                '127.0.0.1',
                [
                    'localhost',
                    'something.local'
                ]
            );

            expect(service.getModel()).toStrictEqual(
                {
                    entries: [
                        {
                            address: '127.0.0.1',
                            hostnames: [
                                'localhost',
                                'something.local'
                            ]
                        }
                    ]
                }
            );

        });

        it('can add new hostname to existing address', () => {

            service.replaceByHostnames(
                '127.0.0.1',
                'something.local'
            );

            expect(service.getModel()).toStrictEqual(
                {
                    entries: [
                        {
                            address: '127.0.0.1',
                            hostnames: [
                                'localhost',
                                'something.local'
                            ]
                        }
                    ]
                }
            );

        });

        it('can add new hostname to new address without affecting old hostname', () => {

            service.replaceByHostnames(
                '10.0.0.1',
                'something.local'
            );

            expect(service.getModel()).toStrictEqual(
                {
                    entries: [
                        {
                            address: '127.0.0.1',
                            hostnames: [
                                'localhost'
                            ]
                        },
                        {
                            address: '10.0.0.1',
                            hostnames: [
                                'something.local'
                            ]
                        }
                    ]
                }
            );

        });

        it('can move hostname to new address without affecting old hostname', () => {

            service.setAddress(
                '127.0.0.1',
                [
                    'localhost',
                    'something.local'
                ]
            );

            service.replaceByHostnames(
                '10.0.0.1',
                'something.local'
            );

            expect(service.getModel()).toStrictEqual(
                {
                    entries: [
                        {
                            address: '127.0.0.1',
                            hostnames: [
                                'localhost'
                            ]
                        },
                        {
                            address: '10.0.0.1',
                            hostnames: [
                                'something.local'
                            ]
                        }
                    ]
                }
            );

        });

    });

});
