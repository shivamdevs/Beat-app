import axios from "axios";

export default async function getFileContentSize(url: string) {
    if (!url) return "NA";
    return new Promise(resolve => {
        axios.head(url).then((result) => {
            resolve(formatBytes(result.headers['content-length'] || 0) || "NA");
        }).catch((err) => {
            console.error(err);
            resolve("NA");
        });
    });
}

export function addFileSizes(sizes: string[]) {
    const sizeRegex: RegExp = /^(\d+(\.\d+)?)\s*(KB|MB|GB)$/i;
    let totalBytes: number = 0;

    for (let i = 0; i < sizes.length; i++) {
        const size: string = sizes[i];
        const match: RegExpMatchArray | null = size.match(sizeRegex);

        if (match) {
            const value: number = parseFloat(match[1]);
            const unit: string = match[3].toUpperCase();

            if (unit === 'KB') {
                totalBytes += value * 1024;
            } else if (unit === 'MB') {
                totalBytes += value * 1024 * 1024;
            } else if (unit === 'GB') {
                totalBytes += value * 1024 * 1024 * 1024;
            }
        }
    }

    return formatBytes(totalBytes);
}


function formatBytes(bytes: number): string {
    if (bytes === 0) {
        return '0 Bytes';
    }

    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const base = 1024;
    const decimalPlaces = 2;
    const exponent = Math.floor(Math.log(bytes) / Math.log(base));
    const size = (bytes / Math.pow(base, exponent)).toFixed(decimalPlaces);

    return `${size} ${units[exponent]}`;
}