// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import "../../jest/matchers/index";
import { Column, Entity, Id, Table } from "./Entity";
import { EntityMetadata } from "./types/EntityMetadata";
import { createEntityField, EntityField } from "./types/EntityField";
import { OneToMany } from "./OneToMany";
import { JoinColumn } from "./JoinColumn";
import { EntityFieldType } from "./types/EntityFieldType";
import { ManyToOne } from "./ManyToOne";
import { createEntityRelationManyToOne, EntityRelationManyToOne } from "./types/EntityRelationManyToOne";

describe('ManyToOne', () => {

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

    let entity : CartItemEntity;
    let metadata : EntityMetadata;

    beforeEach(() => {
        entity = new CartItemEntity();
        metadata = entity.getMetadata();
    });

    it('can set fields metadata for cart property', () => {
        const expectedItem : EntityRelationManyToOne = createEntityRelationManyToOne("cart");
        expect(metadata.manyToOneRelations).toBeArray();
        expect(metadata.manyToOneRelations).toContainEqual(expectedItem);
    });

});
