const {Router} = require('express');
const route = Router();
const {getUser,postUser,deleteUser,putUser} = require('../controllers/user')

route.get('/', getUser)

route.post('/:id', postUser)

route.delete('/', deleteUser)

route.put('/', putUser)

module.exports = route