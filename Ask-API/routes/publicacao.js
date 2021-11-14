const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool


router.post('/', (req, res, next) => {
    const data = {
        title: req.body.title,
        description: req.body.description,
        userName: req.body.userName,
    }
    mysql.getConnection((error, conn) => {
        if(error) return res.status(500).send({response: 'Falha de acesso. Contate o administrador do sistema.'})
        conn.query('INSERT INTO publication (title, description, username) VALUES (?, ?, ?)',
        [data.title, data.description, data.userName], (err, resultado, field) => {
            conn.release()
            console.log(resultado)
            if(err) return res.status(500).send({response: 'Falha de acesso. Contate o administrador do sistema.'})
            res.status(201).send({response: 'Publicado com sucesso.', obj: {id: resultado.insertId}})
        })
    })

})

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) return res.status(500).send({response: 'Falha de acesso. Contate o administrador do sistema.'})
        conn.query('SELECT id, title, username FROM publication',
        (err, resultado, field) => {
            conn.release()
            if(err) return res.status(500).send({response: 'Falha de acesso. Contate o administrador do sistema.'})
            if(resultado.length === 0) return res.status(404).send({response: 'Não há publicações.'})
            res.status(201).send({response: 'Listado com sucesso', obj: resultado})
        })
    })
})

router.get('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) return res.status(500).send({response: 'Falha de acesso. Contate o administrador do sistema.'})
        conn.query('SELECT id, title, description, username FROM publication WHERE id = ?', [req.params.id], (err, resultado, field) => {
            conn.release()
            if(err) return res.status(500).send({response: 'Falha de acesso. Contate o administrador do sistema.'})
            if(resultado.length === 0) return res.status(404).send({response: 'Publicação não encontrada.'})
            res.status(201).send({obj: resultado[0], response: 'Listado com sucesso'})
        })
    })
})

module.exports = router
