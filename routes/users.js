const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { getUserByIdValidation, updateProfileValidation, updateAvatarValidation } = require('../utils/validation');

const { getUsers } = require('../controllers/users');
const { getInfoMe } = require('../controllers/users');
const { getUserById } = require('../controllers/users');
const { updateProfile } = require('../controllers/users');
const { updateAvatar } = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getInfoMe);
usersRouter.get('/:userId', celebrate(getUserByIdValidation), getUserById);
usersRouter.patch('/me', celebrate(updateProfileValidation), updateProfile);
usersRouter.patch('/me/avatar', celebrate(updateAvatarValidation), updateAvatar);

module.exports = usersRouter;
