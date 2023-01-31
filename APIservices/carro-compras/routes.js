const express = require('express')
const router = express.Router()
const controllers = require('./controllers')

router.route('/carrito')
    .get(controllers.getCarro)
    .post(controllers.verifyToken, controllers.postCarro)
router.get('/carro-compras', controllers.viewCarroCompras)

module.exports = router