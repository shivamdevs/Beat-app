import React from 'react';
import { useAppContext } from '../app/AppContext';
import usePlaySong from './usePlaySong';

type NavigateFunction = (override?: boolean) => void;

export default function useNavigateSongPrevious(): [NavigateFunction, boolean] {
    const { player: { queue, index, $set: { index: setIndex } } } = useAppContext();

    const autoPlay = usePlaySong();

    const [hasPrevious, setPrevious] = React.useState<boolean>(false);
    const navigate: (NavigateFunction) = React.useCallback((override: boolean = false) => {
        if (hasPrevious) {
            setIndex(index - 1);
            autoPlay();
        }
    }, [autoPlay, hasPrevious, index, setIndex]);

    React.useEffect(() => {
        setPrevious(!!(queue && index >= 0 && queue[index - 1]));
    }, [index, queue]);

    return [navigate, hasPrevious];
}
