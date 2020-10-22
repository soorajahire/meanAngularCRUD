var app = module.exports = require('express').Router();
const userController = require('../controller/userController');

app.post('/create', userController.findAndCreateUser);
app.post('/edit', userController.saveAndUpdateUser);
app.post('/delete', userController.deleteUser);
