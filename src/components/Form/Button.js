import React from 'react'
import style from './Button.module.css'

const Button = ({text, ...props}) => {
    return (
        <button className={style.button} {...props}>
            {text}
        </button>
    )
}

export default Button
