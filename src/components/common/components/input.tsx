import React, { Dispatch, SetStateAction } from 'react'
import '../styles/input.styles.css'
type Props = {
    text: string;
    placeholder: string;
    setText: Dispatch<SetStateAction<string>>
}

const CustomInput = ({ text, setText, placeholder }: Props) => {

    return (
        <div>
            <input className='inputStyles'
                value={text}
                onChange={(e)=>setText(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    )
}

export default CustomInput