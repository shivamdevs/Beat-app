import React from 'react';
import audioPlayer from '../app/audioPlayer';

export default function useSongTiming(): [number | null, number | null] {
    const [timePlayed, setTimePlayed] = React.useState<number | null>(null);
    const [totalDuration, setTotalDuration] = React.useState<number | null>(null);

    React.useEffect(() => {

        function updateTimings() {
            setTimePlayed(audioPlayer.currentTime ?? -1);
            setTotalDuration(audioPlayer.duration ?? -1);
        }



        audioPlayer.addEventListener("canplay", updateTimings);
        audioPlayer.addEventListener("timeupdate", updateTimings);
        audioPlayer.addEventListener("loadedmetadata", updateTimings);


        return () => {
            audioPlayer.removeEventListener("canplay", updateTimings);
            audioPlayer.removeEventListener("timeupdate", updateTimings);
            audioPlayer.removeEventListener("loadedmetadata", updateTimings);

        };
    }, []);

    return [timePlayed, totalDuration];
}
