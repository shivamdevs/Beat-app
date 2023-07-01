import React from 'react';
import AppContext from '../core/app/AppContext';
import Layout from './Layout';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../core/firebase/config';
// import { HAS_MEDIA_SESSION, useMediaSession } from '@mebtte/react-media-session';
// import usePlaySong from '../core/hooks/usePlaySong';
// import useNavigateSongPrevious from '../core/hooks/useNavigateSongPrevious';
// import useNavigateSongNext from '../core/hooks/useNavigateSongNext';
// import convertHTMLEntities from '../core/function/convertHTMLEntities';
// import AppData from '../core/app/AppData';
// import usePauseSong from '../core/hooks/usePauseSong';
// import Hooks from './Hooks';
import Dialog from '../core/types/Dialog';
import Song from '../core/types/Song';
import AppContextType from '../core/types/AppContext';
import Hooks from './Hooks';
import AppSetting, { initialSetting } from '../core/types/AppSetting';
import AppData from '../core/app/AppData';

function Wrap() {
    const [user, userLoading, userError] = useAuthState(firebase.auth);

    const [playerQueue, setPlayerQueue] = React.useState<Song[]>([]);
    const [playerSong, setPlayerSong] = React.useState<Song | null>(null);
    const [playerIndex, setPlayerIndex] = React.useState<number>(0);
    const [playerSource, setPlayerSource] = React.useState<any>(null);

    const [dialog, setDialog] = React.useState<Dialog>({});

    const [setting, setSetting] = React.useState<AppSetting>(() => {
        if (window.localStorage) {
            const saved = window.localStorage.getItem(AppData.local.setting);
            if (saved) try {
                const parsed: AppSetting = JSON.parse(saved);
                return { ...initialSetting, ...parsed };
            } catch (error) { console.error(error); }
        }
        return initialSetting;
    });

    // const playSong = usePlaySong();

    React.useEffect(() => {
        console.log(user, userLoading, userError);
    }, [user, userError, userLoading]);


    function dialogSetter(key: string, value: boolean):void {
        setDialog((list: Dialog) => ({ ...list, [key]: value }));
    }

    const context: AppContextType = {
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
        dialog,
        setDialog: dialogSetter,

        setting,
        setSetting,
    };
    return (
        <AppContext.Provider value={context}>
            <Hooks />
            <Layout />
        </AppContext.Provider>
    );
}

export default Wrap;


