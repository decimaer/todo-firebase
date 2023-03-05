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
// import { firebaseui } from "firebaseui";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// const firebaseui = require("firebaseui");

// Your web app's Firebase configuration
import { firebaseConfig } from "./firebaseConfig.js";

// Initialize the FirebaseUI Widget using Firebase.
// const ui = new firebaseui.auth.AuthUI(firebaseAuth.auth());

/* ui.start("#firebaseui-auth-container", {
	signInOptions: [
		// List of OAuth providers supported.
		firebaseAuth.auth.GoogleAuthProvider.PROVIDER_ID,
		firebaseAuth.auth.FacebookAuthProvider.PROVIDER_ID,
		firebaseAuth.auth.TwitterAuthProvider.PROVIDER_ID,
		firebaseAuth.auth.GithubAuthProvider.PROVIDER_ID,
	],
	// Other config options...
}); */

class FirebaseMain {
	constructor() {
		// Initialize Firebase
		this.app = initializeApp(firebaseConfig);
		// Initialize Firebase Authentication and get a reference to the service
		this.auth = getAuth(app);
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

	deleteTask = /* async */ (id) => {
		console.log("deleting2");
		/* await */ deleteDoc(doc(this.db, this.collectionName, id));
	};

	updateTask = (id, newData) =>
		updateDoc(doc(this.db, this.collectionName, id), newData);
}

export default new FirebaseMain();

//END FIREBASE////////////////////////////////////////////////////
