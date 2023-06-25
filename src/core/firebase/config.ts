import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const configParse: string = process.env.REACT_APP_FIREBASE_CONFIG || "{}";
const firebaseConfig: object = JSON.parse(configParse);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseFirestore = getFirestore(firebaseApp);

const firebaseAuthLogout = (): void => {
    signOut(firebaseAuth);
};

const firebase = {
    app: firebaseApp,
    auth: firebaseAuth,
    store: firebaseFirestore,
    logout: firebaseAuthLogout,
};
export default firebase;

export {
    firebaseApp,
    firebaseAuth,
    firebaseFirestore,
    firebaseAuthLogout,
};