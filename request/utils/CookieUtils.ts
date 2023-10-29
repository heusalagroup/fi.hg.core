// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { indexOf } from "../../functions/indexOf";
import { map } from "../../functions/map";
import { reduce } from "../../functions/reduce";
import { split } from "../../functions/split";
import { Cookie } from "../types/Cookie";
import { CookieLike } from "../types/CookieLike";
import { isArray } from "../../types/Array";

export class CookieUtils {

    public static parseCookies (value: string | readonly string[]) : CookieLike[] {
        return map(
            reduce(
                isArray(value) ? value : [value],
                (ret: string[], item: string) : string[] => {
                    return [
                        ...ret,
                        ...split(item, /; */),
                    ];
                },
                []
            ),
            (item: string) : CookieLike => {
                const i : number = indexOf(item, '=');
                if (i < 0) {
                    return Cookie.create(
                        item,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                    );
                }
                const key : string = item.substring(0, i);
                const value : string = item.substring(i+1);
                return Cookie.create(
                    key,
                    value,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                );
            }
        );
    }

}
