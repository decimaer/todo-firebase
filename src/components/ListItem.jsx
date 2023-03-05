import styles from "./ListItem.module.scss";
import {
	Button,
	Checkbox,
	IconButton,
	Flex,
	Spacer,
	Input,
	Box,
	FormControl,
	FormErrorMessage,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";

const ListItem = ({ item, FirebaseMain }) => {
	const [checked, setChecked] = useState(item.completed);
	const [isEditing, setIsEditing] = useState(false);
	const inputValue = useRef();

	const onCheckItem = () => {
		console.log("check item");
		setChecked(!checked);
		FirebaseMain.updateTask(item.id, { completed: !checked });
	};

	const onSaveEditItem = () => {
		// save item when onBlur
		console.log("saving item...");
		item.entry = inputValue.current.value;
		FirebaseMain.updateTask(item.id, { entry: inputValue.current.value });
		setTimeout(() => setIsEditing(false), 100);
	};

	const onEditItem = () => {
		if (!isEditing) {
			setIsEditing(!isEditing);
			console.log("edit item");
		}
		if (isEditing) {
			// save value
			// onSaveEditItem();
		}
		// inputValue.focus();
		// setTimeout(() => inputValue.current.focus(), 500);
	};

	const test = () => {};

	const onDeleteTask = () => {
		console.log("deleting item...", item.id);
		FirebaseMain.deleteTask(item.id);
	};

	const onPlaceHolder = () => {
		// console.log("change");
		// console.log(inputValue.current.value);
	};

	return (
		<Flex className={styles.flexContainer}>
			<Flex>
				<Checkbox
					type="checkbox"
					id={item.id}
					isChecked={checked}
					onChange={onCheckItem}
				>
					{!isEditing && item.entry}
				</Checkbox>
				{isEditing && (
					<Input
						name="entry"
						type="text"
						defaultValue={item.entry}
						onChange={onPlaceHolder}
						onBlur={onSaveEditItem}
						ref={inputValue}
						autoFocus
					/>
				)}
			</Flex>
			<Box>
				<Button onClick={onEditItem}>🖊️</Button>
				<Button onClick={onDeleteTask}>🗑</Button>
			</Box>
		</Flex>
	);
};

export default ListItem;
