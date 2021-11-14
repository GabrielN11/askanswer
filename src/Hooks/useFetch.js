import React from 'react'

const useFetch = () => {

    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        return () => {
            setLoading(false)
        }
    }, [])

    async function send({ url, method, headers, body }) {
        setLoading(true)
        let object = {
            error: false,
            message: '',
            status: null,
            resp: null
        }
        try {
            const res = await fetch(url, {
                method,
                headers,
                body
            })
            console.log(body)
            const { response, obj } = await res.json()
            object.message = response
            object.resp = obj
            object.status = res.status
        } catch (error) {
            object.error = true
            object.status = 400
            object.message = 'Sem serviço. Contate o administrador do sistema.'
        }finally{
            setLoading(false)
            return {...object}
        }
    }

    return {send, loading}
}

export default useFetch