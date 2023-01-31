const express = require('express')
const router = express.Router()
const controllers = require('./controllers')

router.get('/registro', controllers.viewRegistro)

router.post('/login', controllers.login)

router.post('/solicitud-registro', controllers.register)


module.exports = router