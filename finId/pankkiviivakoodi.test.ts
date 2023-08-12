// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
  viivakoodiCreate,
  viivakoodiCheck,
  viivakoodiParse
} from './pankkiviivakoodi';

describe.skip('pankkiviivakoodi', () => {

    test('can create viivakoodi', () => {
      expect(viivakoodiCreate(
        'FI9814283500171141', // iban
        '100', // euros
        '10', // cents
        '13', // refnum
        '2016-05-01' // duedate
      )).toEqual('498142835001711410001001000000000000000000000013160501');
    });

    test('can check valid viivakoodi', () => {
      expect(viivakoodiCheck('498142835001711410001001000000000000000000000013160501')).toBe(true);
      expect(viivakoodiCheck('010171-1234')).toBe(false);
      expect(viivakoodiCheck('198142835001711410001001000000000000000000000013160501')).toBe(false);

    });

    test('can parse viivakoodi version 4', () => {
      const parsed = viivakoodiParse('498142835001711410001001000000000000000000000013160501');
      expect(parsed.iban).toEqual('FI9814283500171141');
      expect(parsed.refNum).toEqual('13');
      const duedate = new Date(parsed.dueDate);
      expect(duedate.getDay).toBe(1);
      expect(duedate.getMonth).toBe(5);
      expect(duedate.getFullYear).toBe(2016);
      expect(parsed.euros).toBe(100);
      expect(parsed.cents).toBe(10);
    });

    test('can parse viivakoodi version 5', () => {
      const parsed = viivakoodiParse('558101710000001220004829906000000559582243294671100131');
      expect(parsed.iban).toEqual('FI5810171000000122');
      expect(parsed.refNum).toEqual('559582243294671');
      const duedate = new Date(parsed.dueDate);
      expect(duedate.getDay).toBe(31);
      expect(duedate.getMonth).toBe(1);
      expect(duedate.getFullYear).toBe(2010);
      expect(parsed.euros).toBe(482);
      expect(parsed.cents).toBe(99);
    });

});
