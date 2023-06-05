import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { ITodo } from '../../types/todo.types'
import Button from '../common/components/button'
import CustomDesc from '../common/components/description'
import CustomInput from '../common/components/input'
import CustomRadio from '../common/components/radio'
import useTodo from '../hooks/useTodo'
import './styles/addTodo.Styles.css'

type Props = {
  setOpen: (data: boolean) => void;
  data: ITodo;
}

const EditTodo = ({ setOpen, data }: Props) => {

  const [title, setTitle] = useState(data.title)
  const [desc, setDesc] = useState(data.description)
  const [isImp, setIsImp] = useState(data.isImp)
  const [completed, setCompleted] = useState(data.completed)

  const { todoData, setTodoData, setUpdateData } = useTodo()

  const editTodo = () => {

    let updatedTodo = {
      title,
      description: desc,
      createdAt: data.createdAt,
      id: data.id,
      isImp,
      completed,
      subtask: data.subtask
    }

    let updatedTodoData = todoData
    let idx = updatedTodoData.findIndex(ele => ele.id === data.id)
    updatedTodoData[idx] = updatedTodo
    setTodoData([...updatedTodoData])
    setUpdateData(true)
    setOpen(false)
  }

  return (
    <div className='modalStyles'>
      <div className='addtodo-header'>

        <p className='textStyle' style={{
          fontSize: "1.5rem"
        }}>Edit Task</p>
        <FontAwesomeIcon icon={faXmark} className="iconStyle" onClick={() => setOpen(false)} />
      </div>
      <div>
        <p className='inputLAbel textStyle'>Title</p>
        <CustomInput text={title} setText={setTitle} placeholder="title" />
      </div>

      <div>
        <p className='inputLAbel textStyle'>Description</p>
        <CustomDesc text={desc} setText={setDesc} placeholder="description" />
      </div>

      <div style={{
        marginTop: '1rem'
      }}>
        <CustomRadio value={isImp} setValue={setIsImp} name="Mark As Important" />
      </div>
      <div>
        <CustomRadio value={completed} setValue={setCompleted} name="Mark As Completed" />
      </div>

      <div style={{
        marginTop: '2rem'
      }}>

        <Button text='Edit Task' onclick={editTodo} />
      </div>

    </div>
  )
}

export default EditTodo