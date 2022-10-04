/**
 * Unit test for RequestControlUtils.
 *
 *
 */


import { isRequestMethod} from "./types/RequestMethod";
import {
    RequestController,
    getInternalRequestMappingObject,
    isRequestController,
    setInternalRequestMappingObject, INTERNAL_KEYWORD, getRequestControllerMappingObject
} from "./types/RequestController";
import { RequestMappingObject } from "./types/RequestMappingObject";
import { OpenAPIV3 } from "../types/openapi";
import {RequestControllerUtils} from "./RequestControllerUtils";
import {RequestMapping} from "./types/RequestMapping";
import {LogService} from "../LogService";

const LOG = LogService.createLogger('RequestControllerUtilsTest');

let controller  : RequestController ;
let config2      : Partial<OpenAPIV3.Document>;
let config     : readonly RequestMapping[];
let controller2: RequestController['__requestMappings'];

describe('RequestControllerUtils', () => {

    describe('#parseRequestMapping', () => {

        test('can test get or initalizing object', () => {

            const parsedObject : RequestMappingObject = RequestControllerUtils.parseRequestMappings(config);
            LOG.debug('parseRequestMapping: parseObject = ', parsedObject);
            LOG.debug('parseRequestMapping: config = ', config);
            expect( parsedObject ).toBeDefined();
            expect( parsedObject ).toMatchObject( {methods: [], paths: []} );
            expect( controller).toBeUndefined();

              });

    });

});