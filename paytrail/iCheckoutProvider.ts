// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.


import { iCheckoutParam } from "./iCheckoutParam";

export interface iCheckoutProvider {
    getName(): string;
    getURL(): string;
    getParams(): iCheckoutParam[];
    getIcon(): string;
}
