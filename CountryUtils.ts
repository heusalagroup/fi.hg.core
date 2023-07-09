// Copyright (c) 2020-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { map } from "./functions/map";
import { find } from "./functions/find";
import { trim } from "./functions/trim";
import { toLower } from "./functions/toLower";
import { TranslationFunction } from "./types/TranslationFunction";
import { Sovereignty } from "./types/Sovereignty";
import { CountryCode, isCountryCode } from "./types/CountryCode";
import { Country, createCountry } from "./types/Country";
import { getCountryNameTranslationKey } from "./translations/country-translation";
import { EnumUtils } from "./EnumUtils";

export type CountryAutoCompleteMapping = [CountryCode, string[]][];

export class CountryUtils {

    private static _countryCodeList : readonly CountryCode[] | undefined = undefined;
    private static _countryList : readonly Country[] | undefined = undefined;

    public static getCountryList () : readonly Country[] {
        if (!this._countryList) {
            this._countryList = map(
                CountryUtils.getCountryCodeList(),
                (item: CountryCode) : Country => CountryUtils.createCountryByCode(item)
            );
        }
        if (!this._countryList) throw TypeError(`CountryUtils: Country list not initialized`);
        return this._countryList;
    }

    public static getCountryCodeList () : readonly CountryCode[] {
        if (!this._countryCodeList) {
            this._countryCodeList = CountryUtils.createCountryCodeList();
        }
        if (!this._countryCodeList) throw TypeError(`CountryUtils: Country code list not initialized`);
        return this._countryCodeList;
    }

    public static createCountryCodeList () : CountryCode[] {
        return map(EnumUtils.getKeys(CountryCode), (key: string) : CountryCode => {
            // @ts-ignore
            return CountryCode[key];
        });
    }

