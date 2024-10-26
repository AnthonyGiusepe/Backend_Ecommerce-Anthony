const router = require('express').Router()
const orderController = require('../controllers/order.controllers')

router.get('/orders', orderController.getOrder)
router.post('/orders', orderController.createOrder)

module.exports = router