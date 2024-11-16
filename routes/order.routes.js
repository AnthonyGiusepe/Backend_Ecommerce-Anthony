const router = require('express').Router()
const orderController = require('../controllers/order.controllers')

router.get('/orders', orderController.getOrder)
router.post('/orders', orderController.createOrder)
router.get("/orders/:id", orderController.getOrderByID)
router.delete("/orders/:id", orderController.deleteOrder)
router.put("/orders/:id", orderController.updateOrder)

module.exports = router