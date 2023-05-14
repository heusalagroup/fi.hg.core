import {
  checkHetuString,
  Hetu,
  hetuChecksum,
  HetuObject,
  HetuSex,
  parseHetuDate,
  parseHetuObject,
  parseHetuString,
  parseSex
} from "./hetu";

const VALID_HETU_1 = '010171-1000';
const VALID_HETU_1_YEAR = 1971;
const VALID_HETU_1_MONTH = 1;
const VALID_HETU_1_DAY = 1;

const VALID_HETU_2 = '010171-1985';
const INVALID_HETU_1 = '010171-1234';

describe.skip('HetuObject', () => {

  test('HetuObject is class', () => {
    expect(new HetuObject(VALID_HETU_1)).toBeInstanceOf(HetuObject);
    expect(new HetuObject(VALID_HETU_2)).toBeInstanceOf(HetuObject);
  });

  describe('#parseHetuObject', () => {
    test('parseHetuObject can return HetuObject', () => {
      expect(parseHetuObject(VALID_HETU_1)).toBeInstanceOf(HetuObject);
      expect(parseHetuObject(VALID_HETU_2)).toBeInstanceOf(HetuObject);
    });
  });

  describe('#checkHetuString', () => {
    test('can check valid hetu string', () => {
      expect(checkHetuString(VALID_HETU_1)).toStrictEqual(true);
      expect(checkHetuString(VALID_HETU_2)).toStrictEqual(true);
    });
    test('can check invalid hetu string', () => {
      expect(checkHetuString(INVALID_HETU_1)).toStrictEqual(false);
    });
  });

});

describe.skip('parseHetuString / hetuChecksum / parseSex', () => {

  test('can parse valid hetu string', () => {
    expect(parseHetuString(INVALID_HETU_1)).toBeDefined();
    expect(parseHetuString('010171-1985')).toBeDefined();
    expect(parseHetuString('010171-198-')).toBeUndefined();
    expect(parseHetuString('010171-19855')).toBeUndefined();
    expect(parseHetuString('010171-198')).toBeUndefined();
    expect(parseHetuString('010071-1985')).toBeUndefined();
    expect(parseHetuString('000171-1985')).toBeUndefined();
    expect(parseHetuString('0101A1-1985')).toBeUndefined();
    expect(parseHetuString('010171#1985')).toBeUndefined();
  });

  test('can parse hetu checksum', () => {
    const hetu : Hetu | undefined = parseHetuString(VALID_HETU_1);
    expect( hetu && hetuChecksum(hetu)).toEqual ('5');
  });

  test('can parse hetu date', () => {
    const hetu : Hetu | undefined = parseHetuString(VALID_HETU_1);
    expect(hetu && parseHetuDate(hetu) ).toEqual(new Date(VALID_HETU_1_YEAR, VALID_HETU_1_MONTH-1, VALID_HETU_1_DAY));
  });

  test('can parse hetu sex', () => {
    const hetu : Hetu | undefined = parseHetuString(VALID_HETU_1);
    expect(hetu).not.toBe(undefined);
    expect(  hetu && parseSex(hetu) ).toEqual(HetuSex.FEMALE);
  });

});

