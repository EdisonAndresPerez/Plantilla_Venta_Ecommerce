import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWU_LdE_dgpaV_JycIIKMJ7kKowvSmpQA",
  authDomain: "bunkershop.firebaseapp.com",
  projectId: "bunkershop",
  storageBucket: "bunkershop.firebasestorage.app",
  messagingSenderId: "550849423445",
  appId: "1:550849423445:web:bdcfe172d290c5f9780cdc",
  measurementId: "G-VSZYZKDDYF",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export { auth, googleProvider };
