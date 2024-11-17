const Order = require('../models/order.model')


async function getOrder(req, res) {
    try {

//
        const orders = await Order.find()
                                    .populate('user', "name email")
                                    .populate('products.product', 'name price image')

        return res.status(200).send({
            message: "Ordenes obtenidas correctamente",
            orders: orders
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

async function getOrderByID(req, res) {
    
    try {
        
        const { id } = req.params

        if(req.user.role !== "admin" && id !== req.user._id){
            return res.status(403).send({
                message: "No tienes permisos para acceder a este producto"
            })
        }

        const order = await Order.findById(id)

        if (!order) {
            return res.status(404).send({
                message: "La orden no fue encontrada",
                ok: false
            })
        }

        return res.status(200).send({
            ok: true,
            message: "Orden Encontrada",
            order: order
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error al obtener la orden solicitada"
        })
    }
}

async function deleteOrder(req, res) {
    try {

        const { id } = req.params

        if(req.user.role !== "admin" && id !== req.user._id){
            return res.status(403).send({
                message: "No tienes permisos para acceder a este producto"
            })
        }

        const deleteOrder = await Order.findByIdAndDelete(id)

        return res.status(200).send({
            ok: true,
            message: "La orden fue borrado correctamente",
            deleteOrder: deleteOrder
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al borrar la orden"
        })
    }
}

async function updateOrder(req, res) {

    const { id } = req.params

    if(req.user.role !== "admin" && id !== req.user._id){
        return res.status(403).send({
            message: "No tienes permisos para acceder a este producto"
        })
    }

    const updateOrder = await Order.findByIdAndUpdate(id, req.body, { new: true } )

    updateOrder.save().then((updateOrder) => {

        return res.status(201).send({
            ok: true,
            message: "Orden Actualizada",
            updateOrder: updateOrder
        })

    }).catch(error => {
        console.log(error)
        return res.send('No se pudo actualizar la orden')
    })
}

module.exports = {
    getOrder,
    createOrder,
    getOrderByID,
    deleteOrder,
    updateOrder
}