import { saveAs } from 'file-saver';
import { toast } from 'react-hot-toast';
import JSZip from 'jszip';

export default function downloadBatchSongsFromLinks(links: string[], names: string[], name: string) {

    const zip = new JSZip();

    const cached = toast.loading("Batch downloading your songs...", { position: "top-right" });
    const downloadPromises = links.map(async (link, index) => {
        const cached = toast.loading(`Downloading song ${index + 1}/${links.length}`, { position: "top-right" });
        try {
            const response = await fetch(link);
            const totalBytes = Number(response.headers.get('Content-Length'));
            let downloadedBytes = 0;

            const progressCallback = (chunk_1: Uint8Array) => {
                downloadedBytes += chunk_1.length;
                const progress = (downloadedBytes / totalBytes) * 100;
                toast.loading(`Download progress ${index + 1}/${links.length}: ${progress.toFixed(0)}%`, { id: cached });
            };

            const reader = response.body?.getReader();
            const stream = new ReadableStream({
                start(controller) {
                    function pump(): any {
                        return reader?.read().then(({ done, value: value_1 }) => {
                            if (done) {
                                controller.close();
                                return;
                            }
                            controller.enqueue(value_1);
                            progressCallback(value_1);
                            return pump();
                        });
                    }
                    return pump();
                }
            });
            const response_1 = new Response(stream);
            const blob = await response_1.blob();
            zip.file(names[index], blob); // Add song to the zip file
            toast.dismiss(cached);
        } catch (error) {
            toast.error(`Failed to download a song (${index + 1}/${links.length}). Please try again.`, { id: cached });
            console.error(error);
        }
    });

    Promise.all(downloadPromises)
        .then(() => {
            return zip.generateAsync({ type: 'blob' }); // Generate the zip file as a Blob
        })
        .then(zipBlob => {
            saveAs(zipBlob, name); // Save the zip file using FileSaver.js
            toast.success("Batch songs exported successfully.", { id: cached });
        })
        .catch(error => {
            toast.error("Failed to generate the zip file. Please try again.", { id: cached });
            console.error(error);
        });
}
