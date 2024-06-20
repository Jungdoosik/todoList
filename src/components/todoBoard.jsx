import React from "react";
import TodoItem from "./TodoItem";

function TodoBoard(props) {
	return (
		<div>
			<h1>TodoList</h1>
			{props.todoList.map((item, i) => (
				<TodoItem item={item} key={i}></TodoItem>
			))}
		</div>
	);
}

export default TodoBoard;
