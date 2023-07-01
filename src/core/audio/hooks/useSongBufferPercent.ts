import React from 'react';
import AudioElement from '../AudioElement';

export default function useSongBufferPercent(): number {
    const [buffer, setBuffer] = React.useState<number>(0);

    React.useEffect(() => {
        function updateBuffer() {
            let percent = 0;
            if (AudioElement && AudioElement.buffered && AudioElement.buffered.length > 0) {
                const currentTime = AudioElement.currentTime;
                const bufferedEnd = AudioElement.buffered.end(AudioElement.buffered.length - 1);
                const timeDifference = bufferedEnd - currentTime;

                percent = (bufferedEnd / AudioElement.duration) * 100;

                if (timeDifference < 1) {
                    percent = (AudioElement.currentTime / AudioElement.duration) * 100;
                }
            }
            setBuffer(percent);
        }

        AudioElement.addEventListener("progress", updateBuffer);
        AudioElement.addEventListener("timeupdate", updateBuffer);

        return () => {
            AudioElement.removeEventListener("progress", updateBuffer);
            AudioElement.removeEventListener("timeupdate", updateBuffer);
        };
    }, []);

    return buffer;
}
