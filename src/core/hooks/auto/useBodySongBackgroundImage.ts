import React from 'react';
import { useAppContext } from '../../app/AppContext';
import imageDataURI from '../../function/imageDataURI';

export default function useBodySongBackgroundImage(): null {
    const { player: { song } } = useAppContext();
    React.useEffect((): void => {
        if (song) {
            const bgImage: string | undefined = song.image.find(img => img.quality === "500x500")?.link;
            if (bgImage) {
                imageDataURI(bgImage).then((uri) => {
                    window.document.body.style.setProperty("background-image", `url(${uri})`);
                });
            } else {
                window.document.body.style.removeProperty("background-image");
            }
        } else {
            window.document.body.style.removeProperty("background-image");
        }
    }, [song]);

    return null;
}
