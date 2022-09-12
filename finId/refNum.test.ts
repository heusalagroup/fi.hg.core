import {
  refNumLeaveOnlyDigits,
  refNumCalculateDigit,
  refNumCreate,
  refNumStrip,
  refNumCheck,
  refNumParse,
  refNumCmp
} from './refNum';

describe('Referer number functions', () => {

  test('can remove chars and leave only digits from string', () => {
    expect(refNumLeaveOnlyDigits('abc134')).toStrictEqual('134');
  });

  test('can calculate reference number check digit', () => {
    expect(refNumCalculateDigit('1')).toStrictEqual('3');
    expect(refNumCalculateDigit('41234555131')).toStrictEqual('0');
    expect(refNumCalculateDigit('4123455513')).toStrictEqual('1');
    expect(refNumCalculateDigit('412345551')).toStrictEqual('2');
  });

  test('can create reference number by adding check-digit to num', () => {
    expect(refNumCreate('1')).toStrictEqual('13');
    expect(refNumCreate('41234555131')).toStrictEqual('412345551310');
    expect(refNumCreate('4123455513')).toStrictEqual('41234555131');
    expect(refNumCreate('412345551')).toStrictEqual('4123455512');
  });

  test('can remove check num from reference number', () => {
    expect(refNumStrip('412345551310')).toStrictEqual('41234555131');
    expect(refNumStrip('13')).toStrictEqual('1');
    expect(refNumStrip('4123455512')).toStrictEqual('412345551');
  });

  test('can check reference number', () => {
    expect(refNumCheck('13')).toStrictEqual(true);
    expect(refNumCheck('412345551310')).toStrictEqual(true);
    expect(refNumCheck('41234555131')).toStrictEqual(true);
    expect(refNumCheck('')).toStrictEqual(false);
    expect(refNumCheck('1')).toStrictEqual(false);
    expect(refNumCheck('1')).toStrictEqual(false);
    expect(refNumCheck('12')).toStrictEqual(false);
    expect(refNumCheck('412345551311')).toStrictEqual(false);
    expect(refNumCheck('41234555132')).toStrictEqual(false);
  });

  test('can parse valid reference number', () => {
    expect(refNumParse('13')).toStrictEqual('13');
    expect(refNumParse('412345551310')).toStrictEqual('412345551310');
    expect(refNumParse('41234555131')).toStrictEqual('41234555131');
  });

  test('can parse invalid reference number', () => {
    expect(refNumParse('1')).toBeUndefined();
    expect(refNumParse('12')).toBeUndefined();
    expect(refNumParse('41234555132')).toBeUndefined();
  });

  test('can compare reference numbers and return true if equal', () => {
    expect(refNumCmp('13', '13')).toStrictEqual(true);
    expect(refNumCmp('412345551310', '412345551310')).toStrictEqual(true);
    expect(refNumCmp('412345551310', '41234555131')).toStrictEqual(false);
  });

  test('cannot compare invalid reference numbers', () => {
    expect(refNumCmp('412345551311', '412345551311')).toStrictEqual(false);
  });

});
