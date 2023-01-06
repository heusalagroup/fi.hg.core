// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ColorMapping, ComponentStyleLayoutMapping, FontMapping, SizeMapping, StyleLayout } from "./style/StyleLayout";
import { Styles } from "./style/Styles";
import { filter } from "./functions/filter";
import { get } from "./functions/get";
import { reduce } from "./functions/reduce";
import { ComponentStyleLayout } from "./style/layout/ComponentStyleLayout";
import { createTextStyle, TextStyle } from "./style/compiled/TextStyle";
import { BorderStyle, createBorderStyle } from "./style/compiled/BorderStyle";
import { BackgroundStyle, createBackgroundStyle } from "./style/compiled/BackgroundStyle";
import { Size } from "./style/types/Size";
import { ComponentStyle, createComponentStyle } from "./style/compiled/ComponentStyle";
import { TextStyleLayout } from "./style/layout/TextStyleLayout";
import { BackgroundStyleLayout } from "./style/layout/BackgroundStyleLayout";
import { BorderStyleLayout } from "./style/layout/BorderStyleLayout";
import { BorderType } from "./style/types/BorderType";
import { ColorScheme } from "./style/types/ColorScheme";
import { keys } from "./functions/keys";

export class StyleUtils {

    public static compileTextStyle (
        item   : TextStyleLayout | undefined,
        fonts  : FontMapping,
        sizes  : SizeMapping,
        colors : ColorMapping
    ) : TextStyle {
        const fontId  : string | undefined = item?.font;
        const colorId : string | undefined = item?.color;
        const sizeId  : string | undefined = item?.size;
        return createTextStyle(
            fontId  ? get(fonts  , fontId  ) : undefined,
            colorId ? get(colors , colorId ) : undefined,
            sizeId  ? get(sizes  , sizeId  ) : undefined
        );
    }

    public static compileBorderStyle (
        item   : BorderStyleLayout | undefined,
        sizes  : SizeMapping,
        colors : ColorMapping
    ) : BorderStyle {
        const sizeId   : string | undefined     = item?.size;
        const type     : BorderType | undefined = item?.type;
        const radiusId : string | undefined     = item?.radius;
        const colorId  : string | undefined     = item?.color;
        return createBorderStyle(
            sizeId   ? get(sizes, sizeId   ) : undefined,
            colorId  ? get(colors, colorId  ) : undefined,
            type,
            radiusId ? get(sizes, radiusId ) : undefined
        );
    }

    public static compileBackgroundStyle (
        item   : BackgroundStyleLayout | undefined,
        colors : ColorMapping
    ) : BackgroundStyle {
        const colorId = item?.color;
        return createBackgroundStyle(
            colorId ? get(colors, colorId) : undefined
        );
    }

    public static compileSize (
        sizeId : string | undefined,
        sizes  : SizeMapping
    ) : Size | undefined {
        return sizeId ? get(sizes, sizeId) : undefined;
    }

    public static compilePadding (
        item  : string | undefined,
        sizes : SizeMapping
    ) : Size | undefined {
        return StyleUtils.compileSize(item, sizes);
    }

    public static compileComponentStyle (
        item   : ComponentStyleLayout,
        fonts  : FontMapping,
        sizes  : SizeMapping,
        colors : ColorMapping
    ) : ComponentStyle {
        return createComponentStyle(
            StyleUtils.compileTextStyle(item?.text, fonts, sizes, colors),
            StyleUtils.compileBorderStyle(item?.border, sizes, colors),
            StyleUtils.compileBackgroundStyle(item?.background, colors),
            StyleUtils.compilePadding(item?.padding, sizes)
        );
    }

    public static compileStyles (
        componentLayouts : ComponentStyleLayoutMapping,
        fonts            : FontMapping,
        sizes            : SizeMapping,
        colors           : ColorMapping
    ) : Styles {
        return reduce(
            keys(componentLayouts),
            (styles: Styles, key: string) : Styles => {
                const item : ComponentStyleLayout = componentLayouts[key];
                styles = {
                    ...styles,
                    [key]: StyleUtils.compileComponentStyle(item, fonts, sizes, colors)
                };
                return styles;
            },
            {}
        );
    }

    public static compileStylesByLayout (layout : StyleLayout) : Styles {
        return StyleUtils.compileStyles(
            layout?.components ?? {},
            layout?.fonts ?? {},
            layout?.sizes ?? {},
            layout?.colors ?? {}
        );
    }

    public static findLayoutByColorScheme (
        layouts     : readonly StyleLayout[],
        colorScheme : ColorScheme
    ) : StyleLayout | undefined {
        const list = filter(layouts, (item : StyleLayout) : boolean => item.colorScheme === colorScheme);
        return list.length ? list[0] : undefined;
    }

}
