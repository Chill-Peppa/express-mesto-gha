const usersRouter = require('express').Router();
const { createUser } = require('../controllers/users');
const { getUsers } = require('../controllers/users');
const { getUserById } = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);

module.exports = usersRouter;
