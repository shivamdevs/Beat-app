import React from 'react';
import usePlayPause from '../../core/hooks/usePlayPause';
import useNavigateSongPrevious from '../../core/hooks/useNavigateSongPrevious';
import useNavigateSongNext from '../../core/hooks/useNavigateSongNext';
import { GiNextButton, GiPauseButton, GiPlayButton, GiPreviousButton } from 'react-icons/gi';
import Tippy from '@tippyjs/react';
import LoadSVG from '../common/LoadSVG';
import useSongBufferState from '../../core/hooks/useSongBufferState';

function CentralControl() {
    const [playPause, playing, isPlayable] = usePlayPause();

    const [navigatePrevious, hasPrevious] = useNavigateSongPrevious();
    const [navigateNext, hasNext] = useNavigateSongNext();

    const isBuffering = useSongBufferState();

    return (
        <div className="central-control">
            <Tippy content="Previous">
                <button type="button" disabled={!isPlayable || !hasPrevious} onClick={() => navigatePrevious()} className="round unique"><GiPreviousButton /></button>
            </Tippy>
            <Tippy content={playing ? "Pause" : "Play"}>
                <button type="button" disabled={!isPlayable || isBuffering} className="round big scale unique play-pause" onClick={playPause}>
                    {playing ? <GiPauseButton /> : <GiPlayButton />}
                    <span data-loading={isBuffering}><LoadSVG color="#fffc" stroke={3} /></span>
                </button>
            </Tippy>
            <Tippy content="Next">
                <button type="button" disabled={!isPlayable || !hasNext} onClick={() => navigateNext()} className="round unique"><GiNextButton /></button>
            </Tippy>
        </div>
    );
}

export default CentralControl;
