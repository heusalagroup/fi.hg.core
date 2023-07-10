// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { HtmlPage } from "./HtmlPage";

export class Html5 implements HtmlPage {

    private readonly _title : string;
    private readonly _body : string;
    private readonly _lang : string;

    protected constructor (
        title : string,
        body  : string,
        lang  : string,
    ) {
        this._title = title;
        this._body = body;
        this._lang = lang;
    }

    public static createDocument (
        title: string,
        body: string,
        lang : string = 'en',
    ) : Html5 {
        return new Html5(title, body, lang);
    }

    public getHtml() : string {
        // <link rel="stylesheet" href="style.css">
        // <script src="script.js"></script>
        return `<!DOCTYPE html>
<html lang="${this._lang}">
  <head>
    <meta charset="utf-8">
    <title>${this._title}</title>
  </head>
  <body>${this._body}</body>
</html>`;

    }

    public getBody (): string {
        return this._body;
    }

    public getLang (): string {
        return this._lang;
    }

    public getTitle (): string {
        return this._title;
    }

    public toString (): string {
        return this.getHtml();
    }

    public valueOf (): string {
        return this.getHtml();
    }

}