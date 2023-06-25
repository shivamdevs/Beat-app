import React from 'react';
import audioPlayer from '../../app/audioPlayer';
import useAppSetting from '../useAppSetting';
import useNavigateSongNext from '../useNavigateSongNext';

export default function usePlayerAutoEnded() {
    const [{ ap: autoPlay }] = useAppSetting();
    const [next] = useNavigateSongNext();
    React.useEffect(() => {



        function handleEnding() {
            if (audioPlayer.ended && autoPlay) {
                next(true);
            }
        }

        audioPlayer.addEventListener("ended", handleEnding);

        return () => {
            audioPlayer.removeEventListener("ended", handleEnding);
        };
    }, [autoPlay, next]);
    return null;
}
