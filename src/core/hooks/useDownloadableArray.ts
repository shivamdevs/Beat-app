import React from 'react';
import Download from '../types/Download';
import { useAppContext } from '../app/AppContext';
import convertHTMLEntities from '../function/convertHTMLEntities';
import getFileContentSize from '../function/getFileContentSize';


const initialDownload: Download[] = ["320", "160", "96", "48", "12"].map(byte => ({
    key: `${byte}kbps`,
    name: `Download ${byte}kbps`,
    after: null,
    link: null,
    download: null,
    disabled: false,
}))

export default function useDownloadableArray(): [Download[], string] {
    const [download, setDownload] = React.useState<Download[]>(initialDownload);
    const { player: { song } } = useAppContext();

    React.useEffect(() => {
        if (song) {
            const result: Download[] = [...initialDownload];
            [...song.downloadUrl].reverse().forEach(async (download, index) => {
                result[index].download = `[Beat.com#${song.id}]-${convertHTMLEntities(song.name)}-${download.quality}.${download.link.split(".").at(-1)}`
                result[index].link = download.link;
                result[index].after = await getFileContentSize(download.link);
                result[index].disabled = false;
            })
            setDownload(result);
        } else {
            setDownload([...initialDownload]);
        }
    }, [song]);

    return [download, song?.id || ""];
}
