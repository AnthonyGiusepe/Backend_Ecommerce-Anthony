const router = require('express').Router()
const orderController = require('../controllers/order.controllers')
const validation = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

router.get('/orders', orderController.getOrder)
router.post('/orders', orderController.createOrder)
router.get("/orders/:id", [validation, isAdmin], orderController.getOrderByID)
router.delete("/orders/:id", [validation, isAdmin], orderController.deleteOrder)
router.put("/orders/:id", [validation, isAdmin], orderController.updateOrder)

module.exports = router