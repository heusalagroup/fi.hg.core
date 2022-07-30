// Copyright (c) 2021-2022. Sendanor <info@sendanor.fi>. All rights reserved.

import { Language } from "./types/Language";
import { Observer,  ObserverCallback, ObserverDestructor } from "./Observer";

export enum LanguageServiceEvent {
    CURRENT_LANGUAGE_CHANGED = "LanguageService:currentLanguageChanged",
    DEFAULT_LANGUAGE_CHANGED = "LanguageService:defaultLanguageChanged"
}

export type LanguageServiceDestructor = ObserverDestructor;

export class LanguageService {

    private static _defaultLanguage : Language | undefined;
    private static _language : Language | undefined;

    private static _observer: Observer<LanguageServiceEvent> = new Observer<LanguageServiceEvent>(
        "LanguageService");

    public static Event = LanguageServiceEvent;

    public static on (
        name: LanguageServiceEvent,
        callback: ObserverCallback<LanguageServiceEvent>
    ): LanguageServiceDestructor {
        return this._observer.listenEvent(name, callback);
    }

    public static destroy (): void {
        this._observer.destroy();
    }

    public static setDefaultLanguage (lang : Language) {
        if (this._defaultLanguage !== lang) {

            this._defaultLanguage = lang;
            if (this._observer.hasCallbacks(LanguageServiceEvent.DEFAULT_LANGUAGE_CHANGED)) {
                this._observer.triggerEvent(LanguageServiceEvent.DEFAULT_LANGUAGE_CHANGED);
            }

            if ( !this._language && this._observer.hasCallbacks(LanguageServiceEvent.CURRENT_LANGUAGE_CHANGED) ) {
                this._observer.triggerEvent(LanguageServiceEvent.CURRENT_LANGUAGE_CHANGED);
            }

        }
    }

    public static getDefaultLanguage () : Language {
        return this._defaultLanguage ?? Language.ENGLISH;
    }

    public static getCurrentLanguage () : Language {
        return this._language ?? this._defaultLanguage ?? Language.ENGLISH;
    }

    public static setCurrentLanguage (lang : Language) {
        if (this._language !== lang) {
            this._language = lang;
            if (this._observer.hasCallbacks(LanguageServiceEvent.CURRENT_LANGUAGE_CHANGED)) {
                this._observer.triggerEvent(LanguageServiceEvent.CURRENT_LANGUAGE_CHANGED);
            }
        }
    }

}

