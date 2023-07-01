import React from 'react';
import AudioElement from '../AudioElement';
import useAppSetting from '../../hooks/useAppSetting';

export default function usePlayerVolume(): [number] {

    const [{ volume }, setSetting] = useAppSetting();

    React.useEffect(() => {

        function updateVolume() {
            setSetting("volume", AudioElement.volume);
        }

        AudioElement.addEventListener("volumechange", updateVolume);

        return () => {
            AudioElement.removeEventListener("volumechange", updateVolume);

        };
    }, [setSetting]);

    return [volume];
}