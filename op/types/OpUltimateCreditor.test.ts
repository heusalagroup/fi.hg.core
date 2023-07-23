// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.


import { createOpUltimateCreditor, explainOpUltimateCreditor, explainOpUltimateCreditorOrUndefined, isOpUltimateCreditor, isOpUltimateCreditorOrUndefined, OpUltimateCreditor, parseOpUltimateCreditor } from "./OpUltimateCreditor";
import { createOpPaymentIdentification, OpPaymentIdentification } from "./OpPaymentIdentification";
import { createOpAddress, OpAddress } from "./OpPaymentAddress";
import { OpIdentificationScheme } from "./OpIdentificationScheme";
import { CountryCode } from "../../types/CountryCode";

describe('OpUltimateCreditor functions', () => {
    let testObject: OpUltimateCreditor;
    let wrongObject: any;
    let identification: OpPaymentIdentification;
    let address: OpAddress;

    beforeEach(() => {
        identification = createOpPaymentIdentification(
            "123456789",
            OpIdentificationScheme.BIC,
            "TestIssuer"
        );

        address = createOpAddress(
            CountryCode.FI,
            [
                "TestStreet 12345",
                "TestCity"
            ]
        );

        testObject = createOpUltimateCreditor(
            "TestName",
            identification,
            address
        );

        wrongObject = {
            name: 12345, // Should be a string
            identification: {id: "123456789", schemeName: "WrongScheme", issuer: "TestIssuer"}, // Wrong schemeName
            address: "TestAddress" // Should be an OpAddress object
        };
    });

    describe('createOpUltimateCreditor', () => {
        it('should correctly create an OpUltimateCreditor object', () => {
            expect(testObject.name).toBe("TestName");
            expect(testObject.identification).toEqual(identification);
            expect(testObject.address).toEqual(address);
        });
    });

    describe('isOpUltimateCreditor', () => {
        it('should correctly identify OpUltimateCreditor objects', () => {
            expect(isOpUltimateCreditor(testObject)).toBe(true);
            expect(isOpUltimateCreditor(wrongObject)).toBe(false);
        });
    });

    describe('explainOpUltimateCreditor', () => {
        it('should provide correct explanation for OpUltimateCreditor objects', () => {
            expect(explainOpUltimateCreditor(testObject)).toEqual('OK');
            expect(explainOpUltimateCreditor(wrongObject)).toContain('property "name" not string');
            expect(explainOpUltimateCreditor(wrongObject)).toContain('property "identification" property "schemeName" incorrect enum value "WrongScheme" for OpIdentificationScheme: Accepted values BIC, COID, TXID, SOSE, UNSTRUCTURED_ORG, UNSTRUCTURED_PERSON');
            expect(explainOpUltimateCreditor(wrongObject)).toContain('property "address" not regular object, Value had extra properties: ,');
            expect(explainOpUltimateCreditor(wrongObject)).toContain('property "country" incorrect enum value "undefined" for CountryCode: Accepted values AF, AX, AL, DZ, AS, AD, AO, AI, AQ, AG, AR, AM, AW, AU, AT, AZ, BS, BH, BD, BB, BY, BE, BZ, BJ, BM, BT, BO, BQ, BA, BW, BV, BR, IO, BN, BG, BF, BI, CV, KH, CM, CA, KY, CF, TD, CL, CN, CX, CC, CO, KM, CD, CG, CK, CR, CI, HR, CU, CW, CY, CZ, DK, DJ, DM, DO, EC, EG, SV, GQ, ER, EE, SZ, ET, FK, FO, FJ, FI, FR, GF, PF, TF, GA, GM, GE, DE, GH, GI, GR, GL, GD, GP, GU, GT, GG, GN, GW, GY, HT, HM, VA, HN, HK, HU, IS, IN, ID, IR, IQ, IE, IM, IL, IT, JM, JP, JE, JO, KZ, KE, KI, KP, KR, KW, KG, LA, LV, LB, LS, LR, LY, LI, LT, LU, MO, MK, MG, MW, MY, MV, ML, MT, MH, MQ, MR, MU, YT, MX, FM, MD, MC, MN, ME, MS, MA, MZ, MM, NA, NR, NP, NL, NC, NZ, NI, NE, NG, NU, NF, MP, NO, OM, PK, PW, PS, PA, PG, PY, PE, PH, PN, PL, PT, PR, QA, RE, RO, RU, RW, BL, SH, KN, LC, MF, PM, VC, WS, SM, ST, SA, SN, RS, SC, SL, SG, SX, SK, SI, SB, SO, ZA, GS, SS, ES, LK, SD, SR, SJ, SE, CH, SY, TW, TJ, TZ, TH, TL, TG, TK, TO, TT, TN, TR, TM, TC, TV, UG, UA, AE, GB, UM, US, UY, UZ, VU, VE, VN, VG, VI, WF, EH, YE, ZM, ZW');
            expect(explainOpUltimateCreditor(wrongObject)).toContain('property "addressLine" not string[]');
        });
    });

    describe('parseOpUltimateCreditor', () => {
        it('should correctly parse valid objects to OpUltimateCreditor', () => {
            expect(parseOpUltimateCreditor(testObject)).toEqual(testObject);
            expect(parseOpUltimateCreditor(wrongObject)).toBeUndefined();
        });
    });

    describe('isOpUltimateCreditorOrUndefined', () => {
        it('should correctly identify OpUltimateCreditor or undefined', () => {
            expect(isOpUltimateCreditorOrUndefined(testObject)).toBe(true);
            expect(isOpUltimateCreditorOrUndefined(undefined)).toBe(true);
            expect(isOpUltimateCreditorOrUndefined(wrongObject)).toBe(false);
        });
    });

    describe('explainOpUltimateCreditorOrUndefined', () => {
        it('should provide correct explanation for OpUltimateCreditor or undefined', () => {
            expect(explainOpUltimateCreditorOrUndefined(testObject)).toEqual('OK');
            expect(explainOpUltimateCreditorOrUndefined(undefined)).toEqual('OK');
            expect(explainOpUltimateCreditorOrUndefined(wrongObject)).toEqual('not OpUltimateCreditor or undefined');
        });
    });

});
