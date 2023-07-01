import React from 'react';
import useAppSetting from '../../hooks/useAppSetting';
import AudioElement from '../AudioElement';

export default function usePlayerSettingSync() {

    const [setting] = useAppSetting();

    React.useEffect(() => {
        AudioElement.muted = setting.muted;
        AudioElement.volume = setting.volume;
    }, [setting]);

    return null;
}
