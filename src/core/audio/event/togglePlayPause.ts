import AudioElement from "../AudioElement";
import pause from "./pause";
import play from "./play";

export default function togglePlayPause() {
    if (AudioElement.paused) {
        play();
    } else {
        pause();
    }
}