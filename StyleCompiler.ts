// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ColorScheme } from "./style/types/ColorScheme";
import { StyleLayout } from "./style/StyleLayout";
import { StyleUtils } from "./StyleUtils";
import { Styles } from "./style/Styles";
import { Disposable } from "./types/Disposable";

export class StyleCompiler implements Disposable {

    private _preferredColorScheme : ColorScheme | undefined;
    private _layouts              : readonly StyleLayout[];
    private _previousLayout       : StyleLayout | undefined;
    private _previousStyles       : Styles | undefined;

    public constructor (
        layouts              : readonly StyleLayout[]  = [],
        preferredColorScheme : ColorScheme | undefined = undefined
    ) {
        this._preferredColorScheme = preferredColorScheme;
        this._layouts = layouts;
        this._previousLayout = undefined;
        this._previousStyles = undefined;
    }

    public destroy () {
        this._preferredColorScheme = undefined;
        this._layouts = [];
        this._previousLayout = undefined;
        this._previousStyles = undefined;
    }

    public clearCache () {
        this._previousLayout = undefined;
        this._previousStyles = undefined;
    }

    public getPreferredColorScheme () : ColorScheme | undefined {
        return this._preferredColorScheme;
    }

    public setPreferredColorScheme (value: ColorScheme | undefined) : void {
        this._preferredColorScheme = value;
    }

    public getLayoutList () : readonly StyleLayout[] {
        return this._layouts;
    }

    public addLayout (value : StyleLayout) : void {
        this._layouts = [...this._layouts, value];
    }

    public compileStyles () : Styles {
        const colorScheme = this._preferredColorScheme;
        const layout = colorScheme ? StyleUtils.findLayoutByColorScheme(this._layouts, colorScheme) : ((this._layouts?.length) ? this._layouts[0] : undefined);
        if (layout && this._previousStyles && this._previousLayout === layout) {
            return this._previousStyles;
        }
        if (!layout) throw new TypeError('StyleLayoutManager: Could not find layout');
        const styles = StyleUtils.compileStylesByLayout(layout);
        this._previousLayout = layout;
        this._previousStyles = styles;
        return styles;
    }

}
