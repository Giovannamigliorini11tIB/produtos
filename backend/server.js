import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'

const app = express()
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: 'benserverplex.ddns.net',
    user: 'alunos',
    password: 'senhaAlunos',
    database: 'web_03mb'
})

app.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM produtosGi'
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post('/produtos', (req, res) => {
    const sql = 'INSERT INTO produtosGi (nome, preco) VALUES (?)'
    const values = [
        req.body.nome,
        req.body.preco
    ]
    db.query(sql, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json('Produto cadastrado')
    })
})

app.delete('/produtos/:id', (req, res) => {
    const sql = 'DELETE FROM produtosGi WHERE id = ?'
    const id = req.params.id

    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err)
        return res.json('Produto deletado com sucesso')
    })
})

app.listen(8081, () => {
    console.log('Servidor rodando')
})