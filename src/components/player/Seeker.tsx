import React from 'react';
import useSongTiming from '../../core/audio/hooks/useSongTiming';
import parseTime from '../../core/function/parseTime';
import { useAppContext } from '../../core/app/AppContext';
import useSongBufferPercent from '../../core/audio/hooks/useSongBufferPercent';
import InputRange from '../common/InputRange';
import updateTime from '../../core/audio/event/updateTime';
// import useSongBufferPercent from '../../core/hooks/useSongBufferPercent';
// import InputRange from '../common/InputRange';
// import useSeekerControl from '../../core/hooks/useSeekerControl';

function Seeker() {

    const [timePlayed, totalDuration] = useSongTiming();
    const bufferPercentage = (100 - useSongBufferPercent());

    const { player: { song } } = useAppContext();

    return (
        <div className="top-seeker">
            <div className="time">{parseTime(timePlayed)}</div>
            <div className="range-box">
                <div className="buffer" style={{ right: `${bufferPercentage}%` }}></div>
                <InputRange max={totalDuration} disabled={!song} value={timePlayed} onChange={updateTime} />
            </div>
            <div className="time">{parseTime(totalDuration || (+(song?.duration || 0) || null))}</div>
        </div>
    );
}

export default Seeker;
