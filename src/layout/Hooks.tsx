// import React from 'react';
import useStorageGetSongs from '../core/hooks/auto/useStorageGetSongs';
import useBodySongBackgroundImage from '../core/hooks/auto/useBodySongBackgroundImage';
import useSongQueueToSong from '../core/hooks/auto/useSongQueueToSong';
import useDocumentTitleUpdate from '../core/hooks/auto/useDocumentTitleUpdate';
import useAutoPlayerUpdate from '../core/hooks/auto/useAutoPlayerUpdate';
import useStorageSetSongs from '../core/hooks/auto/useStorageSetSongs';
import { HAS_MEDIA_SESSION, useMediaSession } from '@mebtte/react-media-session';
import { useAppContext } from '../core/app/AppContext';
import useHasPrevious from '../core/audio/hooks/useHasPrevious';
import useHasNext from '../core/audio/hooks/useHasNext';
import convertHTMLEntities from '../core/function/convertHTMLEntities';
import play from '../core/audio/event/play';
import pause from '../core/audio/event/pause';
import Song from '../core/types/Song';
import AppData from '../core/app/AppData';
import usePlayerEnded from '../core/audio/hooks/usePlayerEnded';
import usePlayerSettingSync from '../core/audio/hooks/usePlayerSettingSync';

function Hooks() {

    useStorageGetSongs();
    useSongQueueToSong();
    useAutoPlayerUpdate();
    useDocumentTitleUpdate();
    useBodySongBackgroundImage();
    useStorageSetSongs();
    usePlayerEnded();
    usePlayerSettingSync();

    const { player: { song } } = useAppContext();

    return (<>
        {HAS_MEDIA_SESSION && song && <HookMediaSession song={song} />}
    </>);
}

export default Hooks;


function HookMediaSession({ song }: { song: Song }) {

    const [hasPrev, navigatePrev] = useHasPrevious();
    const [hasNext, navigateNext] = useHasNext();

    useMediaSession({
        title: convertHTMLEntities(song.name) + " • " + AppData.name,
        artist: convertHTMLEntities(song.primaryArtists),
        album: convertHTMLEntities(song.album.name),
        onPlay: play,
        onPause: pause,
        onPreviousTrack: hasPrev ? (() => navigatePrev(true)) : undefined,
        onNextTrack: hasNext ? (() => navigateNext(true)) : undefined,
        artwork: song.image.map(img => ({ src: img.link, type: "image/jpg", sizes: img.quality })),
    });
    return null;
}