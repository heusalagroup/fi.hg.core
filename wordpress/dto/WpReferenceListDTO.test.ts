// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { explainWpReferenceListDTO, isWpReferenceListDTO } from "./WpReferenceListDTO";
import { explainOk } from "../../types/explain";

/**
 * The test DTO data from /wp-json/wp/v3/references
 */
const TEST_REFERENCE_DATA = [
    {
        "id": 106,
        "author": "3",
        "date": "2022-10-12 12:36:17",
        "excerpt": "",
        "title": "ProcureNode Oy (FI)",
        "content": "<!-- wp:image {\"id\":102,\"width\":364,\"height\":81,\"sizeSlug\":\"full\",\"linkDestination\":\"none\"} -->\r\n<figure class=\"wp-block-image size-full is-resized\"><img class=\"wp-image-102\" src=\"https:\/\/cms.hg.fi\/wp-content\/uploads\/2022\/10\/referenssilogo1.png\" alt=\"\" width=\"364\" height=\"81\" \/><\/figure>\r\n<!-- \/wp:image -->\r\n\r\n<!-- wp:heading {\"level\":3} -->\r\n<h3>ProcureNode Oy<\/h3>\r\n<!-- \/wp:heading -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>Kehit\u00e4mme ProcureNodelle web-pohjaista hankintaj\u00e4rjestelm\u00e4\u00e4.<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p><a href=\"http:\/\/www.procurenode.com\">www.procurenode.com<\/a><\/p>\r\n<!-- \/wp:paragraph -->",
        "slug": "fi-reference-procurenode-oy",
        "status": "publish",
        "featured_image": {"thumbnail": false, "medium": false, "large": false}
    },
    {
        "id": 107,
        "author": "3",
        "date": "2022-10-12 12:36:57",
        "excerpt": "",
        "title": "Sendanor (FI)",
        "content": "<!-- wp:image {\"id\":103,\"width\":362,\"height\":67,\"sizeSlug\":\"full\",\"linkDestination\":\"none\"} -->\r\n<figure class=\"wp-block-image size-full is-resized\"><img class=\"wp-image-103\" src=\"https:\/\/cms.hg.fi\/wp-content\/uploads\/2022\/10\/referenssilogo2.png\" alt=\"\" width=\"362\" height=\"67\" \/><\/figure>\r\n<!-- \/wp:image -->\r\n\r\n<!-- wp:heading {\"level\":3} -->\r\n<h3>Sendanor<\/h3>\r\n<!-- \/wp:heading -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>Toimme verkkokaupan suoraan Sendanorin uusille kotisivuille.<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p><a href=\"http:\/\/www.sendanor.fi\">www.sendanor.fi<\/a><\/p>\r\n<!-- \/wp:paragraph -->",
        "slug": "fi-reference-sendanor",
        "status": "publish",
        "featured_image": {"thumbnail": false, "medium": false, "large": false}
    },
    {
        "id": 108,
        "author": "3",
        "date": "2022-10-12 12:37:33",
        "excerpt": "",
        "title": "Promentor Solutions Oy (FI)",
        "content": "<!-- wp:image {\"id\":104,\"width\":362,\"height\":87,\"sizeSlug\":\"full\",\"linkDestination\":\"none\"} -->\r\n<figure class=\"wp-block-image size-full is-resized\"><img class=\"wp-image-104\" src=\"https:\/\/cms.hg.fi\/wp-content\/uploads\/2022\/10\/referenssilogo3.png\" alt=\"\" width=\"362\" height=\"87\" \/><\/figure>\r\n<!-- \/wp:image -->\r\n\r\n<!-- wp:heading {\"level\":3} -->\r\n<h3>Promentor Solutions Oy<\/h3>\r\n<!-- \/wp:heading -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>Teemme yhteisty\u00f6t\u00e4 Promentorin digitaalisten tuotteiden kehityksess\u00e4.<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p><a href=\"http:\/\/www.promentor.fi\">www.promentor.fi<\/a><\/p>\r\n<!-- \/wp:paragraph -->",
        "slug": "fi-reference-promentor-solutions-oy",
        "status": "publish",
        "featured_image": {"thumbnail": false, "medium": false, "large": false}
    },
    {
        "id": 280,
        "author": "9",
        "date": "2023-02-09 14:44:24",
        "excerpt": "",
        "title": "Sendanor (EN)",
        "content": "<!-- wp:image {\"id\":103,\"width\":362,\"height\":67,\"sizeSlug\":\"full\",\"linkDestination\":\"none\"} -->\r\n<figure class=\"wp-block-image size-full is-resized\"><img class=\"wp-image-103\" src=\"https:\/\/cms.hg.fi\/wp-content\/uploads\/2022\/10\/referenssilogo2.png\" alt=\"\" width=\"362\" height=\"67\" \/><\/figure>\r\n<!-- \/wp:image -->\r\n\r\n<!-- wp:heading {\"level\":3} -->\r\n<h3>Sendanor<\/h3>\r\n<!-- \/wp:heading -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>ENGLANNIKSI:<\/p>\r\n<p>Toimme verkkokaupan suoraan Sendanorin uusille kotisivuille.<\/p>\r\n<p>We brought webshop straightforwardly on the Sendanor's new website.<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p><a href=\"http:\/\/www.sendanor.fi\">www.sendanor.fi<\/a><\/p>",
        "slug": "en-reference-sendanor",
        "status": "publish",
        "featured_image": {"thumbnail": false, "medium": false, "large": false}
    },
    {
        "id": 285,
        "author": "9",
        "date": "2023-02-10 10:29:05",
        "excerpt": "",
        "title": "ProcureNode Oy (EN)",
        "content": "<!-- wp:image {\"id\":102,\"width\":364,\"height\":81,\"sizeSlug\":\"full\",\"linkDestination\":\"none\"} -->\r\n<figure class=\"wp-block-image size-full is-resized\"><img class=\"wp-image-102\" src=\"https:\/\/cms.hg.fi\/wp-content\/uploads\/2022\/10\/referenssilogo1.png\" alt=\"\" width=\"364\" height=\"81\" \/><\/figure>\r\n<!-- \/wp:image -->\r\n\r\n<!-- wp:heading {\"level\":3} -->\r\n<h3>ProcureNode Oy<\/h3>\r\n<!-- \/wp:heading -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>ENGLANNIKSI:<\/p>\r\n<p>Kehit\u00e4mme ProcureNodelle web-pohjaista hankintaj\u00e4rjestelm\u00e4\u00e4.<\/p>\r\n<p>We are developing a web-based procurement system for ProcureNode.<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p><a href=\"http:\/\/www.procurenode.com\">www.procurenode.com<\/a><\/p>",
        "slug": "en-reference-procurenode-oy",
        "status": "publish",
        "featured_image": {"thumbnail": false, "medium": false, "large": false}
    },
    {
        "id": 286,
        "author": "9",
        "date": "2023-02-10 10:30:06",
        "excerpt": "",
        "title": "Promentor Solutions Oy (EN)",
        "content": "<!-- wp:image {\"id\":104,\"width\":362,\"height\":87,\"sizeSlug\":\"full\",\"linkDestination\":\"none\"} -->\r\n<figure class=\"wp-block-image size-full is-resized\"><img class=\"wp-image-104\" src=\"https:\/\/cms.hg.fi\/wp-content\/uploads\/2022\/10\/referenssilogo3.png\" alt=\"\" width=\"362\" height=\"87\" \/><\/figure>\r\n<!-- \/wp:image -->\r\n\r\n<!-- wp:heading {\"level\":3} -->\r\n<h3>Promentor Solutions Oy<\/h3>\r\n<!-- \/wp:heading -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>ENGLANNIKSI:<\/p>\r\n<p>Teemme yhteisty\u00f6t\u00e4 Promentorin digitaalisten tuotteiden kehityksess\u00e4.<\/p>\r\n<p>We cooperate with Promentor in digital product development.<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p><a href=\"http:\/\/www.promentor.fi\">www.promentor.fi<\/a><\/p>",
        "slug": "en-reference-promentor-solutions-oy",
        "status": "publish",
        "featured_image": {"thumbnail": false, "medium": false, "large": false}
    }
];

describe('WpReferenceListDTO', () => {

    describe('isWpReferenceListDTO', () => {
        it('can test valid DTO array', () => {
            expect( isWpReferenceListDTO(TEST_REFERENCE_DATA) ).toBe(true);
        });
    });

    describe('explainWpReferenceListDTO', () => {
        it('can explain valid DTO array', () => {
            expect( explainWpReferenceListDTO(TEST_REFERENCE_DATA) ).toBe(explainOk());
        });
    });

});
