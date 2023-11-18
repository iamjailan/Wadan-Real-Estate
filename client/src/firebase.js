import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAzOpy3NtVO4S3xIVM5lcSuqJNieaE76d8",
  authDomain: "mern-store-f4c5a.firebaseapp.com",
  projectId: "mern-store-f4c5a",
  storageBucket: "mern-store-f4c5a.appspot.com",
  messagingSenderId: "178288319768",
  appId: "1:178288319768:web:79adcf53927d9d69ea526d",
};

export const app = initializeApp(firebaseConfig);
