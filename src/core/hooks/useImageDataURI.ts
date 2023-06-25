import React from 'react';
import imageDataURI from '../function/imageDataURI';

export default function useImageDataURI(imageSource?: string): [string | null, (source?: string) => void] {
    const [dataURI, setDataURI] = React.useState<string | null>(null);

    function getImageSource(source?: string): void {
        (source || imageSource) ? imageDataURI(source || imageSource || '').then((result) => {
            setDataURI(result);
        }) : setDataURI(null);
    }

    return [dataURI, getImageSource];
}
