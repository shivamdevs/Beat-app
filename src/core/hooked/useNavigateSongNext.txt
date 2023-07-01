import React from 'react';
import { useAppContext } from '../app/AppContext';
import usePlaySong from './usePlaySong';

type NavigateFunction = (override?: boolean) => void;

export default function useNavigateSongNext(): [NavigateFunction, boolean] {
    const { player: { queue, index, $set: { index: setIndex } } } = useAppContext();

    const autoPlay = usePlaySong();

    const [hasNext, setNext] = React.useState<boolean>(false);
    const navigate: (NavigateFunction) = React.useCallback((override: boolean = false) => {
        if (hasNext) {
            setIndex(index + 1);
            autoPlay();
        }
    }, [autoPlay, hasNext, index, setIndex]);

    React.useEffect(() => {
        setNext(!!(queue && index >= 0 && queue[index + 1]));
    }, [index, queue]);

    return [navigate, hasNext];
}
