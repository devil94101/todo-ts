import moment from 'moment'
import React, { useEffect, useState } from 'react'
import BasicModal from '../common/components/modal'
import useAuth from '../hooks/useAuth'
import useTodo from '../hooks/useTodo'
import AddTodoSubtask from './addSubtask'
import AddTodo from './AddTodo'
import EditTodo from './EditTodo'
import Header from './Header'
import ShowTodoSubtasks from './ShowTodoSubtasks'
import SideBar from './SideBar'
import './styles/Home.styles.css'
import TodoData from './TodoData'


const TodoHome = () => {

  let { displayTodo, setTodoData, setDisplayTodo } = useTodo()
  let [createTodo, setCreateTodo] = useState<boolean>(false)
  let [editTodo, setEditTodo] = useState<boolean>(false)

  const [showTodo, setShowTodo] = useState(false)

  const [createSubtask, setCreateSubtask] = useState(false)

  const [selectedIdx, setSelectedIdx] = useState(-1)

  let { auth } = useAuth()

  useEffect(() => {
    const userTodos = auth?.id ? localStorage.getItem(auth.id + auth?.email) ? JSON.parse(localStorage.getItem(auth.id + auth?.email)?.toString() || "[]") : [] : []
    setTodoData(userTodos)
    setDisplayTodo(userTodos)
  }, [])


  return (
    <div className='homeContainer'>
      <SideBar createTodo={createTodo} setCreateTodo={setCreateTodo} />
      <div className='mainDiv'>
        <Header createTodo={createTodo} setCreateTodo={setCreateTodo} />
        <div className='bodyContainer'>
          {displayTodo.map((ele, i) => {
            return <TodoData data={ele} key={ele.id} setSelectedIdx={() => {
              setSelectedIdx(i)
            }} setEditTodo={setEditTodo}
              setCreateSubtask={setCreateSubtask}
              setShowTodo={setShowTodo}
            />
          })}

          <div className='add-item-style class-group-for-grid' onClick={() => setCreateTodo(true)}>
            <p  >Add New Item</p>
          </div>
        </div>
      </div>
      <BasicModal open={createTodo} setOpen={setCreateTodo} >
        <AddTodo setOpen={setCreateTodo} />
      </BasicModal>
      <BasicModal open={editTodo} setOpen={setEditTodo} >
        <EditTodo setOpen={setEditTodo} data={displayTodo[selectedIdx]} />
      </BasicModal>
      <BasicModal open={createSubtask} setOpen={setCreateSubtask} >
        <AddTodoSubtask setOpen={setCreateSubtask} data={displayTodo[selectedIdx]} idx={selectedIdx} />
      </BasicModal>
      <BasicModal open={showTodo} setOpen={setShowTodo} >
        <ShowTodoSubtasks setOpen={setShowTodo} data={displayTodo[selectedIdx]} />
      </BasicModal>
    </div>
  )
}

export default TodoHome