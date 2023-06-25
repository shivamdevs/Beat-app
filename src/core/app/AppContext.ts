import React from "react";
import { AppContextTypes } from "./types";

const AppContext = React.createContext<AppContextTypes>({
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
    dialog: {
        account: false,
        $set: {
            account: () => { },
        }
    },
});

export default AppContext;

export const useAppContext = () => React.useContext(AppContext);