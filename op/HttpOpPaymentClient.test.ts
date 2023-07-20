// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { OpPaymentCreditor } from "./types/OpPaymentCreditor";
import { CountryCode } from "../types/CountryCode";
import { Currency } from "../types/Currency";
import { RequestClient } from "../RequestClient";
import { OpPaymentRequestDTO } from "./dto/OpPaymentRequestDTO";
import { HttpOpPaymentClient } from "./HttpOpPaymentClient";
import { HttpOpAuthClient } from "./HttpOpAuthClient";
import { MockRequestClient } from "../requestClient/mock/MockRequestClient";
import { NodeRequestClient } from "../../node/requestClient/node/NodeRequestClient";
import { LogLevel } from "../types/LogLevel";
import { HgNode } from "../../node/HgNode";

jest.mock('../RequestClient');

describe("HttpOpPaymentClient", () => {

    const requestClient = new RequestClient(
        new MockRequestClient(),
    );

    jest.spyOn(requestClient, 'postText');

    const mockOpPaymentRequestDTO: OpPaymentRequestDTO = {
        instructionId: '123456',
        creditor: {
            name: 'Test Name',
            iban: 'FI3859991620004143',
            address: {
                country: 'FI' as CountryCode,
                addressLine: ['a1', 'a2']
            }
        } as OpPaymentCreditor,
        debtor: {
            name: 'Test Name',
            iban: 'FI3859991620004143',
            address: {
                country: 'FI' as CountryCode,
                addressLine: ['a1', 'a2']
            }
        },
        instructedAmount: {
            amount: '100.00',
            currency: 'USD' as Currency,
        }
    };

    let client: HttpOpPaymentClient;

    beforeAll(() => {
        RequestClient.setLogLevel(LogLevel.NONE);
        NodeRequestClient.setLogLevel(LogLevel.NONE);
        HttpOpAuthClient.setLogLevel(LogLevel.NONE);
        HttpOpPaymentClient.setLogLevel(LogLevel.NONE);
    });

    beforeEach(() => {

        // Set up HttpOpPaymentClient instance
        client = HttpOpPaymentClient.create(
            requestClient,
            HttpOpAuthClient.create(
                requestClient,
                "clientId",
                "clientSecret",
                "https://example.com",
            ),
            "-----BEGIN RSA PRIVATE KEY-----\n" +
            "MIIJKAIBAAKCAgEAp7/ODdwvXx3/4f/acdAwqw1CZP9wBBzR1vKZPy0OII312tro\n" +
            "VYdTA1Cf3Ct2uDCay/AaRzYCHv5RtiokGZ/mlPiZJGM+ejjbSyEc4vD8t8JvVVKe\n" +
            "LVwI53VDDfYk6Chh+D8PdF9TrFJQJzs4InI03O13X/3pG6UR9DS+bjKNDYcpvn+z\n" +
            "C1I5a8WcZ62MuysrBTAEeVBGqaNJjGdjL6TOKKO5kLKNHmxZRpUyU8cbKihH0Ouw\n" +
            "oRw6q+PNP67SO1hlxUryVhKFZBILvvwm/udrlrMrg3INaHcCPjda++cms8ZKXfya\n" +
            "wFOLuMTXWrCpXTAf+HA9LBlrxVN+k3bxX1Z7P9/rjxbEi4lfycJPKJRq1mIBb3HA\n" +
            "7I5odSwGDvjMo7R7DAJOrGanVh5F9ZSTpGpsVtVa8NiNh5cXRwBLA80723EGzBvd\n" +
            "IBA4MYaE6pvKLvkMJEM1wWugn1VwSM7a4yd5ldSzm/4cE5BRuY66Yd/vmMdQsMzT\n" +
            "i+5sdMWf98Dv03TCDEEKoj04mMdVRQQibJ99aSoNKIRoiGTxcqBx2W7wrtuT0NAA\n" +
            "n7EQgKxuaa4zfxHNsPrUpatxnB75oAg4rKSaN2gLVudJfC0sPBSxGZUqEukS+v9H\n" +
            "KTZ86BRi5yp7NgBRLHvV+DxfOn+rjH4U1VlVD9aSEWa4+7UMgWMu9lyKLW0CAwEA\n" +
            "AQKCAgAPQLJ0siugg3LL0t7C8IIsW3VJB6zgwtoVqFNk2izpqt7K+pKbjEVxDLis\n" +
            "ZUtTLiA1IOzSwsdomAlH/gbwSYjGzN/n3hpFNLxD1Yvx2qWv8775zBxT1YV9vjzN\n" +
            "nS736QwXbWxzUWOjTIy7NHhDMY069WCgWs8CU30RbmZOUMxgiYSzLJtUETLlaL9y\n" +
            "8eXU8vTjcN1HRpRWQmGioZf0MhEIwvJRhNquBH4Nm+1KjtUafTUievvBenafQIRe\n" +
            "IQA+oygFy23Dg8WbNsTYpcbJ8LLorfvr5MfxUrjifVgJhZgQSpxidWCA0lfnAgbu\n" +
            "2RddQM33YgU96EXTWGcu82a5G3zzSTJDSoJKgweThLTI1fWIKmu1G8FWZWgJFeHz\n" +
            "Pamvuvnfg4unjQ+CxcJzDnOYiEs2O7gwFBNe9nfc7WjEiq/fB92tlPoG/NfUUR5+\n" +
            "ZyGMjW6P2uGdYqu/gw7o9kC68hK0VHUTZZNR428VDpP7F0GmTgrV/C7vRPe7Krtc\n" +
            "xoPjoQrpo5ffbMhBLxggg73tLiq6u0m6fQgLHM/lNVHDhVoe8FtjErJzZ1Jt5aGA\n" +
            "aS8o0/ms86/VuFrlfHPFKSPuzpx4Tgc/tFNIFnOBX6ODsD/tQcmZ7GVl6Nz4nerq\n" +
            "ZL8x/Ywq39B6sQ2IjBd2G619IpUtSjIbRu+1S+HPMphTKFljYQKCAQEA0LPgrz27\n" +
            "pQlQRzfvMntrX6hAbfY/mKxR5a0IwH+b4OZWoPn3T19/kgotRC0UWxHb6UPx9Gg6\n" +
            "heUtVtJT3gvqC1uDXK55m6Ka63hZEYc7MiXUim429r1a8sePDq7OmVIgXVj+PCP7\n" +
            "k/lLWHAvKzoSqh6olOiEfO85JxLEp0d3yZJaX+nDwQIP74rGcg42d2jd51QO6BaI\n" +
            "cYw+jGjOmLQTNgJVnZm7d9LZSN944NmemL9SOkwq2rXtUmu8ctMs+ylyBBIRgLmc\n" +
            "Pwrek3I9HVNUs9qfC7lXZyEoDUExuSlD/5Fow7Z9NH4/Qtz5E63SKXtcCv8Kqmb0\n" +
            "TdknXnU6B/GjpQKCAQEAzcP36023kAvJPu7yd1tJKJajEs8CEzrkbXClqXYVappm\n" +
            "s7ir8+D0m7uN2XVte1LPg4ysI3MksQPmqBEcu6kEWpkMvwb03QdMEmaXOhmNXE93\n" +
            "OeXQ/CntyS/gqmeSWe319AzSUCL9tGNoQVQ41sml6vgI3KyLotm4cR6vIbSjdUp5\n" +
            "BXNlGCwjvhZhBQWFwgK4SD7CSGVpYaGEypMUlXfWcFOZm+7FN1CXBLpfIzQ+P8+8\n" +
            "u8YRNgHB/L6fXdhKaSj89avIRpmm4/dbkMJOMaiJ+wPfy+NMG0Y012xGO64xNV5b\n" +
            "BqOawWoVrJbODOUx1rHMOTwY8uxrAKZlTLRVU2mYKQKCAQAz2z4MzO3/B91mlMNe\n" +
            "a8Q2NHwt1m3e5ZJD20a9bfexXgpQXUvR8QyloNm2guz34+wcfcF01SEVe+hUFla4\n" +
            "aYVx5P8y3DdjMHgF4hVfgZZ302aILvKBRHOAt40YPN8gwYNBLoedMeOk1OCfzOAr\n" +
            "gXZ5xrxko5Gn6VjuGH+8gMmG0FKcWl1Fa9nBz12XoWhvKyNYA07g5Bhq/kncYX5T\n" +
            "+wp69QGI81XdZAqRTNWgKPJ7Sa6IxbwwM9wQCqz8avRWQ+oMkODAd14XXAAJ6uy8\n" +
            "iKQXPE8gfqD1AwwMnxJXy6UVr2+0kXdyv5vAZV+OQDZkED7CjLR9uq8hWL+rfL06\n" +
            "lBPxAoIBAFFC5XQeGzJeFTovb75HZNsMspZI/o7NoUy/Qg1svwR8ubacZfxIiRG/\n" +
            "vkN1JqmfiKhxM8JEROdLnRoet/Q8yaVl8Cy4+JcZvKc/sNWXJcag83sAEcqkXG4p\n" +
            "5FYn1RqC6bFaJuzTBNLqt0+ljVT2CfqDviw4UGUeCsNR1ORAzJUTtju62N/0/qCh\n" +
            "getTxQFbxZ9yeZPRyQ5vlVvTPjvROfTebzmv0F8KCropSE1E4pic1/JoRH/Jrey8\n" +
            "839CXhCtyUjUcKHBKLG7DIRc2DiwUN27J/UDbRkQXun8rrf/ERv8iYJTtlhQJwMk\n" +
            "A3gAQ/CAAyFPZKL7Tz7QeA0U4uWwPBECggEBAIU0MlbxP4tewHfi6iedbNSPRbp1\n" +
            "Uoh3fx56NE72c7XuwSlcwiPRrUON8hpdGH1xedWVmsu5j+JtkKG/EjW2GGyHfLUI\n" +
            "uyane/qJO2A16bLk3m6cuX7fdK+70iYj2i3rpW1HtUwiy3/4k5LVr5Ryl710jqOc\n" +
            "/JMzC/bniUeN3ChHbMV9RmpD9bs73dMD0Zy+ISbjASAOFWHG//t/ezNsJTKF4zc3\n" +
            "fjBy/4LHKTy3D6uYsAQ7JOjnRAiHh8sCo1+WYingqtZtCsegRs2c8K0ABSUCCV/z\n" +
            "X/QqjvjEsD2c2/wBLdHm7pAo9lv/7ucU+kcfJIN9lD02V5tNLgqIqSbxmiw=\n" +
            "-----END RSA PRIVATE KEY-----\n",
            "signingKid",
            "https://example.com"
        );
    });

    afterEach(() => {
        // Clear all mock function calls
        jest.clearAllMocks();
    });

    it("should initiate payment correctly", async () => {

        // Set up mock RequestClient responses
        (requestClient.postText as any)
                         .mockResolvedValueOnce(JSON.stringify({ access_token: "testToken" }))  // _getAccessToken
                         .mockResolvedValueOnce(JSON.stringify({
                             "amount": "3.45",
                             "status": "PROCESSED",
                             "currency": "EUR",
                             "archiveId": "20190524593156999999",
                             "debtorIban": "FI4550009420888888",
                             "ultimateDebtorName": "Ultimate Debtor",
                             "bookingDate": "2019-05-12",
                             "paymentType": "SCT_INST",
                             "creditorIban": "FI4550009420999999",
                             "creditorName": "Cedric Creditor",
                             "ultimateCreditorName": "Ultimate Creditor",
                             "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
                             "transactionDate": "2019-05-11",
                             "endToEndId": "544652-end2end"
                         }));

        const result = await client.createPayment(mockOpPaymentRequestDTO);

        // Expect that RequestClient.postText has been called correctly
        expect(requestClient.postText).toHaveBeenCalledTimes(2);
        expect(requestClient.postText).toHaveBeenNthCalledWith(
            1,
            "https://example.com/corporate-oidc/v1/token",
            "grant_type=client_credentials&client_id=clientId&client_secret=clientSecret",
            { "Content-Type": "application/x-www-form-urlencoded" }
        );
        expect(requestClient.postText).toHaveBeenNthCalledWith(
            2,
            "https://example.com/corporate-payment/v1/sepa-payment",
            JSON.stringify(mockOpPaymentRequestDTO),
            expect.objectContaining({
                "Content-Type": "application/json",
                "Authorization": "Bearer testToken",
                "X-Req-Signature": expect.any(String),
            })
        );

        // Expect result to match mock OpPaymentResponseDTO
        expect(result).toStrictEqual({
            "amount": "3.45",
            "status": "PROCESSED",
            "currency": "EUR",
            "archiveId": "20190524593156999999",
            "debtorIban": "FI4550009420888888",
            "ultimateDebtorName": "Ultimate Debtor",
            "bookingDate": "2019-05-12",
            "paymentType": "SCT_INST",
            "creditorIban": "FI4550009420999999",
            "creditorName": "Cedric Creditor",
            "ultimateCreditorName": "Ultimate Creditor",
            "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
            "transactionDate": "2019-05-11",
            "endToEndId": "544652-end2end"
        });

    });

});
