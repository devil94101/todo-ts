import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { ITodo } from '../../types/todo.types'
import AlertComponents from '../common/components/Alert'
import Button from '../common/components/button'
import CustomDesc from '../common/components/description'
import CustomInput from '../common/components/input'
import CustomRadio from '../common/components/radio'
import useTodo from '../hooks/useTodo'
import './styles/addTodo.Styles.css'

type Props = {
  setOpen: (data: boolean) => void;
}

const AddTodo = ({ setOpen }: Props) => {

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [isImp, setIsImp] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [error, setError] = useState<string | null>(null);

  const { todoData, setTodoData, setUpdateData } = useTodo()


  const setErrorMessage = (msg: string) => {
    setError(msg)
    setTimeout(() => {
      setError(null)
    }, 2000)
  }

  const createTodo = () => {

    if (!title && !desc) {
      setErrorMessage("Title and Descriptions is mandatory")
      return
    }

    let newTodo = {
      title,
      description: desc,
      createdAt: Date.now(),
      id: Date.now(),
      isImp,
      completed,
      subtask: []
    } as ITodo

    let newTodoData = [...todoData, newTodo]
    setTodoData(newTodoData)
    setOpen(false)
    setUpdateData(true)

  }

  return (
    <div className='modalStyles'>

      {error && <AlertComponents alertType='error' message={error} />}
      <div className='addtodo-header'>

        <p className='textStyle' style={{
          fontSize: "1.5rem"
        }}>Add a Task</p>
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

        <Button text='Add a Task' onclick={createTodo} />
      </div>

    </div>
  )
}

export default AddTodo