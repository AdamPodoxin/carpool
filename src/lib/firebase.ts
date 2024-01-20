import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCjr07MRA-NnpmUboRRXN7SBDMjR3fF8dQ",
	authDomain: "carpool-7713f.firebaseapp.com",
	projectId: "carpool-7713f",
	storageBucket: "carpool-7713f.appspot.com",
	messagingSenderId: "910222510494",
	appId: "1:910222510494:web:ac8e654314b03d05a82e8f",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
