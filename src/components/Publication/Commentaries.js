import React from 'react'
import { useParams } from 'react-router'
import useFetch from '../../Hooks/useFetch'
import style from './Commentaries.module.css'
import Commentary from './Commentary'

const Commentaries = ({refresh}) => {
    const {send} = useFetch()
    const url = useParams()
    const [commentaries, setCommentaries] = React.useState(null)

    React.useEffect(() => {
        const fetchData = async () => {
            const {resp, status, error} = await send({
                url: `http://localhost:3005/comentarios/${url.id}`,
                method: 'GET'
            })
            if(error){
                console.log('erro fatal')
            }else{
                if(status === 201){
                    setCommentaries(resp)
                }else{
                    console.log('erro no back')
                }
            }
        }
        fetchData()
        // eslint-disable-next-line
    }, [refresh, url.id])

    if(!commentaries) return (
        <div className={style.empty}>
            <h3>Essa pergunta ainda não foi respondida...</h3>
            <p>Seja o primeiro a ajudar nosso amigo! :)</p>
        </div>
    )
    return (
        <div className={style.commentaries}>
            <h2>Respostas: </h2>
           {commentaries.map(commentary => (
               <Commentary key={commentary.id} username={commentary.username} description={commentary.description}/>
           ))} 
        </div>
    )
}

export default Commentaries
