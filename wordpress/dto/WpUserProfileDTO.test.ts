// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { explainWpUserProfileDTO, isWpUserProfileDTO } from "./WpUserProfileDTO";
import { explainOk } from "../../types/explain";

const TEST_PROFILES = [
    {
        "id": 78,
        "author": "3",
        "date": "2022-09-12 13:53:53",
        "excerpt": "Ohjelmistokehitt\u00e4j\u00e4",
        "title": "fi-Erik Vesa",
        "content": "<!-- wp:paragraph -->\r\n<p style=\"text-align: left;\"><strong>Lorem<\/strong> <em>ipsum<\/em> dolor sit amet, consectetur adipiscing elit. Etiam urna dolor, ultricies ac elementum a, feugiat vitae purus. Donec non ipsum efficitur odio tempus maximus. Duis ultrices nibh vel ligula convallis, sit amet gravida massa lobortis.<\/p>\r\n<!-- \/wp:paragraph" +
            " -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>&nbsp;<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p style=\"text-align: left;\"><a href=\"https:\/\/google.com\">Maecenas<\/a> condimentum ligula porta, pulvinar neque nec, auctor dui. Mauris non sem condimentum, suscipit leo vel, convallis ante. Praesent lorem ligula, maximus sit amet varius sit amet, ullamcorper eu magna. Cras ut diam orci. Sed euismod justo ut massa finibus, nec tempus nibh laoreet. Duis faucibus tellus tellus, a consequat felis facilisis in. Aenean vitae mauris eget tortor molestie porttitor.<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>&nbsp;<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p style=\"text-align: left;\"><span style=\"color: #008000;\">Aenean tortor<\/span> elit, fermentum ut risus at, convallis condimentum elit. Proin ut tortor vitae enim consequat volutpat. Donec eu faucibus nibh. Morbi ac ex lacus. Suspendisse varius mi at ullamcorper rutrum. Praesent lacinia vitae ante vel condimentum. Suspendisse molestie, lacus nec vestibulum dictum, erat enim dictum diam, ut varius odio augue eget nunc. Nullam dapibus euismod vulputate. Sed vulputate rutrum pulvinar. Praesent id malesuada orci. In hac habitasse platea dictumst.<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>&nbsp;<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p style=\"text-align: left;\">Etiam nisl erat, consectetur in dictum ut, maximus non metus. Nunc vitae lorem eget felis egestas cursus. Praesent eleifend turpis id est vulputate, at ultricies justo facilisis. In maximus, lectus eu faucibus semper, lorem purus consectetur velit, id interdum dui libero et quam. Ut dignissim dolor eu odio interdum ullamcorper. Fusce euismod odio vitae sodales pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean at tincidunt justo. Phasellus tincidunt, orci et tristique laoreet, ante ligula vehicula mi, vel consequat arcu enim elementum sem.<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>&nbsp;<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:heading {\"level\":3} -->\r\n<h3 style=\"text-align: left;\">Osaaminen<\/h3>\r\n<!-- \/wp:heading -->\r\n\r\n<!-- wp:paragraph -->\r\n<p style=\"text-align: left;\">\u2714 Javascript<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p style=\"text-align: left;\">\u2714 ReactJS<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p style=\"text-align: left;\">\u2714 TypeScript<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p style=\"text-align: left;\">\u2714 CSS<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p style=\"text-align: left;\">\u2714 Anything I can google<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>&nbsp;<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>&nbsp;<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:image {\"sizeSlug\":\"large\"} -->\r\n<figure class=\"wp-block-image size-large\"><img class=\"alignnone\" src=\"https:\/\/i.picsum.photos\/id\/423\/200\/300.jpg?hmac=Yb4FKqDYd2C1Lvx5F0BDwATeS4vxsllU9vPl228-BXQ\" alt=\"\" \/><img class=\"alignnone\" src=\"https:\/\/i.picsum.photos\/id\/423\/200\/300.jpg?hmac=Yb4FKqDYd2C1Lvx5F0BDwATeS4vxsllU9vPl228-BXQ\" alt=\"\" \/><img class=\"alignnone\" src=\"https:\/\/i.picsum.photos\/id\/423\/200\/300.jpg?hmac=Yb4FKqDYd2C1Lvx5F0BDwATeS4vxsllU9vPl228-BXQ\" alt=\"\" \/><img class=\"alignnone\" src=\"https:\/\/i.picsum.photos\/id\/423\/200\/300.jpg?hmac=Yb4FKqDYd2C1Lvx5F0BDwATeS4vxsllU9vPl228-BXQ\" alt=\"\" \/> <!-- \/wp:image -->\r\n<p>&nbsp;<\/p>\r\n<!-- wp:paragraph -->\r\n<p>test image<\/p>\r\n<!-- \/wp:paragraph --><\/figure>",
        "description": [ "Hey, I am Junior Software Developer, I would describe myself as constant learner and brainstormer who keeps chasing that flow state relentlessly. \r\n\r\nMy main focus is within React world (JS, TS, css, Redux, Jest).\r\nAs for my other skills: I like to brainstorm, Search and figure things out on my own, and generally read documentations to broaden my knowledge (especially about related but unfamiliar topics).\r\n\r\nI tend to work independently 90% of the time, but I do like helping others too when my skillset if sufficient to do so. As a part of a project, I like to pick a component \/ section todo and start working on it. Before starting at Heusala Group I'd say that I would rather search everything on my own even when I don't know where to start, but nowdays when it comes to topics that go over my head like technical difficulties etc. I will end up asking aid immediately so I can get to actual working (Senior developers are much appreciated)." ],
        "extra Information": [ "Github:https:\/\/github.com\/EVCareeria\r\nLinkedIn: https:\/\/www.linkedin.com\/in\/erikvesa\/\r\n" ],
        "slug": "fi-120-erik-v",
        "status": "publish",
        "featured_image": {"thumbnail": "https:\/\/cms.hg.fi\/wp-content\/uploads\/2022\/09\/omakuva-150x150.jpeg", "medium": "https:\/\/cms.hg.fi\/wp-content\/uploads\/2022\/09\/omakuva-300x300.jpeg", "large": "https:\/\/cms.hg.fi\/wp-content\/uploads\/2022\/09\/omakuva.jpeg"}
    },
    {
        "id": 121,
        "author": "3",
        "date": "2023-01-12 11:23:48",
        "excerpt": "Software Developer",
        "title": "en-Erik Vesa",
        "content": "<!-- wp:paragraph -->\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam urna dolor, ultricies ac elementum a, feugiat vitae purus. Donec non ipsum efficitur odio tempus maximus. Duis ultrices nibh vel ligula convallis, sit amet gravida massa lobortis.<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>&nbsp;<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>Maecenas condimentum ligula porta, pulvinar neque nec, auctor dui. Mauris non sem condimentum, suscipit leo vel, convallis ante. Praesent lorem ligula, maximus sit amet varius sit amet, ullamcorper eu magna. Cras ut diam orci. Sed euismod justo ut massa finibus, nec tempus nibh laoreet. Duis faucibus tellus tellus, a consequat felis facilisis in. Aenean vitae mauris eget tortor molestie porttitor.<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>&nbsp;<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>Aenean tortor elit, fermentum ut risus at, convallis condimentum elit. Proin ut tortor vitae enim consequat volutpat. Donec eu faucibus nibh. Morbi ac ex lacus. Suspendisse varius mi at ullamcorper rutrum. Praesent lacinia vitae ante vel condimentum. Suspendisse molestie, lacus nec vestibulum dictum, erat enim dictum diam, ut varius odio augue eget nunc. Nullam dapibus euismod vulputate. Sed vulputate rutrum pulvinar. Praesent id malesuada orci. In hac habitasse platea dictumst.<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>&nbsp;<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>Etiam nisl erat, consectetur in dictum ut, maximus non metus. Nunc vitae lorem eget felis egestas cursus. Praesent eleifend turpis id est vulputate, at ultricies justo facilisis. In maximus, lectus eu faucibus semper, lorem purus consectetur velit, id interdum dui libero et quam. Ut dignissim dolor eu odio interdum ullamcorper. Fusce euismod odio vitae sodales pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean at tincidunt justo. Phasellus tincidunt, orci et tristique laoreet, ante ligula vehicula mi, vel consequat arcu enim elementum sem.<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>&nbsp;<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:heading {\"level\":3} -->\r\n<h3>Osaaminen<\/h3>\r\n<!-- \/wp:heading -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>\u2714 Javascript<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>\u2714 ReactJS<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>\u2714 TypeScript<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>\u2714 CSS<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>\u2714 Anything I can google<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>&nbsp;<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>&nbsp;<\/p>\r\n<!-- \/wp:paragraph -->\r\n\r\n<!-- wp:image {\"sizeSlug\":\"large\"} -->\r\n<figure class=\"wp-block-image size-large\"><img src=\"https:\/\/i.picsum.photos\/id\/423\/200\/300.jpg?hmac=Yb4FKqDYd2C1Lvx5F0BDwATeS4vxsllU9vPl228-BXQ\" alt=\"\" \/><\/figure>\r\n<!-- \/wp:image -->\r\n\r\n<!-- wp:paragraph -->\r\n<p>test image<\/p>\r\n<!-- \/wp:paragraph -->",
        "description": [ "Hey, I am Junior Software Developer, I would describe myself as constant learner and brainstormer who keeps chasing that flow state relentlessly. \r\n\r\nMy main focus is within React world (JS, TS, css, Redux, Jest).\r\nAs for my other skills: I like to brainstorm, Search and figure things out on my own, and generally read documentations to broaden my knowledge (especially about related but unfamiliar topics).\r\n\r\nI tend to work independently 90% of the time, but I do like helping others too when my skillset if sufficient to do so. As a part of a project, I like to pick a component \/ section todo and start working on it. Before starting at Heusala Group I'd say that I would rather search everything on my own even when I don't know where to start, but nowdays when it comes to topics that go over my head like technical difficulties etc. I will end up asking aid immediately so I can get to actual working (Senior developers are much appreciated)." ],
        "extra Information": [ "Github:https:\/\/github.com\/EVCareeria\r\nLinkedIn: https:\/\/www.linkedin.com\/in\/erikvesa\/\r\n" ],
        "slug": "en-120-erik-v",
        "status": "publish",
        "featured_image": {"thumbnail": "https:\/\/cms.hg.fi\/wp-content\/uploads\/2022\/09\/omakuva-150x150.jpeg", "medium": "https:\/\/cms.hg.fi\/wp-content\/uploads\/2022\/09\/omakuva-300x300.jpeg", "large": "https:\/\/cms.hg.fi\/wp-content\/uploads\/2022\/09\/omakuva.jpeg"}
    },
    {
        "id": 130,
        "author": "5",
        "date": "2023-01-23 11:56:45",
        "excerpt": "Ammattinimike",
        "title": "fi-Jarmo Hoo",
        "content": "Moi, onko t\u00e4m\u00e4 teko\u00e4lyn tuottamaa teksti\u00e4? Lorem Ipsumia jnejnejne",
        "description": [ "Intohimoinen visual designer.  Innokas valokuvaaja ja amat\u00f6\u00f6rimuusikko.  Seuraan suunnittelutrendej\u00e4, kuin haukka. \u00c4skett\u00e4in sukellettu teko\u00e4lytaiteen ihmeelliseen maailmaan.\r\n\r\nAdobe &amp; Affinity" ],
        "extra Information": [],
        "slug": "fi-130-jarmo-h",
        "status": "publish",
        "featured_image": {"thumbnail": "https:\/\/cms.hg.fi\/wp-content\/uploads\/2023\/01\/knight-rider-david-hasselhoff-1-150x150.jpg", "medium": "https:\/\/cms.hg.fi\/wp-content\/uploads\/2023\/01\/knight-rider-david-hasselhoff-1-300x300.jpg", "large": "https:\/\/cms.hg.fi\/wp-content\/uploads\/2023\/01\/knight-rider-david-hasselhoff-1.jpg"}
    },
    {
        "id": 142,
        "author": "6",
        "date": "2023-01-25 14:56:32",
        "excerpt": "Ohjelmistokehitt\u00e4j\u00e4",
        "title": "fi-Taija",
        "content": "",
        "description": [ "facebook: \"https:\/\/www.facebook.com\/people\/Heusala-Group-Oy\/100084715241503\/\",  linkedin:\"https:\/\/www.linkedin.com\/company\/hgoy\/\"" ],
        "extra Information": [ "Taija is solving customers' problems with modern web applications \u2014 ReactJS, HTML5, TypeScript, and NodeJS." ],
        "slug": "fi-140-taija-l",
        "status": "publish",
        "featured_image": {"thumbnail": false, "medium": false, "large": false}
    },
    {
        "id": 139,
        "author": "9",
        "date": "2023-01-25 16:18:12",
        "excerpt": "Ohjelmistokehitt\u00e4j\u00e4",
        "title": "fi-Paul H",
        "content": "<h2>Heip\u00e4 hei!<\/h2>\r\nNykyisin k\u00e4yt\u00f6ss\u00e4 olevia ohjelmointikieli\u00e4:\r\n<ul>\r\n \t<li>TypeScript, React<\/li>\r\n \t<li>C\/C++<\/li>\r\n \t<li>JavaScript<\/li>\r\n \t<li>PHP<\/li>\r\n<\/ul>\r\nAiemmin tutuksi tulleita kieli\u00e4:\r\n<ul>\r\n \t<li>Nasal - FlightGear-lentosimulaattorin ohjelmointikieli<\/li>\r\n \t<li>Assembly (x86, PIC)<\/li>\r\n \t<li>Turbo Pascal, Free Pascal<\/li>\r\n \t<li>Logo - Kukapa ei tykk\u00e4isi kilpikonnista ;)<\/li>\r\n \t<li>BASIC (Commodore64, GW-Basic, ST Basic, STOS,...)<\/li>\r\n<\/ul>\r\n<div class=\"contact-container\">\r\n<div class=\"contact-email-content\">\r\n<div class=\"contact-email-logo contact-logo\"><a href=\"mailto:paul.hameenkorpi@heusalagroup.fi\"><img class=\"alignnone size-full wp-image-330\" src=\"https:\/\/cms.hg.fi\/wp-content\/uploads\/2023\/02\/mail_pyorea.png\" alt=\"Email\" width=\"90\" height=\"90\" \/><\/a><\/div>\r\n<div class=\"contact-email-address contact-text\"><a href=\"mailto:paul.hameenkorpi@heusalagroup.fi\">paul.hameenkorpi@heusalagroup.fi<\/a><\/div>\r\n<\/div>\r\n<div class=\"contact-phone-content\">\r\n<div class=\"contact-phone-logo contact-logo\"><a href=\"tel:+358505410858\"><img class=\"alignnone size-full wp-image-331\" src=\"https:\/\/cms.hg.fi\/wp-content\/uploads\/2023\/02\/phone_pyorea.png\" alt=\"Phone\" width=\"90\" height=\"90\" \/><\/a><\/div>\r\n<div class=\"contact-phone-number contact-text\"><a href=\"tel:+358505410858\">050-5410858<\/a><\/div>\r\n<\/div>\r\n<\/div>",
        "description": [ "" ],
        "extra Information": [],
        "slug": "fi-150-paul-h",
        "status": "publish",
        "featured_image": {"thumbnail": false, "medium": false, "large": false}
    },
    {
        "id": 315,
        "author": "9",
        "date": "2023-02-21 06:36:54",
        "excerpt": "Software Developer <b>Test bold<\/b>",
        "title": "en-Paul H",
        "content": "<h2>Hello there!<\/h2>\r\nCurrent programming languages I use:\r\n<ul>\r\n \t<li>TypeScript, React<\/li>\r\n \t<li>C\/C++<\/li>\r\n \t<li>JavaScript<\/li>\r\n \t<li>PHP<\/li>\r\n<\/ul>\r\nLanguages used back in the history:\r\n<ul>\r\n \t<li>Nasal - FlightGear's scripting language<\/li>\r\n \t<li>Assembly (x86, PIC)<\/li>\r\n \t<li>Turbo Pascal, Free Pascal<\/li>\r\n \t<li>Logo - Because those turtles!<\/li>\r\n \t<li>BASIC (Commodore64, GW-Basic, ST Basic, STOS,...)<\/li>\r\n<\/ul>\r\n&nbsp;",
        "description": [ "" ],
        "extra Information": [],
        "slug": "en-150-paul-h",
        "status": "publish",
        "featured_image": {"thumbnail": false, "medium": false, "large": false}
    },
    {
        "id": 316, "author": "9", "date": "2023-02-21 06:52:52", "excerpt": "Software Developer", "title": "en-Taija", "content": "", "description": [ "" ], "extra Information": [], "slug": "en-140-taija-l", "status": "publish", "featured_image": {"thumbnail": false, "medium": false, "large": false}
    },
    {
        "id": 317,
        "author": "9",
        "date": "2023-02-21 06:55:31",
        "excerpt": "A Job Title",
        "title": "en-Jarmo Hoo",
        "content": "Hi, is this text produced by an AI? Lorem Ipsumia etc etc etc",
        "description": [ "" ],
        "extra Information": [],
        "slug": "en-130-jarmo-h",
        "status": "publish",
        "featured_image": {"thumbnail": "https:\/\/cms.hg.fi\/wp-content\/uploads\/2023\/01\/knight-rider-david-hasselhoff-1-150x150.jpg", "medium": "https:\/\/cms.hg.fi\/wp-content\/uploads\/2023\/01\/knight-rider-david-hasselhoff-1-300x300.jpg", "large": "https:\/\/cms.hg.fi\/wp-content\/uploads\/2023\/01\/knight-rider-david-hasselhoff-1.jpg"}
    },
    {
        "id": 333,
        "author": "9",
        "date": "2023-02-24 07:43:37",
        "excerpt": "Toimitusjohtaja,\r\nohjelmistokehitt\u00e4j\u00e4", "title": "fi-Jaakko-Heikki H", "content": "", "description": [ "" ], "extra Information": [], "slug": "fi-100-jaakko-heikki-h", "status": "publish", "featured_image": {"thumbnail": false, "medium": false, "large": false}
    },
    {
        "id": 334,
        "author": "9",
        "date": "2023-02-24 07:44:54",
        "excerpt": "CEO,\r\nSoftware Developer",
        "title": "en-Jaakko-Heikki H",
        "content": "",
        "description": [ "" ],
        "extra Information": [],
        "slug": "en-100-jaakko-heikki-h",
        "status": "publish",
        "featured_image": {"thumbnail": false, "medium": false, "large": false}
    }
];

