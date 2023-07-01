import React from 'react';
import Tippy from '@tippyjs/react';
import usePlayerState from '../../core/audio/hooks/usePlayerState';
import useHasPrevious from '../../core/audio/hooks/useHasPrevious';
import useHasNext from '../../core/audio/hooks/useHasNext';
import useSongBufferState from '../../core/audio/hooks/useSongBufferState';
import { GiNextButton, GiPauseButton, GiPlayButton, GiPreviousButton } from 'react-icons/gi';
import LoadSVG from '../common/LoadSVG';
import togglePlayPause from '../../core/audio/event/togglePlayPause';
// import usePlayPause from '../../core/hooks/usePlayPause';
// import useNavigateSongPrevious from '../../core/hooks/useNavigateSongPrevious';
// import useNavigateSongNext from '../../core/hooks/useNavigateSongNext';
// import useSongBufferState from '../../core/hooks/useSongBufferState';

function CentralControl() {
    const [playing, isPlayable] = usePlayerState();

    const [hasPrevious, navigatePrevious] = useHasPrevious();
    const [hasNext, navigateNext] = useHasNext();

    const [isBuffering] = useSongBufferState();

    return (
        <div className="central-control">
            <Tippy content="Previous">
                <button type="button" disabled={!isPlayable || !hasPrevious} onClick={() => navigatePrevious()} className="round unique"><GiPreviousButton /></button>
            </Tippy>
            <Tippy content={playing ? "Pause" : "Play"}>
                <button type="button" disabled={!isPlayable || isBuffering} className="round big scale unique play-pause" onClick={togglePlayPause}>
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
