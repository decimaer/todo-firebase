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
