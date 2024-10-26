const router = require('express').Router()
const categoriesController = require('../controllers/category.controllers')

router.get('/categories', categoriesController.getCategories)
router.post('/categories', categoriesController.createCategories)

module.exports = router