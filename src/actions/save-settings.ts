export const SAVE_SETTINGS: string = 'SAVE_SETTINGS';

export function saveSettings(settings: any) {
    return {
        type: SAVE_SETTINGS,
        payload: settings
    };
}
