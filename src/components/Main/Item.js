import React from 'react'
import style from './Item.module.css'
import { Link } from 'react-router-dom'

const Item = ({title, user, id}) => {
    return (
        <Link className={style.item} to={`/pergunta/${id}`}>
            <h2>{title}</h2>
            <p>Por: {user}</p>
        </Link>
    )
}

export default Item
