import React from 'react';
import useImageDataURI from '../../core/hooks/useImageDataURI';
import { useAppContext } from '../../core/app/AppContext';
import convertHTMLEntities from '../../core/function/convertHTMLEntities';
import FavoriteButton from '../common/FavoriteButton';
import { SlOptions } from "react-icons/sl";
import { CgArrowsExpandUpRight } from "react-icons/cg";

function LeftSongInfo() {

    const { player: { song } } = useAppContext();

    const [imageSrc, setImageSrc] = useImageDataURI();

    React.useEffect(() => {
        setImageSrc(song?.image.find(img => img.quality === "50x50")?.link);
    }, [setImageSrc, song]);
    return (
        <div className="flex-grid">
            <div className="flex-wrap song-info-card">
                <div className="image" style={{ backgroundImage: `url(${imageSrc})` }}>
                    <button type="button" className="song-expand-arrow">
                        <CgArrowsExpandUpRight />
                    </button>
                </div>
                <div className="flex-grid">
                    <div className="flex-wrap song-info">
                        <div className="song-chart">
                            <div className="song-name">{convertHTMLEntities(song?.name)}</div>
                            <FavoriteButton className="small" />
                            <button type="button" className="round small"><SlOptions /></button>
                        </div>
                        <div className="song-artist">{convertHTMLEntities(song?.primaryArtists)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftSongInfo;
