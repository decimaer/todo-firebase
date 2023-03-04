import styles from "./ListItem.module.scss";
import {
	Button,
	Checkbox,
	IconButton,
	Flex,
	Spacer,
	Box,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";

const ListItem = ({ item, FirebaseMain }) => {
	const [checked, setChecked] = useState(item.completed);
	const onCheckItem = () => {
		console.log("check item");
		setChecked(!checked);
	};
	const onDeleteTask = () => {
		console.log("deleting item...", item.id);
		FirebaseMain.deleteTask(item.id);
	};
	return (
		<Flex className={styles.flexContainer}>
			<Box>
				<Checkbox
					type="checkbox"
					id={item.id}
					checked={checked}
					onChange={onCheckItem}
				>
					{item.entry}
				</Checkbox>
				{/* <Spacer /> */}
			</Box>
			<Button onClick={onDeleteTask}>🗑</Button>
		</Flex>
	);
};

export default ListItem;
