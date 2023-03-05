import List from "./components/List";
import { useState, useEffect } from "react";
import styles from "./App.module.scss";
import FirebaseMain from "./helpers/FirebaseMain";
// import firebaseui from "firebaseui";
// import firebase from "firebase";
import { ChakraProvider } from "@chakra-ui/react";
import {
	Input,
	Stack,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Button,
	Heading,
} from "@chakra-ui/react";

function App() {
	const [todoList, setTodoList] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		FirebaseMain.getSnapshot((data) =>
			setTodoList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
		);
	}, []);

	const authenticateUser = async () => {
		await FirebaseMain.signInWithGoogle();

		setIsLoggedIn(true);
	};

	const onlogOutUser = async () => {
		await FirebaseMain.signOutFromGoogle();
		setIsLoggedIn(false);
	};

	/* 	return (
		<>
			<h1>Log-in Page</h1>
		</>
	); */

	return (
		<ChakraProvider>
			<div className={styles.App}>
				<header className={styles.header}>
					<Heading as="h1">TODO</Heading>
					<Button onClick={onlogOutUser}>Sign out</Button>
				</header>
				{!isLoggedIn ? (
					<Button onClick={authenticateUser}>Sign in with Google</Button>
				) : (
					<List todoList={todoList} FirebaseMain={FirebaseMain} />
				)}
			</div>
		</ChakraProvider>
	);
}

export default App;
