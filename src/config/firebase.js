import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyCzAodPWq-esr-sdjAyWvZ-G3lL2ioQbuA",
	authDomain: "crud-app-c5e18.firebaseapp.com",
	projectId: "crud-app-c5e18",
	storageBucket: "crud-app-c5e18.appspot.com",
	messagingSenderId: "910398781434",
	appId: "1:910398781434:web:6de8f9a460f031c3a39643",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
