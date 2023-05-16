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
import { EntityUtils } from "../utils/EntityUtils";
import { LogLevel } from "../../types/LogLevel";
import { isString } from "../../types/String";
import { Table } from "../Table";
import { Entity } from "../Entity";
import { Id } from "../Id";
import { Column } from "../Column";

export const entityRelationshipTests = (context : RepositoryTestContext) : void => {

    @Table('carts')
    class CartEntity extends Entity {

        constructor (dto ?: {readonly cartItems ?: readonly CartItemEntity[], readonly cartName ?: string}) {
            super();
            this.cartItems = dto?.cartItems ?? [];
            this.cartName = dto?.cartName;
        }

        @Id()
        @Column('cart_id', 'BIGINT')
        public cartId ?: string;

        @Column('cart_name')
        public cartName ?: string;

        @OneToMany("cart")
        public cartItems : readonly CartItemEntity[];

    }

    @Table('cart_items')
    class CartItemEntity extends Entity {

        constructor (dto ?: {readonly cartId ?: string, readonly cartItemName ?: string}) {
            super();
            this.cartId = dto?.cartId;
            this.cartItemName = dto?.cartItemName;
        }

        @Id()
        @Column('cart_item_id', 'BIGINT')
        public cartItemId ?: string;

        @Column('cart_id', 'BIGINT')
        public cartId ?: string;

        @Column('cart_item_name')
        public cartItemName ?: string;

        @ManyToOne(CartEntity)
        @JoinColumn('cart_id', false)
        public cart ?: CartEntity;

    }

    interface CartRepository extends Repository<CartEntity, string> {

        findAllByCartName (name: string) : Promise<CartEntity[]>;
        findByCartName (name: string): Promise<CartEntity | undefined>;

    }

    interface CartItemRepository extends Repository<CartItemEntity, string> {

        findAllByCartItemName (name: string) : Promise<CartItemEntity[]>;
        findByCartItemName (name: string): Promise<CartItemEntity | undefined>;

    }

    let persister : Persister;
    let cartRepository : CartRepository;
    let cartItemRepository : CartItemRepository;

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

    beforeEach( async () => {

        EntityUtils.setLogLevel(LogLevel.NONE);

        persister = context.getPersister();

        cartRepository = createCrudRepositoryWithPersister<CartEntity, string, CartRepository>(
            new CartEntity(),
            persister
        );

        cartItemRepository = createCrudRepositoryWithPersister<CartItemEntity, string, CartItemRepository>(
            new CartItemEntity(),
            persister
        );

        await cartRepository.deleteAll();
        await cartItemRepository.deleteAll();

        // LOG.debug(`Step 1`)
        cartA = new CartEntity({cartName: cartA_name});
        cartA = await persister.insert(
            cartA.getMetadata(),
            cartA,
        );
        cartA_id = cartA?.cartId as string;
        if (!isString(cartA_id)) throw new TypeError(`cartA_id failed to initialize: ${JSON.stringify(cartA_id)}`);

        // LOG.debug(`Step 2`)
        cartA_item1 = new CartItemEntity({cartId: cartA_id, cartItemName: cartA_item1_name});
        cartA_item1 = await persister.insert(
            cartA_item1.getMetadata(),
            cartA_item1,
        );
        cartA_item1_id = cartA_item1?.cartItemId as string;
        if (!isString(cartA_item1_id)) throw new TypeError(`cartItemA1_id failed to initialize: ${JSON.stringify(cartA_item1_id)}`);

        // LOG.debug(`Step 3`)
        cartA_item2 = new CartItemEntity({cartId: cartA_id, cartItemName: cartA_item2_name});
        cartA_item2 = await persister.insert(
            cartA_item2.getMetadata(),
            cartA_item2,
        );
        cartA_item2_id = cartA_item2?.cartItemId as string;
        if (!isString(cartA_item2_id)) throw new TypeError(`cartItemA2_id failed to initialize: ${JSON.stringify(cartA_item2_id)}`);

        // LOG.debug(`Step 4`)
        cartA_item3 = new CartItemEntity({cartId: cartA_id, cartItemName: cartA_item3_name});
        cartA_item3 = await persister.insert(
            cartA_item3.getMetadata(),
            cartA_item3,
        );
        cartA_item3_id = cartA_item3?.cartItemId as string;
        if (!isString(cartA_item3_id)) throw new TypeError(`cartItemA3_id failed to initialize: ${JSON.stringify(cartA_item3_id)}`);

        // LOG.debug(`Step 5`)
        cartB = new CartEntity({cartName: cartB_name});
        cartB = await persister.insert(
            cartB.getMetadata(),
            cartB,
        );
        cartB_id = cartB?.cartId as string;
        if (!isString(cartB_id)) throw new TypeError(`cartB_id failed to initialize: ${JSON.stringify(cartB_id)}`);

        // LOG.debug(`Step 6`)
        cartB_item1 = new CartItemEntity({cartId: cartB_id, cartItemName: cartB_item1_name});
        cartB_item1 = await persister.insert(
            cartB_item1.getMetadata(),
            cartB_item1,
        );
        cartB_item1_id = cartB_item1?.cartItemId as string;
        if (!isString(cartB_item1_id)) throw new TypeError(`cartB_item1_id failed to initialize: ${JSON.stringify(cartB_item1_id)}`);

        // LOG.debug(`Step 7`)
        cartB_item2 = new CartItemEntity({cartId: cartB_id, cartItemName: cartB_item2_name});
        cartB_item2 = await persister.insert(
            cartB_item2.getMetadata(),
            cartB_item2,
        );
        cartB_item2_id = cartB_item2?.cartItemId as string;
        if (!isString(cartB_item2_id)) throw new TypeError(`cartB_item2_id failed to initialize: ${JSON.stringify(cartB_item2_id)}`);

        // LOG.debug(`Step 8`)
        cartB_item3 = new CartItemEntity({cartId: cartB_id, cartItemName: cartB_item3_name});
        cartB_item3 = await persister.insert(
            cartB_item3.getMetadata(),
            cartB_item3,
        );
        cartB_item3_id = cartB_item3?.cartItemId as string;
        if (!isString(cartB_item3_id)) throw new TypeError(`cartB_item3_id failed to initialize: ${JSON.stringify(cartB_item3_id)}`);

        // LOG.debug(`Step 9`)

    });

    describe('#findAll', () => {

        it('returns related cart items mapped by @OneToMany', async () => {

            const items = await cartRepository.findAll();
            expect(items).toBeArray();
            expect(items?.length).toBe(2);

            const cart1 = find(items, (item) : boolean => item.cartId === cartA_id);
            const cart2 = find(items, (item) : boolean => item.cartId === cartB_id);
            expect(cart1?.cartId).toBe(cartA_id);
            expect(cart2?.cartId).toBe(cartB_id);

            expect((cart1?.cartItems as any)?.length).toBe(3);

            const cart1_item1 = find(cart1?.cartItems, (item) => item.cartItemId === cartA_item1_id);
            const cart1_item2 = find(cart1?.cartItems, (item) => item.cartItemId === cartA_item2_id);
            const cart1_item3 = find(cart1?.cartItems, (item) => item.cartItemId === cartA_item3_id);
            expect(cart1_item1?.cartItemId).toBe(cartA_item1_id);
            expect(cart1_item2?.cartItemId).toBe(cartA_item2_id);
            expect(cart1_item3?.cartItemId).toBe(cartA_item3_id);

            expect((cart2?.cartItems as any)?.length).toBe(3);

            const cart2_item1 = find(cart2?.cartItems, (item) => item.cartItemId === cartB_item1_id);
            const cart2_item2 = find(cart2?.cartItems, (item) => item.cartItemId === cartB_item2_id);
            const cart2_item3 = find(cart2?.cartItems, (item) => item.cartItemId === cartB_item3_id);
            expect(cart2_item1?.cartItemId).toBe(cartB_item1_id);
            expect(cart2_item2?.cartItemId).toBe(cartB_item2_id);
            expect(cart2_item3?.cartItemId).toBe(cartB_item3_id);

        });

        it('returns related cart items mapped by @ManyToOne', async () => {

            const items = await cartItemRepository.findAll();
            expect(items).toBeArray();
            expect(items?.length).toBe(6);

            const item1 = find(items, (item) => item?.cartItemId === cartA_item1_id);
            const item2 = find(items, (item) => item?.cartItemId === cartA_item2_id);
            const item3 = find(items, (item) => item?.cartItemId === cartA_item3_id);
            const item4 = find(items, (item) => item?.cartItemId === cartB_item1_id);
            const item5 = find(items, (item) => item?.cartItemId === cartB_item2_id);
            const item6 = find(items, (item) => item?.cartItemId === cartB_item3_id);

            expect(item1?.cart).toBeDefined();
            expect(item1?.cart?.cartId).toBe(cartA_id);
            expect(item1?.cart?.cartName).toBe(cartA_name);
            expect((item1?.cart?.cartItems as any)?.length).toBe(0);
            // expect((item1?.cart?.cartItems as any)[0]?.cartItemId).toBe(cartA_item1_id);
            // expect((item1?.cart?.cartItems as any)[1]?.cartItemId).toBe(cartA_item2_id);
            // expect((item1?.cart?.cartItems as any)[2]?.cartItemId).toBe(cartA_item3_id);

            expect(item2?.cart).toBeDefined();
            expect(item2?.cart?.cartId).toBe(cartA_id);
            expect(item2?.cart?.cartName).toBe(cartA_name);
            expect((item2?.cart?.cartItems as any)?.length).toBe(0);
            // expect((item2?.cart?.cartItems as any)[0]?.cartItemId).toBe(cartA_item1_id);
            // expect((item2?.cart?.cartItems as any)[1]?.cartItemId).toBe(cartA_item2_id);
            // expect((item2?.cart?.cartItems as any)[2]?.cartItemId).toBe(cartA_item3_id);

            expect(item3?.cart).toBeDefined();
            expect(item3?.cart?.cartId).toBe(cartA_id);
            expect(item3?.cart?.cartName).toBe(cartA_name);
            expect((item3?.cart?.cartItems as any)?.length).toBe(0);
            // expect((item3?.cart?.cartItems as any)[0]?.cartItemId).toBe(cartA_item1_id);
            // expect((item3?.cart?.cartItems as any)[1]?.cartItemId).toBe(cartA_item2_id);
            // expect((item3?.cart?.cartItems as any)[2]?.cartItemId).toBe(cartA_item3_id);

            expect(item4?.cart).toBeDefined();
            expect(item4?.cart?.cartId).toBe(cartB_id);
            expect(item4?.cart?.cartName).toBe(cartB_name);
            expect((item4?.cart?.cartItems as any)?.length).toBe(0);
            // expect((item4?.cart?.cartItems as any)[0]?.cartItemId).toBe(cartB_item1_id);
            // expect((item4?.cart?.cartItems as any)[1]?.cartItemId).toBe(cartB_item2_id);
            // expect((item4?.cart?.cartItems as any)[2]?.cartItemId).toBe(cartB_item3_id);

            expect(item5?.cart).toBeDefined();
            expect(item5?.cart?.cartId).toBe(cartB_id);
            expect(item5?.cart?.cartName).toBe(cartB_name);
            expect((item5?.cart?.cartItems as any)?.length).toBe(0);
            // expect((item5?.cart?.cartItems as any)[0]?.cartItemId).toBe(cartB_item1_id);
            // expect((item5?.cart?.cartItems as any)[1]?.cartItemId).toBe(cartB_item2_id);
            // expect((item5?.cart?.cartItems as any)[2]?.cartItemId).toBe(cartB_item3_id);

            expect(item6?.cart).toBeDefined();
            expect(item6?.cart?.cartId).toBe(cartB_id);
            expect(item6?.cart?.cartName).toBe(cartB_name);
            expect((item6?.cart?.cartItems as any)?.length).toBe(0);
            // expect((item6?.cart?.cartItems as any)[0]?.cartItemId).toBe(cartB_item1_id);
            // expect((item6?.cart?.cartItems as any)[1]?.cartItemId).toBe(cartB_item2_id);
            // expect((item6?.cart?.cartItems as any)[2]?.cartItemId).toBe(cartB_item3_id);

        });

    });

    describe('#findAllById', () => {

        it('returns related cart mapped by @OneToMany to cart item entities', async () => {
            const items = await cartRepository.findAllById([cartA_id]);
            expect(items).toBeArray();
            expect(items?.length).toBe(1);
            expect(items[0]?.cartId).toBe(cartA_id);
            expect(items[0]?.cartItems?.length).toBe(3);

            const item1 = find((items[0]?.cartItems as any), (item) => item?.cartItemId === cartA_item1_id);
            const item2 = find((items[0]?.cartItems as any), (item) => item?.cartItemId === cartA_item2_id);
            const item3 = find((items[0]?.cartItems as any), (item) => item?.cartItemId === cartA_item3_id);

            expect(item1?.cartItemId).toBe(cartA_item1_id);
            expect(item2?.cartItemId).toBe(cartA_item2_id);
            expect(item3?.cartItemId).toBe(cartA_item3_id);
        });

        it('returns related cart item mapped by @ManyToOne to cart entity', async () => {
            const items = await cartItemRepository.findAllById([cartA_item1_id]);
            expect(items).toBeArray();
            expect(items?.length).toBe(1);
            const cartItem = items[0];
            expect(cartItem).toBeDefined();

            const cart = cartItem.cart;
            expect(cart).toBeDefined();

            expect(cart?.cartItems?.length).toBe(0);
            // expect((cart?.cartItems as any)[0]?.cartItemId).toBe(cartA_item1_id);
            // expect((cart?.cartItems as any)[1]?.cartItemId).toBe(cartA_item2_id);
            // expect((cart?.cartItems as any)[2]?.cartItemId).toBe(cartA_item3_id);

        });

    });

    describe('#findById', () => {

        it('returns related cart mapped by @OneToMany to cart item entities', async () => {
            const entity : CartEntity | undefined = await cartRepository.findById(cartA_id);
            expect(entity).toBeDefined();
            expect(entity?.cartId).toBe(cartA_id);
            expect(entity?.cartItems).toBeArray();
            expect(entity?.cartItems?.length).toBe(3);

            const item1 = find((entity?.cartItems as any), (item) => item?.cartItemId === cartA_item1_id);
            const item2 = find((entity?.cartItems as any), (item) => item?.cartItemId === cartA_item2_id);
            const item3 = find((entity?.cartItems as any), (item) => item?.cartItemId === cartA_item3_id);

            expect(item1?.cartItemId).toBe(cartA_item1_id);
            expect(item2?.cartItemId).toBe(cartA_item2_id);
            expect(item3?.cartItemId).toBe(cartA_item3_id);
        });

        it('returns related cart item mapped by @ManyToOne to cart entity', async () => {
            const entity : CartItemEntity | undefined = await cartItemRepository.findById(cartA_item1_id);
            expect(entity).toBeDefined();
            expect(entity?.cart).toBeDefined();

            const cartEntity = entity?.cart;
            expect(cartEntity).toBeDefined();
            expect(cartEntity?.cartItems).toBeArray();
            expect(cartEntity?.cartItems?.length).toBe(0);
            // expect((cartEntity?.cartItems as any)[0]?.cartItemId).toBe(cartA_item1_id);
            // expect((cartEntity?.cartItems as any)[1]?.cartItemId).toBe(cartA_item2_id);
            // expect((cartEntity?.cartItems as any)[2]?.cartItemId).toBe(cartA_item3_id);
        });

    });

    describe('#find', () => {

        it('returns related cart mapped by @OneToMany to cart item entities', async () => {
            const items = await cartRepository.find("cartName", cartA_name);
            expect(items).toBeArray();
            expect(items?.length).toBe(1);
            expect(items[0]?.cartId).toBe(cartA_id);
            expect(items[0]?.cartName).toBe(cartA_name);

            const cartEntity = items[0] as any;
            expect(cartEntity).toBeDefined();
            expect(cartEntity?.cartItems).toBeArray();
            expect(cartEntity?.cartItems?.length).toBe(3);
            expect((cartEntity?.cartItems as any)[0]?.cartItemId).toBe(cartA_item1_id);
            expect((cartEntity?.cartItems as any)[1]?.cartItemId).toBe(cartA_item2_id);
            expect((cartEntity?.cartItems as any)[2]?.cartItemId).toBe(cartA_item3_id);

        });

        it('returns related cart item mapped by @ManyToOne to the cart entity', async () => {
            const items = await cartItemRepository.find("cartItemName", cartA_item1_name);
            expect(items).toBeArray();
            expect(items?.length).toBe(1);
            expect(items[0]?.cartItemId).toBe(cartA_item1_id);
            expect(items[0]?.cartItemName).toBe(cartA_item1_name);

            const cartEntity = items[0]?.cart as any;
            expect(cartEntity).toBeDefined();
            expect(cartEntity?.cartItems).toBeArray();
            expect(cartEntity?.cartItems?.length).toBe(0);
            // expect((cartEntity?.cartItems as any)[0]?.cartItemId).toBe(cartA_item1_id);
            // expect((cartEntity?.cartItems as any)[1]?.cartItemId).toBe(cartA_item2_id);
            // expect((cartEntity?.cartItems as any)[2]?.cartItemId).toBe(cartA_item3_id);

        });

    });

    describe('#saveAll', () => {

        // TODO: Implement support for this user flow: We're missing ability to insert related entities
        it.skip('can save items mapped by @OneToMany', async () => {

            const newItem = new CartItemEntity(
                {
                     cartItemName: 'New Item 1'
                }
            );

            const newCart = new CartEntity(
                {
                    cartName: 'Hello world 1',
                    cartItems: [newItem]
                }
            );

            const savedItems = await cartRepository.saveAll([newCart]);
            expect(savedItems).toBeArray();
            expect(savedItems?.length).toBe(1);

            const savedCart = savedItems[0] as any;
            expect(savedCart).toBeDefined();
            expect(savedCart?.cartName).toBe('Hello world 1');
            expect(savedCart?.cartItems).toBeArray();
            expect(savedCart?.cartItems?.length).toBe(1);

            const savedCartItem = savedCart?.cartItems[0];

            expect(savedCartItem?.cartItemId).toBeDefined();
            expect(savedCartItem?.cartItemName).toBe('New Item 1');

        });

        // TODO: Implement support for this user flow: We're missing ability to insert related entities
        it.skip('can save items mapped by @ManyToOne', async () => {

            const newCart = new CartEntity(
                {
                    cartName: 'Hello world 1',
                    cartItems: []
                }
            );

            const newItem = new CartItemEntity(
                {
                    cartItemName: 'New Item 1'
                }
            );

            const savedItems = await cartItemRepository.saveAll([newItem]);
            expect(savedItems).toBeArray();
            expect(savedItems?.length).toBe(1);

            const savedCartItem = savedItems[0] as any;
            expect(savedCartItem?.cartItemId).toBeDefined();
            expect(savedCartItem?.cartItemName).toBe('New Item 1');

            const savedCart = savedCartItem?.cart as any;
            expect(savedCart).toBeDefined();
            expect(savedCart?.cartName).toBe('Hello world 1');
            expect(savedCart?.cartItems).toBeArray();
            expect(savedCart?.cartItems?.length).toBe(1);

        });

    });

    describe('#save', () => {

        // TODO: Implement support for this user flow: We're missing ability to insert related entities
        it.skip('can save carts with items mapped by @OneToMany', async () => {

            const newItem = new CartItemEntity(
                {
                    cartItemName: 'New Item 1'
                }
            );

            const newEntity = new CartEntity(
                {
                    cartName: 'Hello world',
                    cartItems: [newItem]
                }
            );

            const savedCart = await cartRepository.save(newEntity);
            expect(savedCart).toBeDefined();
            expect(savedCart?.cartName).toBe('Hello world');
            expect(savedCart?.cartItems).toBeArray();
            expect(savedCart?.cartItems?.length).toBe(1);

            const savedCartItem = savedCart?.cartItems[0];

            expect(savedCartItem?.cartItemId).toBeDefined();
            expect(savedCartItem?.cartItemName).toBe('New Item 1');

        });

        // TODO: Implement support for this user flow: We're missing ability to insert related entities
        it.skip('can save carts mapped to items by @ManyToOne', async () => {

            const newEntity = new CartEntity(
                {
                    cartName: 'Hello world',
                    cartItems: []
                }
            );

            const newItem = new CartItemEntity(
                {
                    cartItemName: 'New Item 1'
                }
            );

            const savedCartItem = await cartItemRepository.save(newItem);
            expect(savedCartItem?.cartItemId).toBeDefined();
            expect(savedCartItem?.cartItemName).toBe('New Item 1');

            const savedCart = savedCartItem?.cart;
            expect(savedCart).toBeDefined();
            expect(savedCart?.cartName).toBe('Hello world');
            expect(savedCart?.cartItems).toBeArray();
            expect(savedCart?.cartItems?.length).toBe(1);

        });

    });

    describe('#findAllByCartName', () => {

        it('returns related cart mapped by @OneToMany to cart item entities', async () => {
            const items = await cartRepository.findAllByCartName(cartA_name);
            expect(items).toBeArray();
            expect(items?.length).toBe(1);

            const cartEntity = items[0] as any;
            expect(cartEntity).toBeDefined();
            expect(cartEntity?.cartId).toBe(cartA_id);
            expect(cartEntity?.cartName).toBe(cartA_name);
            expect(cartEntity?.cartItems).toBeArray();
            expect(cartEntity?.cartItems?.length).toBe(3);
            expect((cartEntity?.cartItems as any)[0]?.cartItemId).toBe(cartA_item1_id);
            expect((cartEntity?.cartItems as any)[1]?.cartItemId).toBe(cartA_item2_id);
            expect((cartEntity?.cartItems as any)[2]?.cartItemId).toBe(cartA_item3_id);

        });

    });

    describe('#findByCartName', () => {

        it('returns related cart mapped by @OneToMany to cart item entities', async () => {
            const cartEntity : CartEntity | undefined = await cartRepository.findByCartName(cartA_name);
            expect(cartEntity).toBeDefined();
            expect(cartEntity?.cartId).toBe(cartA_id);
            expect(cartEntity?.cartName).toBe(cartA_name);
            expect(cartEntity?.cartItems).toBeArray();
            expect(cartEntity?.cartItems?.length).toBe(3);
            expect((cartEntity?.cartItems as any)[0]?.cartItemId).toBe(cartA_item1_id);
            expect((cartEntity?.cartItems as any)[1]?.cartItemId).toBe(cartA_item2_id);
            expect((cartEntity?.cartItems as any)[2]?.cartItemId).toBe(cartA_item3_id);
        });

    });

    describe('#findAllByCartItemName', () => {

        it('returns related cart items mapped by @ManyToOne to the cart entity', async () => {
            const items = await cartItemRepository.findAllByCartItemName(cartA_item1_name);
            expect(items).toBeArray();
            expect(items?.length).toBe(1);

            const cartItemEntity = items[0] as any;
            expect( cartItemEntity?.cartItemId ).toBe(cartA_item1_id);
            expect( cartItemEntity?.cartItemName ).toBe(cartA_item1_name);

            const cartEntity = cartItemEntity?.cart as any;
            expect(cartEntity).toBeDefined();
            expect(cartEntity?.cartId).toBe(cartA_id);
            expect(cartEntity?.cartName).toBe(cartA_name);
            expect(cartEntity?.cartItems).toBeArray();
            expect(cartEntity?.cartItems?.length).toBe(0);
            // expect((cartEntity?.cartItems as any)[0]?.cartItemId).toBe(cartA_item1_id);
            // expect((cartEntity?.cartItems as any)[1]?.cartItemId).toBe(cartA_item2_id);
            // expect((cartEntity?.cartItems as any)[2]?.cartItemId).toBe(cartA_item3_id);

        });

    });

    describe('#findByCartItemName', () => {

        it('returns related cart items mapped by @ManyToOne to the cart entity', async () => {
            const cartItemEntity : CartItemEntity | undefined = await cartItemRepository.findByCartItemName(cartA_item1_name);
            expect( cartItemEntity ).toBeDefined();
            expect( cartItemEntity?.cartItemId ).toBe(cartA_item1_id);
            expect( cartItemEntity?.cartItemName ).toBe(cartA_item1_name);

            const cartEntity = cartItemEntity?.cart as any;

            expect(cartEntity).toBeDefined();
            expect(cartEntity?.cartId).toBe(cartA_id);
            expect(cartEntity?.cartName).toBe(cartA_name);
            expect(cartEntity?.cartItems).toBeArray();
            expect(cartEntity?.cartItems?.length).toBe(0);
            // expect((cartEntity?.cartItems as any)[0]?.cartItemId).toBe(cartA_item1_id);
            // expect((cartEntity?.cartItems as any)[1]?.cartItemId).toBe(cartA_item2_id);
            // expect((cartEntity?.cartItems as any)[2]?.cartItemId).toBe(cartA_item3_id);
        });

    });

};
