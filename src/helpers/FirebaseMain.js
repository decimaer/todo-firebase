//FIREBASE////////////////////////////////////////////////////
import firebase from "firebase/compat/app";
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
import "firebase/compat/firestore";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithRedirect,
	getRedirectResult,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import "firebase/compat/auth";

// Your web app's Firebase configuration
import { firebaseConfig } from "./firebaseConfig.js";

console.log(firebaseConfig);
class FirebaseMain {
	#userCred;

	constructor() {
		// Initialize Firebase
		this.app = initializeApp(firebaseConfig);

		// Initialize Firebase Authentication and get a reference to the service
		this.auth = getAuth(this.app);
		this.provider = new GoogleAuthProvider();

		// Database and collection
		this.db = getFirestore();
		this.collectionName = "main-list";
		this.colRef = collection(this.db, this.collectionName);
	}

	getData = async function () {
		const data = await getDocs(this.colRef);

		return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
	};

	getSnapshot = (callback) => {
		onSnapshot(this.colRef, callback);
	};

	postData = function (entry) {
		addDoc(this.colRef, { entry: entry, completed: false });
	};

	deleteTask = (id) => {
		console.log("deleting2");
		deleteDoc(doc(this.db, this.collectionName, id));
	};

	updateTask = (id, newData) =>
		updateDoc(doc(this.db, this.collectionName, id), newData);

	signInWithGoogle = async () => {
		try {
			this.#userCred = await signInWithPopup(this.auth, this.provider);
		} catch (error) {
			console.error(error);
			console.log("failed signing in to user account!");
		}
	};

	signOutFromGoogle = async () => {
		try {
			console.error(error);
			await signOut(this.auth);
		} catch (error) {
			console.log("failed signing out from user account!");
			console.error(error);
		}
	};
}

export default new FirebaseMain();

//END FIREBASE////////////////////////////////////////////////////
