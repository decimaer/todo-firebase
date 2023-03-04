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

console.log(FirebaseMain);
// const test = async () => {
// 	console.log(await FirebaseMain.getData());
// };
// test();

// console.log("test", test);

/* const useTest = (initVal) => {
	const [todoList, setTodoList] = useState(initVal);

	FirebaseMain.getSnapshot((data) => {
		console.log("snapshot:");
		setTodoList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	});
	return [todoList, setTodoList];
}; */
// const getTodoList = () => {
//   setTodoList();
//   console.log("getting todo list");
// };

// const initTodoList = async () => await FirebaseMain.getSnapshot();

// console.log("initTodoList", initTodoList());
// FirebaseMain.postData("testar!");

function App() {
	// const [todoList, setTodoList] = useTest([]);
	// const [todoList, setTodoList] = useState(initTodoList());
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
