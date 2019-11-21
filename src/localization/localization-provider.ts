import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from '../localization/en.json';
import ru from '../localization/ru.json';

export class LocalizationProvider {
    async initialize(): Promise<void> {
        // in future async usage of setting is required
        i18n.fallbacks = true;
        i18n.translations = { en, ru };
        // i18n.locale = Localization.locale;
        i18n.locale = 'ru';
    }

    getLocalizedString(id: string): string {
        return i18n.t(id);
    }
}

export default new LocalizationProvider();
