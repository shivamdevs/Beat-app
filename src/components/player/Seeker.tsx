import React from 'react';
import parseTime from '../../core/function/parseTime';
import useSongTiming from '../../core/hooks/useSongTiming';
import useSongBufferPercent from '../../core/hooks/useSongBufferPercent';
import InputRange from '../common/InputRange';
import useSeekerControl from '../../core/hooks/useSeekerControl';
import { useAppContext } from '../../core/app/AppContext';

function Seeker() {

    const [timePlayed, totalDuration] = useSongTiming();
    const bufferPercentage = (100 - useSongBufferPercent());

    const { player: { song } } = useAppContext();

    const updateTime = useSeekerControl();

    return (
        <div className="top-seeker">
            <div className="time">{parseTime(timePlayed)}</div>
            <div className="range-box">
                <div className="buffer" style={{ right: `${bufferPercentage}%` }}></div>
                <InputRange max={totalDuration} disabled={!song} value={timePlayed} onChange={updateTime} />
            </div>
            <div className="time">{parseTime(totalDuration || +(song?.duration || 0))}</div>
        </div>
    );
}

export default Seeker;
