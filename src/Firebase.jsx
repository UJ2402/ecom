import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  inMemoryPersistence,
  signInWithPopup,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBeLx6ZRJteH-1rGyNZVibq9DzLD07wKXQ",
  authDomain: "vastra-a861d.firebaseapp.com",
  projectId: "vastra-a861d",
  storageBucket: "vastra-a861d.appspot.com",
  messagingSenderId: "569220995587",
  appId: "1:569220995587:web:998909fe6c83303f7f0c36",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
