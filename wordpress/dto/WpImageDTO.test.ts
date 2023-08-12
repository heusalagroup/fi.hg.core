// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { explainWpImageDTO, isWpImageDTO } from "./WpImageDTO";
import { explainOk } from "../../types/explain";

describe('WpImageDTO', () => {

    describe('isWpImageDTO', () => {

        it('can test valid DTO without image', () => {
            expect( isWpImageDTO(
                {
                    "thumbnail": false,
                    "medium": false,
                    "large": false
                }
            ) ).toBe(true);
        });

        it('can test valid DTO with URLs', () => {
            expect( isWpImageDTO(
                {
                    "thumbnail": "https:\/\/cms.hg.fi\/wp-content\/uploads\/2022\/09\/omakuva-150x150.jpeg",
                    "medium": "https:\/\/cms.hg.fi\/wp-content\/uploads\/2022\/09\/omakuva-300x300.jpeg",
                    "large": "https:\/\/cms.hg.fi\/wp-content\/uploads\/2022\/09\/omakuva.jpeg"
                }
            ) ).toBe(true);
        });

    });

    describe('explainWpImageDTO', () => {

        it('can explain valid DTO without image', () => {
            expect( explainWpImageDTO(
                {
                    "thumbnail": false,
                    "medium": false,
                    "large": false
                }
            ) ).toBe(explainOk());
        });

        it('can explain valid DTO with URLs', () => {
            expect( explainWpImageDTO(
                {
                    "thumbnail": "https:\/\/cms.hg.fi\/wp-content\/uploads\/2022\/09\/omakuva-150x150.jpeg",
                    "medium": "https:\/\/cms.hg.fi\/wp-content\/uploads\/2022\/09\/omakuva-300x300.jpeg",
                    "large": "https:\/\/cms.hg.fi\/wp-content\/uploads\/2022\/09\/omakuva.jpeg"
                }
            ) ).toBe(explainOk());
        });

    });

});
