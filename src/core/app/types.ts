import { User } from "firebase/auth";

export type AppContextTypes = {
    user: {
        id: string | undefined;
        name: string | undefined;
        email: string | undefined;
        photo: string | undefined;
        user: User | undefined;
        logout: () => void;
    } | null | undefined,
    state: {
        loading: boolean;
        error: Error | undefined;
    };
    player: {
        song: Song | null;
        index: number;
        queue: Song[];
        source: any;

        $set: {
            song: React.Dispatch<Song | null> | ((value: Song | null) => void);
            index: React.Dispatch<number> | ((value: number) => number);
            queue: React.Dispatch<Song[]> | ((value: Song[]) => void);
            source: React.Dispatch<Song[]> | ((value: any) => void);
        };
    },
    dialog: {
        account: boolean,
        $set: {
            account: React.Dispatch<boolean>;
        };
    }
};

export type Song = {
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