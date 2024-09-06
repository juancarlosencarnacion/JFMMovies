const express = require('express')
const controllers = require('../controllers/user.controllers')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/register', controllers.registerUser)

router.post('/login', controllers.userLogin)

router.get('/get',auth, controllers.getUsers)

router.get('/get/:id',auth, controllers.getUser)

router.patch('/update/:id',auth, controllers.updateUser)

router.delete('/delete/:id',auth, controllers.deleteUser)



module.exports = router 