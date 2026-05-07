import { initializeApp } from "firebase/app";

import { 
  getAuth 
} from "firebase/auth";

import { 
  getFirestore 
} from "firebase/firestore";

import {
  getStorage
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_8pkvFRf-5yrybmXaAqlYRBFgwWNMsT4",
  authDomain: "gen-lang-client-0098928612.firebaseapp.com",
  projectId: "gen-lang-client-0098928612",
  storageBucket: "gen-lang-client-0098928612.firebasestorage.app",
  messagingSenderId: "88315652404",
  appId: "1:88315652404:web:297ee26fa805bea013dd61"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;