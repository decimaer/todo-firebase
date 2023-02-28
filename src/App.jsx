import List from "./components/List";
import { useState } from "react";
import styles from "./App.module.scss";
import FirebaseMain from "./helpers/FirebaseMain";

console.log(FirebaseMain);
// const test = async () => {
// 	console.log(await FirebaseMain.getData());
// };
// test();

FirebaseMain.getSnapshot((data) => {
	console.log("snapshot:");
	console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
});

function App() {
	const [todoList, setTodoList] = useState([]);

	const getTodoList = () => {
		setTodoList();
		console.log("getting todo list");
	};

	return (
		<div className={styles.App}>
			<p>TODO</p>
			<List />
		</div>
	);
}

export default App;
