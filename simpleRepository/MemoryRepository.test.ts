/**
 * Unit test for MemoryRepository and hgrs.
 *
 * 
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

            const memoryRepository: MemoryRepository<StoredTestRepositoryItem> = new MemoryRepository<StoredTestRepositoryItem>(isStoredRepositoryItem);

            beforeAll(() => {
                // expect(client.getState()).toBe(HttpRepositoryClientState.UNAUTHENTICATED);
                //const service = new HttpRepositoryClient(`${BACKEND_URL}`);
            });

             it('can list items when no items exists', async () => {
                 const list = await memoryRepository.getAll();
                 expect(isArrayOf(list)).toBe(true);
                 expect(list?.length).toBe(0);
             });

             it('can create item', async () => {

                 const item: RepositoryEntry<any> = await memoryRepository.createItem(test);

                 expect(item?.id).toBeDefined();
                 expect(item?.id).not.toBe('');
                 expect(item?.version).toBeDefined();
                 expect(item?.version).not.toBe('');
                 expect(item?.data).toBeDefined();
                 expect(item?.data.id).toBe("1");
                 expect(item?.data.target).toBe("test");

                 const list = await memoryRepository.getAll();
                 //console.log("list", JSON.stringify(list))

                 expect(isArrayOf(list)).toBe(true);
                 expect(list?.length).toBe(1);
                 expect(list[0]?.id).not.toBe('');
                 expect(list[0]?.id).toBe(item?.id);
                 expect(list[0]?.data.id).toBe(item?.data.id);
                 expect(list[0]?.data.target).toBe(item?.data.target)

                 const item2: RepositoryEntry<any> = await memoryRepository.createItem(test2);

             })

             it('can find items: getAll, getSome and findById', async () => {

                 const list = await memoryRepository.getAll();

                 expect(isArrayOf(list)).toBe(true);
                 expect(list?.length).toBe(2);
                 expect(list[1]?.id).not.toBe('');
                 expect(list[1]?.data.id).toBe("2");
                 expect(list[1]?.data.target).toBe("test2")

                 //getsome

                 const list1 = await memoryRepository.getSome([list[0]?.id]);

                 expect(isArrayOf(list1)).toBe(true);
                 expect(list1[0]?.id).not.toBe('');
                 expect(list1[0]?.data.id).toBe("1");
                 expect(list1[0]?.data.target).toBe("test");

                 //findById

                 const item = await memoryRepository.findById(list[1]?.id);

                 expect(isArrayOf(list1)).toBe(true);
                 expect(item?.id).not.toBe('');
                 expect(item?.data.id).toBe("2");
                 expect(item?.data.target).toBe("test2");

                 const item3: RepositoryEntry<any> = await memoryRepository.createItem(test2);

                 //getAllByProperty
                 const propertyList = await memoryRepository.getAllByProperty('target', item?.data.target);

                 expect(isArrayOf(propertyList)).toBe(true);
                 expect(propertyList?.length).toBe(2);
                 expect(propertyList[0].id).not.toBe('');
                 expect(propertyList[0].data.target).toBe("test2");
                 expect(propertyList[1].data.target).toBe("test2");


             });



         });

         describe('modifications', () => {

             let id: string;
             let item4: RepositoryEntry<any>;

             let modification: RepositoryEntry<any>;

             let modificationData = { id: "11", target: "modification" }

             const memoryrepository = new MemoryRepository(isStoredRepositoryItem);

             beforeEach(async () => {

                 expect(memoryrepository).toBeDefined();

             });

             it('can update item by it id', async () => {

                 const item4: RepositoryEntry<any> = await memoryrepository.createItem(test);
                 const modification: RepositoryEntry<any> = await memoryrepository.createItem(modificationData);

                 id = item4?.id;

                 expect(id).toBeDefined();
                 expect(id).not.toBe('');
                 expect(item4?.data.target).toBe("test");

                 const updatedItem = await memoryrepository.findByIdAndUpdate(
                     id,
                     modification.data
                 );
                 expect(updatedItem?.id).toBe(id);
                 expect(updatedItem?.data.id).toBe("11");
                 expect(updatedItem?.data.target).toBe("modification");

             });



         });
         describe('delete operations', () => {
             let id: string;
             let item5: RepositoryEntry<any>;

             const memoryrepository = new MemoryRepository(isStoredRepositoryItem);


             it('can delete item by it id', async () => {
                 const item5: RepositoryEntry<any> = await memoryrepository.createItem(test);
                 id = item5?.id;

                 expect(id).toBeDefined();
                 expect(id).not.toBe('');
                 expect(item5?.data.target).toBe("test");

                 const deletedItem = await memoryrepository.deleteById(id);

                 expect(deletedItem?.id).toBe(id);
                 expect(deletedItem?.data.id).toBe("1");
                 expect(deletedItem?.data.target).toBe("test");
                 expect(deletedItem?.deleted).toBe(true);
                 expect(deletedItem?.members).toBe(undefined);

             });

         })


     });

 });
