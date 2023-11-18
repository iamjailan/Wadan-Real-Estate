import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-store-f4c5a.firebaseapp.com",
  projectId: "mern-store-f4c5a",
  storageBucket: "mern-store-f4c5a.appspot.com",
  messagingSenderId: "178288319768",
  appId: "1:178288319768:web:79adcf53927d9d69ea526d",
};

export const app = initializeApp(firebaseConfig);
