//FIREBASE////////////////////////////////////////////////////
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
	getFirestore,
	collection,
	getDocs,
	onSnapshot,
	addDoc,
	deleteDoc,
	doc,
	getDoc,
	updateDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
import { firebaseConfig } from "./firebaseConfig.js";

class FirebaseMain {
	constructor() {
		// Initialize Firebase
		this.app = initializeApp(firebaseConfig);
		this.db = getFirestore();
		// Collection ref
		this.colRef = collection(this.db, "main-list");
	}

	getData = async function () {
		const data = await getDocs(this.colRef);

		return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
	};

	getSnapshot = async (callback) => {
		onSnapshot(this.colRef, callback);
	};
}

export default new FirebaseMain();

//END FIREBASE////////////////////////////////////////////////////