describe('WpUserProfileDTO', () => {

    describe('isWpUserProfileDTO', () => {
        it('can test valid DTOs', () => {
            expect( isWpUserProfileDTO(TEST_PROFILES[0]) ).toBe(true);
            expect( isWpUserProfileDTO(TEST_PROFILES[1]) ).toBe(true);
            expect( isWpUserProfileDTO(TEST_PROFILES[2]) ).toBe(true);
            expect( isWpUserProfileDTO(TEST_PROFILES[3]) ).toBe(true);
            expect( isWpUserProfileDTO(TEST_PROFILES[4]) ).toBe(true);
            expect( isWpUserProfileDTO(TEST_PROFILES[5]) ).toBe(true);
            expect( isWpUserProfileDTO(TEST_PROFILES[6]) ).toBe(true);
            expect( isWpUserProfileDTO(TEST_PROFILES[7]) ).toBe(true);
            expect( isWpUserProfileDTO(TEST_PROFILES[8]) ).toBe(true);
            expect( isWpUserProfileDTO(TEST_PROFILES[9]) ).toBe(true);
        });
    });

    describe('explainWpUserProfileDTO', () => {
        it('can explain valid DTOs', () => {
            expect( explainWpUserProfileDTO(TEST_PROFILES[0]) ).toBe(explainOk());
            expect( explainWpUserProfileDTO(TEST_PROFILES[1]) ).toBe(explainOk());
            expect( explainWpUserProfileDTO(TEST_PROFILES[2]) ).toBe(explainOk());
            expect( explainWpUserProfileDTO(TEST_PROFILES[3]) ).toBe(explainOk());
            expect( explainWpUserProfileDTO(TEST_PROFILES[4]) ).toBe(explainOk());
            expect( explainWpUserProfileDTO(TEST_PROFILES[5]) ).toBe(explainOk());
            expect( explainWpUserProfileDTO(TEST_PROFILES[6]) ).toBe(explainOk());
            expect( explainWpUserProfileDTO(TEST_PROFILES[7]) ).toBe(explainOk());
            expect( explainWpUserProfileDTO(TEST_PROFILES[8]) ).toBe(explainOk());
            expect( explainWpUserProfileDTO(TEST_PROFILES[9]) ).toBe(explainOk());
        });
    });

});
