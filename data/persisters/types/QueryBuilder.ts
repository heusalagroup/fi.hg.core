// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export interface QueryBuilder {

    build () : [string, any[]];
    buildQueryString () : string;
    buildQueryValues () : any[];
    getQueryValueFactories () : (() => any)[];

}
