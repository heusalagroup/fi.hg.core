// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { explainWpPageDTO, isWpPageDTO } from "./WpPageDTO";
import { explainOk } from "../../types/explain";

const TEST_DATA_PAGES = [
    {
        "id": 298,
        "date": "2023-02-14T09:03:25",
        "date_gmt": "2023-02-14T07:03:25",
        "guid": {"rendered": "https:\/\/cms.hg.fi\/?page_id=298"},
        "modified": "2023-02-26T08:47:13",
        "modified_gmt": "2023-02-26T06:47:13",
        "slug": "en-contact-text",
        "status": "publish",
        "type": "page",
        "link": "https:\/\/cms.hg.fi\/en\/en-contact-text\/",
        "title": {"rendered": "Contact Us"},
        "content": {
            "rendered": "<h1>Contact Us<\/h1>\n<h3>Heusala Group Ltd<\/h3>\n<p>Business ID: 3091818-9<\/p>\n<p>Heusala Group Ltd<br \/>\nAleksis Kiven katu 11 B 29<br \/>\n33100 Tampere<br \/>\nFinland<\/p>\n<p>tel. <a href=\"tel:0105175070\">010 517 50 70<\/a><br \/>\n<a href=\"mailto:info@heusalagroup.fi?subject=Contact&amp;body=Message\">info@heusalagroup.fi<\/a><\/p>\n<p>&nbsp;<\/p>\n<p><a href=\"https:\/\/www.facebook.com\/people\/Heusala-Group-Oy\/100084715241503\/\"><img decoding=\"async\" loading=\"lazy\" class=\"alignnone size-full wp-image-324\" src=\"https:\/\/cms.hg.fi\/wp-content\/uploads\/2023\/02\/facebook.png\" alt=\"\" width=\"90\" height=\"90\" \/><\/a> <a href=\"https:\/\/www.linkedin.com\/company\/hgoy\/\"><img decoding=\"async\" loading=\"lazy\" class=\"alignnone size-full wp-image-328\" src=\"https:\/\/cms.hg.fi\/wp-content\/uploads\/2023\/02\/linkedin.png\" alt=\"\" width=\"90\" height=\"90\" \/><\/a> <a href=\"https:\/\/github.com\/heusalagroup\"><img decoding=\"async\" loading=\"lazy\" class=\"alignnone size-full wp-image-326\" src=\"https:\/\/cms.hg.fi\/wp-content\/uploads\/2023\/02\/github.png\" alt=\"\" width=\"90\" height=\"90\" \/><\/a><\/p>\n",
            "protected": false
        },
        "excerpt": {"rendered": "<p>Contact Us Heusala Group Ltd Business ID: 3091818-9 Heusala Group Ltd Aleksis Kiven katu 11 B 29 33100 Tampere Finland tel. 010 517 50 70 info@heusalagroup.fi &nbsp;<\/p>\n", "protected": false},
        "author": 9,
        "featured_media": 0,
        "parent": 165,
        "menu_order": 0,
        "comment_status": "closed",
        "ping_status": "closed",
        "template": "",
        "meta": [],
        "_links": {
            "self": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/298"} ],
            "collection": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages"} ],
            "about": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/types\/page"} ],
            "author": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/users\/9"} ],
            "replies": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/comments?post=298"} ],
            "version-history": [ {"count": 13, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/298\/revisions"} ],
            "predecessor-version": [ {"id": 354, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/298\/revisions\/354"} ],
            "up": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/165"} ],
            "wp:attachment": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/media?parent=298"} ],
            "curies": [ {"name": "wp", "href": "https:\/\/api.w.org\/{rel}", "templated": true} ]
        }
    },
    {
        "id": 296,
        "date": "2023-02-14T09:02:01",
        "date_gmt": "2023-02-14T07:02:01",
        "guid": {"rendered": "https:\/\/cms.hg.fi\/?page_id=296"},
        "modified": "2023-02-26T08:46:05",
        "modified_gmt": "2023-02-26T06:46:05",
        "slug": "fi-contact-text",
        "status": "publish",
        "type": "page",
        "link": "https:\/\/cms.hg.fi\/fi\/fi-contact-text\/",
        "title": {"rendered": "Ota yhteytt\u00e4"},
        "content": {
            "rendered": "<h1>Ota yhteytt\u00e4<\/h1>\n<h3>Heusala Group Oy<\/h3>\n<p>Y-tunnus: 3091818-9<\/p>\n<p>Heusala Group Oy<br \/>\nAleksis Kiven katu 11 B 29<br \/>\n33100 Tampere<\/p>\n<p>p. <a href=\"tel:0105175070\">010 517 50 70<\/a><br \/>\n<a href=\"mailto:info@heusalagroup.fi?subject=Contact&amp;body=Message\">info@heusalagroup.fi<\/a><\/p>\n<p>&nbsp;<\/p>\n<p><a href=\"https:\/\/www.facebook.com\/people\/Heusala-Group-Oy\/100084715241503\/\"><img decoding=\"async\" loading=\"lazy\" class=\"alignnone size-full wp-image-324\" src=\"https:\/\/cms.hg.fi\/wp-content\/uploads\/2023\/02\/facebook.png\" alt=\"\" width=\"90\" height=\"90\" \/><\/a> <a href=\"https:\/\/www.linkedin.com\/company\/hgoy\/\"><img decoding=\"async\" loading=\"lazy\" class=\"alignnone size-full wp-image-328\" src=\"https:\/\/cms.hg.fi\/wp-content\/uploads\/2023\/02\/linkedin.png\" alt=\"\" width=\"90\" height=\"90\" \/><\/a> <a href=\"https:\/\/github.com\/heusalagroup\"><img decoding=\"async\" loading=\"lazy\" class=\"alignnone size-full wp-image-326\" src=\"https:\/\/cms.hg.fi\/wp-content\/uploads\/2023\/02\/github.png\" alt=\"\" width=\"90\" height=\"90\" \/><\/a><\/p>\n",
            "protected": false
        },
        "excerpt": {"rendered": "<p>Ota yhteytt\u00e4 Heusala Group Oy Y-tunnus: 3091818-9 Heusala Group Oy Aleksis Kiven katu 11 B 29 33100 Tampere p. 010 517 50 70 info@heusalagroup.fi &nbsp;<\/p>\n", "protected": false},
        "author": 9,
        "featured_media": 0,
        "parent": 163,
        "menu_order": 0,
        "comment_status": "closed",
        "ping_status": "closed",
        "template": "",
        "meta": [],
        "_links": {
            "self": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/296"} ],
            "collection": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages"} ],
            "about": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/types\/page"} ],
            "author": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/users\/9"} ],
            "replies": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/comments?post=296"} ],
            "version-history": [ {"count": 4, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/296\/revisions"} ],
            "predecessor-version": [ {"id": 353, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/296\/revisions\/353"} ],
            "up": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/163"} ],
            "wp:attachment": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/media?parent=296"} ],
            "curies": [ {"name": "wp", "href": "https:\/\/api.w.org\/{rel}", "templated": true} ]
        }
    },
    {
        "id": 276,
        "date": "2023-02-08T19:24:39",
        "date_gmt": "2023-02-08T17:24:39",
        "guid": {"rendered": "https:\/\/cms.hg.fi\/?page_id=276"},
        "modified": "2023-02-08T19:24:39",
        "modified_gmt": "2023-02-08T17:24:39",
        "slug": "en-index-introduction-button-about-us",
        "status": "publish",
        "type": "page",
        "link": "https:\/\/cms.hg.fi\/en\/en-index\/en-index-introduction\/en-index-introduction-button-about-us\/",
        "title": {"rendered": "We are a software company specialized in web technology &#8211; Read more about us"},
        "content": {"rendered": "<p>Read more about us<\/p>\n", "protected": false},
        "excerpt": {"rendered": "<p>Read more about us<\/p>\n", "protected": false},
        "author": 9,
        "featured_media": 0,
        "parent": 161,
        "menu_order": 0,
        "comment_status": "closed",
        "ping_status": "closed",
        "template": "",
        "meta": [],
        "_links": {
            "self": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/276"} ],
            "collection": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages"} ],
            "about": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/types\/page"} ],
            "author": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/users\/9"} ],
            "replies": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/comments?post=276"} ],
            "version-history": [ {"count": 1, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/276\/revisions"} ],
            "predecessor-version": [ {"id": 277, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/276\/revisions\/277"} ],
            "up": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/161"} ],
            "wp:attachment": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/media?parent=276"} ],
            "curies": [ {"name": "wp", "href": "https:\/\/api.w.org\/{rel}", "templated": true} ]
        }
    },
    {
        "id": 274,
        "date": "2023-02-08T19:22:35",
        "date_gmt": "2023-02-08T17:22:35",
        "guid": {"rendered": "https:\/\/cms.hg.fi\/?page_id=274"},
        "modified": "2023-02-08T19:23:06",
        "modified_gmt": "2023-02-08T17:23:06",
        "slug": "en-index-introduction-button-references",
        "status": "publish",
        "type": "page",
        "link": "https:\/\/cms.hg.fi\/en\/en-index\/en-index-introduction\/en-index-introduction-button-references\/",
        "title": {"rendered": "We are a software company specialized in web technology &#8211; Review our references"},
        "content": {"rendered": "<p>Review our references<\/p>\n", "protected": false},
        "excerpt": {"rendered": "<p>Review our references<\/p>\n", "protected": false},
        "author": 9,
        "featured_media": 0,
        "parent": 161,
        "menu_order": 0,
        "comment_status": "closed",
        "ping_status": "closed",
        "template": "",
        "meta": [],
        "_links": {
            "self": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/274"} ],
            "collection": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages"} ],
            "about": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/types\/page"} ],
            "author": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/users\/9"} ],
            "replies": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/comments?post=274"} ],
            "version-history": [ {"count": 1, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/274\/revisions"} ],
            "predecessor-version": [ {"id": 275, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/274\/revisions\/275"} ],
            "up": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/161"} ],
            "wp:attachment": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/media?parent=274"} ],
            "curies": [ {"name": "wp", "href": "https:\/\/api.w.org\/{rel}", "templated": true} ]
        }
    },
    {
        "id": 272,
        "date": "2023-02-08T19:19:04",
        "date_gmt": "2023-02-08T17:19:04",
        "guid": {"rendered": "https:\/\/cms.hg.fi\/?page_id=272"},
        "modified": "2023-02-10T08:36:36",
        "modified_gmt": "2023-02-10T06:36:36",
        "slug": "fi-index-introduction-button-references",
        "status": "publish",
        "type": "page",
        "link": "https:\/\/cms.hg.fi\/fi\/fi-index\/fi-index-introduction\/fi-index-introduction-button-references\/",
        "title": {"rendered": "Olemme web-teknologiaan erikoistunut ohjelmistotalo &#8211; Katso referenssit"},
        "content": {"rendered": "<p>Katso referenssit<\/p>\n", "protected": false},
        "excerpt": {"rendered": "<p>Katso referenssit<\/p>\n", "protected": false},
        "author": 9,
        "featured_media": 0,
        "parent": 147,
        "menu_order": 0,
        "comment_status": "closed",
        "ping_status": "closed",
        "template": "",
        "meta": [],
        "_links": {
            "self": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/272"} ],
            "collection": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages"} ],
            "about": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/types\/page"} ],
            "author": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/users\/9"} ],
            "replies": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/comments?post=272"} ],
            "version-history": [ {"count": 3, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/272\/revisions"} ],
            "predecessor-version": [ {"id": 283, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/272\/revisions\/283"} ],
            "up": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/147"} ],
            "wp:attachment": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/media?parent=272"} ],
            "curies": [ {"name": "wp", "href": "https:\/\/api.w.org\/{rel}", "templated": true} ]
        }
    },
    {
        "id": 270,
        "date": "2023-02-08T19:16:35",
        "date_gmt": "2023-02-08T17:16:35",
        "guid": {"rendered": "https:\/\/cms.hg.fi\/?page_id=270"},
        "modified": "2023-02-08T19:25:11",
        "modified_gmt": "2023-02-08T17:25:11",
        "slug": "fi-index-introduction-button-about-us",
        "status": "publish",
        "type": "page",
        "link": "https:\/\/cms.hg.fi\/fi\/fi-index\/fi-index-introduction\/fi-index-introduction-button-about-us\/",
        "title": {"rendered": "Olemme web-teknologiaan erikoistunut ohjelmistotalo &#8211; Lue lis\u00e4\u00e4 meist\u00e4"},
        "content": {"rendered": "<p>Lue lis\u00e4\u00e4 meist\u00e4<\/p>\n", "protected": false},
        "excerpt": {"rendered": "<p>Lue lis\u00e4\u00e4 meist\u00e4<\/p>\n", "protected": false},
        "author": 9,
        "featured_media": 0,
        "parent": 147,
        "menu_order": 0,
        "comment_status": "closed",
        "ping_status": "closed",
        "template": "",
        "meta": [],
        "_links": {
            "self": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/270"} ],
            "collection": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages"} ],
            "about": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/types\/page"} ],
            "author": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/users\/9"} ],
            "replies": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/comments?post=270"} ],
            "version-history": [ {"count": 1, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/270\/revisions"} ],
            "predecessor-version": [ {"id": 271, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/270\/revisions\/271"} ],
            "up": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/147"} ],
            "wp:attachment": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/media?parent=270"} ],
            "curies": [ {"name": "wp", "href": "https:\/\/api.w.org\/{rel}", "templated": true} ]
        }
    },
    {
        "id": 268,
        "date": "2023-02-07T13:56:15",
        "date_gmt": "2023-02-07T11:56:15",
        "guid": {"rendered": "https:\/\/cms.hg.fi\/?page_id=268"},
        "modified": "2023-02-09T14:38:03",
        "modified_gmt": "2023-02-09T12:38:03",
        "slug": "fi-index-references-projects-link",
        "status": "publish",
        "type": "page",
        "link": "https:\/\/cms.hg.fi\/fi\/fi-index\/fi-index-references\/fi-index-references-projects-link\/",
        "title": {"rendered": "Referenssit &#8211; Tutustu vapaan l\u00e4hdekoodin projekteihimme t\u00e4st\u00e4!"},
        "content": {"rendered": "<h3>Tutustu vapaan l\u00e4hdekoodin projekteihimme t\u00e4st\u00e4!<\/h3>\n", "protected": false},
        "excerpt": {"rendered": "<p>Tutustu vapaan l\u00e4hdekoodin projekteihimme t\u00e4st\u00e4!<\/p>\n", "protected": false},
        "author": 9,
        "featured_media": 0,
        "parent": 179,
        "menu_order": 0,
        "comment_status": "closed",
        "ping_status": "closed",
        "template": "",
        "meta": [],
        "_links": {
            "self": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/268"} ],
            "collection": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages"} ],
            "about": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/types\/page"} ],
            "author": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/users\/9"} ],
            "replies": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/comments?post=268"} ],
            "version-history": [ {"count": 1, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/268\/revisions"} ],
            "predecessor-version": [ {"id": 269, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/268\/revisions\/269"} ],
            "up": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/179"} ],
            "wp:attachment": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/media?parent=268"} ],
            "curies": [ {"name": "wp", "href": "https:\/\/api.w.org\/{rel}", "templated": true} ]
        }
    },
    {
        "id": 265,
        "date": "2023-02-07T13:51:01",
        "date_gmt": "2023-02-07T11:51:01",
        "guid": {"rendered": "https:\/\/cms.hg.fi\/?page_id=265"},
        "modified": "2023-02-09T14:37:18",
        "modified_gmt": "2023-02-09T12:37:18",
        "slug": "en-index-references-projects-link",
        "status": "publish",
        "type": "page",
        "link": "https:\/\/cms.hg.fi\/en\/en-index\/en-index-references\/en-index-references-projects-link\/",
        "title": {"rendered": "References &#8211; Check our open source projects here!"},
        "content": {"rendered": "<h3>Check our open source projects here!<\/h3>\n", "protected": false},
        "excerpt": {"rendered": "<p>Check our open source projects here!<\/p>\n", "protected": false},
        "author": 9,
        "featured_media": 0,
        "parent": 181,
        "menu_order": 0,
        "comment_status": "closed",
        "ping_status": "closed",
        "template": "",
        "meta": [],
        "_links": {
            "self": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/265"} ],
            "collection": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages"} ],
            "about": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/types\/page"} ],
            "author": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/users\/9"} ],
            "replies": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/comments?post=265"} ],
            "version-history": [ {"count": 1, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/265\/revisions"} ],
            "predecessor-version": [ {"id": 266, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/265\/revisions\/266"} ],
            "up": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/181"} ],
            "wp:attachment": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/media?parent=265"} ],
            "curies": [ {"name": "wp", "href": "https:\/\/api.w.org\/{rel}", "templated": true} ]
        }
    },
    {
        "id": 246,
        "date": "2023-02-05T16:19:28",
        "date_gmt": "2023-02-05T14:19:28",
        "guid": {"rendered": "https:\/\/cms.hg.fi\/?page_id=246"},
        "modified": "2023-02-15T10:49:40",
        "modified_gmt": "2023-02-15T08:49:40",
        "slug": "fi-about-about-us",
        "status": "publish",
        "type": "page",
        "link": "https:\/\/cms.hg.fi\/fi\/fi-about\/fi-about-about-us\/",
        "title": {"rendered": "Meist\u00e4 &#8211; Meist\u00e4"},
        "content": {
            "rendered": "<p>Olemme web-teknologiaan erikoistunut ohjelmistotalo. Haluamme auttaa yrityksi\u00e4 digitaalisen tulevaisuuden tuomien ongelmien ratkaisuissa. Nykyaikana yritysten t\u00e4ytyy p\u00e4\u00e4st\u00e4 tietoihiinsa ymp\u00e4ri vuorokauden ja mist\u00e4 p\u00e4in maailmaa tahansa. Web-pohjaisten sovellusten my\u00f6t\u00e4 t\u00e4m\u00e4 on mahdollista. Usein tarjolla olevat ratkaisut ovat liian laajoja tai joustamattomia. Meill\u00e4 kuuntelemme asiakasta ja r\u00e4\u00e4t\u00e4l\u00f6imme ratkaisut toiveiden mukaisesti ilman turhuuksia. N\u00e4in varmistamme, ett\u00e4 tuotteemme toteutetaan kustannustehokkaasti ja asiakkaan liiketoimintaa palvellen.<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>Tarjoamme ketter\u00e4t ja luotettavat ratkaisut alustasta riippumatta. Tekniikoihin, joita k\u00e4yt\u00e4mme sis\u00e4ltyy mm. ReactJS, TypeScript, NodeJS, Docker ja GitHub.<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>T\u00e4m\u00e4n lis\u00e4ksi tarjoamme testausta, tietoturvakonsultaatiota, UI\/UX-suunnitelua ja markkinoinnin optimointia.<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>Meille avoin kommunikointi ja l\u00e4pin\u00e4kyvyys on ylpeyden aihe. K\u00e4yt\u00e4nn\u00f6ss\u00e4 se n\u00e4kyy mm. siten, ett\u00e4 emme suosi suljetun l\u00e4hdekoodin tekniikoita ja j\u00e4t\u00e4 asiakasta tulevaisuudessa pulaan.<\/p>",
            "protected": false
        },
        "excerpt": {
            "rendered": "<p>Olemme web-teknologiaan erikoistunut ohjelmistotalo. Haluamme auttaa yrityksi\u00e4 digitaalisen tulevaisuuden tuomien ongelmien ratkaisuissa. Nykyaikana yritysten t\u00e4ytyy p\u00e4\u00e4st\u00e4 tietoihiinsa ymp\u00e4ri vuorokauden ja mist\u00e4 p\u00e4in maailmaa tahansa. Web-pohjaisten sovellusten my\u00f6t\u00e4 t\u00e4m\u00e4 on mahdollista. Usein tarjolla olevat ratkaisut ovat liian laajoja tai joustamattomia. Meill\u00e4 kuuntelemme asiakasta ja r\u00e4\u00e4t\u00e4l\u00f6imme ratkaisut toiveiden mukaisesti ilman turhuuksia. N\u00e4in varmistamme, ett\u00e4 tuotteemme toteutetaan kustannustehokkaasti [&hellip;]<\/p>\n",
            "protected": false
        },
        "author": 9,
        "featured_media": 0,
        "parent": 155,
        "menu_order": 0,
        "comment_status": "closed",
        "ping_status": "closed",
        "template": "",
        "meta": [],
        "_links": {
            "self": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/246"} ],
            "collection": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages"} ],
            "about": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/types\/page"} ],
            "author": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/users\/9"} ],
            "replies": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/comments?post=246"} ],
            "version-history": [ {"count": 3, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/246\/revisions"} ],
            "predecessor-version": [ {"id": 306, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/246\/revisions\/306"} ],
            "up": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/155"} ],
            "wp:attachment": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/media?parent=246"} ],
            "curies": [ {"name": "wp", "href": "https:\/\/api.w.org\/{rel}", "templated": true} ]
        }
    },
    {
        "id": 239,
        "date": "2023-02-02T13:24:24",
        "date_gmt": "2023-02-02T11:24:24",
        "guid": {"rendered": "https:\/\/cms.hg.fi\/?page_id=239"},
        "modified": "2023-02-09T14:35:30",
        "modified_gmt": "2023-02-09T12:35:30",
        "slug": "en-about-services-marketing",
        "status": "publish",
        "type": "page",
        "link": "https:\/\/cms.hg.fi\/en\/en-about\/en-about-services\/en-about-services-marketing\/",
        "title": {"rendered": "About Us &#8211; Services &#8211; Marketing Optimization"},
        "content": {
            "rendered": "<p>ENGLANNIKSI:<\/p>\r\n<h3>Marketing Optimization<\/h3>\r\n<!-- \/wp:heading -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>Markkinoinnin optimointi on oiva tapa lis\u00e4t\u00e4 n\u00e4kyvyytt\u00e4 ja sit\u00e4 kautta my\u00f6s myynti\u00e4. Hakukoneoptimointi on yleisin tapa lis\u00e4t\u00e4 yrityksen n\u00e4kyvyytt\u00e4, kun potentiaalinen asiakas hakee tietoa internetist\u00e4. Toinen tapa on Google-mainonta, jossa hakukone n\u00e4ytt\u00e4\u00e4 yrityksen mainoksia. Mainosten klikkauksia pystyy seuraamaan ja klikkausten analysoinnilla mainokset voi kohdistaa oikein.<\/p>",
            "protected": false
        },
        "excerpt": {
            "rendered": "<p>ENGLANNIKSI: Marketing Optimization Markkinoinnin optimointi on oiva tapa lis\u00e4t\u00e4 n\u00e4kyvyytt\u00e4 ja sit\u00e4 kautta my\u00f6s myynti\u00e4. Hakukoneoptimointi on yleisin tapa lis\u00e4t\u00e4 yrityksen n\u00e4kyvyytt\u00e4, kun potentiaalinen asiakas hakee tietoa internetist\u00e4. Toinen tapa on Google-mainonta, jossa hakukone n\u00e4ytt\u00e4\u00e4 yrityksen mainoksia. Mainosten klikkauksia pystyy seuraamaan ja klikkausten analysoinnilla mainokset voi kohdistaa oikein.<\/p>\n",
            "protected": false
        },
        "author": 9,
        "featured_media": 0,
        "parent": 208,
        "menu_order": 0,
        "comment_status": "closed",
        "ping_status": "closed",
        "template": "",
        "meta": [],
        "_links": {
            "self": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/239"} ],
            "collection": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages"} ],
            "about": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/types\/page"} ],
            "author": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/users\/9"} ],
            "replies": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/comments?post=239"} ],
            "version-history": [ {"count": 2, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/239\/revisions"} ],
            "predecessor-version": [ {"id": 261, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/239\/revisions\/261"} ],
            "up": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/pages\/208"} ],
            "wp:attachment": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/media?parent=239"} ],
            "curies": [ {"name": "wp", "href": "https:\/\/api.w.org\/{rel}", "templated": true} ]
        }
    }
];

describe('WpPageDTO', () => {

    describe('isWpPageDTO', () => {

        it('can test valid pages', () => {
            expect( isWpPageDTO(TEST_DATA_PAGES[0]) ).toBe(true);
            expect( isWpPageDTO(TEST_DATA_PAGES[1]) ).toBe(true);
            expect( isWpPageDTO(TEST_DATA_PAGES[2]) ).toBe(true);
            expect( isWpPageDTO(TEST_DATA_PAGES[3]) ).toBe(true);
            expect( isWpPageDTO(TEST_DATA_PAGES[4]) ).toBe(true);
            expect( isWpPageDTO(TEST_DATA_PAGES[5]) ).toBe(true);
            expect( isWpPageDTO(TEST_DATA_PAGES[6]) ).toBe(true);
            expect( isWpPageDTO(TEST_DATA_PAGES[7]) ).toBe(true);
            expect( isWpPageDTO(TEST_DATA_PAGES[8]) ).toBe(true);
            expect( isWpPageDTO(TEST_DATA_PAGES[9]) ).toBe(true);
        });

        it('can test invalid pages', () => {
            expect( isWpPageDTO(null) ).toBe(false);
            expect( isWpPageDTO(123) ).toBe(false);
            expect( isWpPageDTO({}) ).toBe(false);
            expect( isWpPageDTO([]) ).toBe(false);
            expect( isWpPageDTO("hello") ).toBe(false);
            expect( isWpPageDTO(false) ).toBe(false);
            expect( isWpPageDTO(undefined) ).toBe(false);
            expect( isWpPageDTO(true) ).toBe(false);
        });

    });

    describe('isWpPageDTO', () => {
        it('can explain valid pages', () => {
            expect( explainWpPageDTO(TEST_DATA_PAGES[0]) ).toBe(explainOk());
            expect( explainWpPageDTO(TEST_DATA_PAGES[1]) ).toBe(explainOk());
            expect( explainWpPageDTO(TEST_DATA_PAGES[2]) ).toBe(explainOk());
            expect( explainWpPageDTO(TEST_DATA_PAGES[3]) ).toBe(explainOk());
            expect( explainWpPageDTO(TEST_DATA_PAGES[4]) ).toBe(explainOk());
            expect( explainWpPageDTO(TEST_DATA_PAGES[5]) ).toBe(explainOk());
            expect( explainWpPageDTO(TEST_DATA_PAGES[6]) ).toBe(explainOk());
            expect( explainWpPageDTO(TEST_DATA_PAGES[7]) ).toBe(explainOk());
            expect( explainWpPageDTO(TEST_DATA_PAGES[8]) ).toBe(explainOk());
            expect( explainWpPageDTO(TEST_DATA_PAGES[9]) ).toBe(explainOk());
        });
    });

});
