const express = require('express');
const router = express.Router()
const productControllers = require('../controllers/product.controllers')
const upload = require('../middlewares/uploadFile')

router.get('/products', productControllers.getProducts)
router.post('/products', [upload], productControllers.createProducts)
router.get("/products/:id", productControllers.getProductById)
router.delete("/products/:id", productControllers.deleteProduct)
router.put("/products/:id", [upload], productControllers.updateProduct)


module.exports = router