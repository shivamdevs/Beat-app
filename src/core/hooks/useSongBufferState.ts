import React from 'react';
import audioPlayer from '../app/audioPlayer';

export default function useSongBufferState(): boolean {
    const [buffering, setBuffering] = React.useState<boolean>(false);

    React.useEffect(() => {
        function handleWaiting(): void {
            setBuffering(true);
        }

        function handleCanPlay(): void {
            setBuffering(false);
        }

        audioPlayer.addEventListener('canplay', handleCanPlay);
        audioPlayer.addEventListener('waiting', handleWaiting);
        audioPlayer.addEventListener('loadedmetadata', handleWaiting);

        return () => {
            audioPlayer.removeEventListener('canplay', handleCanPlay);
            audioPlayer.removeEventListener('waiting', handleWaiting);
            audioPlayer.removeEventListener('loadedmetadata', handleWaiting);
        };
    }, []);

    return buffering;
}
