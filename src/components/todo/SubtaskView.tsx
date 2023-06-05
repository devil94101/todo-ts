import { faPen, faStar, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { ITodoData } from '../../types/todo.types'
import Button from '../common/components/button'
import BasicModal from '../common/components/modal'
import useTodo from '../hooks/useTodo'
import EditSubtaskTodo from './editSubtask'
import EditTodo from './EditTodo'

type Props = {
    data: ITodoData;
    todoId: number;
}

const SubtaskView = ({ data, todoId }: Props) => {

    const { todoData, setTodoData } = useTodo()
    const [deletePopUp, setDeletePopUp] = useState(false)
    let [editTodo, setEditTodo] = useState<boolean>(false)

    const findIndex = () => {
        let idx = todoData.findIndex(ele => ele.id === todoId)
        return idx
    }

    const changeComplete = (e: React.MouseEvent) => {
        e.stopPropagation()
        let todoIdx = findIndex()
        let updatedTodo = todoData
        let subTaskIdx = updatedTodo[todoIdx].subtask.findIndex(ele => ele.id === data.id)
        updatedTodo[todoIdx].subtask[subTaskIdx].completed = !updatedTodo[todoIdx].subtask[subTaskIdx].completed

        setTodoData([...updatedTodo])
    }
    const changeImp = (e: React.MouseEvent) => {
        e.stopPropagation()
        let todoIdx = findIndex()
        let updatedTodo = todoData
        let subTaskIdx = updatedTodo[todoIdx].subtask.findIndex(ele => ele.id === data.id)
        updatedTodo[todoIdx].subtask[subTaskIdx].isImp = !updatedTodo[todoIdx].subtask[subTaskIdx].isImp

        setTodoData([...updatedTodo])
    }

    const deleteSubtask = () => {

        let todoIdx = findIndex()
        let updatedTodo = todoData
        let newSubtaskList = updatedTodo[todoIdx].subtask.filter(ele => ele.id !== data.id)
        updatedTodo[todoIdx].subtask = newSubtaskList

        setTodoData([...updatedTodo])
        setDeletePopUp(false)
    }

    return (
        <div className='subtaskviewcont'>

            <div style={{
                width: '50%'
            }}>
                <p className='textStyle' style={{
                    fontWeight: 'bold'
                }}>{data.title}</p>
                <p className='textStyle'>{data.description}</p>
            </div>

            <div style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: "1rem",
                width: '50%'
            }}>
                <div style={{
                    background: data.completed ? "#a7f3d0" : "#fde68a",
                    color: data.completed ? "#065f46" : "#92400e",
                    cursor: 'pointer',
                    width: '50%'
                }} className="statusStyle" onClick={changeComplete}>{data.completed ? "Completed" : "Uncompleted"}</div>
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
                }} onClick={() => setDeletePopUp(true)} />
                <FontAwesomeIcon icon={faPen} style={{
                    color: "rgb(241, 245, 249)",
                    stroke: "#475569",
                    strokeWidth: "45px",
                    fontSize: "1rem",
                    cursor: "pointer"
                }} onClick={() => setEditTodo(true)}/>
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

                            <Button text='Confirm' onclick={deleteSubtask} />
                        </div>

                    </div>

                </div>
            </BasicModal>
            <BasicModal open={editTodo} setOpen={setEditTodo} >
                <EditSubtaskTodo setOpen={setEditTodo} data={data} todoIdx={findIndex()} />
            </BasicModal>

        </div>
    )
}

export default SubtaskView