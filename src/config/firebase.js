
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBSG1Y0i2TKtnKJ0Jzb9XTgBBxrvj3fK28",
    authDomain: "carboncrusherv2.firebaseapp.com",
    projectId: "carboncrusherv2",
    storageBucket: "carboncrusherv2.appspot.com",
    messagingSenderId: "374713103016",
    appId: "1:374713103016:web:c8a8312fe75c5437e0489d",
    measurementId: "G-208BSLHYJR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
auth.useDeviceLanguage();
