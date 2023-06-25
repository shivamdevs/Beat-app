
interface AppDataType {
    name: string;
    local: {
        setting: string;
        queue: string;
    },
    api: {
        host: string;
        songs: string;
    }
}

const AppData: AppDataType = {
    name: "Be▷t",

    local: {
        setting: "beat:setting",
        queue: "beat:queue",
    },

    api: {
        host: "https://saavn.me",
        songs: "https://saavn.me/songs?id=",
    }
};

export default AppData;