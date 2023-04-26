const usersRouter = require('express').Router();

const { getUsers } = require('../controllers/users');
const { getInfoMe } = require('../controllers/users');
const { getUserById } = require('../controllers/users');
const { updateProfile } = require('../controllers/users');
const { updateAvatar } = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getInfoMe);
usersRouter.get('/:userId', getUserById);
usersRouter.patch('/me', updateProfile);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
