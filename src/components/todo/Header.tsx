import moment from 'moment'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Button from '../common/components/button'
import SearchBar from './SearchBar'
import './styles/Header.styles.css'


type Props = {
  createTodo: boolean;
  setCreateTodo: Dispatch<SetStateAction<boolean>>
}

const Header = ({ createTodo, setCreateTodo }: Props) => {

  return (
    <div className='headerContainer'>
      <SearchBar />
      <div className='textStyle'>{moment().format("MMM Do YY")}</div>
      <div>

        <Button text="Add New Task" onclick={() => { setCreateTodo(true) }} />
      </div>
    </div>
  )
}

export default Header