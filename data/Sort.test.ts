// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SortOrder } from "./types/SortOrder";
import { SortDirection } from "./types/SortDirection";
import { Sort } from "./Sort";

describe("Sort", () => {

    describe("#by", () => {

        it("should create a new instance with given SortOrder array", () => {
            const orders = [
                new SortOrder(SortDirection.ASC, "firstName"),
                new SortOrder(SortDirection.DESC, "lastName"),
            ];
            const sort = Sort.by(orders);
            expect(sort.getSortOrders()).toStrictEqual(orders);
        });

        it("should create a new instance with given property names", () => {
            const sort = Sort.by("firstName", "lastName");

            expect(sort.getSortOrders()).toStrictEqual([
                                                 new SortOrder(Sort.DEFAULT_DIRECTION, "firstName"),
                                                 new SortOrder(Sort.DEFAULT_DIRECTION, "lastName"),
                                             ]);
        });

        it("should create a new instance with given SortDirection and property names", () => {
            const sort = Sort.by(SortDirection.ASC, "firstName", "lastName");

            expect(sort.getSortOrders()).toStrictEqual([
                                                 new SortOrder(SortDirection.ASC, "firstName"),
                                                 new SortOrder(SortDirection.ASC, "lastName"),
                                             ]);
        });

        it("should create a new instance with given SortOrder objects", () => {
            const a = new SortOrder(SortDirection.ASC, "firstName");
            const b = new SortOrder(SortDirection.DESC, "lastName");
            const sort = Sort.by(a, b);
            expect(sort.getSortOrders()).toStrictEqual([a, b]);
        });

        it("should create a new instance with default SortDirection for property names", () => {
            const sort = Sort.by("firstName", "lastName");

            expect(sort.getSortOrders()).toEqual([
                                                 new SortOrder(Sort.DEFAULT_DIRECTION, "firstName"),
                                                 new SortOrder(Sort.DEFAULT_DIRECTION, "lastName"),
                                             ]);
        });

        it("should throw an error for invalid arguments", () => {
            // @ts-ignore
            expect(() => Sort.by({})).toThrowError(TypeError);
            // @ts-ignore
            expect(() => Sort.by("firstName", {})).toThrowError(TypeError);
            expect(() => Sort.by(3)).toThrowError(TypeError);
        });

    });

    describe("#Direction", () => {
        it("should define sort direction constants", () => {
            expect(Sort.Direction.ASC).toEqual(SortDirection.ASC);
            expect(Sort.Direction.DESC).toEqual(SortDirection.DESC);
        });
    });

});
