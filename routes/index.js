const express = require('express');
const router = express.Router();

const users = require('../APIservices/users/routes')
const productos = require('../APIservices/productos/routes')
const carroCompras = require('../APIservices/carro-compras/routes')

router.get('/', function(req, res) {
  res.render('index');
});
router.get('/favicon.ico', (req, res) => {
  res.sendStatus(404);
});

router.use(users)
router.use(productos)
router.use(carroCompras)

module.exports = router

