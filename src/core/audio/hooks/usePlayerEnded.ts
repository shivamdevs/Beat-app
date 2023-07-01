import React from 'react';
import useHasNext from './useHasNext';
import AudioElement from '../AudioElement';
import useAppSetting from '../../hooks/useAppSetting';

export default function usePlayerEnded() {
    const [{ autoplay }] = useAppSetting();
    const [, next] = useHasNext();
    React.useEffect(() => {



        function handleEnding() {
            if (AudioElement.ended && autoplay) {
                next(true);
            }
        }

        AudioElement.addEventListener("ended", handleEnding);

        return () => {
            AudioElement.removeEventListener("ended", handleEnding);
        };
    }, [next, autoplay]);
    return null;
}