    public static createCountryByCode (code: CountryCode) : Country {
        switch(code) {
            case CountryCode.AF: return createCountry(CountryCode.AF, Sovereignty.UN_MEMBER_STATE,  "AFG", 4, "ISO 3166-2:AF", ".af")
            case CountryCode.AX: return createCountry(CountryCode.AX, Sovereignty.FINLAND,  "ALA", 248, "ISO 3166-2:AX", ".ax")
            case CountryCode.AL: return createCountry(CountryCode.AL, Sovereignty.UN_MEMBER_STATE,  "ALB", 8, "ISO 3166-2:AL", ".al")
            case CountryCode.DZ: return createCountry(CountryCode.DZ, Sovereignty.UN_MEMBER_STATE,  "DZA", 12, "ISO 3166-2:DZ", ".dz")
            case CountryCode.AS: return createCountry(CountryCode.AS, Sovereignty.UNITED_STATES,  "ASM", 16, "ISO 3166-2:AS", ".as")
            case CountryCode.AD: return createCountry(CountryCode.AD, Sovereignty.UN_MEMBER_STATE,  "AND", 20, "ISO 3166-2:AD", ".ad")
            case CountryCode.AO: return createCountry(CountryCode.AO, Sovereignty.UN_MEMBER_STATE,  "AGO", 24, "ISO 3166-2:AO", ".ao")
            case CountryCode.AI: return createCountry(CountryCode.AI, Sovereignty.UNITED_KINGDOM,  "AIA", 660, "ISO 3166-2:AI", ".ai")
            case CountryCode.AQ: return createCountry(CountryCode.AQ, Sovereignty.ANTARCTIC_TREATY,  "ATA", 10, "ISO 3166-2:AQ", ".aq")
            case CountryCode.AG: return createCountry(CountryCode.AG, Sovereignty.UN_MEMBER_STATE,  "ATG", 28, "ISO 3166-2:AG", ".ag")
            case CountryCode.AR: return createCountry(CountryCode.AR, Sovereignty.UN_MEMBER_STATE,  "ARG", 32, "ISO 3166-2:AR", ".ar")
            case CountryCode.AM: return createCountry(CountryCode.AM, Sovereignty.UN_MEMBER_STATE,  "ARM", 51, "ISO 3166-2:AM", ".am")
            case CountryCode.AW: return createCountry(CountryCode.AW, Sovereignty.NETHERLANDS,  "ABW", 533, "ISO 3166-2:AW", ".aw")
            case CountryCode.AU: return createCountry(CountryCode.AU, Sovereignty.UN_MEMBER_STATE,  "AUS", 36, "ISO 3166-2:AU", ".au")
            case CountryCode.AT: return createCountry(CountryCode.AT, Sovereignty.UN_MEMBER_STATE,  "AUT", 40, "ISO 3166-2:AT", ".at")
            case CountryCode.AZ: return createCountry(CountryCode.AZ, Sovereignty.UN_MEMBER_STATE,  "AZE", 31, "ISO 3166-2:AZ", ".az")
            case CountryCode.BS: return createCountry(CountryCode.BS, Sovereignty.UN_MEMBER_STATE,  "BHS", 44, "ISO 3166-2:BS", ".bs")
            case CountryCode.BH: return createCountry(CountryCode.BH, Sovereignty.UN_MEMBER_STATE,  "BHR", 48, "ISO 3166-2:BH", ".bh")
            case CountryCode.BD: return createCountry(CountryCode.BD, Sovereignty.UN_MEMBER_STATE,  "BGD", 50, "ISO 3166-2:BD", ".bd")
            case CountryCode.BB: return createCountry(CountryCode.BB, Sovereignty.UN_MEMBER_STATE,  "BRB", 52, "ISO 3166-2:BB", ".bb")
            case CountryCode.BY: return createCountry(CountryCode.BY, Sovereignty.UN_MEMBER_STATE,  "BLR", 112, "ISO 3166-2:BY", ".by")
            case CountryCode.BE: return createCountry(CountryCode.BE, Sovereignty.UN_MEMBER_STATE,  "BEL", 56, "ISO 3166-2:BE", ".be")
            case CountryCode.BZ: return createCountry(CountryCode.BZ, Sovereignty.UN_MEMBER_STATE,  "BLZ", 84, "ISO 3166-2:BZ", ".bz")
            case CountryCode.BJ: return createCountry(CountryCode.BJ, Sovereignty.UN_MEMBER_STATE,  "BEN", 204, "ISO 3166-2:BJ", ".bj")
            case CountryCode.BM: return createCountry(CountryCode.BM, Sovereignty.UNITED_KINGDOM,  "BMU", 60, "ISO 3166-2:BM", ".bm")
            case CountryCode.BT: return createCountry(CountryCode.BT, Sovereignty.UN_MEMBER_STATE,  "BTN", 64, "ISO 3166-2:BT", ".bt")
            case CountryCode.BO: return createCountry(CountryCode.BO, Sovereignty.UN_MEMBER_STATE,  "BOL", 68, "ISO 3166-2:BO", ".bo")
            case CountryCode.BQ: return createCountry(CountryCode.BQ, Sovereignty.NETHERLANDS,  "BES", 535, "ISO 3166-2:BQ", ".bq .nl")
            case CountryCode.BA: return createCountry(CountryCode.BA, Sovereignty.UN_MEMBER_STATE,  "BIH", 70, "ISO 3166-2:BA", ".ba")
            case CountryCode.BW: return createCountry(CountryCode.BW, Sovereignty.UN_MEMBER_STATE,  "BWA", 72, "ISO 3166-2:BW", ".bw")
            case CountryCode.BV: return createCountry(CountryCode.BV, Sovereignty.NORWAY,  "BVT", 74, "ISO 3166-2:BV", "")
            case CountryCode.BR: return createCountry(CountryCode.BR, Sovereignty.UN_MEMBER_STATE,  "BRA", 76, "ISO 3166-2:BR", ".br")
            case CountryCode.IO: return createCountry(CountryCode.IO, Sovereignty.UNITED_KINGDOM,  "IOT", 86, "ISO 3166-2:IO", ".io")
            case CountryCode.BN: return createCountry(CountryCode.BN, Sovereignty.UN_MEMBER_STATE,  "BRN", 96, "ISO 3166-2:BN", ".bn")
            case CountryCode.BG: return createCountry(CountryCode.BG, Sovereignty.UN_MEMBER_STATE,  "BGR", 100, "ISO 3166-2:BG", ".bg")
            case CountryCode.BF: return createCountry(CountryCode.BF, Sovereignty.UN_MEMBER_STATE,  "BFA", 854, "ISO 3166-2:BF", ".bf")
            case CountryCode.BI: return createCountry(CountryCode.BI, Sovereignty.UN_MEMBER_STATE,  "BDI", 108, "ISO 3166-2:BI", ".bi")
            case CountryCode.CV: return createCountry(CountryCode.CV, Sovereignty.UN_MEMBER_STATE,  "CPV", 132, "ISO 3166-2:CV", ".cv")
            case CountryCode.KH: return createCountry(CountryCode.KH, Sovereignty.UN_MEMBER_STATE,  "KHM", 116, "ISO 3166-2:KH", ".kh")
            case CountryCode.CM: return createCountry(CountryCode.CM, Sovereignty.UN_MEMBER_STATE,  "CMR", 120, "ISO 3166-2:CM", ".cm")
            case CountryCode.CA: return createCountry(CountryCode.CA, Sovereignty.UN_MEMBER_STATE,  "CAN", 124, "ISO 3166-2:CA", ".ca")
            case CountryCode.KY: return createCountry(CountryCode.KY, Sovereignty.UNITED_KINGDOM,  "CYM", 136, "ISO 3166-2:KY", ".ky")
            case CountryCode.CF: return createCountry(CountryCode.CF, Sovereignty.UN_MEMBER_STATE,  "CAF", 140, "ISO 3166-2:CF", ".cf")
            case CountryCode.TD: return createCountry(CountryCode.TD, Sovereignty.UN_MEMBER_STATE,  "TCD", 148, "ISO 3166-2:TD", ".td")
            case CountryCode.CL: return createCountry(CountryCode.CL, Sovereignty.UN_MEMBER_STATE,  "CHL", 152, "ISO 3166-2:CL", ".cl")
            case CountryCode.CN: return createCountry(CountryCode.CN, Sovereignty.UN_MEMBER_STATE,  "CHN", 156, "ISO 3166-2:CN", ".cn")
            case CountryCode.CX: return createCountry(CountryCode.CX, Sovereignty.AUSTRALIA,  "CXR", 162, "ISO 3166-2:CX", ".cx")
            case CountryCode.CC: return createCountry(CountryCode.CC, Sovereignty.AUSTRALIA,  "CCK", 166, "ISO 3166-2:CC", ".cc")
            case CountryCode.CO: return createCountry(CountryCode.CO, Sovereignty.UN_MEMBER_STATE,  "COL", 170, "ISO 3166-2:CO", ".co")
            case CountryCode.KM: return createCountry(CountryCode.KM, Sovereignty.UN_MEMBER_STATE,  "COM", 174, "ISO 3166-2:KM", ".km")
            case CountryCode.CD: return createCountry(CountryCode.CD, Sovereignty.UN_MEMBER_STATE,  "COD", 180, "ISO 3166-2:CD", ".cd")
            case CountryCode.CG: return createCountry(CountryCode.CG, Sovereignty.UN_MEMBER_STATE,  "COG", 178, "ISO 3166-2:CG", ".cg")
            case CountryCode.CK: return createCountry(CountryCode.CK, Sovereignty.NEW_ZEALAND,  "COK", 184, "ISO 3166-2:CK", ".ck")
            case CountryCode.CR: return createCountry(CountryCode.CR, Sovereignty.UN_MEMBER_STATE,  "CRI", 188, "ISO 3166-2:CR", ".cr")
            case CountryCode.CI: return createCountry(CountryCode.CI, Sovereignty.UN_MEMBER_STATE,  "CIV", 384, "ISO 3166-2:CI", ".ci")
            case CountryCode.HR: return createCountry(CountryCode.HR, Sovereignty.UN_MEMBER_STATE,  "HRV", 191, "ISO 3166-2:HR", ".hr")
            case CountryCode.CU: return createCountry(CountryCode.CU, Sovereignty.UN_MEMBER_STATE,  "CUB", 192, "ISO 3166-2:CU", ".cu")
            case CountryCode.CW: return createCountry(CountryCode.CW, Sovereignty.NETHERLANDS,  "CUW", 531, "ISO 3166-2:CW", ".cw")
            case CountryCode.CY: return createCountry(CountryCode.CY, Sovereignty.UN_MEMBER_STATE,  "CYP", 196, "ISO 3166-2:CY", ".cy")
            case CountryCode.CZ: return createCountry(CountryCode.CZ, Sovereignty.UN_MEMBER_STATE,  "CZE", 203, "ISO 3166-2:CZ", ".cz")
            case CountryCode.DK: return createCountry(CountryCode.DK, Sovereignty.UN_MEMBER_STATE,  "DNK", 208, "ISO 3166-2:DK", ".dk")
            case CountryCode.DJ: return createCountry(CountryCode.DJ, Sovereignty.UN_MEMBER_STATE,  "DJI", 262, "ISO 3166-2:DJ", ".dj")
            case CountryCode.DM: return createCountry(CountryCode.DM, Sovereignty.UN_MEMBER_STATE,  "DMA", 212, "ISO 3166-2:DM", ".dm")
            case CountryCode.DO: return createCountry(CountryCode.DO, Sovereignty.UN_MEMBER_STATE,  "DOM", 214, "ISO 3166-2:DO", ".do")
            case CountryCode.EC: return createCountry(CountryCode.EC, Sovereignty.UN_MEMBER_STATE,  "ECU", 218, "ISO 3166-2:EC", ".ec")
            case CountryCode.EG: return createCountry(CountryCode.EG, Sovereignty.UN_MEMBER_STATE,  "EGY", 818, "ISO 3166-2:EG", ".eg")
            case CountryCode.SV: return createCountry(CountryCode.SV, Sovereignty.UN_MEMBER_STATE,  "SLV", 222, "ISO 3166-2:SV", ".sv")
            case CountryCode.GQ: return createCountry(CountryCode.GQ, Sovereignty.UN_MEMBER_STATE,  "GNQ", 226, "ISO 3166-2:GQ", ".gq")
            case CountryCode.ER: return createCountry(CountryCode.ER, Sovereignty.UN_MEMBER_STATE,  "ERI", 232, "ISO 3166-2:ER", ".er")
            case CountryCode.EE: return createCountry(CountryCode.EE, Sovereignty.UN_MEMBER_STATE,  "EST", 233, "ISO 3166-2:EE", ".ee")
            case CountryCode.SZ: return createCountry(CountryCode.SZ, Sovereignty.UN_MEMBER_STATE,  "SWZ", 748, "ISO 3166-2:SZ", ".sz")
            case CountryCode.ET: return createCountry(CountryCode.ET, Sovereignty.UN_MEMBER_STATE,  "ETH", 231, "ISO 3166-2:ET", ".et")
            case CountryCode.FK: return createCountry(CountryCode.FK, Sovereignty.UNITED_KINGDOM,  "FLK", 238, "ISO 3166-2:FK", ".fk")
            case CountryCode.FO: return createCountry(CountryCode.FO, Sovereignty.DENMARK,  "FRO", 234, "ISO 3166-2:FO", ".fo")
            case CountryCode.FJ: return createCountry(CountryCode.FJ, Sovereignty.UN_MEMBER_STATE,  "FJI", 242, "ISO 3166-2:FJ", ".fj")
            case CountryCode.FI: return createCountry(CountryCode.FI, Sovereignty.UN_MEMBER_STATE,  "FIN", 246, "ISO 3166-2:FI", ".fi")
            case CountryCode.FR: return createCountry(CountryCode.FR, Sovereignty.UN_MEMBER_STATE,  "FRA", 250, "ISO 3166-2:FR", ".fr")
            case CountryCode.GF: return createCountry(CountryCode.GF, Sovereignty.FRANCE,  "GUF", 254, "ISO 3166-2:GF", ".gf")
            case CountryCode.PF: return createCountry(CountryCode.PF, Sovereignty.FRANCE,  "PYF", 258, "ISO 3166-2:PF", ".pf")
            case CountryCode.TF: return createCountry(CountryCode.TF, Sovereignty.FRANCE,  "ATF", 260, "ISO 3166-2:TF", ".tf")
            case CountryCode.GA: return createCountry(CountryCode.GA, Sovereignty.UN_MEMBER_STATE,  "GAB", 266, "ISO 3166-2:GA", ".ga")
            case CountryCode.GM: return createCountry(CountryCode.GM, Sovereignty.UN_MEMBER_STATE,  "GMB", 270, "ISO 3166-2:GM", ".gm")
            case CountryCode.GE: return createCountry(CountryCode.GE, Sovereignty.UN_MEMBER_STATE,  "GEO", 268, "ISO 3166-2:GE", ".ge")
            case CountryCode.DE: return createCountry(CountryCode.DE, Sovereignty.UN_MEMBER_STATE,  "DEU", 276, "ISO 3166-2:DE", ".de")
            case CountryCode.GH: return createCountry(CountryCode.GH, Sovereignty.UN_MEMBER_STATE,  "GHA", 288, "ISO 3166-2:GH", ".gh")
            case CountryCode.GI: return createCountry(CountryCode.GI, Sovereignty.UNITED_KINGDOM,  "GIB", 292, "ISO 3166-2:GI", ".gi")
            case CountryCode.GR: return createCountry(CountryCode.GR, Sovereignty.UN_MEMBER_STATE,  "GRC", 300, "ISO 3166-2:GR", ".gr")
            case CountryCode.GL: return createCountry(CountryCode.GL, Sovereignty.DENMARK,  "GRL", 304, "ISO 3166-2:GL", ".gl")
            case CountryCode.GD: return createCountry(CountryCode.GD, Sovereignty.UN_MEMBER_STATE,  "GRD", 308, "ISO 3166-2:GD", ".gd")
            case CountryCode.GP: return createCountry(CountryCode.GP, Sovereignty.FRANCE,  "GLP", 312, "ISO 3166-2:GP", ".gp")
            case CountryCode.GU: return createCountry(CountryCode.GU, Sovereignty.UNITED_STATES,  "GUM", 316, "ISO 3166-2:GU", ".gu")
            case CountryCode.GT: return createCountry(CountryCode.GT, Sovereignty.UN_MEMBER_STATE,  "GTM", 320, "ISO 3166-2:GT", ".gt")
            case CountryCode.GG: return createCountry(CountryCode.GG, Sovereignty.BRITISH_CROWN,  "GGY", 831, "ISO 3166-2:GG", ".gg")
            case CountryCode.GN: return createCountry(CountryCode.GN, Sovereignty.UN_MEMBER_STATE,  "GIN", 324, "ISO 3166-2:GN", ".gn")
            case CountryCode.GW: return createCountry(CountryCode.GW, Sovereignty.UN_MEMBER_STATE,  "GNB", 624, "ISO 3166-2:GW", ".gw")
            case CountryCode.GY: return createCountry(CountryCode.GY, Sovereignty.UN_MEMBER_STATE,  "GUY", 328, "ISO 3166-2:GY", ".gy")
            case CountryCode.HT: return createCountry(CountryCode.HT, Sovereignty.UN_MEMBER_STATE,  "HTI", 332, "ISO 3166-2:HT", ".ht")
            case CountryCode.HM: return createCountry(CountryCode.HM, Sovereignty.AUSTRALIA,  "HMD", 334, "ISO 3166-2:HM", ".hm")
            case CountryCode.VA: return createCountry(CountryCode.VA, Sovereignty.UN_OBSERVER,  "VAT", 336, "ISO 3166-2:VA", ".va")
            case CountryCode.HN: return createCountry(CountryCode.HN, Sovereignty.UN_MEMBER_STATE,  "HND", 340, "ISO 3166-2:HN", ".hn")
            case CountryCode.HK: return createCountry(CountryCode.HK, Sovereignty.CHINA,  "HKG", 344, "ISO 3166-2:HK", ".hk")
            case CountryCode.HU: return createCountry(CountryCode.HU, Sovereignty.UN_MEMBER_STATE,  "HUN", 348, "ISO 3166-2:HU", ".hu")
            case CountryCode.IS: return createCountry(CountryCode.IS, Sovereignty.UN_MEMBER_STATE,  "ISL", 352, "ISO 3166-2:IS", ".is")
            case CountryCode.IN: return createCountry(CountryCode.IN, Sovereignty.UN_MEMBER_STATE,  "IND", 356, "ISO 3166-2:IN", ".in")
            case CountryCode.ID: return createCountry(CountryCode.ID, Sovereignty.UN_MEMBER_STATE,  "IDN", 360, "ISO 3166-2:ID", ".id")
            case CountryCode.IR: return createCountry(CountryCode.IR, Sovereignty.UN_MEMBER_STATE,  "IRN", 364, "ISO 3166-2:IR", ".ir")
            case CountryCode.IQ: return createCountry(CountryCode.IQ, Sovereignty.UN_MEMBER_STATE,  "IRQ", 368, "ISO 3166-2:IQ", ".iq")
            case CountryCode.IE: return createCountry(CountryCode.IE, Sovereignty.UN_MEMBER_STATE,  "IRL", 372, "ISO 3166-2:IE", ".ie")
            case CountryCode.IM: return createCountry(CountryCode.IM, Sovereignty.BRITISH_CROWN,  "IMN", 833, "ISO 3166-2:IM", ".im")
            case CountryCode.IL: return createCountry(CountryCode.IL, Sovereignty.UN_MEMBER_STATE,  "ISR", 376, "ISO 3166-2:IL", ".il")
            case CountryCode.IT: return createCountry(CountryCode.IT, Sovereignty.UN_MEMBER_STATE,  "ITA", 380, "ISO 3166-2:IT", ".it")
            case CountryCode.JM: return createCountry(CountryCode.JM, Sovereignty.UN_MEMBER_STATE,  "JAM", 388, "ISO 3166-2:JM", ".jm")
            case CountryCode.JP: return createCountry(CountryCode.JP, Sovereignty.UN_MEMBER_STATE,  "JPN", 392, "ISO 3166-2:JP", ".jp")
            case CountryCode.JE: return createCountry(CountryCode.JE, Sovereignty.BRITISH_CROWN,  "JEY", 832, "ISO 3166-2:JE", ".je")
            case CountryCode.JO: return createCountry(CountryCode.JO, Sovereignty.UN_MEMBER_STATE,  "JOR", 400, "ISO 3166-2:JO", ".jo")
            case CountryCode.KZ: return createCountry(CountryCode.KZ, Sovereignty.UN_MEMBER_STATE,  "KAZ", 398, "ISO 3166-2:KZ", ".kz")
            case CountryCode.KE: return createCountry(CountryCode.KE, Sovereignty.UN_MEMBER_STATE,  "KEN", 404, "ISO 3166-2:KE", ".ke")
            case CountryCode.KI: return createCountry(CountryCode.KI, Sovereignty.UN_MEMBER_STATE,  "KIR", 296, "ISO 3166-2:KI", ".ki")
            case CountryCode.KP: return createCountry(CountryCode.KP, Sovereignty.UN_MEMBER_STATE,  "PRK", 408, "ISO 3166-2:KP", ".kp")
            case CountryCode.KR: return createCountry(CountryCode.KR, Sovereignty.UN_MEMBER_STATE,  "KOR", 410, "ISO 3166-2:KR", ".kr")
            case CountryCode.KW: return createCountry(CountryCode.KW, Sovereignty.UN_MEMBER_STATE,  "KWT", 414, "ISO 3166-2:KW", ".kw")
            case CountryCode.KG: return createCountry(CountryCode.KG, Sovereignty.UN_MEMBER_STATE,  "KGZ", 417, "ISO 3166-2:KG", ".kg")
            case CountryCode.LA: return createCountry(CountryCode.LA, Sovereignty.UN_MEMBER_STATE,  "LAO", 418, "ISO 3166-2:LA", ".la")
            case CountryCode.LV: return createCountry(CountryCode.LV, Sovereignty.UN_MEMBER_STATE,  "LVA", 428, "ISO 3166-2:LV", ".lv")
            case CountryCode.LB: return createCountry(CountryCode.LB, Sovereignty.UN_MEMBER_STATE,  "LBN", 422, "ISO 3166-2:LB", ".lb")
            case CountryCode.LS: return createCountry(CountryCode.LS, Sovereignty.UN_MEMBER_STATE,  "LSO", 426, "ISO 3166-2:LS", ".ls")
            case CountryCode.LR: return createCountry(CountryCode.LR, Sovereignty.UN_MEMBER_STATE,  "LBR", 430, "ISO 3166-2:LR", ".lr")
            case CountryCode.LY: return createCountry(CountryCode.LY, Sovereignty.UN_MEMBER_STATE,  "LBY", 434, "ISO 3166-2:LY", ".ly")
            case CountryCode.LI: return createCountry(CountryCode.LI, Sovereignty.UN_MEMBER_STATE,  "LIE", 438, "ISO 3166-2:LI", ".li")
            case CountryCode.LT: return createCountry(CountryCode.LT, Sovereignty.UN_MEMBER_STATE,  "LTU", 440, "ISO 3166-2:LT", ".lt")
            case CountryCode.LU: return createCountry(CountryCode.LU, Sovereignty.UN_MEMBER_STATE,  "LUX", 442, "ISO 3166-2:LU", ".lu")
            case CountryCode.MO: return createCountry(CountryCode.MO, Sovereignty.CHINA,  "MAC", 446, "ISO 3166-2:MO", ".mo")
            case CountryCode.MK: return createCountry(CountryCode.MK, Sovereignty.UN_MEMBER_STATE,  "MKD", 807, "ISO 3166-2:MK", ".mk")
            case CountryCode.MG: return createCountry(CountryCode.MG, Sovereignty.UN_MEMBER_STATE,  "MDG", 450, "ISO 3166-2:MG", ".mg")
            case CountryCode.MW: return createCountry(CountryCode.MW, Sovereignty.UN_MEMBER_STATE,  "MWI", 454, "ISO 3166-2:MW", ".mw")
            case CountryCode.MY: return createCountry(CountryCode.MY, Sovereignty.UN_MEMBER_STATE,  "MYS", 458, "ISO 3166-2:MY", ".my")
            case CountryCode.MV: return createCountry(CountryCode.MV, Sovereignty.UN_MEMBER_STATE,  "MDV", 462, "ISO 3166-2:MV", ".mv")
            case CountryCode.ML: return createCountry(CountryCode.ML, Sovereignty.UN_MEMBER_STATE,  "MLI", 466, "ISO 3166-2:ML", ".ml")
            case CountryCode.MT: return createCountry(CountryCode.MT, Sovereignty.UN_MEMBER_STATE,  "MLT", 470, "ISO 3166-2:MT", ".mt")
            case CountryCode.MH: return createCountry(CountryCode.MH, Sovereignty.UN_MEMBER_STATE,  "MHL", 584, "ISO 3166-2:MH", ".mh")
            case CountryCode.MQ: return createCountry(CountryCode.MQ, Sovereignty.FRANCE,  "MTQ", 474, "ISO 3166-2:MQ", ".mq")
            case CountryCode.MR: return createCountry(CountryCode.MR, Sovereignty.UN_MEMBER_STATE,  "MRT", 478, "ISO 3166-2:MR", ".mr")
            case CountryCode.MU: return createCountry(CountryCode.MU, Sovereignty.UN_MEMBER_STATE,  "MUS", 480, "ISO 3166-2:MU", ".mu")
            case CountryCode.YT: return createCountry(CountryCode.YT, Sovereignty.FRANCE,  "MYT", 175, "ISO 3166-2:YT", ".yt")
            case CountryCode.MX: return createCountry(CountryCode.MX, Sovereignty.UN_MEMBER_STATE,  "MEX", 484, "ISO 3166-2:MX", ".mx")
            case CountryCode.FM: return createCountry(CountryCode.FM, Sovereignty.UN_MEMBER_STATE,  "FSM", 583, "ISO 3166-2:FM", ".fm")
            case CountryCode.MD: return createCountry(CountryCode.MD, Sovereignty.UN_MEMBER_STATE,  "MDA", 498, "ISO 3166-2:MD", ".md")
            case CountryCode.MC: return createCountry(CountryCode.MC, Sovereignty.UN_MEMBER_STATE,  "MCO", 492, "ISO 3166-2:MC", ".mc")
            case CountryCode.MN: return createCountry(CountryCode.MN, Sovereignty.UN_MEMBER_STATE,  "MNG", 496, "ISO 3166-2:MN", ".mn")
            case CountryCode.ME: return createCountry(CountryCode.ME, Sovereignty.UN_MEMBER_STATE,  "MNE", 499, "ISO 3166-2:ME", ".me")
            case CountryCode.MS: return createCountry(CountryCode.MS, Sovereignty.UNITED_KINGDOM,  "MSR", 500, "ISO 3166-2:MS", ".ms")
            case CountryCode.MA: return createCountry(CountryCode.MA, Sovereignty.UN_MEMBER_STATE,  "MAR", 504, "ISO 3166-2:MA", ".ma")
            case CountryCode.MZ: return createCountry(CountryCode.MZ, Sovereignty.UN_MEMBER_STATE,  "MOZ", 508, "ISO 3166-2:MZ", ".mz")
            case CountryCode.MM: return createCountry(CountryCode.MM, Sovereignty.UN_MEMBER_STATE,  "MMR", 104, "ISO 3166-2:MM", ".mm")
            case CountryCode.NA: return createCountry(CountryCode.NA, Sovereignty.UN_MEMBER_STATE,  "NAM", 516, "ISO 3166-2:NA", ".na")
            case CountryCode.NR: return createCountry(CountryCode.NR, Sovereignty.UN_MEMBER_STATE,  "NRU", 520, "ISO 3166-2:NR", ".nr")
            case CountryCode.NP: return createCountry(CountryCode.NP, Sovereignty.UN_MEMBER_STATE,  "NPL", 524, "ISO 3166-2:NP", ".np")
            case CountryCode.NL: return createCountry(CountryCode.NL, Sovereignty.UN_MEMBER_STATE,  "NLD", 528, "ISO 3166-2:NL", ".nl")
            case CountryCode.NC: return createCountry(CountryCode.NC, Sovereignty.FRANCE,  "NCL", 540, "ISO 3166-2:NC", ".nc")
            case CountryCode.NZ: return createCountry(CountryCode.NZ, Sovereignty.UN_MEMBER_STATE,  "NZL", 554, "ISO 3166-2:NZ", ".nz")
            case CountryCode.NI: return createCountry(CountryCode.NI, Sovereignty.UN_MEMBER_STATE,  "NIC", 558, "ISO 3166-2:NI", ".ni")
            case CountryCode.NE: return createCountry(CountryCode.NE, Sovereignty.UN_MEMBER_STATE,  "NER", 562, "ISO 3166-2:NE", ".ne")
            case CountryCode.NG: return createCountry(CountryCode.NG, Sovereignty.UN_MEMBER_STATE,  "NGA", 566, "ISO 3166-2:NG", ".ng")
            case CountryCode.NU: return createCountry(CountryCode.NU, Sovereignty.NEW_ZEALAND,  "NIU", 570, "ISO 3166-2:NU", ".nu")
            case CountryCode.NF: return createCountry(CountryCode.NF, Sovereignty.AUSTRALIA,  "NFK", 574, "ISO 3166-2:NF", ".nf")
            case CountryCode.MP: return createCountry(CountryCode.MP, Sovereignty.UNITED_STATES,  "MNP", 580, "ISO 3166-2:MP", ".mp")
            case CountryCode.NO: return createCountry(CountryCode.NO, Sovereignty.UN_MEMBER_STATE,  "NOR", 578, "ISO 3166-2:NO", ".no")
            case CountryCode.OM: return createCountry(CountryCode.OM, Sovereignty.UN_MEMBER_STATE,  "OMN", 512, "ISO 3166-2:OM", ".om")
            case CountryCode.PK: return createCountry(CountryCode.PK, Sovereignty.UN_MEMBER_STATE,  "PAK", 586, "ISO 3166-2:PK", ".pk")
            case CountryCode.PW: return createCountry(CountryCode.PW, Sovereignty.UN_MEMBER_STATE,  "PLW", 585, "ISO 3166-2:PW", ".pw")
            case CountryCode.PS: return createCountry(CountryCode.PS, Sovereignty.UN_OBSERVER,  "PSE", 275, "ISO 3166-2:PS", ".ps")
            case CountryCode.PA: return createCountry(CountryCode.PA, Sovereignty.UN_MEMBER_STATE,  "PAN", 591, "ISO 3166-2:PA", ".pa")
            case CountryCode.PG: return createCountry(CountryCode.PG, Sovereignty.UN_MEMBER_STATE,  "PNG", 598, "ISO 3166-2:PG", ".pg")
            case CountryCode.PY: return createCountry(CountryCode.PY, Sovereignty.UN_MEMBER_STATE,  "PRY", 600, "ISO 3166-2:PY", ".py")
            case CountryCode.PE: return createCountry(CountryCode.PE, Sovereignty.UN_MEMBER_STATE,  "PER", 604, "ISO 3166-2:PE", ".pe")
            case CountryCode.PH: return createCountry(CountryCode.PH, Sovereignty.UN_MEMBER_STATE,  "PHL", 608, "ISO 3166-2:PH", ".ph")
            case CountryCode.PN: return createCountry(CountryCode.PN, Sovereignty.UNITED_KINGDOM,  "PCN", 612, "ISO 3166-2:PN", ".pn")
            case CountryCode.PL: return createCountry(CountryCode.PL, Sovereignty.UN_MEMBER_STATE,  "POL", 616, "ISO 3166-2:PL", ".pl")
            case CountryCode.PT: return createCountry(CountryCode.PT, Sovereignty.UN_MEMBER_STATE,  "PRT", 620, "ISO 3166-2:PT", ".pt")
            case CountryCode.PR: return createCountry(CountryCode.PR, Sovereignty.UNITED_STATES,  "PRI", 630, "ISO 3166-2:PR", ".pr")
            case CountryCode.QA: return createCountry(CountryCode.QA, Sovereignty.UN_MEMBER_STATE,  "QAT", 634, "ISO 3166-2:QA", ".qa")
            case CountryCode.RE: return createCountry(CountryCode.RE, Sovereignty.FRANCE,  "REU", 638, "ISO 3166-2:RE", ".re")
            case CountryCode.RO: return createCountry(CountryCode.RO, Sovereignty.UN_MEMBER_STATE,  "ROU", 642, "ISO 3166-2:RO", ".ro")
            case CountryCode.RU: return createCountry(CountryCode.RU, Sovereignty.UN_MEMBER_STATE,  "RUS", 643, "ISO 3166-2:RU", ".ru")
            case CountryCode.RW: return createCountry(CountryCode.RW, Sovereignty.UN_MEMBER_STATE,  "RWA", 646, "ISO 3166-2:RW", ".rw")
            case CountryCode.BL: return createCountry(CountryCode.BL, Sovereignty.FRANCE,  "BLM", 652, "ISO 3166-2:BL", ".bl")
            case CountryCode.SH: return createCountry(CountryCode.SH, Sovereignty.UNITED_KINGDOM,  "SHN", 654, "ISO 3166-2:SH", ".sh")
            case CountryCode.KN: return createCountry(CountryCode.KN, Sovereignty.UN_MEMBER_STATE,  "KNA", 659, "ISO 3166-2:KN", ".kn")
            case CountryCode.LC: return createCountry(CountryCode.LC, Sovereignty.UN_MEMBER_STATE,  "LCA", 662, "ISO 3166-2:LC", ".lc")
            case CountryCode.MF: return createCountry(CountryCode.MF, Sovereignty.FRANCE,  "MAF", 663, "ISO 3166-2:MF", ".mf")
            case CountryCode.PM: return createCountry(CountryCode.PM, Sovereignty.FRANCE,  "SPM", 666, "ISO 3166-2:PM", ".pm")
            case CountryCode.VC: return createCountry(CountryCode.VC, Sovereignty.UN_MEMBER_STATE,  "VCT", 670, "ISO 3166-2:VC", ".vc")
            case CountryCode.WS: return createCountry(CountryCode.WS, Sovereignty.UN_MEMBER_STATE,  "WSM", 882, "ISO 3166-2:WS", ".ws")
            case CountryCode.SM: return createCountry(CountryCode.SM, Sovereignty.UN_MEMBER_STATE,  "SMR", 674, "ISO 3166-2:SM", ".sm")
            case CountryCode.ST: return createCountry(CountryCode.ST, Sovereignty.UN_MEMBER_STATE,  "STP", 678, "ISO 3166-2:ST", ".st")
            case CountryCode.SA: return createCountry(CountryCode.SA, Sovereignty.UN_MEMBER_STATE,  "SAU", 682, "ISO 3166-2:SA", ".sa")
            case CountryCode.SN: return createCountry(CountryCode.SN, Sovereignty.UN_MEMBER_STATE,  "SEN", 686, "ISO 3166-2:SN", ".sn")
            case CountryCode.RS: return createCountry(CountryCode.RS, Sovereignty.UN_MEMBER_STATE,  "SRB", 688, "ISO 3166-2:RS", ".rs")
            case CountryCode.SC: return createCountry(CountryCode.SC, Sovereignty.UN_MEMBER_STATE,  "SYC", 690, "ISO 3166-2:SC", ".sc")
            case CountryCode.SL: return createCountry(CountryCode.SL, Sovereignty.UN_MEMBER_STATE,  "SLE", 694, "ISO 3166-2:SL", ".sl")
            case CountryCode.SG: return createCountry(CountryCode.SG, Sovereignty.UN_MEMBER_STATE,  "SGP", 702, "ISO 3166-2:SG", ".sg")
            case CountryCode.SX: return createCountry(CountryCode.SX, Sovereignty.NETHERLANDS,  "SXM", 534, "ISO 3166-2:SX", ".sx")
            case CountryCode.SK: return createCountry(CountryCode.SK, Sovereignty.UN_MEMBER_STATE,  "SVK", 703, "ISO 3166-2:SK", ".sk")
            case CountryCode.SI: return createCountry(CountryCode.SI, Sovereignty.UN_MEMBER_STATE,  "SVN", 705, "ISO 3166-2:SI", ".si")
            case CountryCode.SB: return createCountry(CountryCode.SB, Sovereignty.UN_MEMBER_STATE,  "SLB", 90, "ISO 3166-2:SB", ".sb")
            case CountryCode.SO: return createCountry(CountryCode.SO, Sovereignty.UN_MEMBER_STATE,  "SOM", 706, "ISO 3166-2:SO", ".so")
            case CountryCode.ZA: return createCountry(CountryCode.ZA, Sovereignty.UN_MEMBER_STATE,  "ZAF", 710, "ISO 3166-2:ZA", ".za")
            case CountryCode.GS: return createCountry(CountryCode.GS, Sovereignty.UNITED_KINGDOM,  "SGS", 239, "ISO 3166-2:GS", ".gs")
            case CountryCode.SS: return createCountry(CountryCode.SS, Sovereignty.UN_MEMBER_STATE,  "SSD", 728, "ISO 3166-2:SS", ".ss")
            case CountryCode.ES: return createCountry(CountryCode.ES, Sovereignty.UN_MEMBER_STATE,  "ESP", 724, "ISO 3166-2:ES", ".es")
            case CountryCode.LK: return createCountry(CountryCode.LK, Sovereignty.UN_MEMBER_STATE,  "LKA", 144, "ISO 3166-2:LK", ".lk")
            case CountryCode.SD: return createCountry(CountryCode.SD, Sovereignty.UN_MEMBER_STATE,  "SDN", 729, "ISO 3166-2:SD", ".sd")
            case CountryCode.SR: return createCountry(CountryCode.SR, Sovereignty.UN_MEMBER_STATE,  "SUR", 740, "ISO 3166-2:SR", ".sr")
            case CountryCode.SJ: return createCountry(CountryCode.SJ, Sovereignty.NORWAY,  "SJM", 744, "ISO 3166-2:SJ", "")
            case CountryCode.SE: return createCountry(CountryCode.SE, Sovereignty.UN_MEMBER_STATE,  "SWE", 752, "ISO 3166-2:SE", ".se")
            case CountryCode.CH: return createCountry(CountryCode.CH, Sovereignty.UN_MEMBER_STATE,  "CHE", 756, "ISO 3166-2:CH", ".ch")
            case CountryCode.SY: return createCountry(CountryCode.SY, Sovereignty.UN_MEMBER_STATE,  "SYR", 760, "ISO 3166-2:SY", ".sy")
            case CountryCode.TW: return createCountry(CountryCode.TW, Sovereignty.DISPUTED_Z,  "TWN", 158, "ISO 3166-2:TW", ".tw")
            case CountryCode.TJ: return createCountry(CountryCode.TJ, Sovereignty.UN_MEMBER_STATE,  "TJK", 762, "ISO 3166-2:TJ", ".tj")
            case CountryCode.TZ: return createCountry(CountryCode.TZ, Sovereignty.UN_MEMBER_STATE,  "TZA", 834, "ISO 3166-2:TZ", ".tz")
            case CountryCode.TH: return createCountry(CountryCode.TH, Sovereignty.UN_MEMBER_STATE,  "THA", 764, "ISO 3166-2:TH", ".th")
            case CountryCode.TL: return createCountry(CountryCode.TL, Sovereignty.UN_MEMBER_STATE,  "TLS", 626, "ISO 3166-2:TL", ".tl")
            case CountryCode.TG: return createCountry(CountryCode.TG, Sovereignty.UN_MEMBER_STATE,  "TGO", 768, "ISO 3166-2:TG", ".tg")
            case CountryCode.TK: return createCountry(CountryCode.TK, Sovereignty.NEW_ZEALAND,  "TKL", 772, "ISO 3166-2:TK", ".tk")
            case CountryCode.TO: return createCountry(CountryCode.TO, Sovereignty.UN_MEMBER_STATE,  "TON", 776, "ISO 3166-2:TO", ".to")
            case CountryCode.TT: return createCountry(CountryCode.TT, Sovereignty.UN_MEMBER_STATE,  "TTO", 780, "ISO 3166-2:TT", ".tt")
            case CountryCode.TN: return createCountry(CountryCode.TN, Sovereignty.UN_MEMBER_STATE,  "TUN", 788, "ISO 3166-2:TN", ".tn")
            case CountryCode.TR: return createCountry(CountryCode.TR, Sovereignty.UN_MEMBER_STATE,  "TUR", 792, "ISO 3166-2:TR", ".tr")
            case CountryCode.TM: return createCountry(CountryCode.TM, Sovereignty.UN_MEMBER_STATE,  "TKM", 795, "ISO 3166-2:TM", ".tm")
            case CountryCode.TC: return createCountry(CountryCode.TC, Sovereignty.UNITED_KINGDOM,  "TCA", 796, "ISO 3166-2:TC", ".tc")
            case CountryCode.TV: return createCountry(CountryCode.TV, Sovereignty.UN_MEMBER_STATE,  "TUV", 798, "ISO 3166-2:TV", ".tv")
            case CountryCode.UG: return createCountry(CountryCode.UG, Sovereignty.UN_MEMBER_STATE,  "UGA", 800, "ISO 3166-2:UG", ".ug")
            case CountryCode.UA: return createCountry(CountryCode.UA, Sovereignty.UN_MEMBER_STATE,  "UKR", 804, "ISO 3166-2:UA", ".ua")
            case CountryCode.AE: return createCountry(CountryCode.AE, Sovereignty.UN_MEMBER_STATE,  "ARE", 784, "ISO 3166-2:AE", ".ae")
            case CountryCode.GB: return createCountry(CountryCode.GB, Sovereignty.UN_MEMBER_STATE,  "GBR", 826, "ISO 3166-2:GB", ".gb .uk")
            case CountryCode.UM: return createCountry(CountryCode.UM, Sovereignty.UNITED_STATES,  "UMI", 581, "ISO 3166-2:UM", "")
            case CountryCode.US: return createCountry(CountryCode.US, Sovereignty.UN_MEMBER_STATE,  "USA", 840, "ISO 3166-2:US", ".us")
            case CountryCode.UY: return createCountry(CountryCode.UY, Sovereignty.UN_MEMBER_STATE,  "URY", 858, "ISO 3166-2:UY", ".uy")
            case CountryCode.UZ: return createCountry(CountryCode.UZ, Sovereignty.UN_MEMBER_STATE,  "UZB", 860, "ISO 3166-2:UZ", ".uz")
            case CountryCode.VU: return createCountry(CountryCode.VU, Sovereignty.UN_MEMBER_STATE,  "VUT", 548, "ISO 3166-2:VU", ".vu")
            case CountryCode.VE: return createCountry(CountryCode.VE, Sovereignty.UN_MEMBER_STATE,  "VEN", 862, "ISO 3166-2:VE", ".ve")
            case CountryCode.VN: return createCountry(CountryCode.VN, Sovereignty.UN_MEMBER_STATE,  "VNM", 704, "ISO 3166-2:VN", ".vn")
            case CountryCode.VG: return createCountry(CountryCode.VG, Sovereignty.UNITED_KINGDOM,  "VGB", 92, "ISO 3166-2:VG", ".vg")
            case CountryCode.VI: return createCountry(CountryCode.VI, Sovereignty.UNITED_STATES,  "VIR", 850, "ISO 3166-2:VI", ".vi")
            case CountryCode.WF: return createCountry(CountryCode.WF, Sovereignty.FRANCE,  "WLF", 876, "ISO 3166-2:WF", ".wf")
            case CountryCode.EH: return createCountry(CountryCode.EH, Sovereignty.DISPUTED_AI,  "ESH", 732, "ISO 3166-2:EH", "")
            case CountryCode.YE: return createCountry(CountryCode.YE, Sovereignty.UN_MEMBER_STATE,  "YEM", 887, "ISO 3166-2:YE", ".ye")
            case CountryCode.ZM: return createCountry(CountryCode.ZM, Sovereignty.UN_MEMBER_STATE,  "ZMB", 894, "ISO 3166-2:ZM", ".zm")
            case CountryCode.ZW: return createCountry(CountryCode.ZW, Sovereignty.UN_MEMBER_STATE,  "ZWE", 716, "ISO 3166-2:ZW", ".zw")
        }
        throw new TypeError(`Unknown country code: ${code}`)
    }

    public static createCountryAutoCompleteValues (
        list: readonly CountryCode[],
        t: TranslationFunction
    ) : CountryAutoCompleteMapping {
        return map(
            list,
            (item : CountryCode) =>
                [
                    item,
                    [ t(getCountryNameTranslationKey(item)) ]
                ]
        );
    }

    public static parseCountry (
        name : string,
        t    : TranslationFunction
    ) : Country | undefined {
        name = toLower(trim(name)).replace(/ +/g, " ");
        const allCountries = this.getCountryList();
        return find(
            allCountries,
            (item: Country) : boolean => {

                const iso2 = item.iso2;
                if (toLower(iso2) === name) return true;

                const iso3 = item.iso3;
                if (toLower(iso3) === name) return true;

                if (isCountryCode(iso2) && toLower(trim(t(getCountryNameTranslationKey(iso2)))).replace(/ +/g, " ") === name) {
                    // console.log(`key =`, getCountryNameTranslationKey(iso2));
                    return true;
                }

                return false;
            }
        );
    }

}
