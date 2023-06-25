import React from 'react';
import { useAppContext } from '../../app/AppContext';

export default function useSongQueueToSong() {

    const { player: { queue, index, song, $set: { song: setSong } } } = useAppContext();

    React.useEffect(() => {
        if (queue && index >= 0) {
            const newSong = queue?.[index];
            if (newSong) {
                if (song?.id !== newSong.id) {
                    setSong(newSong);
                    console.log(newSong);
                    
                }
            } else {
                setSong(null);
            }
        }
    }, [index, queue, setSong, song?.id]);

    return null;
}
