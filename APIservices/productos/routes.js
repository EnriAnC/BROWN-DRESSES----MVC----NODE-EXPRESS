const express = require('express')
const router = express.Router()
const controllers = require('./controllers')

router.get('/productos/producto', controllers.viewProducto)

router.get('/productos/', controllers.getProducts)

module.exports = router