// import React from 'react';
import AudioElement from '../AudioElement';

export default function updateVolume(volume: number) {

    AudioElement.volume = volume;

    return null;
}
