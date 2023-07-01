// import React from 'react';
import audioPlayer from '../app/audioPlayer';
import playerPlayState from '../app/playerPlayState';

export default function usePlaySong(): () => void {
    function play() {
        console.log(audioPlayer.paused, playerPlayState.inQueue);
        if (audioPlayer.paused && !playerPlayState.inQueue) {
            const state = audioPlayer.play();

            if (state !== undefined) {
                playerPlayState.inQueue = state;
                state.catch((err) => play()).finally(() => (playerPlayState.inQueue = null));
            }
        } else {
            if (playerPlayState.inQueue) {
                playerPlayState.inQueue.finally(() => {
                    playerPlayState.inQueue = null;
                    play();
                });
            }
        }
    }

    return play;
};
