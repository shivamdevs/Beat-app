import React from 'react';
import "./Layout.scss";
import Header from '../components/Header';
import Body from './Body';
import Player from '../components/player/Player';
// import useSongBackgroundImage from '../core/hooks/service/useSongBackgroundImage';
// import useSongQueueToSong from '../core/hooks/service/useSongQueueToSong';
// import usePlayerAutoEnded from '../core/hooks/service/usePlayerAutoEnded';
// import useSaveSongQueue from '../core/hooks/service/useSaveSongQueue';
// import useGetSavedSongQueue from '../core/hooks/service/useGetSavedSongQueue';

import Dialogs from './Dialogs';

function Layout() {

    // useSongQueueToSong();
    // useSongBackgroundImage();

    // usePlayerAutoEnded();
    // useGetSavedSongQueue();
    // useSaveSongQueue();

    React.useEffect(() => {
        (window as any).loadingOverlayRemove();
    }, []);
    return (
        <div className="layout">
            <Header />
            <Body />
            <Player />
            <Dialogs />
        </div>
    );
}

export default Layout;

