import { refNumLeaveOnlyDigits, refNumCalculateDigit, refNumCreate, refNumStrip, refNumCheck, refNumParse, refNumCmp } from './refNum';

describe('Referer number functions', () => {

  test('can remove chars and leave only digits from string', () => {
    expect(refNumLeaveOnlyDigits('abc134')).toBe('134');
  });

  test('can calculate refener numer check digit', () => {
    expect(refNumCalculateDigit('41234555131')).toBe('0');
  });

  test('can create refener number by adding check-digit to num', () => {
    expect(refNumCreate('41234555131')).toBe('412345551310');
  });

  test('can remove check num from reference number', () => {
    expect(refNumStrip('412345551310')).toBe('41234555131');
  });

  test('can check refener number', () => {
    expect(refNumCheck('412345551310')).toBe(true);
    expect(refNumCheck('41234555131')).toBe(false);
  });

  test('can parse valid refener number', () => {
    expect(refNumParse('412345551310')).toBe('412345551310');
    expect(refNumParse('41234555131')).toBeUndefined;
  });

  test('can compare reference numbers and return true if equal', () => {
    expect(refNumCmp('412345551310', '412345551310')).toBe(true);
    expect(refNumCmp('412345551310', '41234555131')).toBe(false);
    expect(refNumCmp('41234555131', '41234555131')).toBe(false);
  });

});