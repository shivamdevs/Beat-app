
// import React from "react";
import usePlaySong from "./usePlaySong";
import usePauseSong from "./usePauseSong";
import usePlayState from "./usePlayState";
import audioPlayer from "../app/audioPlayer";

export default function usePlayPause(): [() => void, boolean, boolean] {
    const [state, playable] = usePlayState();

    const play = usePlaySong();
    const pause = usePauseSong();

    function toggler(): void {
        if (audioPlayer) {
            console.log(audioPlayer.paused);
            
            if (audioPlayer.paused) {
                play();
            } else {
                pause();
            }
        }
    }

    return [toggler, state, playable];
}