import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
	getFirestore,
	collection,
	getDoc,
	getDocs,
	onSnapshot,
	setDoc,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
} from "firebase/firestore";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
import { firebaseConfig } from "./firebaseConfig.js";

class FirebaseMain {
	#userCred;
	collectionName;
	colRef;

	constructor() {
		// Initialize Firebase
		this.app = initializeApp(firebaseConfig);

		// Initialize Firebase Authentication and get a reference to the service
		this.auth = getAuth(this.app);
		this.provider = new GoogleAuthProvider();
		this.provider.setCustomParameters({
			prompt: "select_account",
		});

		// Database and collection
		this.db = getFirestore();
	}

	getDocById = async (colName, id) => {
		return await getDoc(doc(this.db, colName, id));
	};

	getData = async function () {
		const data = await getDocs(this.colRef);

		return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
	};

	getSnapshot = (callback) => {
		this.detachSnapshot = onSnapshot(this.colRef, callback);
	};

	postData = function (colRef, entry) {
		addDoc(colRef, { entry: entry, completed: false });
	};

	PostDataById = (colName, id, entry) => {
		setDoc(doc(this.db, colName, id), entry);
	};

	deleteTask = (id) => {
		deleteDoc(doc(this.db, this.collectionName, id));
	};

	updateTask = (id, newData) =>
		updateDoc(doc(this.db, this.collectionName, id), newData);

	signInWithGoogle = async () => {
		try {
			this.#userCred = await signInWithPopup(this.auth, this.provider);

			console.log(this.#userCred);
			this.collectionName = `main-list/${this.#userCred.user.uid}/todolist`;

			this.colRef = collection(this.db, this.collectionName);

			// Initial entry
			const isExists = await this.getDocById(
				"main-list",
				this.#userCred.user.uid
			);
			if (!isExists.exists()) {
				const initColRef = collection(this.db, "main-list");
				console.log(isExists.exists());
				this.PostDataById("main-list", this.#userCred.user.uid, {});
				this.postData(this.colRef, "Add a new to do item below!");
			}
		} catch (error) {
			console.error(error);
			console.log("failed signing in to user account!");
		}
		return "signinwithgoogle done";
	};

	signOutFromGoogle = async () => {
		try {
			signOut(this.auth);
		} catch (error) {
			console.log("failed signing out from user account!");
			console.error(error);
		}
	};
}

export default new FirebaseMain();
