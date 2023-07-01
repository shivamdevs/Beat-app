import React from 'react';
import { useAppContext } from '../../app/AppContext';
import NavigateFunction from '../../types/NavigateFunction';
import autoplay from '../event/autoplay';
import AudioElement from '../AudioElement';

export default function useHasPrevious(): [boolean, NavigateFunction] {
    const { player: { queue, index, $set: { index: setIndex } } } = useAppContext();


    const [hasNext, setNext] = React.useState<boolean>(false);
    const navigate: (NavigateFunction) = React.useCallback((override?: boolean) => {
        if (hasNext) {
            setIndex(index - 1);
            if (override || !AudioElement.paused) autoplay();
        }
    }, [hasNext, index, setIndex]);

    React.useEffect(() => {
        setNext(!!(queue && index >= 0 && queue[index - 1]));
    }, [index, queue]);

    return [hasNext, navigate];
}