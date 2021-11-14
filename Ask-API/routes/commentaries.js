const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool

router.post('/', (req, res, next) => {
    const data = {
        username: req.body.username,
        description: req.body.description,
        id: req.body.id,
    }
    console.log(data)
    mysql.getConnection((error, conn) => {
        if(error) return res.status(500).send({response: 'Falha de acesso. Contate o administrador do sistema.'})
        conn.query('INSERT INTO commentaries (username, description, publication_id) VALUES (?, ?, ?)',
        [data.username, data.description, data.id], (err, resultado, field) => {
            conn.release()
            console.log(err)
            if(err) return res.status(500).send({response: 'Falha de acesso. Contate o administrador do sistema.'})
            res.status(201).send({response: 'Publicado com sucesso.'})
        })
    })

})

router.get('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) return res.status(500).send({response: 'Falha de acesso. Contate o administrador do sistema.'})
        conn.query('SELECT id, username, description FROM commentaries WHERE publication_id = ?', [req.params.id],
        (err, resultado, field) => {
            conn.release()
            if(err) return res.status(500).send({response: 'Falha de acesso. Contate o administrador do sistema.'})
            if(resultado.length === 0) return res.status(404).send({response: 'Não há publicações.'})
            res.status(201).send({response: 'Listado com sucesso', obj: resultado})
        })
    })
})

module.exports = router