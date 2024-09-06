const express = require('express')
const controllers = require('../controllers/views.controller')

const router = new express.Router()

router.get('/', controllers.index)
router.get('/login', controllers.login)
router.get('/detalles', controllers.detalles)
router.get('/agregar', controllers.agregar)

router.get('/index.html', controllers.index)
router.get('/login.html', controllers.login)
router.get('/detalles.html', controllers.detalles)
router.get('/agregar.html', controllers.agregar)

module.exports = router