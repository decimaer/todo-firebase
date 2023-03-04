import List from "./components/List";
import { useState, useEffect } from "react";
import styles from "./App.module.scss";
import FirebaseMain from "./helpers/FirebaseMain";
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
	useEffect(() => {
		FirebaseMain.getSnapshot((data) =>
			setTodoList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
		);
	}, []);

	return (
		<ChakraProvider>
			<div className={styles.App}>
				<Heading>TODO</Heading>
				<List todoList={todoList} FirebaseMain={FirebaseMain} />
			</div>
		</ChakraProvider>
	);
}

export default App;
