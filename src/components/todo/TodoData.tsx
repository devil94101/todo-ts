import { faCalendarDays, faEllipsisVertical, faPen, faPlus, faStar, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useState } from 'react'
import { ITodo } from '../../types/todo.types'
import Button from '../common/components/button';
import BasicModal from '../common/components/modal';
import useTodo from '../hooks/useTodo';
import './styles/TodoData.styles.css'

type Props = {
    data: ITodo;
    setSelectedIdx: () => void;
    setEditTodo: (data: boolean) => void;
    setCreateSubtask: (data: boolean) => void
    setShowTodo: (data: boolean) => void
}

const TodoData = ({ data, setSelectedIdx, setEditTodo, setCreateSubtask, setShowTodo }: Props) => {

    const { todoData, setTodoData, setUpdateData } = useTodo()
    const [deletePopUp, setDeletePopUp] = useState(false)

    const changeImp = (e: React.MouseEvent) => {
        e.stopPropagation()
        let updatedTodo = data
        updatedTodo.isImp = !updatedTodo.isImp

        let updatedTodoData = todoData
        let idx = updatedTodoData.findIndex(ele => ele.id === data.id)
        updatedTodoData[idx] = { ...updatedTodo }
        console.log(updatedTodo)
        setTodoData([...updatedTodoData])
        setUpdateData(true)

    }

    const changeCompleted = (e: React.MouseEvent) => {
        e.stopPropagation()
        let updatedTodo = {
            ...data
        }
        updatedTodo.completed = !updatedTodo.completed

        let updatedTodoData = todoData
        let idx = updatedTodoData.findIndex(ele => ele.id === data.id)
        updatedTodoData[idx] = updatedTodo
        setTodoData([...updatedTodoData])
        setUpdateData(true)
    }

    const deleteTodo = () => {
        let updatedTodoData = todoData.filter(ele => ele.id !== data.id)
        setDeletePopUp(false)
        setTodoData(updatedTodoData)
        setUpdateData(true)
    }

    return (
        <div className='display-todo-cont class-group-for-grid' >
            <div>
                <p className='textstyles' style={{
                    fontWeight: '500',
                    marginBottom: '1rem'
                }}>{data.title}</p>
                <p className='textstyles '>{data.description}</p>
            </div>
            <div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around"
                }}>

                    <p>
                        <span style={{ marginRight: "1rem" }}><FontAwesomeIcon icon={faCalendarDays} /></span>
                        {moment(new Date(data.createdAt)).format("MMM Do YY")}
                    </p>
                    {/* <p>
                        Total Subtasks: {data.subtask.length}
                    </p> */}
                </div>
                <div className='dotted-line'></div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginTop: "1rem"
                }}>
                    <div style={{
                        background: data.completed ? "#a7f3d0" : "#fde68a",
                        color: data.completed ? "#065f46" : "#92400e",
                        cursor: 'pointer'
                    }} className="statusStyle" onClick={changeCompleted}>{data.completed ? "Completed" : "Uncompleted"}</div>
                    {data.isImp ? <FontAwesomeIcon icon={faStar} style={{
                        color: "red",
                        fontSize: "1rem",
                        cursor: "pointer"
                    }} onClick={changeImp} /> : <FontAwesomeIcon icon={faStar} style={{
                        color: "rgb(241, 245, 249)",
                        stroke: "#475569",
                        strokeWidth: "45px",
                        fontSize: "1rem",
                        cursor: "pointer"
                    }} onClick={changeImp} />}
                    <FontAwesomeIcon icon={faTrashCan} style={{
                        color: "rgb(241, 245, 249)",
                        stroke: "#475569",
                        strokeWidth: "45px",
                        fontSize: "1rem",
                        cursor: "pointer"
                    }} onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        setDeletePopUp(true)
                    }} />
                    <FontAwesomeIcon icon={faPen} style={{
                        color: "rgb(241, 245, 249)",
                        stroke: "#475569",
                        strokeWidth: "45px",
                        fontSize: "1rem",
                        cursor: "pointer"
                    }} onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        setSelectedIdx()
                        setEditTodo(true)
                    }} />
                </div>
            </div>
            <div>
                <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Sub Tasks({data.subtask.length})
                    <span className='subtaskBtn' onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        setSelectedIdx()
                        setCreateSubtask(true)
                    }} >Add Sub Task <FontAwesomeIcon className="iconStyle" style={{
                        fontSize: '1.2rem',
                        marginLeft: '1rem'
                    }} icon={faPlus} /></span>

                </p>

            </div>

            <div>
                <p onClick={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    setSelectedIdx()
                    setShowTodo(true)
                }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    Click to see Subtasks....

                </p>

            </div>


            <BasicModal open={deletePopUp} setOpen={setDeletePopUp}>
                <div className='deletePopupModal'>
                    <div className='addtodo-header'>

                        <p className='textStyle' style={{
                            fontSize: "1.4rem"
                        }}>Are you sure?</p>
                        <FontAwesomeIcon icon={faXmark} className="iconStyle" onClick={() => setDeletePopUp(false)} />
                    </div>
                    <p className='textStyle' style={{
                        fontSize: "0.8rem",
                        marginTop: '1rem'
                    }}>This task will be deleted permanently.</p>
                    <div style={{
                        marginTop: '2rem',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}>
                        <div>

                            <p className='textStyle' style={{
                                fontSize: "0.9rem",
                                marginRight: '1rem',
                                cursor: 'pointer'
                            }} onClick={() => setDeletePopUp(false)}>Cancel</p>
                            {/* <Button text='Cancel'  /> */}
                        </div>
                        <div>

                            <Button text='Confirm' onclick={deleteTodo} />
                        </div>

                    </div>

                </div>
            </BasicModal>
        </div>
    )
}

export default TodoData