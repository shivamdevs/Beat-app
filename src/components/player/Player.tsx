import React from 'react';
import "./Player.scss";
import Seeker from './Seeker';
import CentralControl from './CentralControl';
import LeftSongInfo from './LeftSongInfo';

function Player() {
    return (
        <section id="player">
            <Seeker />
            <div className="bottom-controls">
                <LeftSongInfo />
                <CentralControl />
                <div className="flex-grid">
                    <div className="flex-wrap">
                        Hello
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Player;
