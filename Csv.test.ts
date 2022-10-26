// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogService } from "./LogService"
import { stringifyCsv } from "./Csv";

const LOG = LogService.createLogger('Csv.test');

const properties = [
   'ticketNumber',
   'title',
   'categoryType',
   'state',
   'priority',
   'requester',
   'cost',
   'detail',
   'currency',
   'status',
   'dueDate',
   'workspaceId',
   'workspace',
   'supplierId',
   'supplier',
   'approver',
   'labels',
    '\n'
];

const firstFIle = ['1', 'test-title', 'SALES', 'WAITING', 'MEDIUM', 'Mike', '1200', 'Oh yes! I have some text here for you to test.', 'EUR', 'WAITING', '\n'];
const secondFIle =  ['2', 'second-test-title', 'ICT', 'WAITING', 'HIGH', 'Jacob', '2200', 'Oh yeah I ended up ordering, some new stuff, and so on.', 'EUR', 'WAITING', '\n'];
const testArr: any = []
testArr.push(properties)
testArr.push(firstFIle)
testArr.push(secondFIle)

describe('Csv', () => {
   const result = stringifyCsv(testArr, ',', '"', '\n')

   describe('Csv type and basic tests', () => {
      test('Can stringify csv file', () => {
         expect(typeof result).toBe("string")
         expect(result).toMatch("title")
         expect(result).toMatch("test-title")
         expect(result).toMatch("second-test-title")
      })
   })

   LOG.debug('csv results, headers and data: ', result)

   test('Can create csv headers correctly as first loop', () => {

      expect(result.split(',')[0]).toBe('ticketNumber')
      expect(result.split(',')[1]).toBe('title')
      expect(result.split(',')[2]).toBe('categoryType')
      expect(result.split(',')[3]).toBe('state')
      expect(result.split(',')[4]).toBe('priority')
      expect(result.split(',')[5]).toBe('requester')
      expect(result.split(',')[6]).toBe('cost')
      expect(result.split(',')[7]).toBe('detail')
      expect(result.split(',')[8]).toBe('currency')
      expect(result.split(',')[9]).toBe('status')
      expect(result.split(',')[10]).toBe('dueDate')
      expect(result.split(',')[11]).toBe('workspaceId')
      expect(result.split(',')[12]).toBe('workspace')
      expect(result.split(',')[13]).toBe('supplierId')
      expect(result.split(',')[14]).toBe('supplier')
      expect(result.split(',')[15]).toBe('approver')
      expect(result.split(',')[16]).toBe('labels')

   });

   describe('First array csv test without comma', () => {
      test('Can loop csv data correctly ', () => {

         expect(result.split(',')[17]).toMatch('1')
         expect(result.split(',')[18]).toBe('test-title')
         expect(result.split(',')[19]).toBe('SALES')
         expect(result.split(',')[20]).toBe('WAITING')
         expect(result.split(',')[21]).toBe('MEDIUM')
         expect(result.split(',')[22]).toBe('Mike')
         expect(result.split(',')[23]).toBe('1200')
         expect(result.split(',')[24]).toBe('Oh yes! I have some text here for you to test.')
         expect(result.split(',')[25]).toBe('EUR')
         expect(result.split(',')[26]).toBe('WAITING')
      })
   })

   describe('Second array csv test with comma ', () => {
      xtest('Can loop csv data correctly ', () => {

         expect(result.split(',')[27]).toMatch('2')
         expect(result.split(',')[28]).toBe('second-test-title')
         expect(result.split(',')[29]).toBe('ICT')
         expect(result.split(',')[30]).toBe('WAITING')
         expect(result.split(',')[31]).toBe('HIGH')
         expect(result.split(',')[32]).toBe('Jacob')
         expect(result.split(',')[33]).toBe('2200')
         expect(result.split(',')[34]).toBe('Oh yeah I ended up ordering, some new stuff, and so on.')
         expect(result.split(',')[35]).toBe('EUR')
         expect(result.split(',')[36]).toBe('WAITING')
      })
   })


});
