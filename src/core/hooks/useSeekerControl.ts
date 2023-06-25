// import React from 'react';
import audioPlayer from '../app/audioPlayer';

export default function useSeekerControl() {

    function updater(val: number) {
        audioPlayer.currentTime = val;
    }

    // function mouseDown(eve: React.MouseEvent<HTMLInputElement>) {

    // }

    return updater;
}
