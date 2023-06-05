import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import React, { ChangeEvent, useRef, useState } from 'react'
import { ITodo } from '../../types/todo.types'
import useTodo from '../hooks/useTodo'
import { useComponentVisible } from '../hooks/useVisible'
import './styles/SearchBar.styles.css'
const SearchBar = () => {

    let { todoData, setTodoData, setDisplayTodo, setTableOptions } = useTodo()
    const [text, setText] = useState<string>('')
    const [searchRes, setSearchRes] = useState<ITodo[]>([])

    const [showRes, setShowRes] = useState(false)

    const searchTodo = (text: string) => {
        if (text) {
            let newSearchRes = todoData.filter(ele => ele.title.toLowerCase().includes(text.toLowerCase()))
            setSearchRes(newSearchRes);
        } else {
            setSearchRes([])
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
        searchTodo(e.target.value)
    }

    const { ref } = useComponentVisible({ isComponentVisible: showRes, setIsComponentVisible: setShowRes });


    return (
        <div >
            <div className='inputSearchBarConainer' ref={ref}>
                <input className='searchBarStyles'
                    value={text}
                    onChange={onChange}
                    placeholder="Search"
                    onFocus={() => setShowRes(true)}
                // onBlur={() => setShowRes(false)}
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="iconPosition" />
                {showRes && <div className='searchModal'>
                    {searchRes.length === 0 ? <p className='textStyle'>No Task Found</p> :
                        <>
                            {searchRes.map((ele, i) => {
                                return <div key={i} className='search-li' onClick={() => {

                                    setTableOptions({
                                        type:-1,
                                        sortBy: 1
                                    })
                                    setDisplayTodo([ele])

                                }}>
                                    <p className='textStyle'>{ele.title}</p>
                                    <p className='textStyle'>{moment(ele.createdAt).format("MMM Do YY")}</p>
                                </div>
                            })}
                            <div className="search-li" style={{
                                background: "#ffe4e6",
                                padding: '1rem',
                                borderRadius: "10px",
                                justifyContent: "center"
                            }}>
                                <p className='textStyle' style={{
                                    color: "#e11d48"
                                }}>All Result For "{text}"</p>
                            </div>
                        </>
                    }

                </div>}
            </div>
        </div>
    )
}

export default SearchBar