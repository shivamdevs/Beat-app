export default interface Song {
    id: string;
    name: string;
    album: {
        id: string;
        name: string;
        url: string;
    };
    year: string;
    releaseDate: string;
    duration: string;
    label: string;
    primaryArtists: string;
    primaryArtistsId: string;
    featuredArtists: string;
    featuredArtistsId: string;
    explicitContent: number;
    playCount: number;
    language: string;
    hasLyrics: string;
    url: string;
    copyright: string;
    image: {
        quality: "50x50" | "150x150" | "500x500";
        link: string;
    }[];
    downloadUrl: {
        quality: "12kbps" | "48kbps" | "96kbps" | "160kbps" | "320kbps";
        link: string;
    }[];
};