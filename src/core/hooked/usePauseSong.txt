// import React from 'react';
import audioPlayer from '../app/audioPlayer';
import playerPlayState from '../app/playerPlayState';

export default function usePauseSong(): () => void {

    function pause() {
        if (!playerPlayState.inQueue) audioPlayer.pause();
    }

    return pause;
};
