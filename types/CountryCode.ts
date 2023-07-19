// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { trim } from "../functions/trim";
import { explainEnum } from "./Enum";

export enum CountryCode {
    AF = "AF",
    AX = "AX",
    AL = "AL",
    DZ = "DZ",
    AS = "AS",
    AD = "AD",
    AO = "AO",
    AI = "AI",
    AQ = "AQ",
    AG = "AG",
    AR = "AR",
    AM = "AM",
    AW = "AW",
    AU = "AU",
    AT = "AT",
    AZ = "AZ",
    BS = "BS",
    BH = "BH",
    BD = "BD",
    BB = "BB",
    BY = "BY",
    BE = "BE",
    BZ = "BZ",
    BJ = "BJ",
    BM = "BM",
    BT = "BT",
    BO = "BO",
    BQ = "BQ",
    BA = "BA",
    BW = "BW",
    BV = "BV",
    BR = "BR",
    IO = "IO",
    BN = "BN",
    BG = "BG",
    BF = "BF",
    BI = "BI",
    CV = "CV",
    KH = "KH",
    CM = "CM",
    CA = "CA",
    KY = "KY",
    CF = "CF",
    TD = "TD",
    CL = "CL",
    CN = "CN",
    CX = "CX",
    CC = "CC",
    CO = "CO",
    KM = "KM",
    CD = "CD",
    CG = "CG",
    CK = "CK",
    CR = "CR",
    CI = "CI",
    HR = "HR",
    CU = "CU",
    CW = "CW",
    CY = "CY",
    CZ = "CZ",
    DK = "DK",
    DJ = "DJ",
    DM = "DM",
    DO = "DO",
    EC = "EC",
    EG = "EG",
    SV = "SV",
    GQ = "GQ",
    ER = "ER",
    EE = "EE",
    SZ = "SZ",
    ET = "ET",
    FK = "FK",
    FO = "FO",
    FJ = "FJ",
    FI = "FI",
    FR = "FR",
    GF = "GF",
    PF = "PF",
    TF = "TF",
    GA = "GA",
    GM = "GM",
    GE = "GE",
    DE = "DE",
    GH = "GH",
    GI = "GI",
    GR = "GR",
    GL = "GL",
    GD = "GD",
    GP = "GP",
    GU = "GU",
    GT = "GT",
    GG = "GG",
    GN = "GN",
    GW = "GW",
    GY = "GY",
    HT = "HT",
    HM = "HM",
    VA = "VA",
    HN = "HN",
    HK = "HK",
    HU = "HU",
    IS = "IS",
    IN = "IN",
    ID = "ID",
    IR = "IR",
    IQ = "IQ",
    IE = "IE",
    IM = "IM",
    IL = "IL",
    IT = "IT",
    JM = "JM",
    JP = "JP",
    JE = "JE",
    JO = "JO",
    KZ = "KZ",
    KE = "KE",
    KI = "KI",
    KP = "KP",
    KR = "KR",
    KW = "KW",
    KG = "KG",
    LA = "LA",
    LV = "LV",
    LB = "LB",
    LS = "LS",
    LR = "LR",
    LY = "LY",
    LI = "LI",
    LT = "LT",
    LU = "LU",
    MO = "MO",
    MK = "MK",
    MG = "MG",
    MW = "MW",
    MY = "MY",
    MV = "MV",
    ML = "ML",
    MT = "MT",
    MH = "MH",
    MQ = "MQ",
    MR = "MR",
    MU = "MU",
    YT = "YT",
    MX = "MX",
    FM = "FM",
    MD = "MD",
    MC = "MC",
    MN = "MN",
    ME = "ME",
    MS = "MS",
    MA = "MA",
    MZ = "MZ",
    MM = "MM",
    NA = "NA",
    NR = "NR",
    NP = "NP",
    NL = "NL",
    NC = "NC",
    NZ = "NZ",
    NI = "NI",
    NE = "NE",
    NG = "NG",
    NU = "NU",
    NF = "NF",
    MP = "MP",
    NO = "NO",
    OM = "OM",
    PK = "PK",
    PW = "PW",
    PS = "PS",
    PA = "PA",
    PG = "PG",
    PY = "PY",
    PE = "PE",
    PH = "PH",
    PN = "PN",
    PL = "PL",
    PT = "PT",
    PR = "PR",
    QA = "QA",
    RE = "RE",
    RO = "RO",
    RU = "RU",
    RW = "RW",
    BL = "BL",
    SH = "SH",
    KN = "KN",
    LC = "LC",
    MF = "MF",
    PM = "PM",
    VC = "VC",
    WS = "WS",
    SM = "SM",
    ST = "ST",
    SA = "SA",
    SN = "SN",
    RS = "RS",
    SC = "SC",
    SL = "SL",
    SG = "SG",
    SX = "SX",
    SK = "SK",
    SI = "SI",
    SB = "SB",
    SO = "SO",
    ZA = "ZA",
    GS = "GS",
    SS = "SS",
    ES = "ES",
    LK = "LK",
    SD = "SD",
    SR = "SR",
    SJ = "SJ",
    SE = "SE",
    CH = "CH",
    SY = "SY",
    TW = "TW",
    TJ = "TJ",
    TZ = "TZ",
    TH = "TH",
    TL = "TL",
    TG = "TG",
    TK = "TK",
    TO = "TO",
    TT = "TT",
    TN = "TN",
    TR = "TR",
    TM = "TM",
    TC = "TC",
    TV = "TV",
    UG = "UG",
    UA = "UA",
    AE = "AE",
    GB = "GB",
    UM = "UM",
    US = "US",
    UY = "UY",
    UZ = "UZ",
    VU = "VU",
    VE = "VE",
    VN = "VN",
    VG = "VG",
    VI = "VI",
    WF = "WF",
    EH = "EH",
    YE = "YE",
    ZM = "ZM",
    ZW = "ZW"
}

