// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlQuPV3Al9rok80YlcXeXJ155nh3lgD1I",
  authDomain: "carboncrusher-e1fb5.firebaseapp.com",
  projectId: "carboncrusher-e1fb5",
  storageBucket: "carboncrusher-e1fb5.appspot.com",
  messagingSenderId: "971190120683",
  appId: "1:971190120683:web:c1df6995f7a5699bf0ceae",
  measurementId: "G-5S3Y3RVCFV",
};

initializeApp(firebaseConfig);
const auth = getAuth();
// To apply the default browser preference instead of explicitly setting it.
auth.useDeviceLanguage();

export default auth;
