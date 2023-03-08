import List from "./components/List";
import { useState, useEffect } from "react";
import styles from "./App.module.scss";
import FirebaseMain from "./helpers/FirebaseMain";
import { ChakraProvider } from "@chakra-ui/react";
import { Button, Heading } from "@chakra-ui/react";

function App() {
	const [todoList, setTodoList] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if (!isLoggedIn) return;

		FirebaseMain.getSnapshot((data) =>
			setTodoList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
		);
	}, [isLoggedIn]);

	const authenticateUser = async () => {
		const test = await FirebaseMain.signInWithGoogle();
		console.log(test);

		setIsLoggedIn(true);
		console.log("set logged in");
	};

	const onlogOutUser = async () => {
		await FirebaseMain.signOutFromGoogle();
		setIsLoggedIn(false);
		FirebaseMain.detachSnapshot();
	};

	return (
		<ChakraProvider>
			<div className={styles.App}>
				<header className={styles.header}>
					<Heading as="h1">TODO</Heading>
					{isLoggedIn ? (
						<Button onClick={onlogOutUser}>Sign out</Button>
					) : null}
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
