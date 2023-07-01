import playerPlayState from "../../app/playerPlayState";
import AudioElement from "../AudioElement";

export default function pause() {
    if (!playerPlayState.inQueue) AudioElement.pause();
}