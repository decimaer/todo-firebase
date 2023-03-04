import { useState, useRef, useEffect } from "react";
import ListItem from "./ListItem";

import {
	Input,
	Stack,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Button,
	Heading,
	Checkbox,
	CheckboxGroup,
	Box,
	Flex,
} from "@chakra-ui/react";

const List = ({ todoList, FirebaseMain }) => {
	const newItemRef = useRef();
	const onSubmit = (e) => {
		e.preventDefault();
		const newItem = newItemRef.current.value;

		console.log("add new item: " + newItem);
		//TODO: connect with function to add new item
		FirebaseMain.postData(newItemRef.current.value);
		newItemRef.current.value = "";
	};

	console.log(todoList);
	return (
		<>
			<Stack spacing={4}>
				{todoList.map((item) => (
					<ListItem
						item={item}
						key={item.id}
						FirebaseMain={FirebaseMain}
					/>
				))}
				<form onSubmit={onSubmit}>
					<Flex>
						<Input
							type="text"
							ref={newItemRef}
							required
							placeholder="Write new todo item"
						/>
						<Button type="submit">Add</Button>
					</Flex>
				</form>
			</Stack>
		</>
	);
};

export default List;
