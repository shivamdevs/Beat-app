import React from 'react';
import AppData from '../app/AppData';
import AppSetting from '../types/AppSetting';
import { useAppContext } from '../app/AppContext';

export default function useAppSetting(): [AppSetting, (key: keyof AppSetting, value: AppSetting[keyof AppSetting] | ((previous: AppSetting[keyof AppSetting]) => AppSetting[keyof AppSetting])) => void] {

    const { setting, setSetting } = useAppContext();
    React.useEffect(() => {
        window.localStorage.setItem(AppData.local.setting, JSON.stringify(setting));
    }, [setting]);

    function updateSetting<Key extends keyof AppSetting>(
        key: Key,
        value: AppSetting[Key] | ((previous: AppSetting[Key]) => AppSetting[Key])
    ): void {
        if (typeof value === 'function') value = value(setting[key]);
        setSetting({ ...setting, [key]: value });
    }

    return [setting, updateSetting];
}
