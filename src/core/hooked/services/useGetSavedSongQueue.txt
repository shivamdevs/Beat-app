import React from 'react';
import audioPlayer from '../../app/audioPlayer';
import { useAppContext } from '../../app/AppContext';
import AppData from '../../app/AppData';
import axios from 'axios';
import { Song } from '../../app/types';

export default function useGetSavedSongQueue() {

    const { player: { $set: { queue: setQueue, index: setIndex } } } = useAppContext();

    React.useEffect(() => {
        if (window.localStorage) {
            const bucket = window.localStorage.getItem(AppData.local.queue);
            if (bucket) {
                try {
                    const parsed = JSON.parse(bucket);
                    parsed && parsed.songs && Array.isArray(parsed.songs) && axios.get(AppData.api.songs + parsed.songs).then((result) => {
                        const songs = result.data.data;
                        if (songs.length) {
                            const songIndex = !(parsed.song && Array.isArray(parsed.song)) ? 0 : songs.findIndex((item: Song) => item.id === parsed.song[0]);
                            setIndex(songIndex > -1 ? songIndex : 0);
                            setQueue(songs);
                            if (!Number.isNaN(parsed.song[1])) audioPlayer.dataset.update = parsed.song[1];
                        }
                    }).catch((err) => {
                        console.error(err);
                    });
                } catch (error) { console.error(); }
            }
        }
    }, [setIndex, setQueue]);
}
