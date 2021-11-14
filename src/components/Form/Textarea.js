import React from 'react'
import style from './Textarea.module.css'

export const Textarea = ({id, name, title, placeholder, setText, text, limit}) => {
    const [empty, setEmpty] = React.useState(false)

    function handleChange({target}){
        if(target.value.length > 0) setEmpty(false)
        if(target.value.length > limit) return setText(target.value.substring(0, 45))
        setText(target.value)
    }

    function handleBlur({target}){
        if(target.value.length === 0) return setEmpty(true)
    }
    return (
        <label className={style.label}>
            Digite a {title}:
            <textarea id={id} name={name} value={text} placeholder={placeholder}
            onChange={handleChange} onBlur={handleBlur}/>
            {empty && <p>{title} não pode ficar vazio!</p>}
        </label>
    )
}
