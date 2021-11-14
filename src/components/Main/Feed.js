import React from 'react'
import style from './Feed.module.css'
import useFetch from '../../Hooks/useFetch'
import Item from './Item'

const Feed = () => {
    const {send} = useFetch()
    const [questions, setQuestions] = React.useState([])
    React.useEffect(() => {
        const fetchData = async () => {
            const {status, resp, error} = await send({
                url: 'http://localhost:3005/publicacao',
                method: 'GET',
            })
            if(error){
                console.log('erro fatal')
            }else{
                if(status===201){
                    setQuestions(resp)
                }else{
                    console.log('erro no back')
                }
            }
        }
        fetchData()
        // eslint-disable-next-line
    }, [])
    if(questions.length === 0) return (
        <h1 style={{fontWeight: 'normal'}}>Ainda não há perguntas</h1>
    )
    return (
        <div className={style.feed}>
            {questions.map(question => (
                <Item key={question.id} title={question.title} user={question.username} id={question.id}/>
            ))}
        </div>
    )
}

export default Feed
