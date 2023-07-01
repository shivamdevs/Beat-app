import React from 'react';
import { useAppContext } from '../../app/AppContext';
import Song from '../../types/Song';

export default function useSongQueueToSong(): null {

    const { player: { queue, index, song, $set: { song: setSong } } } = useAppContext();

    React.useEffect((): void => {
        if (queue && index >= 0) {
            const newSong: Song = queue?.[index];
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
