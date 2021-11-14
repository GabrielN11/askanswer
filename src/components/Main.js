import React from 'react'
import {Routes, Route} from 'react-router-dom'
import style from './Main.module.css'
import Feed from './Main/Feed'
import Publish from './Form/Publish'
import Publication from './Publication/Publication'

const Main = () => {
    return (
        <main className={style.main}>
            <Routes>
                <Route path='/' element={<Feed/>}/>
                <Route path='/perguntar' element={<Publish/>}/>
                <Route path='/pergunta/:id' element={<Publication/>}/>
            </Routes>
        </main>
    )
}

export default Main
