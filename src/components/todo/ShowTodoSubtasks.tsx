import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { ITodo } from '../../types/todo.types'
import SubtaskView from './SubtaskView';
import './styles/subtask.styles.css'

type Props = {
  data: ITodo,
  setOpen: (data: boolean) => void;
}

const ShowTodoSubtasks = ({ data, setOpen }: Props) => {

  return (
    <div className='subtaskmodal'>
      <div className='addtodo-header'>

        <p className='textStyle' style={{
          fontSize: "1.5rem"
        }}>All Subtasks</p>
        <FontAwesomeIcon icon={faXmark} className="iconStyle" onClick={() => setOpen(false)} />
      </div>

      <p className='textStyle' style={{
        fontSize: "1.3rem",
        marginTop: '2rem'
      }}>Subtasks</p>
      <hr />
      {data.subtask.map((ele, i) => {
        return <SubtaskView data={ele} key={i} todoId = {data.id}/>
      })}
    </div>
  )
}

export default ShowTodoSubtasks