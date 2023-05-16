// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { PersisterMetadataManagerImpl } from "./PersisterMetadataManagerImpl";
import { PersisterMetadataManager } from "./PersisterMetadataManager";
import { EntityMetadata } from "../../types/EntityMetadata";
import { OneToMany } from "../../OneToMany";
import { JoinColumn } from "../../JoinColumn";
import { createEntityRelationOneToMany } from "../../types/EntityRelationOneToMany";
import { LogLevel } from "../../../types/LogLevel";
import { ManyToOne } from "../../ManyToOne";
import { createEntityRelationManyToOne } from "../../types/EntityRelationManyToOne";
import { Table } from "../../Table";
import { Entity } from "../../Entity";
import { Column } from "../../Column";
import { Id } from "../../Id";

describe('PersisterMetadataManagerImpl', () => {

    let manager : PersisterMetadataManager;
    let cartMetadata : EntityMetadata;
    let cartItemMetadata : EntityMetadata;

    beforeEach(
        () => {

            PersisterMetadataManagerImpl.setLogLevel(LogLevel.NONE);
            @Table('carts')
            class CartEntity extends Entity {

                constructor (dto ?: {readonly cartItems ?: readonly CartItemEntity[]}) {
                    super();
                    this.cartItems = dto?.cartItems ?? [];
                }

                @Id()
                @Column('cart_id')
                public cartId ?: string;

                @OneToMany("cart_items","cart")
                public cartItems : readonly CartItemEntity[];

            }

            @Table('cart_items')
            class CartItemEntity extends Entity {

                constructor (dto ?: {readonly cart ?: CartEntity}) {
                    super();
                    this.cart = dto?.cart;
                }

                @Id()
                @Column('cart_item_id')
                public cartItemId ?: string;

                @ManyToOne(CartEntity)
                @JoinColumn('cart_id', false)
                public cart ?: CartEntity;

            }

            cartMetadata = new CartEntity().getMetadata();
            cartItemMetadata = new CartItemEntity().getMetadata();

            manager = new PersisterMetadataManagerImpl();
            manager.setupEntityMetadata(cartMetadata);
            manager.setupEntityMetadata(cartItemMetadata);
        }
    );

    describe('#setupEntityMetadata', () => {
        it('can link @OneToMany to @ManyToOne', () => {
            const metadata = manager.getMetadataByTable('carts');
            expect( metadata?.oneToManyRelations ).toContainEqual(
                createEntityRelationOneToMany('cartItems', 'cart', 'cart_items')
            );
        });
        it('can link @ManyToOne to @OneToMany', () => {
            const metadata = manager.getMetadataByTable('cart_items');
            expect( metadata?.manyToOneRelations ).toContainEqual(
                createEntityRelationManyToOne('cart', 'carts')
            );
        });
    });

    describe('#getMetadataByTable', () => {
        it('can fetch metadata using table name', () => {
            expect( manager.getMetadataByTable('carts') ).toStrictEqual(cartMetadata);
            expect( manager.getMetadataByTable('cart_items') ).toStrictEqual(cartItemMetadata);
        });
        it('cannot fetch metadata using missing table', () => {
            expect( manager.getMetadataByTable('holidays') ).toBe(undefined);
        });
    });

});
