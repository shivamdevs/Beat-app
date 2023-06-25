import React from 'react';
import AppData from '../app/AppData';

type AppSetting = {
    ql: 0 | 1 | 2 | 3 | 4;
    ap: boolean;
}

const initialSetting: AppSetting = {
    ql: 4,
    ap: true,
};



export default function useAppSetting(): [AppSetting, (key: keyof AppSetting, value: AppSetting[keyof AppSetting] | ((previous: AppSetting[keyof AppSetting]) => AppSetting[keyof AppSetting])) => void] {
    const [setting, setSetting] = React.useState<AppSetting>(() => {
        if (window.localStorage) {
            const saved = window.localStorage.getItem(AppData.local.setting);
            if (saved) try {
                const parsed: AppSetting = JSON.parse(saved);
                return { ...initialSetting, ...parsed };
            } catch (error) { console.error(error); }
        }
        return initialSetting;
    });

    React.useEffect(() => {
        window.localStorage.setItem(AppData.local.setting, JSON.stringify(setting));
    }, [setting]);

    function updateSetting<Key extends keyof AppSetting>(
        key: Key,
        value: AppSetting[Key] | ((previous: AppSetting[Key]) => AppSetting[Key])): void {
        if (typeof value === 'function') value = value(setting[key]);
        setSetting({ ...initialSetting, [key]: value });
    }

    return [setting, updateSetting];
}
