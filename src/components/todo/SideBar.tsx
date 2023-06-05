import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../common/components/button';
import useAuth from '../hooks/useAuth';
import useTodo from '../hooks/useTodo';
import './styles/SideBar.styles.css'

type Props = {
    createTodo: boolean;
    setCreateTodo: Dispatch<SetStateAction<boolean>>
}

const SideBar = ({ createTodo, setCreateTodo }: Props) => {

    let colorsArr = ["#32a852", "#a232a8", "#637fbf", "#bf8963", "#bf6363"];

    let sidebarContents = [{
        name: "All Tasks",
        value: 1
    },
    {
        name: "Today's Tasks",
        value: 5
    },
    {
        name: "Important Tasks",
        value: 4
    },
    {
        name: "Completed Tasks",
        value: 2
    }, {
        name: "Uncompleted Tasks",
        value: 3
    }]

    let { auth } = useAuth()

    let { tableOptions, setTableOptions } = useTodo()

    const getRandomInt = (max: number): number => {
        return Math.floor(Math.random() * max);
    }

    const pickColor = (): string => {
        let idx = getRandomInt(colorsArr.length)
        return colorsArr[idx]
    }

    const navigate = useNavigate();

    return (
        <div className='SidebarContainer'>
            <div className='profile-details'>

                <div className='profile-logo' style={{
                    background: '#32a852'
                }}>
                    {auth?.name[0]}

                </div>
                <div className='profile-name'>
                    <div className='boldText textStyles'>{auth?.name}</div>
                    <div className='smallText textStyles'>{auth?.email}</div>
                </div>
            </div>
            <div style={{
                width: '100%',
                padding: '0 2rem'
            }}>
                <Button text='Add New Task' onclick={() => { setCreateTodo(true) }} />
            </div>
            <div className='sidebar-contents'>
                {sidebarContents.map((ele, i) => {
                    if (ele.value === tableOptions.type) {
                        return <div key={ele.value} className="sidebar-contents-list sidebar-contents-list-select textStyles" style={{
                            fontSize: "16px",
                            color: "#475569",
                            fontWeight: "normal",

                        }}>
                            {ele.name}
                        </div>
                    }
                    return <div key={ele.value} className="sidebar-contents-list textStyles" style={{
                        fontSize: "16px",
                        color: "#475569",
                        fontWeight: "normal",

                    }} onClick={() => setTableOptions({
                        ...tableOptions,
                        type: ele.value
                    })}>
                        {ele.name}
                    </div>
                })}

                <div className="sidebar-contents-list textStyles" style={{
                    fontSize:"1.5rem"
                }} onClick={()=>{
                    localStorage.removeItem('userDetails')
                    navigate('/login')

                }}>
                    <FontAwesomeIcon icon={faRightFromBracket} /> <p>Logout</p>
                </div>
            </div>
        </div>
    )
}

export default SideBar