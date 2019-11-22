import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from '../localization/en.json';
import ru from '../localization/ru.json';
import { AsyncStorage } from 'react-native';

export class LocalizationProvider {
    async initialize(): Promise<void> {
        i18n.fallbacks = true;
        i18n.translations = { en, ru };
        let lang = await AsyncStorage.getItem('lang');
        if (lang) {
            i18n.locale = lang;
        } else {
            i18n.locale = Localization.locale;
        }
    }

    getLocale(): string {
        return i18n.locale;
    }

    setLocale(language: string) {
        if (i18n.locale !== language) {
            i18n.locale = language;
            AsyncStorage.setItem('lang', language);
        }
    }

    getLocalizedString(id: string): string {
        return i18n.t(id);
    }
}

export default new LocalizationProvider();
