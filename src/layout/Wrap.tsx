import React from 'react';
import AppContext from '../core/app/AppContext';
import Layout from './Layout';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../core/firebase/config';
import { AppContextTypes, Song } from '../core/app/types';
import audioPlayer from '../core/app/audioPlayer';
import { HAS_MEDIA_SESSION, useMediaSession } from '@mebtte/react-media-session';
import usePlaySong from '../core/hooks/usePlaySong';
import useNavigateSongPrevious from '../core/hooks/useNavigateSongPrevious';
import useNavigateSongNext from '../core/hooks/useNavigateSongNext';
import convertHTMLEntities from '../core/function/convertHTMLEntities';
import AppData from '../core/app/AppData';
import usePauseSong from '../core/hooks/usePauseSong';

function Wrap() {
    const [user, userLoading, userError] = useAuthState(firebase.auth);

    const [playerQueue, setPlayerQueue] = React.useState<Song[]>([]);
    const [playerSong, setPlayerSong] = React.useState<Song | null>(null);
    const [playerIndex, setPlayerIndex] = React.useState<number>(0);
    const [playerSource, setPlayerSource] = React.useState<any>(null);

    const [dialogAccount, setDialogAccount] = React.useState<boolean>(false);

    const playSong = usePlaySong();

    React.useEffect(() => {
        console.log(user, userLoading, userError);
    }, [user, userError, userLoading]);



    React.useEffect(() => {
        const update = audioPlayer.dataset.update;
        if (playerSong) {
            audioPlayer.src = playerSong.downloadUrl[4].link;
        }
        if (update) {
            audioPlayer.currentTime = parseFloat(update);
            delete audioPlayer.dataset.update;
        }

        let name = "";
        if (playerSong) name += convertHTMLEntities(playerSong.name) + " • " + convertHTMLEntities(playerSong.primaryArtists) + " • ";
        name += AppData.name;
        window.document.title = name;
    }, [playSong, playerSong]);

    const context: AppContextTypes = {
        user: (user ? {
            id: user.uid || undefined,
            name: user.displayName || undefined,
            email: user.email || undefined,
            photo: user.photoURL || undefined,
            user,
            logout: firebase.logout,
        } : null),

        state: {
            loading: userLoading,
            error: userError,
        },
        player: {
            song: playerSong,
            index: playerIndex,
            queue: playerQueue,
            source: playerSource,

            $set: {
                queue: setPlayerQueue,
                song: setPlayerSong,
                index: setPlayerIndex,
                source: setPlayerSource,
            },
        },
        dialog: {
            account: dialogAccount,

            $set: {
                account: setDialogAccount,
            },
        },
    };
    return (
        <AppContext.Provider value={context}>
            <Layout />
            {HAS_MEDIA_SESSION && playerSong && <HookMediaSession song={playerSong} />}
        </AppContext.Provider>
    );
}

export default Wrap;


function HookMediaSession({ song }: { song: Song }) {

    const play = usePlaySong();
    const pause = usePauseSong();

    const [navigatePrev, hasPrev] = useNavigateSongPrevious();
    const [navigateNext, hasNext] = useNavigateSongNext();

    useMediaSession({
        title: convertHTMLEntities(song.name) + " • " + AppData.name,
        artist: convertHTMLEntities(song.primaryArtists),
        album: convertHTMLEntities(song.album.name),
        onPlay: play,
        onPause: pause,
        onPreviousTrack: hasPrev ? (() => navigatePrev()) : undefined,
        onNextTrack: hasNext ? (() => navigateNext()) : undefined,
        artwork: song.image.map(img => ({ src: img.link, type: "image/jpg", sizes: img.quality })),
    });
    return null;
}