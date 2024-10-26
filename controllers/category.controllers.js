const Category = require('../models/category.model')


async function getCategories(req, res) {
    try {

        const categories = await Category.find()

        return res.status(200).send({
            message: "Categorias obtenidas correctamente",
            category: categories
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error al obtener categorias"
        })
    }
}

async function createCategories(req, res) {
    try {

        const category = new Category(req.body)

        const newCategory = await category.save()

        return res.status(201).send({
            message: "Categoria creada correctamente",
            category: newCategory
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error al crear la categoria"
        })
    }
}

module.exports = {
    getCategories,
    createCategories
}