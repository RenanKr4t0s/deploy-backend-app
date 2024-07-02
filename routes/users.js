const express = require('express');
const UserService = require('../services/user_services');
const JsonParse = require('../services/json_parse');
const User = require('../entities/user');

const router = express.Router();

// CREATE - Cria um novo usuário
router.post('/', async (req, res) => {
  const user = new User (req.body);
  try {
    const newUser = await UserService.create( user.name, user.phone, user.obs);
    res.json(JsonParse.toLiteral(user));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL - Retorna todos os usuários
router.get('/', async (req, res) => {
  try {
    const users = await UserService.all();
    res.json(JsonParse.toLiteralArray(users));
    // res.send("Estou no lugar certo"+u)

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE - Retorna um usuário pelo ID
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserService.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    //res.json(JsonParse.toLiteral(user.results));
    res.send(user.results)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE - Atualiza um usuário pelo ID
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const user = new User (req.body);
  try {
    const updatedUser = await UserService.update(userId, user.name, user.phone, user.obs);
    // res.json(JsonParse.toLiteral(updatedUser));
    res.send(updatedUser)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Deleta um usuário pelo ID
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await UserService.delete(userId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//todas as rotas eram /users/ mudei para teste

module.exports = router;