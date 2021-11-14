import React from 'react'
import style from './InputText.module.css'

const InputText = ({name, id, title, placeholder, setText, text, limit}) => {

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
            Digite o {title}:
            <input type='text' name={name} id={id} placeholder={placeholder} value={text} 
            onChange={handleChange} onBlur={handleBlur}/>
            {empty && <p>{title} não pode ficar vazio!</p>}
        </label>
    )
}

export default InputText
