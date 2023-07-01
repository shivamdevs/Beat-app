import React from 'react'
import { useAppContext } from '../../app/AppContext';
import audioPlayer from '../../app/audioPlayer';
import AppData from '../../app/AppData';

export default function useSaveSongQueue() {
    const { player: { queue, song } } = useAppContext();
    React.useEffect(() => {
        if (window.localStorage && song) {
            const autoTimeLogger = () => {
                if (queue && queue?.length > 0) {
                    const bucket = {
                        songs: queue.map(songItem => songItem.id),
                        song: [
                            song.id,
                            audioPlayer.currentTime,
                        ],
                    };
                    window.localStorage.setItem(AppData.local.queue, JSON.stringify(bucket));
                } else {
                    window.localStorage.removeItem(AppData.local.queue);

                }
            };
            audioPlayer.addEventListener('timeupdate', autoTimeLogger);
            autoTimeLogger();

            return () => audioPlayer.removeEventListener('timeupdate', autoTimeLogger);
        }
    }, [queue, song]);
}
