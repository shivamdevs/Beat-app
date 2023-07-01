
import React from "react";
import { useAppContext } from "../../app/AppContext";
import AudioElement from "../AudioElement";

export default function usePlayerState(): [boolean, boolean] {
    const { player: { song } } = useAppContext();

    const [state, setState] = React.useState<boolean>(false);
    const [playable, setPlayable] = React.useState<boolean>(false);

    React.useEffect(() => {
        setPlayable(!!song);
    }, [song]);

    React.useEffect(() => {
        function handleState(): void {
            setState(!AudioElement.paused);
        }

        AudioElement.addEventListener("load", handleState);
        AudioElement.addEventListener("play", handleState);
        AudioElement.addEventListener("ended", handleState);
        AudioElement.addEventListener("pause", handleState);
        AudioElement.addEventListener("canplay", handleState);
        AudioElement.addEventListener("timeupdate", handleState);
        AudioElement.addEventListener("loadedmetadata", handleState);

        return () => {
            AudioElement.removeEventListener("load", handleState);
            AudioElement.removeEventListener("play", handleState);
            AudioElement.removeEventListener("ended", handleState);
            AudioElement.removeEventListener("pause", handleState);
            AudioElement.removeEventListener("canplay", handleState);
            AudioElement.removeEventListener("timeupdate", handleState);
            AudioElement.removeEventListener("loadedmetadata", handleState);
        };
    }, []);
    return [state, playable];
}