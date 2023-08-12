// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { explainWpPostDTO, isWpPostDTO } from "./WpPostDTO";
import { explainOk } from "../../types/explain";

/**
 * Test data from https://cms.hg.fi/wp-json/wp/v2/posts
 */
const TEST_DATA_POSTS = [
    {
        "id": 287,
        "date": "2022-12-31T14:18:38",
        "date_gmt": "2022-12-31T12:18:38",
        "guid": {"rendered": "https:\/\/cms.hg.fi\/?p=287"},
        "modified": "2023-02-16T15:18:29",
        "modified_gmt": "2023-02-16T13:18:29",
        "slug": "31-12-2022",
        "status": "publish",
        "type": "post",
        "link": "https:\/\/cms.hg.fi\/2022\/12\/31\/31-12-2022\/",
        "title": {"rendered": "31.12.2022"},
        "content": {"rendered": "<p><strong>31.12.2022<\/strong><\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>Happy New Year 2023!<\/p>", "protected": false},
        "excerpt": {"rendered": "<p>31.12.2022 Happy New Year 2023!<\/p>\n", "protected": false},
        "author": 9,
        "featured_media": 0,
        "comment_status": "open",
        "ping_status": "open",
        "sticky": false,
        "template": "",
        "format": "standard",
        "meta": [],
        "categories": [ 4 ],
        "tags": [],
        "_links": {
            "self": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/posts\/287"} ],
            "collection": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/posts"} ],
            "about": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/types\/post"} ],
            "author": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/users\/9"} ],
            "replies": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/comments?post=287"} ],
            "version-history": [ {"count": 4, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/posts\/287\/revisions"} ],
            "predecessor-version": [ {"id": 309, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/posts\/287\/revisions\/309"} ],
            "wp:attachment": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/media?parent=287"} ],
            "wp:term": [ {"taxonomy": "category", "embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/categories?post=287"}, {"taxonomy": "post_tag", "embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/tags?post=287"} ],
            "curies": [ {"name": "wp", "href": "https:\/\/api.w.org\/{rel}", "templated": true} ]
        }
    },
    {
        "id": 193,
        "date": "2022-05-08T13:53:56",
        "date_gmt": "2022-05-08T10:53:56",
        "guid": {"rendered": "https:\/\/cms.hg.fi\/?p=193"},
        "modified": "2023-02-12T10:56:46",
        "modified_gmt": "2023-02-12T08:56:46",
        "slug": "8-5-2022",
        "status": "publish",
        "type": "post",
        "link": "https:\/\/cms.hg.fi\/2022\/05\/08\/8-5-2022\/",
        "title": {"rendered": "8.5.2022"},
        "content": {
            "rendered": "\r\n<p><strong>8.5.2022<\/strong><\/p>\r\n\r\n\r\n\r\n<p>We have been featured on <a href=\"https:\/\/matrix.org\/blog\/2022\/08\/05\/this-week-in-matrix-2022-08-05#hghs-website\" target=\"_blank\" rel=\"noreferrer noopener\" data-type=\"URL\" data-id=\"https:\/\/matrix.org\/blog\/2022\/08\/05\/this-week-in-matrix-2022-08-05#hghs-website\">This week in Matrix:<\/a><\/p>\r\n\r\n\r\n\r\n<p>We&#8217;ve started work on our HG HomeServer written in pure TypeScript, compilable as a single JS file, with no dependencies except NodeJS. It&#8217;s intended for a special use cases when Matrix is used as a backbone for custom apps. It&#8217;s lightweight, minimal and for the moment isn&#8217;t even planned to support full Matrix spec. We might make it possible to run it on browser later.\u00a0<a href=\"https:\/\/github.com\/heusalagroup\/hghs\" target=\"_blank\" rel=\"noreferrer noopener\">https:\/\/github.com\/heusalagroup\/hghs<\/a><\/p>\r\n\r\n\r\n\r\n<p><a href=\"https:\/\/matrix.org\/blog\/2022\/08\/05\/this-week-in-matrix-2022-08-05#hghs-website\">https:\/\/matrix.org\/blog\/2022\/08\/05\/this-week-in-matrix-2022-08-05#hghs-website<\/a> \u00a0<\/p>",
            "protected": false
        },
        "excerpt": {"rendered": "<p>8.5.2022 We have been featured on This week in Matrix: We&#8217;ve started work on our HG HomeServer written in pure TypeScript, compilable as a single JS file, with no dependencies except NodeJS. It&#8217;s intended for a special use cases when Matrix is used as a backbone for custom apps. It&#8217;s lightweight, minimal and for the [&hellip;]<\/p>\n", "protected": false},
        "author": 9,
        "featured_media": 0,
        "comment_status": "open",
        "ping_status": "open",
        "sticky": false,
        "template": "",
        "format": "standard",
        "meta": [],
        "categories": [ 4 ],
        "tags": [],
        "_links": {
            "self": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/posts\/193"} ],
            "collection": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/posts"} ],
            "about": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/types\/post"} ],
            "author": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/users\/9"} ],
            "replies": [ {"embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/comments?post=193"} ],
            "version-history": [ {"count": 3, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/posts\/193\/revisions"} ],
            "predecessor-version": [ {"id": 295, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/posts\/193\/revisions\/295"} ],
            "wp:attachment": [ {"href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/media?parent=193"} ],
            "wp:term": [ {"taxonomy": "category", "embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/categories?post=193"}, {"taxonomy": "post_tag", "embeddable": true, "href": "https:\/\/cms.hg.fi\/wp-json\/wp\/v2\/tags?post=193"} ],
            "curies": [ {"name": "wp", "href": "https:\/\/api.w.org\/{rel}", "templated": true} ]
        }
    }
];

describe('WpPostDTO', () => {

    describe('isWpPostDTO', () => {
        it('can test correct DTOs', () => {
            expect(isWpPostDTO(TEST_DATA_POSTS[0])).toBe(true);
            expect(isWpPostDTO(TEST_DATA_POSTS[1])).toBe(true);
        });
    });

    describe('explainWpPostDTO', () => {
        it('can explain correct DTOs', () => {
            expect(explainWpPostDTO(TEST_DATA_POSTS[0])).toBe(explainOk());
            expect(explainWpPostDTO(TEST_DATA_POSTS[1])).toBe(explainOk());
        });
    });

});
