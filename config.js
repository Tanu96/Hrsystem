import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore} from "firebase/firestore";
// import { getStorage } from "firebase/storage";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAG925XEvCkDuttjihnUAdcTjVGSXOqq04",
  authDomain: "hrsystem2022-ca020.firebaseapp.com",
  projectId: "hrsystem2022-ca020",
  storageBucket: "hrsystem2022-ca020.appspot.com",
  messagingSenderId: "837238733241",
  appId: "1:837238733241:web:b8c441ea4c5c5916581e68"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
