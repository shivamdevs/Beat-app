// import React from 'react';
import AudioElement from '../AudioElement';
import play from './play';

export default function autoplay() {
    AudioElement.addEventListener("canplay", () => {
        play();
    }, {once: true});
}
