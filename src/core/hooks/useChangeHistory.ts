import React from 'react';

type History = { [key: string]: boolean };

const initial: History = {};

export default function useChangeHistory(): [History, () => History] {
    const [history, setHistory] = React.useState<History>({ ...initial });

    function updateHistory(...states: string[]): History {
        const update: History = { ...initial };
        for (const key of states) update[key] = true;
        setHistory({ ...update });
        return update;
    }
    return [history, updateHistory];
}
