import { Button, Checkbox, Flex, Input, Box, Text } from "@chakra-ui/react";
import { useState, useRef } from "react";

const ListItem = ({ item, FirebaseMain, forceRerender }) => {
	const [checked, setChecked] = useState(item.completed);
	const [isEditing, setIsEditing] = useState(false);
	const inputValue = useRef();

	const onCheckItem = () => {
		console.log("check item");
		setChecked(!checked);
		FirebaseMain.updateTask(item.id, { completed: !item.completed });
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
	};

	const onDeleteTask = () => {
		console.log("deleting item...", item.id);
		FirebaseMain.deleteTask(item.id);
	};

	return (
		<Flex justifyContent="space-between">
			<Flex>
				<Checkbox
					type="checkbox"
					id={item.id}
					isChecked={item.completed}
					onChange={onCheckItem}
				>
					{!isEditing && (
						<Text
							style={{
								inlineSize: "250px",
								overflowWrap: "break-word",
							}}
						>
							{item.entry}
						</Text>
					)}
				</Checkbox>
				{isEditing && (
					<Input
						name="entry"
						type="text"
						defaultValue={item.entry}
						onChange={() => {}}
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
