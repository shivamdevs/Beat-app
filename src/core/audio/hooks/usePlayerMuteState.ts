// import React from 'react';
import useAppSetting from '../../hooks/useAppSetting';

export default function usePlayerMuteState(): [boolean, () => void] {
    const [{ muted }, updateSetting] = useAppSetting();

    function toggleMute(state: boolean | null = null) {
        if (state !== null) {
            updateSetting("muted", state);
        } else {
            updateSetting("muted", !muted);
        }
    }

    return [muted, toggleMute];
}
