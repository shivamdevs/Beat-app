import React from 'react';
import AudioQuality from '../types/AudioQuality';
import useAppSetting from './useAppSetting';
import AudioElement from '../audio/AudioElement';
import autoplay from '../audio/event/autoplay';



export default function useAudioQuality(): [AudioQuality[], (index: AudioQuality["index"]) => void] {
    const [{ quality }, setSetting] = useAppSetting();
    const [qualities, setQualities] = React.useState<AudioQuality[]>([
        {
            name: "Extreme",
            key: "320kbps",
            index: 4,
            selected: (quality === 4)
        },
        {
            name: "Best",
            key: "160kbps",
            index: 3,
            selected: (quality === 3)
        },
        {
            name: "Good",
            key: "96kbps",
            index: 2,
            selected: (quality === 2)
        },
        {
            name: "Fair",
            key: "48kbps",
            index: 1,
            selected: (quality === 1)
        },
        {
            name: "Low",
            key: "12kbps",
            index: 0,
            selected: (quality === 0)
        }
    ]);


    React.useEffect(() => {
        setQualities(old => old.map((item: AudioQuality) => {
            item.selected = (item.index === quality);
            return item;
        }));
    }, [quality]);

    function updateQuality(index: AudioQuality["index"] = 4) {
        AudioElement.dataset.update = `${AudioElement.currentTime}`;
        setSetting("quality", index);
        autoplay();
    }

    return [qualities, updateQuality];
}
