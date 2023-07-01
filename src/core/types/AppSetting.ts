export default interface AppSetting {
    quality: 0 | 1 | 2 | 3 | 4;
    autoplay: boolean;
    muted: boolean;
    volume: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1 | number;
}

export const initialSetting: AppSetting = {
    quality: 4,
    autoplay: true,
    muted: false,
    volume: 1,
};