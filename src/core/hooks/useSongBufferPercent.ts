import React from 'react';
import audioPlayer from '../app/audioPlayer';

export default function useSongBufferPercent(): number {
    const [buffer, setBuffer] = React.useState<number>(0);

    React.useEffect(() => {
        function updateBuffer() {
            let percent = 0;
            if (audioPlayer && audioPlayer.buffered && audioPlayer.buffered.length > 0) {
                const currentTime = audioPlayer.currentTime;
                const bufferedEnd = audioPlayer.buffered.end(audioPlayer.buffered.length - 1);
                const timeDifference = bufferedEnd - currentTime;

                percent = (bufferedEnd / audioPlayer.duration) * 100;

                if (timeDifference < 1) {
                    percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                }
            }
            setBuffer(percent);
        }

        audioPlayer.addEventListener("progress", updateBuffer);
        audioPlayer.addEventListener("timeupdate", updateBuffer);

        return () => {
            audioPlayer.removeEventListener("progress", updateBuffer);
            audioPlayer.removeEventListener("timeupdate", updateBuffer);
        };
    }, []);

    return buffer;
}
