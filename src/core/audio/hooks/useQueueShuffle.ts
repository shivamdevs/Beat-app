// import React from 'react';
import shuffleArray from '../../function/shuffleArray';
import { useAppContext } from '../../app/AppContext';
import autoplay from '../event/autoplay';
import AudioElement from '../AudioElement';

export default function useQueueShuffle() {
    const { player: { queue, $set: { queue: setQueue, index: setIndex } } } = useAppContext();

    function shuffleSongs() {
        let state = false;
        setQueue(shuffleArray([...queue]));
        if (!AudioElement.paused) {
            AudioElement.pause();
            state = true;
        }
        setIndex(0);
        if (state) autoplay();
    }

    return shuffleSongs;
}
