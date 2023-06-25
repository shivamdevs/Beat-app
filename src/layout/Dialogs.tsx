import React from 'react';
import ConnectAccount from '../components/dialog/ConnectAccount';
import { useAppContext } from '../core/app/AppContext';

function Dialogs() {
    const { user, dialog: { account } } = useAppContext();
    return (
        <>
            {!user && account && <ConnectAccount />}
        </>
    );
}

export default Dialogs;
