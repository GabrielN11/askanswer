import React from 'react'
import { Link } from 'react-router-dom'
import style from './Header.module.css'

const Header = () => {
    return (
        <header className={style.header}>
            <Link className={style.logo} to='/'>Ask&Answer</Link>
            <Link className={style.ask} to='/perguntar'>Faça uma pergunta</Link>
        </header>
    )
}

export default Header
