import moment from "moment";
import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { ITableOptions, ITodo, TodoContextType } from "../../types/todo.types";
import useAuth from "../hooks/useAuth";

const TodoContext = createContext<TodoContextType | null>(null);
// localStorage.getItem('isLogin')?true:false

export default TodoContext;

export const TodoProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { auth } = useAuth()

    const [todoData, setTodoData] = useState<ITodo[]>([])
    const [displayTodo, setDisplayTodo] = useState<ITodo[]>([])
    const [tableOptions, setTableOptions] = useState<ITableOptions>({
        type: 1,
        sortBy: 1
    })
    const [updateData, setUpdateData] = useState(false)

    const filterData = () => {
        if(tableOptions.type !== -1 ){

            let filteredData = todoData.filter(ele => {
                if (tableOptions.type === 1) {
                    return true
                }
                if (tableOptions.type === 2 && ele.completed) {
                    return true;
                }
                if (tableOptions.type === 3 && !ele.completed) {
                    return true;
                }
                if (tableOptions.type === 4 && ele.isImp) {
                    return true;
                }
                let today = moment().format("MMM Do YY")
                let todoDate = moment(ele.createdAt).format("MMM Do YY")
                if (today === todoDate && tableOptions.type === 5) {
                    return true
                }
                return false
            })
    
            setDisplayTodo(filteredData)
        }
    }

    useEffect(() => {
        console.log(todoData);
        filterData()
    }, [todoData, tableOptions])

    useEffect(() => {
        if (auth?.id && updateData) {
            localStorage.setItem(auth.id + auth?.email, JSON.stringify(todoData))
            setUpdateData(false)
        }

    }, [todoData])

    return (
        <TodoContext.Provider value={{ todoData, setTodoData, tableOptions, setTableOptions, displayTodo, setDisplayTodo, updateData, setUpdateData }}>
            {children}
        </TodoContext.Provider>
    )
}
