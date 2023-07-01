export default interface Download {
    key: string;
    name: string;
    after: string | any;
    link: string | null;
    download: string | null;
    disabled: boolean;
};