const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'benserverplex.ddns.net',
  user: 'alunos',
  password: 'senhAlunos',
  database: 'agrotech_quiz'
});

db.connect((err) => {
  if (err) {
    console.log('Erro ao conectar no MySQL:', err);
  } else {
    console.log('Conectado ao MySQL!');
  }
});

app.post('/pontuacao', (req, res) => {
  const { usuarioId, pontuacao } = req.body;

  const sql = 'INSERT INTO pontuacoes (usuario_id, pontuacao) VALUES (?, ?)';
  db.query(sql, [usuarioId, pontuacao], (err) => {
    if (err) return res.status(500).json({ erro: 'Erro ao salvar' });

    res.json({ mensagem: 'Pontuação salva com sucesso!' });
  });
});

app.get('/ranking', (req, res) => {
  db.query('SELECT nome, pontuacao FROM usuarios ORDER BY pontuacao DESC LIMIT 10', (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao carregar ranking' });
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