export function isCountryCode (value: any): value is CountryCode {
    switch (value) {
        case CountryCode.AF:
        case CountryCode.AX:
        case CountryCode.AL:
        case CountryCode.DZ:
        case CountryCode.AS:
        case CountryCode.AD:
        case CountryCode.AO:
        case CountryCode.AI:
        case CountryCode.AQ:
        case CountryCode.AG:
        case CountryCode.AR:
        case CountryCode.AM:
        case CountryCode.AW:
        case CountryCode.AU:
        case CountryCode.AT:
        case CountryCode.AZ:
        case CountryCode.BS:
        case CountryCode.BH:
        case CountryCode.BD:
        case CountryCode.BB:
        case CountryCode.BY:
        case CountryCode.BE:
        case CountryCode.BZ:
        case CountryCode.BJ:
        case CountryCode.BM:
        case CountryCode.BT:
        case CountryCode.BO:
        case CountryCode.BQ:
        case CountryCode.BA:
        case CountryCode.BW:
        case CountryCode.BV:
        case CountryCode.BR:
        case CountryCode.IO:
        case CountryCode.BN:
        case CountryCode.BG:
        case CountryCode.BF:
        case CountryCode.BI:
        case CountryCode.CV:
        case CountryCode.KH:
        case CountryCode.CM:
        case CountryCode.CA:
        case CountryCode.KY:
        case CountryCode.CF:
        case CountryCode.TD:
        case CountryCode.CL:
        case CountryCode.CN:
        case CountryCode.CX:
        case CountryCode.CC:
        case CountryCode.CO:
        case CountryCode.KM:
        case CountryCode.CD:
        case CountryCode.CG:
        case CountryCode.CK:
        case CountryCode.CR:
        case CountryCode.CI:
        case CountryCode.HR:
        case CountryCode.CU:
        case CountryCode.CW:
        case CountryCode.CY:
        case CountryCode.CZ:
        case CountryCode.DK:
        case CountryCode.DJ:
        case CountryCode.DM:
        case CountryCode.DO:
        case CountryCode.EC:
        case CountryCode.EG:
        case CountryCode.SV:
        case CountryCode.GQ:
        case CountryCode.ER:
        case CountryCode.EE:
        case CountryCode.SZ:
        case CountryCode.ET:
        case CountryCode.FK:
        case CountryCode.FO:
        case CountryCode.FJ:
        case CountryCode.FI:
        case CountryCode.FR:
        case CountryCode.GF:
        case CountryCode.PF:
        case CountryCode.TF:
        case CountryCode.GA:
        case CountryCode.GM:
        case CountryCode.GE:
        case CountryCode.DE:
        case CountryCode.GH:
        case CountryCode.GI:
        case CountryCode.GR:
        case CountryCode.GL:
        case CountryCode.GD:
        case CountryCode.GP:
        case CountryCode.GU:
        case CountryCode.GT:
        case CountryCode.GG:
        case CountryCode.GN:
        case CountryCode.GW:
        case CountryCode.GY:
        case CountryCode.HT:
        case CountryCode.HM:
        case CountryCode.VA:
        case CountryCode.HN:
        case CountryCode.HK:
        case CountryCode.HU:
        case CountryCode.IS:
        case CountryCode.IN:
        case CountryCode.ID:
        case CountryCode.IR:
        case CountryCode.IQ:
        case CountryCode.IE:
        case CountryCode.IM:
        case CountryCode.IL:
        case CountryCode.IT:
        case CountryCode.JM:
        case CountryCode.JP:
        case CountryCode.JE:
        case CountryCode.JO:
        case CountryCode.KZ:
        case CountryCode.KE:
        case CountryCode.KI:
        case CountryCode.KP:
        case CountryCode.KR:
        case CountryCode.KW:
        case CountryCode.KG:
        case CountryCode.LA:
        case CountryCode.LV:
        case CountryCode.LB:
        case CountryCode.LS:
        case CountryCode.LR:
        case CountryCode.LY:
        case CountryCode.LI:
        case CountryCode.LT:
        case CountryCode.LU:
        case CountryCode.MO:
        case CountryCode.MK:
        case CountryCode.MG:
        case CountryCode.MW:
        case CountryCode.MY:
        case CountryCode.MV:
        case CountryCode.ML:
        case CountryCode.MT:
        case CountryCode.MH:
        case CountryCode.MQ:
        case CountryCode.MR:
        case CountryCode.MU:
        case CountryCode.YT:
        case CountryCode.MX:
        case CountryCode.FM:
        case CountryCode.MD:
        case CountryCode.MC:
        case CountryCode.MN:
        case CountryCode.ME:
        case CountryCode.MS:
        case CountryCode.MA:
        case CountryCode.MZ:
        case CountryCode.MM:
        case CountryCode.NA:
        case CountryCode.NR:
        case CountryCode.NP:
        case CountryCode.NL:
        case CountryCode.NC:
        case CountryCode.NZ:
        case CountryCode.NI:
        case CountryCode.NE:
        case CountryCode.NG:
        case CountryCode.NU:
        case CountryCode.NF:
        case CountryCode.MP:
        case CountryCode.NO:
        case CountryCode.OM:
        case CountryCode.PK:
        case CountryCode.PW:
        case CountryCode.PS:
        case CountryCode.PA:
        case CountryCode.PG:
        case CountryCode.PY:
        case CountryCode.PE:
        case CountryCode.PH:
        case CountryCode.PN:
        case CountryCode.PL:
        case CountryCode.PT:
        case CountryCode.PR:
        case CountryCode.QA:
        case CountryCode.RE:
        case CountryCode.RO:
        case CountryCode.RU:
        case CountryCode.RW:
        case CountryCode.BL:
        case CountryCode.SH:
        case CountryCode.KN:
        case CountryCode.LC:
        case CountryCode.MF:
        case CountryCode.PM:
        case CountryCode.VC:
        case CountryCode.WS:
        case CountryCode.SM:
        case CountryCode.ST:
        case CountryCode.SA:
        case CountryCode.SN:
        case CountryCode.RS:
        case CountryCode.SC:
        case CountryCode.SL:
        case CountryCode.SG:
        case CountryCode.SX:
        case CountryCode.SK:
        case CountryCode.SI:
        case CountryCode.SB:
        case CountryCode.SO:
        case CountryCode.ZA:
        case CountryCode.GS:
        case CountryCode.SS:
        case CountryCode.ES:
        case CountryCode.LK:
        case CountryCode.SD:
        case CountryCode.SR:
        case CountryCode.SJ:
        case CountryCode.SE:
        case CountryCode.CH:
        case CountryCode.SY:
        case CountryCode.TW:
        case CountryCode.TJ:
        case CountryCode.TZ:
        case CountryCode.TH:
        case CountryCode.TL:
        case CountryCode.TG:
        case CountryCode.TK:
        case CountryCode.TO:
        case CountryCode.TT:
        case CountryCode.TN:
        case CountryCode.TR:
        case CountryCode.TM:
        case CountryCode.TC:
        case CountryCode.TV:
        case CountryCode.UG:
        case CountryCode.UA:
        case CountryCode.AE:
        case CountryCode.GB:
        case CountryCode.UM:
        case CountryCode.US:
        case CountryCode.UY:
        case CountryCode.UZ:
        case CountryCode.VU:
        case CountryCode.VE:
        case CountryCode.VN:
        case CountryCode.VG:
        case CountryCode.VI:
        case CountryCode.WF:
        case CountryCode.EH:
        case CountryCode.YE:
        case CountryCode.ZM:
        case CountryCode.ZW:
            return true;

        default:
            return false;

    }
}

