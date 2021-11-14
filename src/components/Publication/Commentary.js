import React from 'react'
import style from './Commentary.module.css'

const Commentary = ({username, description}) => {
    return (
        <div className={style.commentary}>
            <p>{username} respondeu:</p>
            <p>{description}</p>
        </div>
    )
}

export default Commentary
