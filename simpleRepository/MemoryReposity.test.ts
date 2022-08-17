/**
 * System test for HttpRepositoryClient and hgrs.
 *
 * E.g. this test is meant to connect to the repository server and test real
 * functionality.
 */


import { isStoredRepositoryItem, StoredRepositoryItem, StoredRepositoryItemTestCallback } from "./types/StoredRepositoryItem";
import { MemoryRepository } from "./MemoryRepository";
import { RepositoryEntry } from "./types/RepositoryEntry";
import { isArrayOf } from "../../core/modules/lodash";


const test = {
    id: "1", target: "test"
};
const test2 = {
    id: "2", target: "test2"
};


interface StoredTestRepositoryItem extends StoredRepositoryItem {

    /**
     * Unique ID
     */
    readonly id: string;

    /** Current item data as JSON string */
    readonly target: string;

}

describe('system', () => {

    describe('MemoryRepository', () => {

        describe('#construct', () => {

            it('can create unauthenticated client object', () => {
                const memoryrepository = new MemoryRepository(isStoredRepositoryItem);
                expect(memoryrepository).toBeDefined();
            });

        });

        describe('#getAll', () => {

            const memoryReposity: MemoryRepository<StoredTestRepositoryItem> = new MemoryRepository<StoredTestRepositoryItem>(isStoredRepositoryItem);

            beforeAll(() => {
                // expect(client.getState()).toBe(HttpRepositoryClientState.UNAUTHENTICATED);
                //const service = new HttpRepositoryClient(`${BACKEND_URL}`);
            });

            it('can createItem', async () => {

                const item: RepositoryEntry<any> = await memoryReposity.createItem(test);

                expect(item?.id).toBeDefined();
                expect(item?.id).not.toBe('');
                expect(item?.version).toBeDefined();
                expect(item?.version).not.toBe('');
                expect(item?.data).toBeDefined();
                expect(item?.data.id).toBe("1");
                expect(item?.data.target).toBe("test");

                const list = await memoryReposity.getAll();
                //console.log("list", JSON.stringify(list))

                expect(isArrayOf(list)).toBe(true);
                expect(list?.length).toBe(1);
                expect(list[0]?.id).not.toBe('');
                expect(list[0]?.id).toBe(item?.id);
                expect(list[0]?.data.id).toBe(item?.data.id);
                expect(list[0]?.data.target).toBe(item?.data.target)

                const item2: RepositoryEntry<any> = await memoryReposity.createItem(test2);

            })

            it('can find items: getAll with getSome and findById', async () => {

                const list = await memoryReposity.getAll();

                expect(isArrayOf(list)).toBe(true);
                expect(list?.length).toBe(2);
                expect(list[1]?.id).not.toBe('');
                expect(list[1]?.data.id).toBe("2");
                expect(list[1]?.data.target).toBe("test2")

                //get some

                const list1 = await memoryReposity.getSome([list[0]?.id]);

                expect(isArrayOf(list1)).toBe(true);
                expect(list1[0]?.id).not.toBe('');
                expect(list1[0]?.data.id).toBe("1");
                expect(list1[0]?.data.target).toBe("test");

                //findById

                const item = await memoryReposity.findById(list[1]?.id);

                expect(isArrayOf(list1)).toBe(true);
                expect(item?.id).not.toBe('');
                expect(item?.data.id).toBe("2");
                expect(item?.data.target).toBe("test2");

            });



        });

    });

});
