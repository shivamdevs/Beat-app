// import React from 'react';
import AudioElement from '../AudioElement';

export default function updateTime(time: number) {

    AudioElement.currentTime = time;

    return null;
}
