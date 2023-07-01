import { User } from "firebase/auth";
import Song from "./Song";
import Dialog from "./Dialog";
import AppSetting from "./AppSetting";

export default interface AppContext {
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
    };

    dialog: Dialog;
    setDialog: (key: keyof Dialog, value: boolean) => void;

    setting: AppSetting;
    setSetting: React.Dispatch<AppSetting> | ((value: AppSetting) => void);
};