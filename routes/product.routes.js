const express = require('express');
const router = express.Router()
const productControllers = require('../controllers/product.controllers')
const upload = require('../middlewares/uploadFile');
const validation = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

router.get('/products', productControllers.getProducts)

router.post('/products', [validation, isAdmin, upload], productControllers.createProducts)

router.get("/products/:id", validation, productControllers.getProductById)

router.delete("/products/:id", [validation, isAdmin], productControllers.deleteProduct)

router.put("/products/:id", [validation, isAdmin, upload], productControllers.updateProduct)


module.exports = router