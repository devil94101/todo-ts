
export interface ITodoData{
    id: number;
    createdAt: number;
    description: string;
    title: string;
    completed: boolean;
    isImp: boolean;
}

export interface ITodo extends ITodoData {
    subtask: ITodoData[];
}

export interface ITableOptions{
    type: number;
    sortBy: number;
}

export type TodoContextType = {
   todoData: ITodo[];
   tableOptions: ITableOptions;
   displayTodo: ITodo[];
   updateData: boolean;
   setUpdateData: (data: boolean) => void;
   setDisplayTodo: (data: ITodo[]) => void;
   setTodoData: (data: ITodo[]) => void;
   setTableOptions : (data: ITableOptions) => void;
};