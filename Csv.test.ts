// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { stringifyCsv } from "./Csv";

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
   'labels'
];

const firstLine = ['1', 'test-title', 'SALES', 'WAITING', 'MEDIUM', 'Mike', '1200', 'Oh yes! I have some text here for you to test.', 'EUR', 'WAITING'];
const secondLine =  ['2', 'second-test-title', 'ICT', 'WAITING', 'HIGH', 'Jacob', '2200,12', 'Oh yeah I ended up ordering, some new stuff; and so on.', 'EUR', 'WAITING'];
const thirdLine =  ['3', 'third-test-title', 'ICT', 'WAITING', 'HIGH', 'Jacob', '2200,12', 'Hermot ei kestä kaamosta, pitää päästä lepuuttamaan', 'EUR', 'WAITING'];

describe('Csv', () => {

   describe('#stringifyCsv', () => {

      test('can stringify csv data', () => {
         const result = stringifyCsv([properties, firstLine, secondLine], ',', '"', '\n');
         expect(typeof result).toBe("string");
      });

      test('can stringify csv headers correctly', () => {
         const result = stringifyCsv([properties, firstLine, secondLine], ';', "'", '\t');
         const headerLine = result.split('\t').shift();
         expect(headerLine).toStrictEqual(
             'ticketNumber'
             +';title'
             +';categoryType'
             +';state'
             +';priority'
             +';requester'
             +';cost'
             +';detail'
             +';currency'
             +';status'
             +';dueDate'
             +';workspaceId'
             +';workspace'
             +';supplierId'
             +';supplier'
             +';approver'
             +';labels'
         );
      });

      test('can stringify csv data without cvs control characters', () => {
         const result = stringifyCsv([properties, firstLine, secondLine], ';', "'", '\t');
         const rows = result.split('\t');
         expect(rows[1]).toStrictEqual(
             '1'
            +';test-title'
            +';SALES'
            +';WAITING'
            +';MEDIUM'
            +';Mike'
            +';1200'
            +';Oh yes! I have some text here for you to test.'
            +';EUR'
            +';WAITING'
         );
      })

      test('can stringify csv data with leading cvs quote characters', () => {
         const result = stringifyCsv(
             [
                [ 'id', 'name' ],
                [ '1', '"name' ]
             ],
             ',',
             '"',
             '\n'
         );
         const rows = result.split('\n');
         expect(rows[1]).toStrictEqual('1,"""name"');
      })

      test('can stringify csv data with middle cvs quote characters', () => {
         const result = stringifyCsv(
             [
                [ 'id', 'name' ],
                [ '1', 'hello"world' ]
             ],
             ',',
             '"',
             '\n'
         );
         const rows = result.split('\n');
         expect(rows[1]).toStrictEqual('1,hello"world');
      })

      test('can stringify csv data with cvs quote characters both ways', () => {
         const result = stringifyCsv(
             [
                [ 'id', 'name' ],
                [ '1', '"hello"world"' ]
             ],
             ',',
             '"',
             '\n'
         );
         const rows = result.split('\n');
         expect(rows[1]).toStrictEqual('1,"""hello""world"""');
      })

      test('can stringify csv data with suffix cvs quote characters', () => {
         const result = stringifyCsv(
             [
                [ 'id', 'name' ],
                [ '1', 'helloworld"' ]
             ],
             ',',
             '"',
             '\n'
         );
         const rows = result.split('\n');
         expect(rows[1]).toStrictEqual('1,helloworld"');
      })

      test('can stringify csv data with csv control characters', () => {
         const result = stringifyCsv([properties, firstLine, secondLine], ';', "'", '\t');
         const rows = result.split('\t');
         expect(rows[2]).toStrictEqual(
            '2'
            +';second-test-title'
            +';ICT'
            +';WAITING'
            +';HIGH'
            +';Jacob'
            +';2200,12'
            +";'Oh yeah I ended up ordering, some new stuff; and so on.'"
            +';EUR'
            +';WAITING'
         );
      });

      test('can stringify csv data with unicode characters', () => {
         const result = stringifyCsv([properties, firstLine, secondLine, thirdLine], ',', '"', '\n');
         const rows = result.split('\n');
         expect(rows[3]).toStrictEqual(
            '3'
            +',third-test-title'
            +',ICT'
            +',WAITING'
            +',HIGH'
            +',Jacob'
            +',"2200,12"'
            +',"Hermot ei kestä kaamosta, pitää päästä lepuuttamaan"'
            +',EUR'
            +',WAITING'
         );
      });

      test('can stringify csv data with empty separator characters (using default)', () => {
         const result = stringifyCsv([properties, firstLine, secondLine, thirdLine], '', '"', '\n');
         const rows = result.split('\n');
         expect(rows[3]).toStrictEqual(
            '3'
            +',third-test-title'
            +',ICT'
            +',WAITING'
            +',HIGH'
            +',Jacob'
            +',"2200,12"'
            +',"Hermot ei kestä kaamosta, pitää päästä lepuuttamaan"'
            +',EUR'
            +',WAITING'
         );
      });

      test('can stringify csv data with empty quote characters (using default)', () => {
         const result = stringifyCsv([properties, firstLine, secondLine, thirdLine], ',', '', '\n');
         const rows = result.split('\n');
         expect(rows[3]).toStrictEqual(
            '3'
            +',third-test-title'
            +',ICT'
            +',WAITING'
            +',HIGH'
            +',Jacob'
            +',"2200,12"'
            +',"Hermot ei kestä kaamosta, pitää päästä lepuuttamaan"'
            +',EUR'
            +',WAITING'
         );
      });

      test('can stringify csv data with empty line break characters (using default)', () => {
         const result = stringifyCsv([properties, firstLine, secondLine, thirdLine], ',', '"', '');
         const rows = result.split('\n');
         expect(rows[3]).toStrictEqual(
            '3'
            +',third-test-title'
            +',ICT'
            +',WAITING'
            +',HIGH'
            +',Jacob'
            +',"2200,12"'
            +',"Hermot ei kestä kaamosta, pitää päästä lepuuttamaan"'
            +',EUR'
            +',WAITING'
         );
      });

      test('can stringify csv data with linebreak replaced (using default)', () => {
         const result = stringifyCsv(
             [
                properties, firstLine, secondLine,

                [ '3', 'forth-test-title', 'ICT', 'WAITING', 'HIGH', 'Jacob', '2200,12', 'Hermot ei kestä kaamosta, ' + '\n' +
                'pitää päästä lepuuttamaan' + '\n' +
                'testi', 'EUR', 'WAITING'
                ]
             ], ',', '', '\n', ' ');
         const rows = result.split('\n');
         expect(rows[3]).toStrictEqual(
             '3'
             +',forth-test-title'
             +',ICT'
             +',WAITING'
             +',HIGH'
             +',Jacob'
             +',"2200,12"'
             +',"Hermot ei kestä kaamosta,  pitää päästä lepuuttamaan testi"'
             +',EUR'
             +',WAITING'
         );
      });

      test('can stringify csv data with data linebreak replaced', () => {
         const result = stringifyCsv(
             [
                [ 'ticketNumber',
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
                   'workspaceId', 'workspace', 'supplierId', 'supplier', 'approver', 'labels'
                ],
                [
                   '1', 'muumipapan hattu', 'OTHER', 'REQUEST', 'STANDARD', 'haisuli@heusalagroup.fi', '45',
                   'Kissa ei \nkestä kaamosta - pitää\npäästä koiruuksia tekemään', 'EUR', 'WAITING_APPROVAL', '2022-11-04T00:00:00+02:00', '!FSlIOckQywLzmGoePz:matrix.my.host', 'pappa', '', '', '' ]
             ]
             ,
             ',', '"', '\n', ' '
         );
         const rows = result.split('\n');
         expect(rows[1]).toStrictEqual(
             '1'
             +',muumipapan hattu'
             +',OTHER'
             +',REQUEST'
             +',STANDARD'
             +',haisuli@heusalagroup.fi'
             +',45'
             +',Kissa ei  kestä kaamosta - pitää päästä koiruuksia tekemään'
             +',EUR'
             +',WAITING_APPROVAL'
             +',2022-11-04T00:00:00+02:00'
             +',!FSlIOckQywLzmGoePz:matrix.my.host'
             +',pappa'
             +','
             +','
             +','
         );
      });

      test('can stringify csv data with data linebreak removed', () => {
         const result = stringifyCsv(
             [
                [ 'ticketNumber',
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
                   'workspaceId', 'workspace', 'supplierId', 'supplier', 'approver', 'labels'
                ],
                [
                   '1', 'muumipapan hattu', 'OTHER', 'REQUEST', 'STANDARD', 'haisuli@heusalagroup.fi', '45',
                   'Kissa ei \nkestä kaamosta - pitää\npäästä koiruuksia tekemään', 'EUR', 'WAITING_APPROVAL', '2022-11-04T00:00:00+02:00', '!FSlIOckQywLzmGoePz:matrix.my.host', 'pappa', '', '', '' ]
             ]
             ,
             ',', '"', '\n', ''
         );
         const rows = result.split('\n');
         expect(rows[1]).toStrictEqual(
             '1'
             +',muumipapan hattu'
             +',OTHER'
             +',REQUEST'
             +',STANDARD'
             +',haisuli@heusalagroup.fi'
             +',45'
             +',Kissa ei kestä kaamosta - pitääpäästä koiruuksia tekemään'
             +',EUR'
             +',WAITING_APPROVAL'
             +',2022-11-04T00:00:00+02:00'
             +',!FSlIOckQywLzmGoePz:matrix.my.host'
             +',pappa'
             +','
             +','
             +','
         );
      });

      test('can stringify csv data with data linebreak kept', () => {
         const result = stringifyCsv(
             [
                [ 'ticketNumber',
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
                   'workspaceId', 'workspace', 'supplierId', 'supplier', 'approver', 'labels'
                ],
                [
                   '1', 'muumipapan hattu', 'OTHER', 'REQUEST', 'STANDARD', 'haisuli@heusalagroup.fi', '45',
                   'Kissa ei \nkestä kaamosta - pitää\npäästä koiruuksia tekemään', 'EUR', 'WAITING_APPROVAL', '2022-11-04T00:00:00+02:00', '!FSlIOckQywLzmGoePz:matrix.my.host', 'pappa', '', '', '' ]
             ]
             ,
             ',',
             '"',
             '\n',
             false
         );
         const rows = result.split('\n');
         expect(rows[1]).toStrictEqual(
             '1'
             +',muumipapan hattu'
             +',OTHER'
             +',REQUEST'
             +',STANDARD'
             +',haisuli@heusalagroup.fi'
             +',45'
             +',Kissa ei '
         );
         expect(rows[2]).toStrictEqual(
      'kestä kaamosta - pitää'
         );
         expect(rows[3]).toStrictEqual(
             'päästä koiruuksia tekemään'
             +',EUR'
             +',WAITING_APPROVAL'
             +',2022-11-04T00:00:00+02:00'
             +',!FSlIOckQywLzmGoePz:matrix.my.host'
             +',pappa'
             +','
             +','
             +','
         );
      });

   });

});
