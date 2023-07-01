import React from 'react';
import "./Player.scss";
import Seeker from './Seeker';
import CentralControl from './CentralControl';
import LeftSongInfo from './LeftSongInfo';
import RightMoreControl from './RightMoreControl';

function Player() {
    return (
        <section id="player">
            <Seeker />
            <div className="bottom-controls">
                <LeftSongInfo />
                <CentralControl />
                <RightMoreControl />
            </div>
        </section>
    );
}

export default Player;