export function parseCountryCode (value: any): CountryCode | undefined {
    switch (trim(`${value}`.toUpperCase())) {
        case CountryCode.AF:
            return CountryCode.AF;
        case CountryCode.AX:
            return CountryCode.AX;
        case CountryCode.AL:
            return CountryCode.AL;
        case CountryCode.DZ:
            return CountryCode.DZ;
        case CountryCode.AS:
            return CountryCode.AS;
        case CountryCode.AD:
            return CountryCode.AD;
        case CountryCode.AO:
            return CountryCode.AO;
        case CountryCode.AI:
            return CountryCode.AI;
        case CountryCode.AQ:
            return CountryCode.AQ;
        case CountryCode.AG:
            return CountryCode.AG;
        case CountryCode.AR:
            return CountryCode.AR;
        case CountryCode.AM:
            return CountryCode.AM;
        case CountryCode.AW:
            return CountryCode.AW;
        case CountryCode.AU:
            return CountryCode.AU;
        case CountryCode.AT:
            return CountryCode.AT;
        case CountryCode.AZ:
            return CountryCode.AZ;
        case CountryCode.BS:
            return CountryCode.BS;
        case CountryCode.BH:
            return CountryCode.BH;
        case CountryCode.BD:
            return CountryCode.BD;
        case CountryCode.BB:
            return CountryCode.BB;
        case CountryCode.BY:
            return CountryCode.BY;
        case CountryCode.BE:
            return CountryCode.BE;
        case CountryCode.BZ:
            return CountryCode.BZ;
        case CountryCode.BJ:
            return CountryCode.BJ;
        case CountryCode.BM:
            return CountryCode.BM;
        case CountryCode.BT:
            return CountryCode.BT;
        case CountryCode.BO:
            return CountryCode.BO;
        case CountryCode.BQ:
            return CountryCode.BQ;
        case CountryCode.BA:
            return CountryCode.BA;
        case CountryCode.BW:
            return CountryCode.BW;
        case CountryCode.BV:
            return CountryCode.BV;
        case CountryCode.BR:
            return CountryCode.BR;
        case CountryCode.IO:
            return CountryCode.IO;
        case CountryCode.BN:
            return CountryCode.BN;
        case CountryCode.BG:
            return CountryCode.BG;
        case CountryCode.BF:
            return CountryCode.BF;
        case CountryCode.BI:
            return CountryCode.BI;
        case CountryCode.CV:
            return CountryCode.CV;
        case CountryCode.KH:
            return CountryCode.KH;
        case CountryCode.CM:
            return CountryCode.CM;
        case CountryCode.CA:
            return CountryCode.CA;
        case CountryCode.KY:
            return CountryCode.KY;
        case CountryCode.CF:
            return CountryCode.CF;
        case CountryCode.TD:
            return CountryCode.TD;
        case CountryCode.CL:
            return CountryCode.CL;
        case CountryCode.CN:
            return CountryCode.CN;
        case CountryCode.CX:
            return CountryCode.CX;
        case CountryCode.CC:
            return CountryCode.CC;
        case CountryCode.CO:
            return CountryCode.CO;
        case CountryCode.KM:
            return CountryCode.KM;
        case CountryCode.CD:
            return CountryCode.CD;
        case CountryCode.CG:
            return CountryCode.CG;
        case CountryCode.CK:
            return CountryCode.CK;
        case CountryCode.CR:
            return CountryCode.CR;
        case CountryCode.CI:
            return CountryCode.CI;
        case CountryCode.HR:
            return CountryCode.HR;
        case CountryCode.CU:
            return CountryCode.CU;
        case CountryCode.CW:
            return CountryCode.CW;
        case CountryCode.CY:
            return CountryCode.CY;
        case CountryCode.CZ:
            return CountryCode.CZ;
        case CountryCode.DK:
            return CountryCode.DK;
        case CountryCode.DJ:
            return CountryCode.DJ;
        case CountryCode.DM:
            return CountryCode.DM;
        case CountryCode.DO:
            return CountryCode.DO;
        case CountryCode.EC:
            return CountryCode.EC;
        case CountryCode.EG:
            return CountryCode.EG;
        case CountryCode.SV:
            return CountryCode.SV;
        case CountryCode.GQ:
            return CountryCode.GQ;
        case CountryCode.ER:
            return CountryCode.ER;
        case CountryCode.EE:
            return CountryCode.EE;
        case CountryCode.SZ:
            return CountryCode.SZ;
        case CountryCode.ET:
            return CountryCode.ET;
        case CountryCode.FK:
            return CountryCode.FK;
        case CountryCode.FO:
            return CountryCode.FO;
        case CountryCode.FJ:
            return CountryCode.FJ;
        case CountryCode.FI:
            return CountryCode.FI;
        case CountryCode.FR:
            return CountryCode.FR;
        case CountryCode.GF:
            return CountryCode.GF;
        case CountryCode.PF:
            return CountryCode.PF;
        case CountryCode.TF:
            return CountryCode.TF;
        case CountryCode.GA:
            return CountryCode.GA;
        case CountryCode.GM:
            return CountryCode.GM;
        case CountryCode.GE:
            return CountryCode.GE;
        case CountryCode.DE:
            return CountryCode.DE;
        case CountryCode.GH:
            return CountryCode.GH;
        case CountryCode.GI:
            return CountryCode.GI;
        case CountryCode.GR:
            return CountryCode.GR;
        case CountryCode.GL:
            return CountryCode.GL;
        case CountryCode.GD:
            return CountryCode.GD;
        case CountryCode.GP:
            return CountryCode.GP;
        case CountryCode.GU:
            return CountryCode.GU;
        case CountryCode.GT:
            return CountryCode.GT;
        case CountryCode.GG:
            return CountryCode.GG;
        case CountryCode.GN:
            return CountryCode.GN;
        case CountryCode.GW:
            return CountryCode.GW;
        case CountryCode.GY:
            return CountryCode.GY;
        case CountryCode.HT:
            return CountryCode.HT;
        case CountryCode.HM:
            return CountryCode.HM;
        case CountryCode.VA:
            return CountryCode.VA;
        case CountryCode.HN:
            return CountryCode.HN;
        case CountryCode.HK:
            return CountryCode.HK;
        case CountryCode.HU:
            return CountryCode.HU;
        case CountryCode.IS:
            return CountryCode.IS;
        case CountryCode.IN:
            return CountryCode.IN;
        case CountryCode.ID:
            return CountryCode.ID;
        case CountryCode.IR:
            return CountryCode.IR;
        case CountryCode.IQ:
            return CountryCode.IQ;
        case CountryCode.IE:
            return CountryCode.IE;
        case CountryCode.IM:
            return CountryCode.IM;
        case CountryCode.IL:
            return CountryCode.IL;
        case CountryCode.IT:
            return CountryCode.IT;
        case CountryCode.JM:
            return CountryCode.JM;
        case CountryCode.JP:
            return CountryCode.JP;
        case CountryCode.JE:
            return CountryCode.JE;
        case CountryCode.JO:
            return CountryCode.JO;
        case CountryCode.KZ:
            return CountryCode.KZ;
        case CountryCode.KE:
            return CountryCode.KE;
        case CountryCode.KI:
            return CountryCode.KI;
        case CountryCode.KP:
            return CountryCode.KP;
        case CountryCode.KR:
            return CountryCode.KR;
        case CountryCode.KW:
            return CountryCode.KW;
        case CountryCode.KG:
            return CountryCode.KG;
        case CountryCode.LA:
            return CountryCode.LA;
        case CountryCode.LV:
            return CountryCode.LV;
        case CountryCode.LB:
            return CountryCode.LB;
        case CountryCode.LS:
            return CountryCode.LS;
        case CountryCode.LR:
            return CountryCode.LR;
        case CountryCode.LY:
            return CountryCode.LY;
        case CountryCode.LI:
            return CountryCode.LI;
        case CountryCode.LT:
            return CountryCode.LT;
        case CountryCode.LU:
            return CountryCode.LU;
        case CountryCode.MO:
            return CountryCode.MO;
        case CountryCode.MK:
            return CountryCode.MK;
        case CountryCode.MG:
            return CountryCode.MG;
        case CountryCode.MW:
            return CountryCode.MW;
        case CountryCode.MY:
            return CountryCode.MY;
        case CountryCode.MV:
            return CountryCode.MV;
        case CountryCode.ML:
            return CountryCode.ML;
        case CountryCode.MT:
            return CountryCode.MT;
        case CountryCode.MH:
            return CountryCode.MH;
        case CountryCode.MQ:
            return CountryCode.MQ;
        case CountryCode.MR:
            return CountryCode.MR;
        case CountryCode.MU:
            return CountryCode.MU;
        case CountryCode.YT:
            return CountryCode.YT;
        case CountryCode.MX:
            return CountryCode.MX;
        case CountryCode.FM:
            return CountryCode.FM;
        case CountryCode.MD:
            return CountryCode.MD;
        case CountryCode.MC:
            return CountryCode.MC;
        case CountryCode.MN:
            return CountryCode.MN;
        case CountryCode.ME:
            return CountryCode.ME;
        case CountryCode.MS:
            return CountryCode.MS;
        case CountryCode.MA:
            return CountryCode.MA;
        case CountryCode.MZ:
            return CountryCode.MZ;
        case CountryCode.MM:
            return CountryCode.MM;
        case CountryCode.NA:
            return CountryCode.NA;
        case CountryCode.NR:
            return CountryCode.NR;
        case CountryCode.NP:
            return CountryCode.NP;
        case CountryCode.NL:
            return CountryCode.NL;
        case CountryCode.NC:
            return CountryCode.NC;
        case CountryCode.NZ:
            return CountryCode.NZ;
        case CountryCode.NI:
            return CountryCode.NI;
        case CountryCode.NE:
            return CountryCode.NE;
        case CountryCode.NG:
            return CountryCode.NG;
        case CountryCode.NU:
            return CountryCode.NU;
        case CountryCode.NF:
            return CountryCode.NF;
        case CountryCode.MP:
            return CountryCode.MP;
        case CountryCode.NO:
            return CountryCode.NO;
        case CountryCode.OM:
            return CountryCode.OM;
        case CountryCode.PK:
            return CountryCode.PK;
        case CountryCode.PW:
            return CountryCode.PW;
        case CountryCode.PS:
            return CountryCode.PS;
        case CountryCode.PA:
            return CountryCode.PA;
        case CountryCode.PG:
            return CountryCode.PG;
        case CountryCode.PY:
            return CountryCode.PY;
        case CountryCode.PE:
            return CountryCode.PE;
        case CountryCode.PH:
            return CountryCode.PH;
        case CountryCode.PN:
            return CountryCode.PN;
        case CountryCode.PL:
            return CountryCode.PL;
        case CountryCode.PT:
            return CountryCode.PT;
        case CountryCode.PR:
            return CountryCode.PR;
        case CountryCode.QA:
            return CountryCode.QA;
        case CountryCode.RE:
            return CountryCode.RE;
        case CountryCode.RO:
            return CountryCode.RO;
        case CountryCode.RU:
            return CountryCode.RU;
        case CountryCode.RW:
            return CountryCode.RW;
        case CountryCode.BL:
            return CountryCode.BL;
        case CountryCode.SH:
            return CountryCode.SH;
        case CountryCode.KN:
            return CountryCode.KN;
        case CountryCode.LC:
            return CountryCode.LC;
        case CountryCode.MF:
            return CountryCode.MF;
        case CountryCode.PM:
            return CountryCode.PM;
        case CountryCode.VC:
            return CountryCode.VC;
        case CountryCode.WS:
            return CountryCode.WS;
        case CountryCode.SM:
            return CountryCode.SM;
        case CountryCode.ST:
            return CountryCode.ST;
        case CountryCode.SA:
            return CountryCode.SA;
        case CountryCode.SN:
            return CountryCode.SN;
        case CountryCode.RS:
            return CountryCode.RS;
        case CountryCode.SC:
            return CountryCode.SC;
        case CountryCode.SL:
            return CountryCode.SL;
        case CountryCode.SG:
            return CountryCode.SG;
        case CountryCode.SX:
            return CountryCode.SX;
        case CountryCode.SK:
            return CountryCode.SK;
        case CountryCode.SI:
            return CountryCode.SI;
        case CountryCode.SB:
            return CountryCode.SB;
        case CountryCode.SO:
            return CountryCode.SO;
        case CountryCode.ZA:
            return CountryCode.ZA;
        case CountryCode.GS:
            return CountryCode.GS;
        case CountryCode.SS:
            return CountryCode.SS;
        case CountryCode.ES:
            return CountryCode.ES;
        case CountryCode.LK:
            return CountryCode.LK;
        case CountryCode.SD:
            return CountryCode.SD;
        case CountryCode.SR:
            return CountryCode.SR;
        case CountryCode.SJ:
            return CountryCode.SJ;
        case CountryCode.SE:
            return CountryCode.SE;
        case CountryCode.CH:
            return CountryCode.CH;
        case CountryCode.SY:
            return CountryCode.SY;
        case CountryCode.TW:
            return CountryCode.TW;
        case CountryCode.TJ:
            return CountryCode.TJ;
        case CountryCode.TZ:
            return CountryCode.TZ;
        case CountryCode.TH:
            return CountryCode.TH;
        case CountryCode.TL:
            return CountryCode.TL;
        case CountryCode.TG:
            return CountryCode.TG;
        case CountryCode.TK:
            return CountryCode.TK;
        case CountryCode.TO:
            return CountryCode.TO;
        case CountryCode.TT:
            return CountryCode.TT;
        case CountryCode.TN:
            return CountryCode.TN;
        case CountryCode.TR:
            return CountryCode.TR;
        case CountryCode.TM:
            return CountryCode.TM;
        case CountryCode.TC:
            return CountryCode.TC;
        case CountryCode.TV:
            return CountryCode.TV;
        case CountryCode.UG:
            return CountryCode.UG;
        case CountryCode.UA:
            return CountryCode.UA;
        case CountryCode.AE:
            return CountryCode.AE;
        case CountryCode.GB:
            return CountryCode.GB;
        case CountryCode.UM:
            return CountryCode.UM;
        case CountryCode.US:
            return CountryCode.US;
        case CountryCode.UY:
            return CountryCode.UY;
        case CountryCode.UZ:
            return CountryCode.UZ;
        case CountryCode.VU:
            return CountryCode.VU;
        case CountryCode.VE:
            return CountryCode.VE;
        case CountryCode.VN:
            return CountryCode.VN;
        case CountryCode.VG:
            return CountryCode.VG;
        case CountryCode.VI:
            return CountryCode.VI;
        case CountryCode.WF:
            return CountryCode.WF;
        case CountryCode.EH:
            return CountryCode.EH;
        case CountryCode.YE:
            return CountryCode.YE;
        case CountryCode.ZM:
            return CountryCode.ZM;
        case CountryCode.ZW:
            return CountryCode.ZW;
        default            :
            return undefined;
    }
}

export function explainCountryCode (value : unknown) : string {
    return explainEnum("CountryCode", CountryCode, isCountryCode, value);
}
