import { yTunnusWithSum, yTunnusParse, yTunnusCheck, yTunnusCompare } from './yTunnus';

describe('Y-tunnus (Finnish business ID functions', () => {

  test('can generate Finnish business ID', () => {
    expect(yTunnusWithSum('2092540')).toBe('2092540-6');
    expect(yTunnusWithSum('2256931')).toBe('2256931-0');
    expect(yTunnusWithSum('0709019')).toBe('0709019-2');
    expect(yTunnusWithSum( '709019')).toBe('0709019-2');
  });

  test('can parse and return Finnish busines ID', () => {
    expect(yTunnusParse('0709019-2')).toBe('0709019-2');
    expect(yTunnusParse('0709019')).toBe('0709019-2');
    expect(yTunnusParse( '709019')).toBe('0709019-2');
  });

  test('can compare two Finnish business IDs', () => {
    expect(yTunnusCompare('0709019-2', '0709019-2')).toBe(true);
    expect(yTunnusCompare('2092540-6', '0709019-2')).toBe(false);
  });

  test('can check Finnish business ID validity', () => {
    expect(yTunnusCheck('2092540-6')).toBe(true);
    expect(yTunnusCheck('2256931-0')).toBe(true);
    expect(yTunnusCheck('0709019-2')).toBe(true);
    expect(yTunnusCheck( '709019-2')).toBe(true);
    expect(yTunnusCheck('2092540-4')).toBe(false);
    expect(yTunnusCheck('2256931-7')).toBe(false);
    expect(yTunnusCheck('0709019-3')).toBe(false);
    expect(yTunnusCheck( '709019-5')).toBe(false);
  });
});