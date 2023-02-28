import { useState, useRef, useEffect } from "react";

const List = () => {
	const newItemRef = useRef();
	const onSubmit = (e) => {
		e.preventDefault();
		const newItem = newItemRef.current.value;

		console.log("add new item: " + newItem);
		//TODO: connect with function to add new item
	};
	return (
		<>
			<input type="checkbox" name="?" id="todoItem" />
			<label htmlFor="todoItem">läsa bok</label>
			<form onSubmit={onSubmit}>
				<input type="text" ref={newItemRef} />
				<button type="submit">Add</button>
			</form>
		</>
	);
};

export default List;
