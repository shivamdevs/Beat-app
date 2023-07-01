import React from "react";
import AppContextType from "../types/AppContext";
import { initialSetting } from "../types/AppSetting";

const AppContext = React.createContext<AppContextType>({
    user: null,
    state: {
        loading: true,
        error: undefined,
    },
    player: {
        queue: [],
        song: null,
        index: -1,
        source: undefined,
        $set: {
            queue: () => { },
            song: () => { },
            index: () => { },
            source: () => { },
        }
    },
    dialog: {},
    setDialog: () => { },

    setting: initialSetting,
    setSetting: () => { },
});

export default AppContext;

export const useAppContext = () => React.useContext(AppContext);