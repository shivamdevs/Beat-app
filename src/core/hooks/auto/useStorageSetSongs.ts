import React from 'react'
import { useAppContext } from '../../app/AppContext';
import AppData from '../../app/AppData';
import AudioElement from '../../audio/AudioElement';
import StorageSongs from '../../types/StorageSongs';

export default function useStorageSetSongs() {
    const { player: { queue, song } } = useAppContext();
    React.useEffect(() => {
        if (window.localStorage && song) {
            const autoTimeLogger = () => {
                if (queue && queue?.length > 0) {
                    const bucket: StorageSongs = {
                        songs: queue.map(songItem => songItem.id),
                        song: [
                            song.id,
                            AudioElement.currentTime,
                        ],
                    };
                    window.localStorage.setItem(AppData.local.queue, JSON.stringify(bucket));
                } else {
                    window.localStorage.removeItem(AppData.local.queue);

                }
            };
            AudioElement.addEventListener('timeupdate', autoTimeLogger);
            autoTimeLogger();

            return () => AudioElement.removeEventListener('timeupdate', autoTimeLogger);
        }
    }, [queue, song]);
}
