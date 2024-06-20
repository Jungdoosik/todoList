import React from "react";

function TodoItem(props) {
	return (
		<div className="todo-item">
			<h4>{props.item}</h4>
		</div>
	);
}

export default TodoItem;
