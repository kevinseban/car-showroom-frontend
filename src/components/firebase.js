import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAIygKjRX6CNZLIQ0x4vd56vsUm4SIq4yc",
  authDomain: "car-showroom-3bed9.firebaseapp.com",
  projectId: "car-showroom-3bed9",
  storageBucket: "car-showroom-3bed9.appspot.com",
  messagingSenderId: "396985731638",
  appId: "1:396985731638:web:8008dfb77dbe42fc6e2697",
  measurementId: "G-3GC55FMDSL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);