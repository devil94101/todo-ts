import React, { Dispatch, SetStateAction } from 'react'
import '../styles/common.styles.css'

type Props = {
    text: string;
    onclick: () => void
}

const Button = ({ text,onclick }: Props) => {
    return (
        <button className='btnStyles' onClick={onclick}>
            {text}
        </button>
    )
}

export default Button