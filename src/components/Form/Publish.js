import Button from './Button'
import React from 'react'
import InputText from './InputText'
import { Textarea } from './Textarea'
import useFetch from '../../Hooks/useFetch'
import { useNavigate } from 'react-router'

const Publish = () => {
    const [title, setTitle] = React.useState('')
    const [user, setUser] = React.useState('')
    const [question, setQuestion] = React.useState('')
    const {send} = useFetch()
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        const {error, status, resp} = await send({
            url: 'http://localhost:3005/publicacao',
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: question,
                userName: user
            })
        })

        if(error){
            console.log('erro fatal')
        }else{
            if(status === 201){
                navigate(`/pergunta/${resp.id}`)
            }else console.log('erro no back')
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{width: '100%'}}>
            <InputText id='title' name='title' title='título da pergunta' placeholder='Digite o título...'
            setText={setTitle} text={title} limit={45}/>
            <InputText id='user' name='user' title='seu nome' placeholder='Digite seu nome...'
            setText={setUser} text={user} limit={45}/>
            <Textarea id='question' name='question' title='pergunta' placeholder='Digite a pergunta...'
            setText={setQuestion} text={question} limit={1000} />
            <Button text='Perguntar' disabled={title.length === 0 || user.length === 0 || question.length === 0}/>
        </form>
    )
}

export default Publish