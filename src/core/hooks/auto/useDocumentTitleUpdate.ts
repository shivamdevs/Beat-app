import React from 'react';
import convertHTMLEntities from '../../function/convertHTMLEntities';
import { useAppContext } from '../../app/AppContext';
import AppData from '../../app/AppData';

export default function useDocumentTitleUpdate() {

    const { player: { song } } = useAppContext();

    React.useEffect(() => {
        let name = "";
        if (song) name += convertHTMLEntities(song.name) + " • " + convertHTMLEntities(song.primaryArtists) + " • ";
        name += AppData.name;
        window.document.title = name;
    }, [song]);

    return null;
}
