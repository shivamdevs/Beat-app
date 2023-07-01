import React from 'react';
import Dialog from './Dialog';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import AppData from '../../core/app/AppData';
import "./ConnectAccount.scss";
import { useSignInWithFacebook, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import firebase from '../../core/firebase/config';
import LoadSVG from '../common/LoadSVG';

function ConnectAccount() {
    const [signInWithGoogle, , glLoading, glError] = useSignInWithGoogle(firebase.auth);
    const [signInWithFacebook, , fbLoading, fbError] = useSignInWithFacebook(firebase.auth);

    return (
        <Dialog id="account" className="dialog-create-account" innerClassName="container" onClose={null}>
            <h2>Connect your Account</h2>
            <p>Connect your google account with <span>{AppData.name}</span> to save your favorite songs or create your own playlist.</p>
            <button type="button" onClick={() => signInWithGoogle()} disabled={glLoading || fbLoading}>
                {glLoading ? <LoadSVG /> : <FcGoogle />}
                <span>Continue with Google</span>
            </button>
            <div className="error-holder">{glError?.message}</div>

            <button type="button" onClick={() => signInWithFacebook()} disabled={fbLoading || glLoading}>
                {fbLoading ? <LoadSVG size={15} stroke={12} color="currentColor" /> : <FaFacebook style={{ color: "#1771e6" }} />}
                <span>Continue with Facebook</span>
            </button>
            <div className="error-holder">{fbError?.message}</div>
            <footer>By connecting your account to <span>{AppData.name}</span>, you agree to our <span>Privacy Policy</span> and <span>Terms of Use</span>.</footer>
        </Dialog>
    );
}

export default ConnectAccount;
