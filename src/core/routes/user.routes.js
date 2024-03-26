const express = require('express');
const UserController = require('../controllers/user.controller');
const router = express.Router();

const userController = new UserController();

router.post('/', userController.create.bind(userController));
router.post('/login', userController.login.bind(userController));
router.get('/:id', userController.getById.bind(userController));
router.put('/:id', userController.update.bind(userController));
router.delete('/:id', userController.delete.bind(userController));

module.exports = router;
