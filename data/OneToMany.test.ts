// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import "../../jest/matchers/index";
import { Column, Entity, Id, Table } from "./Entity";
import { EntityMetadata } from "./types/EntityMetadata";
import { OneToMany } from "./OneToMany";
import { JoinColumn } from "./JoinColumn";
import { ManyToOne } from "./ManyToOne";
import { createEntityRelationOneToMany, EntityRelationOneToMany } from "./types/EntityRelationOneToMany";

describe('OneToMany', () => {

    @Table('carts')
    class CartEntity extends Entity {

        constructor () {
            super();
        }

        @Id()
        @Column('cart_id')
        public cartId ?: string;

        @OneToMany("cart")
        public cartItems ?: readonly CartItemEntity[];

    }

    class CartItemEntity extends Entity {

        constructor () {
            super();
        }

        @Id()
        @Column('cart_item_id')
        public cartItemId ?: string;

        @ManyToOne()
        @JoinColumn('cart_id', false)
        public cart ?: CartEntity;

    }

    let entity : CartEntity;
    let metadata : EntityMetadata;

    beforeEach(() => {
        entity = new CartEntity();
        metadata = entity.getMetadata();
    });

    it('can set fields metadata for cart property', () => {
        const expectedItem : EntityRelationOneToMany = createEntityRelationOneToMany("cartItems", "cart");
        expect(metadata.oneToManyRelations).toBeArray();
        expect(metadata.oneToManyRelations).toContainEqual(expectedItem);
    });

});
