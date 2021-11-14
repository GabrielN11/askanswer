import React from 'react'
import { useParams } from 'react-router'
import useFetch from '../../Hooks/useFetch'
import style from './Question.module.css'

const Question = () => {
    const {send} = useFetch()
    const url = useParams()
    const [question, setQuestion] = React.useState(null)
    React.useEffect(() => {
        const fetchData = async () => {
            const {resp, status, error} = await send({
                url: `http://localhost:3005/publicacao/${url.id}`,
                method: 'GET'
            })
            if(error){
                console.log('erro fatal')
            }else{
                if(status === 201){
                    setQuestion(resp)
                }else{
                    console.log('erro no back')
                }
            }
        }
        fetchData()
        // eslint-disable-next-line
    }, [url.id])
    return (
        <div className={style.question}>
            {question && 
            <>
                <h1>{question.title}</h1>
                <p className={style.user}>Por: {question.username}</p>
                <p>{question.description}</p>
            </>    
            }
        </div>
    )
}

export default Question
