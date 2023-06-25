
import React from "react";
import { useAppContext } from "../app/AppContext";
import usePlaySong from "./usePlaySong";
import audioPlayer from "../app/audioPlayer";

export default function usePlayState(): [boolean, boolean, () => void] {
    const { player: { song } } = useAppContext();

    const [state, setState] = React.useState<boolean>(false);
    const [playable, setPlayable] = React.useState<boolean>(false);

    const play = usePlaySong();

    React.useEffect(() => {
        setPlayable(!!song);
    }, [song]);

    React.useEffect(() => {
        function handleState(): void {
            setState(!audioPlayer.paused);
        }

        audioPlayer.addEventListener("load", handleState);
        audioPlayer.addEventListener("play", handleState);
        audioPlayer.addEventListener("ended", handleState);
        audioPlayer.addEventListener("pause", handleState);
        audioPlayer.addEventListener("canplay", handleState);
        audioPlayer.addEventListener("timeupdate", handleState);
        audioPlayer.addEventListener("loadedmetadata", handleState);

        return () => {
            audioPlayer.removeEventListener("load", handleState);
            audioPlayer.removeEventListener("play", handleState);
            audioPlayer.removeEventListener("ended", handleState);
            audioPlayer.removeEventListener("pause", handleState);
            audioPlayer.removeEventListener("canplay", handleState);
            audioPlayer.removeEventListener("timeupdate", handleState);
            audioPlayer.removeEventListener("loadedmetadata", handleState);
        };
    }, []);
    return [state, playable, play];
}