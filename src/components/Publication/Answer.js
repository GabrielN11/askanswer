import Button from '../Form/Button'
import React from 'react'
import InputText from '../Form/InputText'
import { Textarea } from '../Form/Textarea'
import useFetch from '../../Hooks/useFetch'
import { useParams } from 'react-router'

const Answer = ({setRefresh, setShowForm}) => {
    const [answer, setAnswer] = React.useState('')
    const [user, setUser] = React.useState('')
    const {send} = useFetch()
    const url = useParams()

    async function handleSubmit(e){
        e.preventDefault()
        const {status, erro} = await send({
            url: 'http://localhost:3005/comentarios',
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: user,
                description: answer,
                id: url.id
            })
        })

        if(erro){
            console.log('erro fatal')
        }else{
            if(status === 201){
                setRefresh(r => !r)
                setShowForm(false)
            }else{
                console.log('erro no back')
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{marginBottom: '20px'}}>
            <InputText id='user' name='user' title='seu nome' placeholder='Digite seu nome...'
            setText={setUser} text={user} limit={40}/>
            <Textarea id='answer' name='answer' title='resposta' placeholder='Digite a resposta...'
            setText={setAnswer} text={answer} limit={1000}/>
            <Button text='Responder' disabled={answer.length === 0 || user.length === 0}/>
        </form>
    )
}

export default Answer
