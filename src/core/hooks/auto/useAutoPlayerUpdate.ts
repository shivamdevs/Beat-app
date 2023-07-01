import React from 'react'
import { useAppContext } from '../../app/AppContext';
import AudioElement from '../../audio/AudioElement';
import useAppSetting from '../useAppSetting';

export default function useAutoPlayerUpdate() {

    const { player: { song } } = useAppContext();
    const [{ quality }] = useAppSetting();

    React.useEffect(() => {
        const update = AudioElement.dataset.update;
        if (song) {
            AudioElement.src = song.downloadUrl[quality].link;
        }
        if (update) {
            AudioElement.currentTime = parseFloat(update);
            delete AudioElement.dataset.update;
        }

    }, [quality, song]);

    return null;
}
