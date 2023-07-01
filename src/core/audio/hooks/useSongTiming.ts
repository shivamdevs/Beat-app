import React from 'react';
import AudioElement from '../AudioElement';

export default function useSongTiming(): [number | null, number | null] {
    const [timePlayed, setTimePlayed] = React.useState<number | null>(null);
    const [totalDuration, setTotalDuration] = React.useState<number | null>(null);

    React.useEffect(() => {

        function updateTimings() {
            setTimePlayed(AudioElement.currentTime ?? null);
            setTotalDuration(AudioElement.duration ?? null);
        }



        AudioElement.addEventListener("canplay", updateTimings);
        AudioElement.addEventListener("timeupdate", updateTimings);
        AudioElement.addEventListener("loadedmetadata", updateTimings);


        return () => {
            AudioElement.removeEventListener("canplay", updateTimings);
            AudioElement.removeEventListener("timeupdate", updateTimings);
            AudioElement.removeEventListener("loadedmetadata", updateTimings);

        };
    }, []);

    return [timePlayed, totalDuration];
}
