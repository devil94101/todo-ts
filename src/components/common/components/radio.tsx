import React from 'react'
import '../styles/input.styles.css'
type Props = {
    value: boolean;
    setValue: (data: boolean) => void;
    name: string;
}

const CustomRadio = ({ value, setValue, name }: Props) => {
    return (

        <div className={'radioDivCss'}>
            <input
                style={{
                    marginRight: '0.4rem',
                    cursor: 'pointer'
                }}
                className={'formCheckCss'}
                name={name}
                type="checkbox"
                checked={value}
                onChange={() => {
                     setValue(!value) 
                }}
            />
            <label className='textStyle' htmlFor={name} style={value ? {
                fontWeight: 'bold'
            } : {}}>{name}</label>
        </div>
    )
}

export default CustomRadio