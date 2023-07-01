import React from 'react';
import { TiArrowShuffle } from 'react-icons/ti';
import { HiOutlineCog, HiOutlineDownload } from 'react-icons/hi';
import useQueueShuffle from '../../core/audio/hooks/useQueueShuffle';
import Tippy from '@tippyjs/react';
import { MdHighQuality, MdOutlineFileDownload, MdOutlineHighQuality, MdOutlineQueueMusic } from 'react-icons/md';
import { OasisMenu, OasisMenuBreak, OasisMenuItem, OasisMenuTrigger } from 'oasismenu';
import { useAppContext } from '../../core/app/AppContext';
import downloadSongFromLink from '../../core/function/downloadSongFromLink';
import useDownloadableArray from '../../core/hooks/useDownloadableArray';
import LoadSVG from '../common/LoadSVG';
import Download from '../../core/types/Download';
import InputRange from '../common/InputRange';
import updateVolume from '../../core/audio/event/updateVolume';
import usePlayerVolume from '../../core/audio/hooks/usePlayerVolume';
import usePlayerMuteState from '../../core/audio/hooks/usePlayerMuteState';
import { ImVolumeMedium, ImVolumeMute2 } from 'react-icons/im';
import useAudioQuality from '../../core/hooks/useAudioQuality';
import AudioQuality from '../../core/types/AudioQuality';
import { BsFileZip } from 'react-icons/bs';
import { addFileSizes } from '../../core/function/getFileContentSize';
import downloadBatchSongsFromLinks from '../../core/function/downloadBatchSongsFromLinks';
import convertHTMLEntities from '../../core/function/convertHTMLEntities';

function RightMoreControl() {


    const { user, player: { song } } = useAppContext();
    const [isMuted, toggleMute] = usePlayerMuteState();
    const [download, hashId] = useDownloadableArray();
    const [volume] = usePlayerVolume();

    const [qualities, updateQuality] = useAudioQuality();

    const shuffleSongs = useQueueShuffle();
    return (
        <div className="flex-grid">
            <div className="flex-wrap song-options">
                <OasisMenuTrigger name="player-download" placement="top">
                    <Tippy content="Download">
                        <button type="button" disabled={!(user && song)} className="round"><HiOutlineDownload /></button>
                    </Tippy>
                </OasisMenuTrigger>
                <OasisMenu name="player-download" className="player-download-sync">
                    <div className="oasisTopic">Download song <span style={{ color: "#727888" }}>#{hashId}</span></div>
                    <OasisMenuBreak />
                    {download.map((down: Download) => <OasisMenuItem key={down.key} disabled={down.disabled} onClick={() => downloadSongFromLink(down.link || "", down.download || "")} content={down.name} after={down.after || <LoadSVG color='currentColor' size="1em" />} icon={<MdOutlineHighQuality />} statusIcon={<MdOutlineFileDownload />} />)}
                    <OasisMenuBreak />
                    <OasisMenuItem key="download-all" onClick={() => downloadBatchSongsFromLinks(download.map(down => (down.link || "")), download.map(down => (down.download || "")), `[Beat.com#${song?.id}]-${convertHTMLEntities(song?.name)}.zip`)} after={addFileSizes(download.filter(down => (down.after !== null)).map(down => down.after))} content="Download all as ZIP" icon={<BsFileZip />} statusIcon={<MdOutlineFileDownload />} />
                </OasisMenu>
                <OasisMenuTrigger name="song-queue" placement="top">
                    <Tippy content="Queue">
                        <button type="button" disabled={!song} className="round"><MdOutlineQueueMusic /></button>
                    </Tippy>
                </OasisMenuTrigger>
                <OasisMenu name="song-queue">
                    <OasisMenuItem content="Hello" />
                </OasisMenu>
                <Tippy content="Shuffle">
                    <button type="button" disabled={!song} onClick={shuffleSongs} className="round"><TiArrowShuffle /></button>
                </Tippy>
                <Tippy content={isMuted ? "Unmute" : "Mute"}>
                    <button type="button" disabled={!song} onClick={() => toggleMute()} className="round">{isMuted ? <ImVolumeMute2 /> : <ImVolumeMedium />}</button>
                </Tippy>
                <div className="range-box volume-range">
                    <InputRange disabled={!song || isMuted} max={1} divisor={10} value={volume} onChange={updateVolume} />
                </div>
                <OasisMenuTrigger name="player-quality" placement="top-right">
                    <Tippy content="Audio Quality">
                        <button type="button" disabled={!song} className="round"><MdHighQuality /></button>
                    </Tippy>
                </OasisMenuTrigger>
                <OasisMenu name="player-quality">
                    <div className="oasisTopic">Audio Quality</div>
                    <OasisMenuBreak />
                    {qualities.map((quality: AudioQuality) => <OasisMenuItem key={quality.key} after={quality.key} content={quality.name} checked={quality.selected} onClick={() => updateQuality(quality.index)} />)}
                </OasisMenu>
                <Tippy content="Options">
                    <button type="button" disabled={!song} onClick={shuffleSongs} className="round"><HiOutlineCog /></button>
                </Tippy>
            </div>
        </div>
    )
}

export default RightMoreControl;
