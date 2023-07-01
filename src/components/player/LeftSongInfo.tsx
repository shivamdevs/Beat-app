import React from 'react';
import { useAppContext } from '../../core/app/AppContext';
import convertHTMLEntities from '../../core/function/convertHTMLEntities';
import FavoriteButton from '../common/FavoriteButton';
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import useImageDataURI from '../../core/hooks/useImageDataURI';
import Tippy from '@tippyjs/react';
import { MdLyrics } from 'react-icons/md';
import { useHashNavigateToggle } from '../../core/hooks/useHashNavigate';

function LeftSongInfo() {

    const { player: { song } } = useAppContext();

    const [imageSrc, setImageSrc] = useImageDataURI();

    React.useEffect(() => {
        setImageSrc(song?.image.find(img => img.quality === "50x50")?.link);
    }, [setImageSrc, song]);

    const [toggleHashState, hasHash] = useHashNavigateToggle(song?.id);
    return (
        <div className="flex-grid">
            <div className="flex-wrap song-info-card">
                <div className="image" style={{ backgroundImage: `url(${imageSrc})` }}>
                    <Tippy content="Lyrics">
                        <button type="button" className="song-expand-arrow">
                            <MdLyrics />
                        </button>
                    </Tippy>
                </div>
                <div className="flex-grid">
                    <div className="flex-wrap song-info">
                        <div className="song-chart">
                            <div className="song-name">{convertHTMLEntities(song?.name)}</div>
                            <FavoriteButton className="small" />
                            <Tippy content={hasHash ? "Close info" : "Song info"}>
                                <button onClick={() => toggleHashState()} type="button" className="round small">{hasHash ? <AiOutlineCloseCircle /> : <BsInfoCircle />}</button>
                            </Tippy>
                        </div>
                        <div className="song-artist">{convertHTMLEntities(song?.primaryArtists)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftSongInfo;
