export default function imageDataURI(source: string): Promise<string | null> {
    return new Promise((resolve) => {
        fetch(source).then(response => response.blob()).then(blob => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(`${reader.result}`);
            reader.readAsDataURL(blob);
        }).catch((error) => {
            console.error(error);
            resolve(null);
        });
    });
};
