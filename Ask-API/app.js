const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}));
app.use(express.json())


app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header(
        'Access-Control-Allow-Header', 
        'Content-Type',
        'Multipart/Form-Data',
        'Origin, X-Requested-With, Accept, Authorization'
        )
    res.header('Access-Control-Max-Age', '86400')
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE')
        return res.status(200).send({})
    }
    next()
})

const rotaPublicacao = require('./routes/publicacao')
const rotaComentarios = require('./routes/commentaries')

app.use('/publicacao', rotaPublicacao)
app.use('/comentarios', rotaComentarios)


app.use((req, res, next) => {
    const erro = new Error('Não encontrado')
    erro.status = 404
    next(erro)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro:{
            mensagem: error.message
        }
    })
})

module.exports = app;