import { useState, useRef, useEffect } from "react";
import ListItem from "./ListItem";

import { Input, Stack, Button, Flex } from "@chakra-ui/react";

const List = ({ todoList, FirebaseMain }) => {
	const newItemRef = useRef();

	const onSubmit = (e) => {
		e.preventDefault();
		const newItem = newItemRef.current.value;

		console.log("add new item: " + newItem);
		FirebaseMain.postData(FirebaseMain.colRef, newItemRef.current.value);
		newItemRef.current.value = "";
	};

	const handleMarkAll = () => {
		todoList.forEach(
			async (item) =>
				await FirebaseMain.updateTask(item.id, { completed: true })
		);
	};
	const handleDeleteAll = () => {
		todoList.forEach(async (item) => await FirebaseMain.deleteTask(item.id));
	};

	return (
		<>
			<Stack spacing={4}>
				<Flex justifyContent="space-between">
					<Button onClick={handleMarkAll} colorScheme="green">
						✅ Mark all as done
					</Button>
					<Button onClick={handleDeleteAll} colorScheme="red">
						🗑 Delete all
					</Button>
				</Flex>
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
						<Button type="submit">+</Button>
					</Flex>
				</form>
			</Stack>
		</>
	);
};

export default List;
