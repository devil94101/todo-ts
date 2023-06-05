import { useContext } from "react";
import { TodoContextType } from "../../types/todo.types";
import TodoContext from "../context/TodoProvider";

const useTodo = () => {
    let todoData = useContext(TodoContext) as TodoContextType;
    return todoData
}

export default useTodo;