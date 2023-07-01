import playerPlayState from "../../app/playerPlayState";
import AudioElement from "../AudioElement";

export default function play() {
    if (AudioElement.paused && !playerPlayState.inQueue) {
        const state = AudioElement.play();

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