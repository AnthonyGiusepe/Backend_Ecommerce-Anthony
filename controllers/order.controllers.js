const Order = require('../models/order.model')


async function getOrder(req, res) {
    try {

//
        const orders = await Order.find()
                                    .populate('user', "name email")
                                    .populate('products.product', 'name price image')

        return res.status(200).send({
            message: "Ordenes obtenidas correctamente",
            Orders: orders
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error al obtener la Orden"
        })
    }
}

async function createOrder(req, res) {
    try {

        const order = new Order(req.body)

        const newOrder = await order.save()

        return res.status(201).send({
            message: "Orden creada correctamente",
            order: newOrder
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error al crear la Orden"
        })
    }
}

module.exports = {
    getOrder,
    createOrder
}