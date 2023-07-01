import React from 'react';
import AudioElement from '../AudioElement';

export default function useSongBufferState(): [boolean] {
    const [buffering, setBuffering] = React.useState<boolean>(false);

    React.useEffect(() => {
        function handleWaiting(): void {
            setBuffering(true);
        }

        function handleCanPlay(): void {
            setBuffering(false);
        }

        AudioElement.addEventListener('canplay', handleCanPlay);
        AudioElement.addEventListener('waiting', handleWaiting);
        AudioElement.addEventListener('loadedmetadata', handleWaiting);

        return () => {
            AudioElement.removeEventListener('canplay', handleCanPlay);
            AudioElement.removeEventListener('waiting', handleWaiting);
            AudioElement.removeEventListener('loadedmetadata', handleWaiting);
        };
    }, []);

    return [buffering];
}
