import React, { Dispatch, SetStateAction } from 'react'
import '../styles/input.styles.css'
type Props = {
    text: string;
    placeholder: string;
    setText: Dispatch<SetStateAction<string>>
}

const CustomDesc = ({ text, setText, placeholder }: Props) => {

    return (
        <div>
            <textarea className='inputStyles'
                value={text}
                onChange={(e)=>setText(e.target.value)}
                placeholder={placeholder}
                style={{
                    resize: 'vertical'
                }}
            />
        </div>
    )
}

export default CustomDesc