import Button from '../Form/Button'
import React from 'react'
import Answer from './Answer'
import style from './Publication.module.css'
import Question from './Question'
import Commentaries from './Commentaries'

const Publication = () => {
    const [showForm, setShowForm] = React.useState(false)
    const [refresh, setRefresh] = React.useState(true)
    return (
        <div className={style.publication}>
            <Question/>
            <Button text={showForm ? 'Fechar' : 'Responder'} onClick={() => {
                setShowForm(status => !status)
            }} style={{marginBottom: '20px'}}/>
            {showForm && <Answer setRefresh={setRefresh} setShowForm={setShowForm}/>}
            <div style={{borderBottom: '1px solid lightgrey', marginBottom: '10px'}}/>
            <Commentaries refresh={refresh}/>
        </div>
    )
}

export default Publication
