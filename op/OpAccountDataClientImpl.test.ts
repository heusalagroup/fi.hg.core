// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpAuthClient } from "./OpAuthClient";
import { RequestClientImpl } from "../RequestClientImpl";
import { OpAccountListDTO } from "./dto/OpAccountListDTO";
import { OpAccountDataClientImpl } from "./OpAccountDataClientImpl";
import { OpAccountDetailsDTO } from "./dto/OpAccountDetailsDTO";
import { OpTransactionListDTO } from "./dto/OpTransactionListDTO";
import { createOpTransactionDTO } from "./dto/OpTransactionDTO";

describe('OpAccountDataClientImpl', () => {

    let mockAuthClient: jest.Mocked<OpAuthClient>;
    let mockClient: jest.Mocked<RequestClientImpl>;

    beforeEach(() => {
        mockAuthClient = {
            isAuthenticated: jest.fn(),
            authenticate: jest.fn(),
            getAccessKey: jest.fn(),
        } as any;

        mockClient = {
            getJson: jest.fn(),
        } as any;
    });

    describe('#getAccountList', () => {
        it('returns the account list', async () => {
            const expectedAccountList: OpAccountListDTO = [
                {
                    bic: 'OKOYFIHH',
                    iban: 'FI7450009420999999',
                    name: 'Companys payroll account',
                    balance: '-12.3',
                    currency: 'EUR',
                    surrogateId: 'rNEl6nJ-VgIqbIfyNDBPo-Un2SBTa6zMDspKshS3J6fOlQ==',
                    productNames: {
                        property1: 'string',
                        property2: 'string'
                    }
                }
            ];
            mockClient.getJson.mockResolvedValueOnce(expectedAccountList as unknown as any);
            mockAuthClient.isAuthenticated.mockReturnValueOnce(true);
            const client = OpAccountDataClientImpl.create(
                mockClient, mockAuthClient, 'url');

            const accountList = await client.getAccountList();
            expect(accountList).toEqual(expectedAccountList);
        });
    });

    describe('#getAccountDetails', () => {
        it('returns the account details for a specific surrogateId', async () => {
            const expectedAccountDetails: OpAccountDetailsDTO = {
                bic: 'OKOYFIHH',
                iban: 'FI7450009499999999',
                dueDate: '29.11.2019',
                ownerId: '1234567-8',
                currency: 'EUR',
                netBalance: '222.22',
                accountName: 'Some name given by client',
                creditLimit: 0,
                surrogateId: 'rNEl6nJ-VgIqbIfyNDBPo-Un2SBTa6zMDspKshS3J6fOlQ==',
                accountOwner: 'Firstname Lastname',
                creationDate: '29.11.2011',
                grossBalance: '222.22',
                intraDayLimit: '222.22'
            };
            mockClient.getJson.mockResolvedValueOnce(expectedAccountDetails as unknown as any);
            mockAuthClient.isAuthenticated.mockReturnValueOnce(true);
            const client = OpAccountDataClientImpl.create(mockClient, mockAuthClient, 'url');

            const accountDetails = await client.getAccountDetails('surrogateId');
            expect(accountDetails).toEqual(expectedAccountDetails);
        });
    });

    describe('#getTransactionListFromTimestamp', () => {
        it('returns the transaction list from a specific timestamp', async () => {
            const expectedTransactionList: OpTransactionListDTO = [
                createOpTransactionDTO(
                    '100.00', '200.00', '100.00', 'Test', 'EUR', '1234', '1234', 'OKOYFIHH',
                    '1234', 'RF1234', '2023-07-21', 'John Doe', '2023-07-21', 'OKOYFIHH', '2023-07-21', 'Jane Doe',
                    'FI7450009420999999', 'FI7450009420999999', 'end2end', 1234567890, '101', 'Transaction', '1234-5678-9012-3456'
                )
            ];
            mockClient.getJson.mockResolvedValueOnce(expectedTransactionList as unknown as any);
            mockAuthClient.isAuthenticated.mockReturnValueOnce(true);
            const client = OpAccountDataClientImpl.create(mockClient, mockAuthClient, 'url');

            const transactionList = await client.getTransactionListFromTimestamp('surrogateId', 1234567890);
            expect(transactionList).toEqual(expectedTransactionList);
        });
    });

    describe('#getTransactionListFromObjectId', () => {
        it('returns the transaction list from a specific objectId', async () => {
            const expectedTransactionList: OpTransactionListDTO = [
                createOpTransactionDTO(
                    '100.00', '200.00', '100.00', 'Test', 'EUR', '1234', '1234', 'OKOYFIHH',
                    '1234', 'RF1234', '2023-07-21', 'John Doe', '2023-07-21', 'OKOYFIHH', '2023-07-21', 'Jane Doe',
                    'FI7450009420999999', 'FI7450009420999999', 'end2end', 1234567890, '101', 'Transaction', '1234-5678-9012-3456'
                )
            ];
            mockClient.getJson.mockResolvedValueOnce(expectedTransactionList as unknown as any);
            mockAuthClient.isAuthenticated.mockReturnValueOnce(true);
            const client = OpAccountDataClientImpl.create(mockClient, mockAuthClient, 'url');

            const transactionList = await client.getTransactionListFromObjectId('surrogateId', 'objectId');
            expect(transactionList).toEqual(expectedTransactionList);
        });
    });

});
