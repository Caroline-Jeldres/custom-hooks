import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const useTodo = () => {
  const [todos, dispatchTodo] = useReducer(todoReducer, [], init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    dispatchTodo({
      type: "ADD",
      payload: todo,
    });
  };

  const handleRemoveTodo = (id) => {
    dispatchTodo({
      type: "REMOVE",
      payload: id,
    });
  };

  const handleToggleTodo = (id) => {
    dispatchTodo({
      type: "TOGGLE",
      payload: id,
    });
  };

  const todoCounter = todos.length;

  const pendingTodoCounter = todos.filter((todo) => !todo.done).length;

  return {
    todos,
    handleNewTodo,
    handleRemoveTodo,
    handleToggleTodo,
    todoCounter,
    pendingTodoCounter,
  };
};
