// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import "../../../jest/matchers/index";
import { find } from "../../functions/find";
import { OneToMany } from "../OneToMany";
import { JoinColumn } from "../JoinColumn";
import { RepositoryTestContext } from "./types/types/RepositoryTestContext";
import { Persister } from "../types/Persister";
import { Repository } from "../types/Repository";
import { createCrudRepositoryWithPersister } from "../types/CrudRepository";
import { ManyToOne } from "../ManyToOne";
import { isString } from "../../types/String";
import { Table } from "../Table";
import { Entity } from "../Entity";
import { Id } from "../Id";
import { Column } from "../Column";

export const entityRelationshipTests = (context : RepositoryTestContext) : void => {

    @Table('carts')
    class CartEntity extends Entity {

        constructor (dto ?: {
            readonly items ?: readonly CartItemEntity[],
            readonly name ?: string,
            readonly contacts ?: readonly ContactEntity[]
        }) {
            super();
            this.contacts = dto?.contacts ?? [];
            this.items = dto?.items ?? [];
            this.name = dto?.name;
        }

        @Id()
        @Column('cart_id', 'BIGINT')
        public id ?: string;

        @Column('cart_name')
        public name ?: string;

        // We need two one to many -mappings to test that it works correctly
        // with multiple of these
        @OneToMany('contacts', "cart")
        public contacts : readonly ContactEntity[];

        @OneToMany('cart_items', "cart")
        public items : readonly CartItemEntity[];

    }

    @Table('contacts')
    class ContactEntity extends Entity {

        constructor (dto ?: {readonly cartId ?: string, readonly name ?: string}) {
            super();
            this.cartId = dto?.cartId;
            this.name = dto?.name;
        }

        @Id()
        @Column('contact_id', 'BIGINT')
        public id ?: string;

        @Column('cart_id', 'BIGINT')
        public cartId ?: string;

        @Column('contact_name')
        public name ?: string;

        @ManyToOne(CartEntity)
        @JoinColumn('cart_id', false)
        public cart ?: CartEntity;

    }

    @Table('cart_items')
    class CartItemEntity extends Entity {

        constructor (dto ?: {readonly cartId ?: string, readonly name ?: string}) {
            super();
            this.cartId = dto?.cartId;
            this.name = dto?.name;
        }

        @Id()
        @Column('cart_item_id', 'BIGINT')
        public id ?: string;

        @Column('cart_id', 'BIGINT')
        public cartId ?: string;

        @Column('cart_item_name')
        public name ?: string;

        @ManyToOne(CartEntity)
        @JoinColumn('cart_id', false)
        public cart ?: CartEntity;

    }

    interface CartRepository extends Repository<CartEntity, string> {

        findAllByName (name: string) : Promise<CartEntity[]>;
        findByName (name: string): Promise<CartEntity | undefined>;

    }

    interface CartItemRepository extends Repository<CartItemEntity, string> {

        findAllByName (name: string) : Promise<CartItemEntity[]>;
        findByName (name: string): Promise<CartItemEntity | undefined>;

    }

    interface ContactRepository extends Repository<ContactEntity, string> {

        findAllByName (name: string) : Promise<ContactEntity[]>;
        findByName (name: string): Promise<ContactEntity | undefined>;

    }

    let persister : Persister;
    let cartRepository : CartRepository;
    let cartItemRepository : CartItemRepository;
    let contactRepository : ContactRepository;

    /**
     * Our main test entity
     */
    let cartA : CartEntity;
    let cartA_id : string;
    let cartA_name : string = 'Cart A';

    let cartA_item1 : CartItemEntity;
    let cartA_item1_id : string;
    let cartA_item1_name : string = 'Cart A item 1';
    let cartA_item2 : CartItemEntity;
    let cartA_item2_id : string;
    let cartA_item2_name : string = 'Cart A item 2';
    let cartA_item3 : CartItemEntity;
    let cartA_item3_id : string;
    let cartA_item3_name : string = 'Cart A item 3';

    let cartA_contact1 : ContactEntity;
    let cartA_contact1_id : string;
    let cartA_contact1_name : string = 'Cart A contact 1';
    let cartA_contact2 : ContactEntity;
    let cartA_contact2_id : string;
    let cartA_contact2_name : string = 'Cart A contact 2';
    let cartA_contact3 : ContactEntity;
    let cartA_contact3_id : string;
    let cartA_contact3_name : string = 'Cart A contact 3';

    /**
     * Another cart entity so that there is data in the database beside our test data
     */
    let cartB : CartEntity;
    let cartB_id : string;
    let cartB_name : string = 'Cart B';

    let cartB_item1 : CartItemEntity;
    let cartB_item1_id : string;
    let cartB_item1_name : string = 'Cart B item 1';
    let cartB_item2 : CartItemEntity;
    let cartB_item2_id : string;
    let cartB_item2_name : string = 'Cart B item 2';
    let cartB_item3 : CartItemEntity;
    let cartB_item3_id : string;
    let cartB_item3_name : string = 'Cart B item 3';

    let cartB_contact1 : ContactEntity;
    let cartB_contact1_id : string;
    let cartB_contact1_name : string = 'Cart B contact 1';
    let cartB_contact2 : ContactEntity;
    let cartB_contact2_id : string;
    let cartB_contact2_name : string = 'Cart B contact 2';
    let cartB_contact3 : ContactEntity;
    let cartB_contact3_id : string;
    let cartB_contact3_name : string = 'Cart B contact 3';

    // This cart must not have items
    let cartC : CartEntity;
    let cartC_id : string;
    let cartC_name : string = 'Cart C';

    beforeEach( async () => {

        persister = context.getPersister();

        cartRepository = createCrudRepositoryWithPersister<CartEntity, string, CartRepository>(
            new CartEntity(),
            persister
        );

        cartItemRepository = createCrudRepositoryWithPersister<CartItemEntity, string, CartItemRepository>(
            new CartItemEntity(),
            persister
        );

        contactRepository = createCrudRepositoryWithPersister<ContactEntity, string, ContactRepository>(
            new ContactEntity(),
            persister
        );

        await cartRepository.deleteAll();
        await cartItemRepository.deleteAll();
        await contactRepository.deleteAll();

        // LOG.debug(`Step 1`)
        cartA = new CartEntity({name: cartA_name});
        cartA = await persister.insert(
            cartA.getMetadata(),
            cartA,
        );
        cartA_id = cartA?.id as string;
        if (!isString(cartA_id)) throw new TypeError(`cartA_id failed to initialize: ${JSON.stringify(cartA_id)}`);


        // LOG.debug(`Step 2`)
        cartA_item1 = new CartItemEntity({cartId: cartA_id, name: cartA_item1_name});
        cartA_item1 = await persister.insert(
            cartA_item1.getMetadata(),
            cartA_item1,
        );
        cartA_item1_id = cartA_item1?.id as string;
        if (!isString(cartA_item1_id)) throw new TypeError(`cartItemA1_id failed to initialize: ${JSON.stringify(cartA_item1_id)}`);

        // LOG.debug(`Step 3`)
        cartA_item2 = new CartItemEntity({cartId: cartA_id, name: cartA_item2_name});
        cartA_item2 = await persister.insert(
            cartA_item2.getMetadata(),
            cartA_item2,
        );
        cartA_item2_id = cartA_item2?.id as string;
        if (!isString(cartA_item2_id)) throw new TypeError(`cartItemA2_id failed to initialize: ${JSON.stringify(cartA_item2_id)}`);

        // LOG.debug(`Step 4`)
        cartA_item3 = new CartItemEntity({cartId: cartA_id, name: cartA_item3_name});
        cartA_item3 = await persister.insert(
            cartA_item3.getMetadata(),
            cartA_item3,
        );
        cartA_item3_id = cartA_item3?.id as string;
        if (!isString(cartA_item3_id)) throw new TypeError(`cartItemA3_id failed to initialize: ${JSON.stringify(cartA_item3_id)}`);


        // LOG.debug(`Step 2`)
        cartA_contact1 = new ContactEntity({cartId: cartA_id, name: cartA_contact1_name});
        cartA_contact1 = await persister.insert(
            cartA_contact1.getMetadata(),
            cartA_contact1,
        );
        cartA_contact1_id = cartA_contact1?.id as string;
        if (!isString(cartA_contact1_id)) throw new TypeError(`contactA1_id failed to initialize: ${JSON.stringify(cartA_contact1_id)}`);

        // LOG.debug(`Step 3`)
        cartA_contact2 = new ContactEntity({cartId: cartA_id, name: cartA_contact2_name});
        cartA_contact2 = await persister.insert(
            cartA_contact2.getMetadata(),
            cartA_contact2,
        );
        cartA_contact2_id = cartA_contact2?.id as string;
        if (!isString(cartA_contact2_id)) throw new TypeError(`contactA2_id failed to initialize: ${JSON.stringify(cartA_contact2_id)}`);

        // LOG.debug(`Step 4`)
        cartA_contact3 = new ContactEntity({cartId: cartA_id, name: cartA_contact3_name});
        cartA_contact3 = await persister.insert(
            cartA_contact3.getMetadata(),
            cartA_contact3,
        );
        cartA_contact3_id = cartA_contact3?.id as string;
        if (!isString(cartA_contact3_id)) throw new TypeError(`contactA3_id failed to initialize: ${JSON.stringify(cartA_contact3_id)}`);


        // LOG.debug(`Step 5`)
        cartB = new CartEntity({name: cartB_name});
        cartB = await persister.insert(
            cartB.getMetadata(),
            cartB,
        );
        cartB_id = cartB?.id as string;
        if (!isString(cartB_id)) throw new TypeError(`cartB_id failed to initialize: ${JSON.stringify(cartB_id)}`);


        // LOG.debug(`Step 6`)
        cartB_item1 = new CartItemEntity({cartId: cartB_id, name: cartB_item1_name});
        cartB_item1 = await persister.insert(
            cartB_item1.getMetadata(),
            cartB_item1,
        );
        cartB_item1_id = cartB_item1?.id as string;
        if (!isString(cartB_item1_id)) throw new TypeError(`cartB_item1_id failed to initialize: ${JSON.stringify(cartB_item1_id)}`);

        // LOG.debug(`Step 7`)
        cartB_item2 = new CartItemEntity({cartId: cartB_id, name: cartB_item2_name});
        cartB_item2 = await persister.insert(
            cartB_item2.getMetadata(),
            cartB_item2,
        );
        cartB_item2_id = cartB_item2?.id as string;
        if (!isString(cartB_item2_id)) throw new TypeError(`cartB_item2_id failed to initialize: ${JSON.stringify(cartB_item2_id)}`);

        // LOG.debug(`Step 8`)
        cartB_item3 = new CartItemEntity({cartId: cartB_id, name: cartB_item3_name});
        cartB_item3 = await persister.insert(
            cartB_item3.getMetadata(),
            cartB_item3,
        );
        cartB_item3_id = cartB_item3?.id as string;
        if (!isString(cartB_item3_id)) throw new TypeError(`cartB_item3_id failed to initialize: ${JSON.stringify(cartB_item3_id)}`);


        // LOG.debug(`Step 6`)
        cartB_contact1 = new ContactEntity({cartId: cartB_id, name: cartB_contact1_name});
        cartB_contact1 = await persister.insert(
            cartB_contact1.getMetadata(),
            cartB_contact1,
        );
        cartB_contact1_id = cartB_contact1?.id as string;
        if (!isString(cartB_contact1_id)) throw new TypeError(`cartB_contact1_id failed to initialize: ${JSON.stringify(cartB_contact1_id)}`);

        // LOG.debug(`Step 7`)
        cartB_contact2 = new ContactEntity({cartId: cartB_id, name: cartB_contact2_name});
        cartB_contact2 = await persister.insert(
            cartB_contact2.getMetadata(),
            cartB_contact2,
        );
        cartB_contact2_id = cartB_contact2?.id as string;
        if (!isString(cartB_contact2_id)) throw new TypeError(`cartB_contact2_id failed to initialize: ${JSON.stringify(cartB_contact2_id)}`);

        // LOG.debug(`Step 8`)
        cartB_contact3 = new ContactEntity({cartId: cartB_id, name: cartB_contact3_name});
        cartB_contact3 = await persister.insert(
            cartB_contact3.getMetadata(),
            cartB_contact3,
        );
        cartB_contact3_id = cartB_contact3?.id as string;
        if (!isString(cartB_contact3_id)) throw new TypeError(`cartB_contact3_id failed to initialize: ${JSON.stringify(cartB_contact3_id)}`);


        // LOG.debug(`Step 1`)
        cartC = new CartEntity({name: cartC_name});
        cartC = await persister.insert(
            cartC.getMetadata(),
            cartC,
        );
        cartC_id = cartC?.id as string;
        if (!isString(cartC_id)) throw new TypeError(`cartC_id failed to initialize: ${JSON.stringify(cartC_id)}`);


        // LOG.debug(`Step 9`)

    });

    describe('#findAll', () => {

        it('returns related cart items mapped by @OneToMany', async () => {

            const items = await cartRepository.findAll();
            expect(items).toBeArray();
            expect(items?.length).toBeGreaterThanOrEqual(2);

            const cart1 = find(items, (item: CartEntity) : boolean => item.id === cartA_id);
            const cart2 = find(items, (item: CartEntity) : boolean => item.id === cartB_id);
            const cart3 = find(items, (item: CartEntity) : boolean => item.id === cartC_id);
            expect(cart1?.id).toBe(cartA_id);
            expect(cart2?.id).toBe(cartB_id);
            expect(cart3?.id).toBe(cartC_id);

            expect((cart1?.items as any)?.length).toBeGreaterThanOrEqual(3);
            const cart1_item1 = find(cart1?.items, (item) => item.id === cartA_item1_id);
            const cart1_item2 = find(cart1?.items, (item) => item.id === cartA_item2_id);
            const cart1_item3 = find(cart1?.items, (item) => item.id === cartA_item3_id);
            expect(cart1_item1?.id).toBe(cartA_item1_id);
            expect(cart1_item2?.id).toBe(cartA_item2_id);
            expect(cart1_item3?.id).toBe(cartA_item3_id);
            expect((cart1?.items as any)?.length).toBe(3);

            expect((cart2?.items as any)?.length).toBeGreaterThanOrEqual(3);
            const cart2_item1 = find(cart2?.items, (item) => item.id === cartB_item1_id);
            const cart2_item2 = find(cart2?.items, (item) => item.id === cartB_item2_id);
            const cart2_item3 = find(cart2?.items, (item) => item.id === cartB_item3_id);
            expect(cart2_item1?.id).toBe(cartB_item1_id);
            expect(cart2_item2?.id).toBe(cartB_item2_id);
            expect(cart2_item3?.id).toBe(cartB_item3_id);
            expect((cart2?.items as any)?.length).toBe(3);

            expect((cart3?.items as any)?.length).toBe(0);

            expect(items?.length).toBe(3);

        });

        it('returns related cart items mapped by @ManyToOne', async () => {

            const items = await cartItemRepository.findAll();
            expect(items).toBeArray();
            expect(items?.length).toBe(6);

            const item1 = find(items, (item) => item?.id === cartA_item1_id);
            const item2 = find(items, (item) => item?.id === cartA_item2_id);
            const item3 = find(items, (item) => item?.id === cartA_item3_id);
            const item4 = find(items, (item) => item?.id === cartB_item1_id);
            const item5 = find(items, (item) => item?.id === cartB_item2_id);
            const item6 = find(items, (item) => item?.id === cartB_item3_id);

            expect(item1?.cart).toBeDefined();
            expect(item1?.cart?.id).toBe(cartA_id);
            expect(item1?.cart?.name).toBe(cartA_name);
            expect((item1?.cart?.items as any)?.length).toBe(0);
            // expect((item1?.cart?.items as any)[0]?.id).toBe(cartA_item1_id);
            // expect((item1?.cart?.items as any)[1]?.id).toBe(cartA_item2_id);
            // expect((item1?.cart?.items as any)[2]?.id).toBe(cartA_item3_id);

            expect(item2?.cart).toBeDefined();
            expect(item2?.cart?.id).toBe(cartA_id);
            expect(item2?.cart?.name).toBe(cartA_name);
            expect((item2?.cart?.items as any)?.length).toBe(0);
            // expect((item2?.cart?.items as any)[0]?.id).toBe(cartA_item1_id);
            // expect((item2?.cart?.items as any)[1]?.id).toBe(cartA_item2_id);
            // expect((item2?.cart?.items as any)[2]?.id).toBe(cartA_item3_id);

            expect(item3?.cart).toBeDefined();
            expect(item3?.cart?.id).toBe(cartA_id);
            expect(item3?.cart?.name).toBe(cartA_name);
            expect((item3?.cart?.items as any)?.length).toBe(0);
            // expect((item3?.cart?.items as any)[0]?.id).toBe(cartA_item1_id);
            // expect((item3?.cart?.items as any)[1]?.id).toBe(cartA_item2_id);
            // expect((item3?.cart?.items as any)[2]?.id).toBe(cartA_item3_id);

            expect(item4?.cart).toBeDefined();
            expect(item4?.cart?.id).toBe(cartB_id);
            expect(item4?.cart?.name).toBe(cartB_name);
            expect((item4?.cart?.items as any)?.length).toBe(0);
            // expect((item4?.cart?.items as any)[0]?.id).toBe(cartB_item1_id);
            // expect((item4?.cart?.items as any)[1]?.id).toBe(cartB_item2_id);
            // expect((item4?.cart?.items as any)[2]?.id).toBe(cartB_item3_id);

            expect(item5?.cart).toBeDefined();
            expect(item5?.cart?.id).toBe(cartB_id);
            expect(item5?.cart?.name).toBe(cartB_name);
            expect((item5?.cart?.items as any)?.length).toBe(0);
            // expect((item5?.cart?.items as any)[0]?.id).toBe(cartB_item1_id);
            // expect((item5?.cart?.items as any)[1]?.id).toBe(cartB_item2_id);
            // expect((item5?.cart?.items as any)[2]?.id).toBe(cartB_item3_id);

            expect(item6?.cart).toBeDefined();
            expect(item6?.cart?.id).toBe(cartB_id);
            expect(item6?.cart?.name).toBe(cartB_name);
            expect((item6?.cart?.items as any)?.length).toBe(0);
            // expect((item6?.cart?.items as any)[0]?.id).toBe(cartB_item1_id);
            // expect((item6?.cart?.items as any)[1]?.id).toBe(cartB_item2_id);
            // expect((item6?.cart?.items as any)[2]?.id).toBe(cartB_item3_id);

        });

    });

    describe('#findAllById', () => {

        it('returns related cart mapped by @OneToMany to cart item entities', async () => {

            const items = await cartRepository.findAllById([cartA_id]);
            expect(items).toBeArray();
            expect(items?.length).toBe(1);
            expect(items[0]?.id).toBe(cartA_id);
            expect(items[0]?.items?.length).toBe(3);

            const item1 = find((items[0]?.items as any), (item) => item?.id === cartA_item1_id);
            const item2 = find((items[0]?.items as any), (item) => item?.id === cartA_item2_id);
            const item3 = find((items[0]?.items as any), (item) => item?.id === cartA_item3_id);

            expect(item1?.id).toBe(cartA_item1_id);
            expect(item2?.id).toBe(cartA_item2_id);
            expect(item3?.id).toBe(cartA_item3_id);
        });

        it('returns related cart item mapped by @ManyToOne to cart entity', async () => {
            const items = await cartItemRepository.findAllById([cartA_item1_id]);
            expect(items).toBeArray();
            expect(items?.length).toBe(1);
            const cartItem = items[0];
            expect(cartItem).toBeDefined();

            const cart = cartItem.cart;
            expect(cart).toBeDefined();

            expect(cart?.items?.length).toBe(0);
            // expect((cart?.items as any)[0]?.id).toBe(cartA_item1_id);
            // expect((cart?.items as any)[1]?.id).toBe(cartA_item2_id);
            // expect((cart?.items as any)[2]?.id).toBe(cartA_item3_id);

        });

    });

    describe('#findById', () => {

        it('returns related cart mapped by @OneToMany to cart item entities', async () => {
            const entity : CartEntity | undefined = await cartRepository.findById(cartA_id);
            expect(entity).toBeDefined();
            expect(entity?.id).toBe(cartA_id);
            expect(entity?.items).toBeArray();
            expect(entity?.items?.length).toBe(3);

            const item1 = find((entity?.items as any), (item) => item?.id === cartA_item1_id);
            const item2 = find((entity?.items as any), (item) => item?.id === cartA_item2_id);
            const item3 = find((entity?.items as any), (item) => item?.id === cartA_item3_id);

            expect(item1?.id).toBe(cartA_item1_id);
            expect(item2?.id).toBe(cartA_item2_id);
            expect(item3?.id).toBe(cartA_item3_id);
        });

        it('returns related cart item mapped by @ManyToOne to cart entity', async () => {
            const entity : CartItemEntity | undefined = await cartItemRepository.findById(cartA_item1_id);
            expect(entity).toBeDefined();
            expect(entity?.cart).toBeDefined();

            const cartEntity = entity?.cart;
            expect(cartEntity).toBeDefined();
            expect(cartEntity?.items).toBeArray();
            expect(cartEntity?.items?.length).toBe(0);
            // expect((cartEntity?.items as any)[0]?.id).toBe(cartA_item1_id);
            // expect((cartEntity?.items as any)[1]?.id).toBe(cartA_item2_id);
            // expect((cartEntity?.items as any)[2]?.id).toBe(cartA_item3_id);
        });

    });

    describe('#find', () => {

        it('returns related cart mapped by @OneToMany to cart item entities', async () => {
            const items = await cartRepository.find("name", cartA_name);
            expect(items).toBeArray();
            expect(items?.length).toBe(1);
            expect(items[0]?.id).toBe(cartA_id);
            expect(items[0]?.name).toBe(cartA_name);

            const cartEntity = items[0] as any;
            expect(cartEntity).toBeDefined();
            expect(cartEntity?.items).toBeArray();
            expect(cartEntity?.items?.length).toBe(3);
            expect((cartEntity?.items as any)[0]?.id).toBe(cartA_item1_id);
            expect((cartEntity?.items as any)[1]?.id).toBe(cartA_item2_id);
            expect((cartEntity?.items as any)[2]?.id).toBe(cartA_item3_id);

        });

        it('returns related cart item mapped by @ManyToOne to the cart entity', async () => {
            const items = await cartItemRepository.find("name", cartA_item1_name);
            expect(items).toBeArray();
            expect(items?.length).toBe(1);
            expect(items[0]?.id).toBe(cartA_item1_id);
            expect(items[0]?.name).toBe(cartA_item1_name);

            const cartEntity = items[0]?.cart as any;
            expect(cartEntity).toBeDefined();
            expect(cartEntity?.items).toBeArray();
            expect(cartEntity?.items?.length).toBe(0);
            // expect((cartEntity?.items as any)[0]?.id).toBe(cartA_item1_id);
            // expect((cartEntity?.items as any)[1]?.id).toBe(cartA_item2_id);
            // expect((cartEntity?.items as any)[2]?.id).toBe(cartA_item3_id);

        });

    });

    describe('#saveAll', () => {

        // TODO: Implement support for this user flow: We're missing ability to insert related entities
        it.skip('can save items mapped by @OneToMany', async () => {

            const newItem = new CartItemEntity(
                {
                     name: 'New Item 1'
                }
            );

            const newCart = new CartEntity(
                {
                    name: 'Hello world 1',
                    items: [newItem]
                }
            );

            const savedItems = await cartRepository.saveAll([newCart]);
            expect(savedItems).toBeArray();
            expect(savedItems?.length).toBe(1);

            const savedCart = savedItems[0] as any;
            expect(savedCart).toBeDefined();
            expect(savedCart?.name).toBe('Hello world 1');
            expect(savedCart?.items).toBeArray();
            expect(savedCart?.items?.length).toBe(1);

            const savedCartItem = savedCart?.items[0];

            expect(savedCartItem?.id).toBeDefined();
            expect(savedCartItem?.name).toBe('New Item 1');

        });

        // TODO: Implement support for this user flow: We're missing ability to insert related entities
        it.skip('can save items mapped by @ManyToOne', async () => {

            const newCart = new CartEntity(
                {
                    name: 'Hello world 1',
                    items: []
                }
            );

            const newItem = new CartItemEntity(
                {
                    name: 'New Item 1'
                }
            );

            const savedItems = await cartItemRepository.saveAll([newItem]);
            expect(savedItems).toBeArray();
            expect(savedItems?.length).toBe(1);

            const savedCartItem = savedItems[0] as any;
            expect(savedCartItem?.id).toBeDefined();
            expect(savedCartItem?.name).toBe('New Item 1');

            const savedCart = savedCartItem?.cart as any;
            expect(savedCart).toBeDefined();
            expect(savedCart?.name).toBe('Hello world 1');
            expect(savedCart?.items).toBeArray();
            expect(savedCart?.items?.length).toBe(1);

        });

    });

    describe('#save', () => {

        // TODO: Implement support for this user flow: We're missing ability to insert related entities
        it.skip('can save carts with items mapped by @OneToMany', async () => {

            const newItem = new CartItemEntity(
                {
                    name: 'New Item 1'
                }
            );

            const newEntity = new CartEntity(
                {
                    name: 'Hello world',
                    items: [newItem]
                }
            );

            const savedCart = await cartRepository.save(newEntity);
            expect(savedCart).toBeDefined();
            expect(savedCart?.name).toBe('Hello world');
            expect(savedCart?.items).toBeArray();
            expect(savedCart?.items?.length).toBe(1);

            const savedCartItem = savedCart?.items[0];

            expect(savedCartItem?.id).toBeDefined();
            expect(savedCartItem?.name).toBe('New Item 1');

        });

        // TODO: Implement support for this user flow: We're missing ability to insert related entities
        it.skip('can save carts mapped to items by @ManyToOne', async () => {

            const newEntity = new CartEntity(
                {
                    name: 'Hello world',
                    items: []
                }
            );

            const newItem = new CartItemEntity(
                {
                    name: 'New Item 1'
                }
            );

            const savedCartItem = await cartItemRepository.save(newItem);
            expect(savedCartItem?.id).toBeDefined();
            expect(savedCartItem?.name).toBe('New Item 1');

            const savedCart = savedCartItem?.cart;
            expect(savedCart).toBeDefined();
            expect(savedCart?.name).toBe('Hello world');
            expect(savedCart?.items).toBeArray();
            expect(savedCart?.items?.length).toBe(1);

        });

    });

    describe('#findAllByName', () => {

        it('returns related cart mapped by @OneToMany to cart item entities', async () => {

            const items = await cartRepository.findAllByName(cartA_name);
            expect(items).toBeArray();
            expect(items?.length).toBe(1);

            const cartEntity = items[0] as any;
            expect(cartEntity).toBeDefined();
            expect(cartEntity?.id).toBe(cartA_id);
            expect(cartEntity?.name).toBe(cartA_name);
            expect(cartEntity?.items).toBeArray();
            expect(cartEntity?.items?.length).toBe(3);
            expect((cartEntity?.items as any)[0]?.id).toBe(cartA_item1_id);
            expect((cartEntity?.items as any)[1]?.id).toBe(cartA_item2_id);
            expect((cartEntity?.items as any)[2]?.id).toBe(cartA_item3_id);

        });

        it('returns related cart items mapped by @ManyToOne to the cart entity', async () => {
            const items = await cartItemRepository.findAllByName(cartA_item1_name);
            expect(items).toBeArray();
            expect(items?.length).toBe(1);

            const cartItemEntity = items[0] as any;
            expect( cartItemEntity?.id ).toBe(cartA_item1_id);
            expect( cartItemEntity?.name ).toBe(cartA_item1_name);

            const cartEntity = cartItemEntity?.cart as any;
            expect(cartEntity).toBeDefined();
            expect(cartEntity?.id).toBe(cartA_id);
            expect(cartEntity?.name).toBe(cartA_name);
            expect(cartEntity?.items).toBeArray();
            expect(cartEntity?.items?.length).toBe(0);
            // expect((cartEntity?.items as any)[0]?.id).toBe(cartA_item1_id);
            // expect((cartEntity?.items as any)[1]?.id).toBe(cartA_item2_id);
            // expect((cartEntity?.items as any)[2]?.id).toBe(cartA_item3_id);

        });

    });

    describe('#findByName', () => {

        it('returns related cart mapped by @OneToMany to cart item entities', async () => {
            const cartEntity : CartEntity | undefined = await cartRepository.findByName(cartA_name);
            expect(cartEntity).toBeDefined();
            expect(cartEntity?.id).toBe(cartA_id);
            expect(cartEntity?.name).toBe(cartA_name);
            expect(cartEntity?.items).toBeArray();
            expect(cartEntity?.items?.length).toBe(3);
            expect((cartEntity?.items as any)[0]?.id).toBe(cartA_item1_id);
            expect((cartEntity?.items as any)[1]?.id).toBe(cartA_item2_id);
            expect((cartEntity?.items as any)[2]?.id).toBe(cartA_item3_id);
        });

        it('returns related cart items mapped by @ManyToOne to the cart entity', async () => {

            const cartItemEntity : CartItemEntity | undefined = await cartItemRepository.findByName(cartA_item1_name);
            expect( cartItemEntity ).toBeDefined();
            expect( cartItemEntity?.id ).toBe(cartA_item1_id);
            expect( cartItemEntity?.name ).toBe(cartA_item1_name);

            const cartEntity = cartItemEntity?.cart as any;

            expect(cartEntity).toBeDefined();
            expect(cartEntity?.id).toBe(cartA_id);
            expect(cartEntity?.name).toBe(cartA_name);
            expect(cartEntity?.items).toBeArray();
            expect(cartEntity?.items?.length).toBe(0);
            // expect((cartEntity?.items as any)[0]?.id).toBe(cartA_item1_id);
            // expect((cartEntity?.items as any)[1]?.id).toBe(cartA_item2_id);
            // expect((cartEntity?.items as any)[2]?.id).toBe(cartA_item3_id);
        });

        it('returns related cart items mapped by @ManyToOne to the cart entity when there is a removed cart', async () => {

            // First we'll remove the linked item, so it cannot be left joined.
            await cartRepository.deleteById(cartA_id);

            const cartItemEntity : CartItemEntity | undefined = await cartItemRepository.findByName(cartA_item1_name);
            expect( cartItemEntity ).toBeDefined();
            expect( cartItemEntity?.id ).toBe(cartA_item1_id);
            expect( cartItemEntity?.name ).toBe(cartA_item1_name);
            expect( cartItemEntity?.cart ).toBeUndefined();
        });

    });

};
