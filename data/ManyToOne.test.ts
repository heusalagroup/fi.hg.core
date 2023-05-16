// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import "../../jest/matchers/index";
import { EntityMetadata } from "./types/EntityMetadata";
import { OneToMany } from "./OneToMany";
import { JoinColumn } from "./JoinColumn";
import { ManyToOne } from "./ManyToOne";
import { createEntityRelationManyToOne, EntityRelationManyToOne } from "./types/EntityRelationManyToOne";
import { Table } from "./Table";
import { Entity } from "./Entity";
import { Id } from "./Id";
import { Column } from "./Column";

describe('ManyToOne', () => {

    @Table('carts')
    class CartEntity extends Entity {

        constructor () {
            super();
        }

        @Id()
        @Column('cart_id')
        public cartId ?: string;

        @OneToMany("cart_items", "cart")
        public cartItems ?: readonly CartItemEntity[];

    }

    @Table('cart_items')
    class CartItemEntity extends Entity {

        constructor () {
            super();
        }

        @Id()
        @Column('cart_item_id')
        public cartItemId ?: string;

        @ManyToOne(CartEntity)
        @JoinColumn('cart_id', false)
        public cart ?: CartEntity;

    }

    let entity : CartItemEntity;
    let metadata : EntityMetadata;

    beforeEach(() => {
        entity = new CartItemEntity();
        metadata = entity.getMetadata();
    });

    it('can set fields metadata for cart property', () => {
        const expectedItem : EntityRelationManyToOne = createEntityRelationManyToOne("cart", "carts");
        expect(metadata.manyToOneRelations).toBeArray();
        expect(metadata.manyToOneRelations).toContainEqual(expectedItem);
    });

});
