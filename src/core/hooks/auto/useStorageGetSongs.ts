import React from 'react';
import axios from 'axios';
import AudioElement from '../../audio/AudioElement';
import AppData from '../../app/AppData';
import { useAppContext } from '../../app/AppContext';
import Song from '../../types/Song';
import StorageSongs from '../../types/StorageSongs';

export default function useStorageGetSongs(): null {

    const { player: { $set: { queue: setQueue, index: setIndex } } } = useAppContext();

    React.useEffect((): void => {
        if (window.localStorage) {
            const bucket: string | null = window.localStorage.getItem(AppData.local.queue);
            if (bucket) {
                try {
                    const parsed: StorageSongs = JSON.parse(bucket);
                    console.log(parsed);
                    
                    parsed && parsed.songs && Array.isArray(parsed.songs) && axios.get(AppData.api.songs + parsed.songs).then((result) => {
                        const songs: Song[] = result.data.data;

                        if (songs.length) {
                            const songIndex: number = !(parsed.song && Array.isArray(parsed.song)) ? 0 : songs.findIndex((item: Song) => item.id === parsed.song[0]);

                            setIndex(songIndex > -1 ? songIndex : 0);
                            setQueue(songs);

                            if (!Number.isNaN(parsed.song[1])) AudioElement.dataset.update = `${parsed.song[1]}`;
                        }
                    }).catch((err) => {
                        console.error(err);
                    });
                } catch (err) { console.error(err); }
            }
        }
    }, [setIndex, setQueue]);

    return null;
}
