import { checkHetuString, Hetu, hetuChecksum, HetuObject, HetuSex, parseHetuDate, parseHetuObject, parseHetuString, parseSex } from "./hetu";

describe('HetuObject', () => {

  test('HetuObject is object', () => {
    expect( HetuObject ).toBe(Object);
  });
  test('parseHetuObject can return HetuObject', () => {
    expect( parseHetuObject('010171-1985')).toBe(HetuObject);
  });
  test('checkHetuString can check valid hetu string', () => {
    expect( checkHetuString('010171-1985')).toBe(true);
  });

});

describe('parseHetuString / hetuChecksum / parseSex', () => {
  test('can parse valid hetu string', () => {
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
    const hetu = parseHetuString('010171-1985') as Hetu;
    expect(hetuChecksum(hetu)).toEqual ('5');
  });

  test('can parse hetu date', () => {
    const hetu = parseHetuString('010171-1985') as Hetu;
    expect(parseHetuDate(hetu)).toEqual(new Date(1971, 1, 1));
  });

  test('can parse hetu sex', () => {
    const hetu = parseHetuString('010171-1985') as Hetu;
    expect(parseSex(hetu)).toEqual(HetuSex.FEMALE);
  });

});

